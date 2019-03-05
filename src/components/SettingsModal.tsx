/**
 * Settings modal to hold settings page. Built on top of
 * react-modal and utilising styled components to remain consistent
 * with rest of site.
 */
import React from "react";
import ReactModal from "react-modal";

interface Props extends ReactModal.Props {
  className?: string;
}
export const ModalWrapper: React.SFC<Props> = ({
  className,
  ...props
}: Props) => {
  ReactModal.setAppElement("#root");
  const contentClassName = `${className}__content`;
  const overlayClassName = `${className}__overlay`;
  return (
    <ReactModal
      portalClassName={className}
      className={contentClassName}
      overlayClassName={overlayClassName}
      {...props}
    />
  );
};
