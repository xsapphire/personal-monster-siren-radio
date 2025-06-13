"use client";
import { ReactElement, ReactNode } from "react";
import styled from "styled-components";
import { usePlaylist } from "../context/SongContext";
import { Theme, useTheme } from "../context/ThemeContext";
import { themeColors } from "../themeColors";
import { CloseButton } from "./CloseButton";
import { FlexBox } from "./FlexBox";

type FlyoutProps = {
  children: ReactNode;
  title: string;
};

const FlyoutPanel = styled.div<{ $theme: Theme }>`
  position: fixed;
  top: 0;
  right: 0;
  min-width: 40%;
  height: 100%;
  background-color: ${({ $theme }) => themeColors[$theme].secondaryBackground};

  border-left: ${({ $theme }) =>
    $theme === Theme.LIGHT
      ? `1px solid ${themeColors[$theme].border}`
      : "none"};
`;

export const Flyout = ({
  children,
  title,
}: FlyoutProps): ReactElement | null => {
  const { configPlaylistOpen, toggleConfigPlaylistModal } = usePlaylist();
  const { selectedTheme } = useTheme();

  if (!configPlaylistOpen) {
    return null;
  }

  return (
    <FlyoutPanel $theme={selectedTheme}>
      <FlexBox $center="y" $spaceBetween style={{ padding: "32px 16px" }}>
        <h2>{title}</h2>
        <CloseButton onClick={toggleConfigPlaylistModal} />
      </FlexBox>
      <div style={{ overflow: "scroll", height: "100%", padding: "16px" }}>
        {children}
      </div>
    </FlyoutPanel>
  );
};
