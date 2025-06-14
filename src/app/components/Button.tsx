"use client";
import { ButtonHTMLAttributes, ReactElement, ReactNode } from "react";
import styled from "styled-components";
import { Theme, useTheme } from "../context/ThemeContext";
import { themeColors } from "../themeColors";

const StyledTextButton = styled.button<{ $theme: Theme }>`
  background: none;
  border: none;
  color: ${({ $theme }) => themeColors[$theme].text};
  font: inherit;
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;

  &:hover {
    background-color: ${({ $theme }) => themeColors[$theme].hover};
  }

  &:focus {
    outline: 2px solid ${({ $theme }) => themeColors[$theme].accent};
  }
`;

export const TextButton = ({
  children,
  ...rest
}: {
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>): ReactElement => {
  const { selectedTheme } = useTheme();
  return (
    <StyledTextButton $theme={selectedTheme} {...rest}>
      {children}
    </StyledTextButton>
  );
};

const StyledPrimaryButton = styled.button<{ $theme: Theme }>`
  background: ${({ $theme }) => themeColors[$theme].accent};
  border: none;
  color: white;
  font: inherit;
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;

  &:hover {
    background-color: ${({ $theme }) => themeColors[$theme].accentHover};
  }

  &:focus {
    outline: 2px solid ${({ $theme }) => themeColors[$theme].accent};
  }
`;

export const PrimaryButton = ({
  children,
  ...rest
}: {
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>): ReactElement => {
  const { selectedTheme } = useTheme();
  return (
    <StyledPrimaryButton $theme={selectedTheme} {...rest}>
      {children}
    </StyledPrimaryButton>
  );
};

const StyledIconButton = styled.button<{
  $hasTitle: boolean;
  $theme: Theme;
  disabled?: boolean;
}>`
  background: none;
  border: none;
  color: ${({ $theme, disabled }) =>
    disabled ? themeColors[$theme].disabled : themeColors[$theme].icon};
  font: inherit;
  cursor: pointer;
  border-radius: ${({ $hasTitle }) => ($hasTitle ? "4px" : "999px")};
  font-size: 24px;
  width: ${({ $hasTitle }) => ($hasTitle ? "inherit" : "40px")};
  height: ${({ $hasTitle }) => ($hasTitle ? "inherit" : "40px")};
  padding: ${({ $hasTitle }) => ($hasTitle ? "8px" : "0")};

  &:hover {
    background-color: ${({ $theme, disabled }) =>
      disabled ? "transparent" : themeColors[$theme].hover};
  }

  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ $hasTitle }) => ($hasTitle ? "8px" : "0")};
`;

export const IconButton = ({
  title,
  icon,
  ...rest
}: {
  title?: string;
  icon: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>): ReactElement => {
  const { selectedTheme } = useTheme();
  return (
    <StyledIconButton $theme={selectedTheme} $hasTitle={!!title} {...rest}>
      {icon}
      <span
        style={{
          fontSize: "16px",
          color: rest.disabled
            ? themeColors[selectedTheme].disabled
            : themeColors[selectedTheme].text,
        }}
      >
        {title}
      </span>
    </StyledIconButton>
  );
};
