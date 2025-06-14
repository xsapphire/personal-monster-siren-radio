"use client";

import { ReactElement, useEffect, useState } from "react";
import { FiMinus, FiPlus } from "react-icons/fi";
import styled from "styled-components";
import { FlexBox } from "../components/FlexBox";
import { Search } from "../components/Searchbar";
import { usePlaylist } from "../context/SongContext";
import { Theme, useTheme } from "../context/ThemeContext";
import { themeColors } from "../themeColors";

const SongListItem = styled(FlexBox)<{ $isInPlaylist: boolean; $theme: Theme }>`
  cursor: pointer;
  width: 100%;
  padding: 8px;
  border-radius: 4px;

  background-color: ${({ $isInPlaylist, $theme }) =>
    $isInPlaylist ? themeColors[$theme].active : "transparent"};

  &:hover {
    background-color: ${({ $theme }) => themeColors[$theme].hover};
  }
`;

export const SongList = (): ReactElement => {
  const { allSongs, allAlbums, myPlaylist, addToPlaylist, removeFromPlaylist } =
    usePlaylist();
  const { selectedTheme } = useTheme();

  const [searchedText, setSearchedText] = useState<string>("");

  const [songList, setSongList] = useState(allSongs);

  useEffect(() => {
    console.log("searchedText changed:", searchedText);
    if (searchedText.trim() === "") {
      setSongList(allSongs);
      return;
    }

    const filteredSongs = allSongs.filter((song) =>
      song.name.toLowerCase().includes(searchedText)
    );

    console.log("Filtered songs:", filteredSongs);

    setSongList(filteredSongs);
  }, [searchedText, allSongs, allAlbums]);

  return allSongs && allAlbums ? (
    <FlexBox $gap="16px" $direction="column">
      <Search
        setSearchedText={setSearchedText}
        placeholderText="Search songs by name"
      />

      {songList.map((song) => {
        const isInPlaylist = myPlaylist.some((item) => item.cid === song.cid);

        return (
          <SongListItem
            $theme={selectedTheme}
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
              <p>
                {allAlbums.find((album) => album.cid === song.albumCid)?.name}
              </p>
            </div>
          </SongListItem>
        );
      })}
    </FlexBox>
  ) : (
    <p>Loading songs...</p>
  );
};
