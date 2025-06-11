'use client'
import { ReactElement, ReactNode } from "react";
import { FiX } from "react-icons/fi";
import styled from "styled-components";
import { usePlaylist } from "../SongContext";
import { TextButton } from "./Button";
import { FlexBox } from "./FlexBox";

type FlyoutProps = {
    children: ReactNode;
    title: string;
};

const FlyoutPanel = styled.div`
    position: fixed;
    top: 0;
    right: 0;        
    min-width: 40%;
    height: 100%;
    background-color: #323232;
`

export const Flyout = ({
    children,
    title,
}: FlyoutProps): ReactElement | null => {
    const {configPlaylistOpen, toggleConfigPlaylistModal} = usePlaylist();

    if(!configPlaylistOpen) {
        return null;
    }

    return (
        <FlyoutPanel>
            <FlexBox $center='y' $spaceBetween style={{ padding: '32px 16px' }}>
                <h2>{title}</h2>
                <TextButton onClick={toggleConfigPlaylistModal}><FlexBox $center='y'><FiX /> Close</FlexBox></TextButton>
            </FlexBox>
            <div style={{overflow: 'scroll', height: '100%', padding: '16px'}}>{children}</div>
        </FlyoutPanel>
    );
}       