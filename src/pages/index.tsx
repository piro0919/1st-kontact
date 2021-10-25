import useSwitch from "@react-hook/switch";
import { GetStaticProps } from "next";
import { NextSeo } from "next-seo";
import React, { useCallback, useMemo, useState } from "react";
import IllustrationModal, {
  IllustrationModalProps,
} from "components/IllustrationModal";
import InformationModal from "components/InformationModal";
import Top, { TopProps } from "components/Top";
import getClient from "libs/getClient";

export type PagesProps = Pick<TopProps, "informations" | "videos"> & {
  illustrations: Pick<TopProps["illustrations"][0], "url">[];
};

function Pages({
  illustrations: illustrationsProps,
  informations,
  videos,
}: PagesProps): JSX.Element {
  const [
    showInformationModal,
    { off: offShowInformationModal, on: onShowInformationModal },
  ] = useSwitch(false);
  const handleSubmit = useCallback<TopProps["onSubmit"]>(() => {
    // console.log(values);
  }, []);
  const [showIllustrationIndex, setShowIllustrationIndex] =
    useState<IllustrationModalProps["index"]>();
  const illustrations = useMemo(
    () =>
      illustrationsProps.map((illustration, index) => ({
        ...illustration,
        onClick: (): void => {
          setShowIllustrationIndex(index);
        },
      })),
    [illustrationsProps]
  );
  const handleCloseRequest = useCallback<
    IllustrationModalProps["onCloseRequest"]
  >(() => {
    setShowIllustrationIndex(undefined);
  }, []);
  const illustrationModalIllustrations = useMemo(
    () => illustrations.map(({ url }) => url),
    [illustrations]
  );

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
        illustrations={illustrations}
        informations={informations}
        onShowInformationModal={onShowInformationModal}
        onSubmit={handleSubmit}
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
          illustrations={illustrationModalIllustrations}
          index={showIllustrationIndex}
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
  const { contents: informationList } = await client.getList<Information>({
    endpoint: "information",
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
      illustrations: illustrations.map(({ image: { url } }) => ({
        url,
      })),
      informations: informationList.map(({ date, title, urlList }) => ({
        date,
        title,
        urlList: urlList.map(({ url }) => url),
      })),
      videos: videos.map(({ url }) => url),
    },
    revalidate: 60 * 60 * 1,
  };
};

export default Pages;
