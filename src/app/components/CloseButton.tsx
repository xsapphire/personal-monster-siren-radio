import { ReactElement } from "react";
import { FiX } from "react-icons/fi";
import { TextButton } from "./Button";
import { FlexBox } from "./FlexBox";

export const CloseButton = ({
  onClick,
}: {
  onClick: () => void;
}): ReactElement => {
  return (
    <TextButton onClick={onClick}>
      <FlexBox $center="y">
        <FiX /> Close
      </FlexBox>
    </TextButton>
  );
};
