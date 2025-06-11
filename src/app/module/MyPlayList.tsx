'use client';

import { ReactElement, useState } from "react";
import { FiMenu, FiPlus, FiShuffle, FiTrash } from "react-icons/fi";
import { IconButton, PrimaryButton } from "../components/Button";
import { Dropdown } from "../components/Dropdown";
import { FlexBox } from "../components/FlexBox";
import { usePlaylist } from "../SongContext";
import { MyPlayListItem } from "../type";

export const MyPlayList = (): ReactElement => {
    const {
        allSongs,
        myPlaylist,
        removeFromPlaylist,
        shufflePlaylist,
        toggleConfigPlaylistModal,
        clearPlaylist,
    } = usePlaylist();

    const exportPlaylist = () => {
        const element = document.createElement("a");
        const textFile = new Blob([JSON.stringify(myPlaylist)], {type: 'text/plain'});
        element.href = URL.createObjectURL(textFile);
        element.download = "myplaylist.json";
        document.body.appendChild(element); 
        element.click();
    }

    const [_myPlaylist, _setMyPlaylist] = useState<MyPlayListItem[]>(myPlaylist);


    return (
        <div style={{ width: "50%", padding: "16px" }}>
            <FlexBox $spaceBetween $center="y" style={{ padding: "32px 16px" }}>
                <h2>My Playlist</h2>
                <FlexBox>
                    <IconButton onClick={toggleConfigPlaylistModal} icon={<FiPlus />} />
                    <IconButton onClick={shufflePlaylist} icon={<FiShuffle />}/>
                    <Dropdown 
                        options={[
                            {label: 'Import a list', value: 'import', onClick: () => console.log('Import a list clicked')},
                            {label: 'Export my list', value: 'export', onClick: () => exportPlaylist()},
                            {label: 'Clear list', value: 'clear', onClick: () => {
                                clearPlaylist();
                                _setMyPlaylist([]);
                            }},
                            {label: 'Use recommendation', value: 'recommend', onClick: async () => {
                                const recommendedList = await fetch('/recommend.json');
                                const recommendedData = await recommendedList.json();
                                _setMyPlaylist(recommendedData);
                            }},
                        ]}
                    >
                        <IconButton icon={<FiMenu />}/>
                    </Dropdown>
                </FlexBox>
                
            </FlexBox>

            {_myPlaylist.length > 0 ? (
                <FlexBox
                    $center="y"
                    $direction="column"
                    style={{ padding: "16px" }}
                >
                    {_myPlaylist.map((playlistItem) => {
                        const songName = allSongs?.find(
                            (song) => song.cid === playlistItem.cid
                        )?.name;

                        return (
                            <FlexBox
                                style={{
                                    width: "100%",
                                    padding: "8px 16px",
                                    border: "1px solid #fff",
                                    borderRadius: "4px",
                                }}
                                $center="y"
                                $spaceBetween
                                key={playlistItem.cid}
                            >
                                <p style={{ fontWeight: "bold" }}>{songName}</p>
                                
                                <IconButton 
                                    onClick={() =>
                                        removeFromPlaylist(playlistItem.cid)
                                    }
                                    icon={<FiTrash />}
                                    title="Remove"
                                    style={{ maxWidth: '100px'}}
                                />
                            </FlexBox>
                        );
                    })}
                </FlexBox>
            ) : (
                <FlexBox
                    $center="xy"
                    $direction="column"
                    style={{ padding: "16px" }}
                >
                    <p>No saved playlist found.</p>
                    <PrimaryButton onClick={toggleConfigPlaylistModal}>
                        Build Your Playlist
                    </PrimaryButton>
                </FlexBox>
            )}
        </div>
    );
};