'use client';

import { ReactElement } from "react";
import { FiMinus, FiPlus } from "react-icons/fi";
import styled from "styled-components";
import { FlexBox } from "../components/FlexBox";
import { Flyout } from "../components/Flyout";
import { usePlaylist } from "../SongContext";

const SongListItem = styled(FlexBox)<{$isInPlaylist: boolean}>`
    cursor: pointer;
    width: 100%;
    padding: 8px;
    border-radius: 4px;

    background-color: ${({ $isInPlaylist }) => ($isInPlaylist ? '#014848' : 'transparent')};

    &:hover {
        background-color: rgba(255, 255, 255, 0.3);
    }
`

export const SongList = (): ReactElement => {
    const { allSongs, allAlbums, myPlaylist, addToPlaylist, removeFromPlaylist } = usePlaylist();

    return allSongs && allAlbums ? (
        <Flyout title="Build Your Playlist">
            <FlexBox $gap="16px" $direction="column">
                {allSongs.map((song) => {
                    const isInPlaylist = myPlaylist.some((item) => item.cid === song.cid);

                    return (
                        <SongListItem 
                            $center="y" 
                            $gap="16px"
                            $isInPlaylist={isInPlaylist}
                            key={song.cid} 
                            onClick={() => {
                                if (isInPlaylist) {
                                    removeFromPlaylist(song.cid);
                                    return;
                                }

                                addToPlaylist(song.cid);
                            }}
                        >
                            {isInPlaylist ? <FiMinus /> : <FiPlus />}

                            <div>
                                <h3>{song.name}</h3>
                                <p>{allAlbums.find((album) => album.cid === song.albumCid)?.name}</p>
                            </div>
                        </SongListItem>
                    );
                })}
            </FlexBox>
        </Flyout>
    ) : (
        <p>Loading songs...</p>
    );
};