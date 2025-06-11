'use client';

import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const DropdownContainer = styled.div`
    position: relative;
`

const DropdownMenu = styled.div`
    position: absolute;
    right: 0;
    background-color: #323232;
    width: max-content;
`
const DropdownItem = styled.div`
    padding: 16px;
    color: #fff;
    cursor: pointer;
    &:hover {
        background-color: rgba(255, 255, 255, 0.3);
    }
    &:active {
        background-color: rgba(255, 255, 255, 0.2);
    }
    &:focus {
        outline: 2px solid #014848;
    }
`

export type DropdownItemType = {
    label: string;
    value: string;
    onClick: () => void;
}

export const Dropdown = ({
    options,
    children,
}: {
    options: DropdownItemType[],
    children?: React.ReactNode;
}) => {
    const dropdownMenuRef = useRef<HTMLDivElement>(null);
    const [openDropdown, setOpenDropdown] = useState(false);

    useEffect(() => {
       function handleClickOutside(event: MouseEvent) {
         if (dropdownMenuRef.current && !dropdownMenuRef.current.contains(event.target as Node)) {
           // Handle click outside
           setOpenDropdown(false);
         }
       }
       document.addEventListener('mousedown', handleClickOutside);
       return () => {
         document.removeEventListener('mousedown', handleClickOutside);
       };
     }, []);


    return (
        
        <DropdownContainer ref={dropdownMenuRef}>
            <div onClick={() => setOpenDropdown(prev => !prev)}>{children}</div>
            {openDropdown && (<DropdownMenu className="dropdown-content">
                {options.map((option, index) => (
                    <DropdownItem key={`${index}-${option.value}`} onClick={option.onClick}>{option.label}</DropdownItem>
                ))}
            </DropdownMenu>)}
        </DropdownContainer>
    );
}