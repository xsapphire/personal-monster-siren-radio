"use client";

import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Theme, useTheme } from "../context/ThemeContext";
import { themeColors } from "../themeColors";

const DropdownContainer = styled.div`
  position: relative;
`;

const DropdownMenu = styled.div<{ $theme: Theme }>`
  position: absolute;
  right: 0;
  background-color: ${({ $theme }) => themeColors[$theme].secondaryBackground};
  width: max-content;
  border: ${({ $theme }) =>
    $theme === Theme.LIGHT
      ? `1px solid ${themeColors[$theme].border}`
      : "none"};
`;
const DropdownItem = styled.div<{ $theme: Theme }>`
  padding: 16px;
  color: ${({ $theme }) => themeColors[$theme].text};
  cursor: pointer;
  &:hover {
    background-color: ${({ $theme }) => themeColors[$theme].hover};
  }
  &:active {
    background-color: ${({ $theme }) => themeColors[$theme].accent};
  }
  &:focus {
    outline: 2px solid ${({ $theme }) => themeColors[$theme].accentHover};
  }
`;

export type DropdownItemType = {
  label: string;
  value: string;
  onClick: () => void;
};

export const Dropdown = ({
  options,
  children,
}: {
  options: DropdownItemType[];
  children?: React.ReactNode;
}) => {
  const dropdownMenuRef = useRef<HTMLDivElement>(null);
  const [openDropdown, setOpenDropdown] = useState(false);
  const { selectedTheme } = useTheme();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownMenuRef.current &&
        !dropdownMenuRef.current.contains(event.target as Node)
      ) {
        // Handle click outside
        setOpenDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <DropdownContainer ref={dropdownMenuRef}>
      <div onClick={() => setOpenDropdown((prev) => !prev)}>{children}</div>
      {openDropdown && (
        <DropdownMenu className="dropdown-content" $theme={selectedTheme}>
          {options.map((option, index) => (
            <DropdownItem
              $theme={selectedTheme}
              key={`${index}-${option.value}`}
              onClick={() => {
                option.onClick();
                setOpenDropdown(false);
              }}
            >
              {option.label}
            </DropdownItem>
          ))}
        </DropdownMenu>
      )}
    </DropdownContainer>
  );
};
