import React from "react";
import AriaModal, { AriaModalProps } from "react-aria-modal";

export type InformationModalProps = Pick<AriaModalProps, "onExit">;

function InformationModal({ onExit }: InformationModalProps): JSX.Element {
  return (
    <AriaModal onExit={onExit} titleText="Information">
      aaa
      <button>aaa</button>
    </AriaModal>
  );
}

export default InformationModal;
