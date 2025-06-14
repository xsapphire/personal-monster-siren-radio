"use client";
import { ReactElement } from "react";
import { FiSearch } from "react-icons/fi";
import styled from "styled-components";
import { Theme, useTheme } from "../context/ThemeContext";
import { themeColors } from "../themeColors";
import { FlexBox } from "./FlexBox";

const SearchBar = styled.input<{ $theme: Theme }>`
  width: 100%;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid ${({ $theme }) => themeColors[$theme].border};
  flex: 1;
  font-size: 16px;
  background-color: ${({ $theme }) => themeColors[$theme].primaryBackground};
  color: ${({ $theme }) => themeColors[$theme].text};
`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function debounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  return (...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      func(...args);
      timeoutId = undefined;
    }, delay);
  };
}

export const Search = ({
  setSearchedText,
  placeholderText,
}: {
  setSearchedText: (text: string) => void;
  placeholderText: string;
}): ReactElement => {
  const { selectedTheme } = useTheme();

  const debouncedSearch = debounce(setSearchedText, 300);

  return (
    <FlexBox $center="y" style={{ width: "100%" }}>
      <FiSearch />
      <SearchBar
        type="text"
        placeholder={placeholderText}
        $theme={selectedTheme}
        onChange={(e) => {
          const searchTerm = e.target.value.toLowerCase();
          debouncedSearch(searchTerm);
        }}
      />
    </FlexBox>
  );
};
