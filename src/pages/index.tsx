import useSwitch from "@react-hook/switch";
import axios from "axios";
import { GetStaticProps } from "next";
import { NextSeo } from "next-seo";
import React, { useCallback, useMemo, useState } from "react";
import swal from "sweetalert";
import IllustrationModal, {
  IllustrationModalProps,
} from "components/IllustrationModal";
import InformationModal from "components/InformationModal";
import Top, { TopProps } from "components/Top";
import getClient from "libs/getClient";

export type PagesProps = Pick<
  TopProps,
  | "aboutDeliveryTime"
  | "aboutPrice"
  | "flowToDelivery"
  | "informations"
  | "priceList"
  | "termsOfService"
  | "videos"
> & {
  illustrations: string[];
  images: string[];
};

function Pages({
  aboutDeliveryTime,
  aboutPrice,
  flowToDelivery,
  illustrations: illustrationsProps,
  images: imagesProps,
  informations,
  priceList,
  termsOfService,
  videos,
}: PagesProps): JSX.Element {
  const [
    showInformationModal,
    { off: offShowInformationModal, on: onShowInformationModal },
  ] = useSwitch(false);
  const handleSubmit = useCallback<TopProps["onSubmit"]>(async (values) => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/email`, values);

      swal({
        icon: "success",
        text: "メールの送信を完了しました。",
        title: "メール送信完了",
      });
    } catch {
      swal({
        icon: "error",
        text: "メールの送信に失敗しました。",
        title: "メール送信失敗",
      });
    }
  }, []);
  const [showIllustrationIndex, setShowIllustrationIndex] =
    useState<IllustrationModalProps["index"]>();
  const [showDeliveryImageIndex, setShowDeliveryImageIndex] =
    useState<IllustrationModalProps["index"]>();
  const illustrations = useMemo<TopProps["illustrations"]>(
    () =>
      illustrationsProps.map((illustration, index) => ({
        onClick: (): void => {
          setShowIllustrationIndex(index);
        },
        url: illustration,
      })),
    [illustrationsProps]
  );
  const images = useMemo<TopProps["images"]>(
    () =>
      imagesProps.map((image, index) => ({
        onClick: (): void => {
          setShowDeliveryImageIndex(index);
        },
        url: image,
      })),
    [imagesProps]
  );
  const handleCloseRequest = useCallback<
    IllustrationModalProps["onCloseRequest"]
  >(() => {
    setShowIllustrationIndex(undefined);
    setShowDeliveryImageIndex(undefined);
  }, []);

  return (
    <>
      <NextSeo
        additionalLinkTags={[
          {
            href: "https://kontaniki.com/favicon.ico",
            rel: "icon",
          },
          {
            href: "https://kontaniki.com/76.png",
            rel: "apple-touch-icon",
            sizes: "76x76",
          },
          {
            href: "/manifest.json",
            rel: "manifest",
          },
        ]}
        canonical="https://kontaniki.com/"
        description="イラストレーター「こんたくん」のオフィシャルサイトです。"
        openGraph={{
          description:
            "イラストレーター「こんたくん」のオフィシャルサイトです。",
          images: [
            {
              alt: "1stKontact",
              height: 600,
              type: "image/png",
              url: "https://kontaniki.com/og-image-01.png",
              width: 800,
            },
          ],
          site_name: "1stKontact | イラストレーターこんたくんのサイト",
          title: "1stKontact | イラストレーターこんたくんのサイト",
          url: "https://kontaniki.com/",
        }}
        title="1stKontact | イラストレーターこんたくんのサイト"
        twitter={{
          cardType: "summary_large_image",
          handle: "@konta_niki",
        }}
      />
      <Top
        aboutDeliveryTime={aboutDeliveryTime}
        aboutPrice={aboutPrice}
        flowToDelivery={flowToDelivery}
        illustrations={illustrations}
        images={images}
        informations={informations}
        onShowInformationModal={onShowInformationModal}
        onSubmit={handleSubmit}
        priceList={priceList}
        termsOfService={termsOfService}
        videos={videos}
      />
      {showInformationModal ? (
        <InformationModal
          informations={informations}
          onExit={offShowInformationModal}
        />
      ) : null}
      {typeof showIllustrationIndex === "number" ? (
        <IllustrationModal
          illustrations={illustrationsProps}
          index={showIllustrationIndex}
          onCloseRequest={handleCloseRequest}
        />
      ) : null}
      {typeof showDeliveryImageIndex === "number" ? (
        <IllustrationModal
          illustrations={imagesProps}
          index={showDeliveryImageIndex}
          onCloseRequest={handleCloseRequest}
        />
      ) : null}
    </>
  );
}

export const getStaticProps: GetStaticProps<PagesProps> = async () => {
  const client = getClient();
  const { contents: illustrations } = await client.getList<Illustration>({
    endpoint: "illustrations",
    queries: {
      limit: 100,
    },
  });
  const { contents: deliveryImages } = await client.getList<Deliveryimages>({
    endpoint: "deliveryimages",
  });
  const { contents: informationList } = await client.getList<Informationlist>({
    endpoint: "informationlist",
    queries: {
      limit: 100,
    },
  });
  const { datehtml, flowhtml, pricehtml, termsOfService } =
    await client.getObject<Pricedetail>({
      endpoint: "pricedetail",
    });
  const { contents: priceList } = await client.getList<Pricelist>({
    endpoint: "pricelist",
    queries: {
      limit: 100,
    },
  });
  const { contents: videos } = await client.getList<Video>({
    endpoint: "videos",
    queries: {
      limit: 100,
    },
  });

  return {
    props: {
      termsOfService,
      aboutDeliveryTime: datehtml,
      aboutPrice: pricehtml,
      flowToDelivery: flowhtml,
      illustrations: illustrations.map(({ image: { url } }) => url),
      images: deliveryImages.map(({ image: { url } }) => url),
      informations: informationList.map(({ date, title, urlList }) => ({
        date,
        title,
        urlList: urlList.map(({ url }) => url),
      })),
      priceList: priceList.map(({ title, value }) => ({
        title,
        value,
      })),
      videos: videos.map(({ url }) => url),
    },
    revalidate: 60 * 60 * 1,
  };
};

export default Pages;
