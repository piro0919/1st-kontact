import useSwitch from "@react-hook/switch";
// import { GetStaticProps } from "next";
import React, { useCallback, useMemo, useState } from "react";
import Lightbox, { ILightBoxProps } from "react-image-lightbox";
import InformationModal from "components/InformationModal";
import Top, { TopProps } from "components/Top";
// import getClient from "libs/getClient";

// export type PagesProps = Pick<TopProps, "illustrations">;

function Pages(): JSX.Element {
  const [
    showInformationModal,
    { off: offShowInformationModal, on: onShowInformationModal },
  ] = useSwitch(false);
  const handleSubmit = useCallback<TopProps["onSubmit"]>(() => {
    // console.log(values);
  }, []);
  const [showIllustrationIndex, setShowIllustrationIndex] = useState<number>();
  const illustrations = useMemo(
    () =>
      [
        { src: "/calliope.png" },
        { src: "/calliope.png" },
        { src: "/calliope.png" },
        { src: "/calliope.png" },
        { src: "/calliope.png" },
        { src: "/calliope.png" },
        { src: "/calliope.png" },
      ].map((illustration, index) => ({
        ...illustration,
        onClick: (): void => {
          setShowIllustrationIndex(index);
        },
      })),
    []
  );
  const handleCloseRequest = useCallback<
    ILightBoxProps["onCloseRequest"]
  >(() => {
    setShowIllustrationIndex(undefined);
  }, []);

  return (
    <>
      <Top
        illustrations={illustrations}
        onShowInformationModal={onShowInformationModal}
        onSubmit={handleSubmit}
      />
      {showInformationModal ? (
        <InformationModal onExit={offShowInformationModal} />
      ) : null}
      {typeof showIllustrationIndex === "number" ? (
        <Lightbox
          mainSrc={illustrations[showIllustrationIndex].src}
          nextSrc={
            illustrations[(showIllustrationIndex + 1) % illustrations.length]
              .src
          }
          onCloseRequest={handleCloseRequest}
          onMoveNextRequest={(): void =>
            setShowIllustrationIndex((prevShowIllustrationIndex) =>
              typeof prevShowIllustrationIndex === "number"
                ? (prevShowIllustrationIndex + 1) % illustrations.length
                : undefined
            )
          }
          onMovePrevRequest={(): void =>
            setShowIllustrationIndex((prevShowIllustrationIndex) =>
              typeof prevShowIllustrationIndex === "number"
                ? (prevShowIllustrationIndex + illustrations.length - 1) %
                  illustrations.length
                : undefined
            )
          }
          prevSrc={
            illustrations[
              (showIllustrationIndex + illustrations.length - 1) %
                illustrations.length
            ].src
          }
        />
      ) : null}
    </>
  );
}

// export const getStaticProps: GetStaticProps<PagesProps> = async () => {
//   const client = getClient();

//   client.getList({
//     endpoint: "",
//   });

//   console.log(a);

//   return {
//     props: {
//       illustrations: [],
//     },
//     revalidate: 60 * 60 * 12,
//   };
// };

export default Pages;
