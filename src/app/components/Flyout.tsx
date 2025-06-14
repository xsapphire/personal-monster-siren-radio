"use client";
import { ReactElement, ReactNode } from "react";
import styled from "styled-components";
import { useFlyout } from "../context/FlyoutContext";
import { Theme, useTheme } from "../context/ThemeContext";
import { themeColors } from "../themeColors";
import { CloseButton } from "./CloseButton";
import { FlexBox } from "./FlexBox";

type FlyoutProps = {
  children: ReactNode;
};

const FlyoutPanel = styled.div<{ $theme: Theme }>`
  position: fixed;
  top: 0;
  right: 0;
  width: 40%;
  height: 100%;
  background-color: ${({ $theme }) => themeColors[$theme].secondaryBackground};

  border-left: ${({ $theme }) =>
    $theme === Theme.LIGHT
      ? `1px solid ${themeColors[$theme].border}`
      : "none"};
  z-index: 1000;
  color: ${({ $theme }) => themeColors[$theme].text};
`;

export const Flyout = ({ children }: FlyoutProps): ReactElement | null => {
  const { selectedTheme } = useTheme();
  const { flyoutIsOpen, closeFlyout, flyoutTitle } = useFlyout();

  if (!flyoutIsOpen) {
    return null;
  }

  return (
    <FlyoutPanel $theme={selectedTheme}>
      <FlexBox $center="y" $spaceBetween style={{ padding: "32px 16px" }}>
        <h2>{flyoutTitle}</h2>
        <CloseButton onClick={closeFlyout} />
      </FlexBox>
      <div
        style={{
          overflow: "auto",
          height: "calc(100% - 98px)",
          padding: "16px",
        }}
      >
        {children}
      </div>
    </FlyoutPanel>
  );
};
