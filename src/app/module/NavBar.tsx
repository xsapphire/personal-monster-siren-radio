"use client";
import { ReactElement } from "react";
import { FiChevronDown, FiMoon, FiRadio, FiSun } from "react-icons/fi";
import styled from "styled-components";
import { TextButton } from "../components/Button";
import { Dropdown } from "../components/Dropdown";
import { FlexBox } from "../components/FlexBox";
import { Theme, useTheme } from "../context/ThemeContext";
import { themeColors } from "../themeColors";

const Divider = styled.div<{ $theme: Theme }>`
  width: 1px;
  height: 24px;
  background-color: ${({ $theme }) => themeColors[$theme].border};
`;

const MenuContainer = (): ReactElement => {
  const { selectedTheme } = useTheme();
  return (
    <FlexBox $center="y" style={{ padding: "8px" }}>
      <FlexBox $center="y">
        <FiRadio /> <b>Your Own Monster Siren Radio</b>
      </FlexBox>
      <Divider $theme={selectedTheme} />
      <TextButton>How to Use</TextButton>
      <Divider $theme={selectedTheme} />
      <TextButton>About</TextButton>
    </FlexBox>
  );
};

export const NavBar = (): ReactElement => {
  const { selectedTheme, updateSelectedTheme } = useTheme();

  return (
    <FlexBox
      $spaceBetween
      $center="y"
      style={{
        height: "50px",
        borderBottom: `1px solid ${themeColors[selectedTheme].border}`,
      }}
    >
      <MenuContainer />
      <FlexBox $center="y" style={{ padding: "8px" }}>
        <Dropdown
          options={[
            {
              label: "Dark Mode",
              value: "dark",
              onClick: () => updateSelectedTheme(Theme.DARK),
            },
            {
              label: "Light Mode",
              value: "light",
              onClick: () => updateSelectedTheme(Theme.LIGHT),
            },
          ]}
        >
          <FlexBox $center="y">
            {selectedTheme === Theme.DARK ? <FiMoon /> : <FiSun />}
            <TextButton>
              <FlexBox $center="y">
                {selectedTheme === Theme.DARK ? "Dark" : "Light"} Mode{" "}
                <FiChevronDown />
              </FlexBox>
            </TextButton>
          </FlexBox>
        </Dropdown>
      </FlexBox>
    </FlexBox>
  );
};
