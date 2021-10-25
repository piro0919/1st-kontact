import React, { useCallback, useMemo, useState } from "react";
import Lightbox, { ILightBoxProps } from "react-image-lightbox";

export type IllustrationModalProps = Pick<ILightBoxProps, "onCloseRequest"> & {
  illustrations: string[];
  index: number;
};

function IllustrationModal({
  illustrations,
  index: indexProps,
  onCloseRequest,
}: IllustrationModalProps): JSX.Element {
  const [index, setIndex] = useState(indexProps);
  const mainSrc = useMemo<ILightBoxProps["mainSrc"]>(
    () => illustrations[index],
    [illustrations, index]
  );
  const nextSrc = useMemo<ILightBoxProps["nextSrc"]>(
    () => illustrations[(index + 1) % illustrations.length],
    [illustrations, index]
  );
  const handleMoveNextRequest = useCallback<
    NonNullable<ILightBoxProps["onMoveNextRequest"]>
  >(() => {
    setIndex((prevIndex) => (prevIndex + 1) % illustrations.length);
  }, [illustrations.length, setIndex]);
  const handleMovePrevRequest = useCallback<
    NonNullable<ILightBoxProps["onMovePrevRequest"]>
  >(() => {
    setIndex(
      (prevIndex) =>
        (prevIndex + illustrations.length - 1) % illustrations.length
    );
  }, [illustrations.length, setIndex]);
  const prevSrc = useMemo<ILightBoxProps["prevSrc"]>(
    () =>
      illustrations[(index + illustrations.length - 1) % illustrations.length],
    [illustrations, index]
  );

  return (
    <Lightbox
      enableZoom={false}
      mainSrc={mainSrc}
      nextSrc={nextSrc}
      onCloseRequest={onCloseRequest}
      onMoveNextRequest={handleMoveNextRequest}
      onMovePrevRequest={handleMovePrevRequest}
      prevSrc={prevSrc}
    />
  );
}

export default IllustrationModal;
