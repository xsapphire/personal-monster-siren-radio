import styled, { keyframes } from "styled-components";
import { Theme, useTheme } from "../context/ThemeContext";
import { themeColors } from "../themeColors";

const SpinAnimation = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
`;

const StyledSpinner = styled.div<{ $theme: Theme }>`
  border: 8px solid ${({ $theme }) => themeColors[$theme].accent};
  border-top: 8px solid ${({ $theme }) => themeColors[$theme].primaryBackground};
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: ${SpinAnimation} 1s linear infinite;
`;

export const Spinner = () => {
  const { selectedTheme } = useTheme();
  return <StyledSpinner $theme={selectedTheme} />;
};
