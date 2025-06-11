'use client';
import styled from "styled-components";

export const FlexBox = styled.div<{
    $direction?: "row" | "column";
    $gap?: string;
    $center?: 'x' | 'y' | 'xy';
    $spaceBetween?: boolean;
}>`
    display: flex;
    flex-direction: ${({$direction}) => $direction || "row"}; 
    gap: ${({$gap}) => $gap || "8px"};
    align-items: ${({$center}) => $center === 'y' || $center === 'xy' ? 'center' : 'flex-start'};
    justify-content: ${({$center, $spaceBetween}) => $center === 'x' || $center === 'xy' ? 'center' : $spaceBetween ? 'space-between' : 'flex-start'};
`