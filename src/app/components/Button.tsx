import { ButtonHTMLAttributes, ReactElement, ReactNode } from "react";
import styled from "styled-components";

export const TextButton = styled.button`
    background: none;
    border: none;
    color: white;
    font: inherit;
    cursor: pointer;
    padding: 8px;
    border-radius: 4px;

    &:hover {
        background-color: rgba(255, 255, 255, 0.3);
    }

    &:focus {
        outline: 2px solid #014848;
    }
`

export const PrimaryButton = styled.button`
    background: #016764;
    border: none;
    color: white;
    font: inherit;
    cursor: pointer;
    padding: 8px;
    border-radius: 4px;

    &:hover {
        background-color: #005958;
    }

    &:focus {
        outline: 2px solid #014848;
    }
`

export const StyledIconButton = styled.button<{$hasTitle: boolean}>`
    background: none;
    border: none;
    color: white;
    font: inherit;
    cursor: pointer;
    border-radius: ${({$hasTitle}) => $hasTitle ? '4px' : '999px'};
    font-size: 24px;
    width: ${({$hasTitle}) => $hasTitle ? 'inherit' : '40px'};
    height: ${({$hasTitle}) => $hasTitle ? 'inherit' : '40px'};
    padding: ${({$hasTitle}) => $hasTitle ? '8px' : '0'};

    &:hover {
        background-color: rgba(255, 255, 255, 0.3);
    }

    display: flex;
    align-items: center;
    justify-content: center;
    gap: ${({$hasTitle}) => $hasTitle ? '8px' : '0'};
`

export const IconButton = ({
    title,
    icon,
    ...rest
}: {
    title?: string;
    icon: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>): ReactElement => {
    return (
        <StyledIconButton $hasTitle={!!title} {...rest}>
            {icon}
            <span style={{ fontSize: '16px' }}>{title}</span>
        </StyledIconButton>
    );
};
