"use client";

import { ReactElement } from "react";
import styled from "styled-components";
import { Theme, useTheme } from "../context/ThemeContext";
import { themeColors } from "../themeColors";
import { PrimaryButton, TextButton } from "./Button";
import { CloseButton } from "./CloseButton";
import { FlexBox } from "./FlexBox";

const ModalOverlay = styled(FlexBox)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

const ModalContent = styled(FlexBox)<{ $theme: Theme }>`
  background-color: ${({ $theme }) => themeColors[$theme].secondaryBackground};
  min-width: 400px;
  min-height: 300px;
  z-index: 1001;
  border-radius: 8px;
`;

const ModalHeader = styled(FlexBox)`
  padding: 16px;
  width: 100%;
`;

export const Modal = ({
  title,
  children,
  onClose,
  onConfirm,
  confirmButtonText,
}: {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  onConfirm?: () => void;
  confirmButtonText?: string;
}): ReactElement => {
  const { selectedTheme } = useTheme();

  return (
    <ModalOverlay onClick={onClose} $center="xy">
      <ModalContent
        onClick={(e) => e.stopPropagation()}
        $direction="column"
        $spaceBetween
        $theme={selectedTheme}
      >
        <ModalHeader $spaceBetween $center="y">
          <h2>{title}</h2>
          <CloseButton onClick={onClose} />
        </ModalHeader>

        <div
          style={{
            padding: "16px",
            overflowY: "auto",
            width: "100%",
            height: "100%",
          }}
        >
          {children}
        </div>

        <FlexBox
          style={{ justifyContent: "flex-end", padding: "16px", width: "100%" }}
        >
          <TextButton onClick={onClose}>Cancel</TextButton>
          <PrimaryButton onClick={onConfirm}>
            {confirmButtonText ? confirmButtonText : "Confirm"}
          </PrimaryButton>
        </FlexBox>
      </ModalContent>
    </ModalOverlay>
  );
};
