"use client";

import { ReactElement, useState } from "react";
import { FiMenu, FiPlus, FiShuffle, FiTrash } from "react-icons/fi";
import { IconButton, PrimaryButton } from "../components/Button";
import { Dropdown } from "../components/Dropdown";
import { FileSelector } from "../components/FileSelector";
import { FlexBox } from "../components/FlexBox";
import { Modal } from "../components/Modal";
import { Spinner } from "../components/Spinner";
import { useFileContext } from "../context/FileContext";
import { FlyoutType, useFlyout } from "../context/FlyoutContext";
import { usePlaylist } from "../context/SongContext";
import { useTheme } from "../context/ThemeContext";
import { themeColors } from "../themeColors";

export const MyPlayList = (): ReactElement => {
  const {
    allSongs,
    myPlaylist,
    removeFromPlaylist,
    shufflePlaylist,
    clearPlaylist,
    updateTheWholePlaylist,
    playingIndex,
    isLoading,
  } = usePlaylist();

  const { openFlyout } = useFlyout();
  const { importedList, clearSelection } = useFileContext();

  const { selectedTheme } = useTheme();
  const [openModal, setOpenModal] = useState<boolean>(false);

  const exportPlaylist = () => {
    const element = document.createElement("a");
    const textFile = new Blob([JSON.stringify(myPlaylist)], {
      type: "text/plain",
    });
    element.href = URL.createObjectURL(textFile);
    element.download = "myplaylist.json";
    document.body.appendChild(element);
    element.click();
  };

  if (isLoading) {
    return (
      <FlexBox
        $center="xy"
        style={{ width: "50%", height: "calc(100vh - 50px)" }}
      >
        <Spinner />
        <p>Loading song data...</p>
      </FlexBox>
    );
  }

  return (
    <div
      style={{ width: "50%", padding: "16px", height: "calc(100vh - 50px)" }}
    >
      {openModal && (
        <Modal
          title="Import Playlist"
          onClose={() => setOpenModal(false)}
          onConfirm={() => {
            updateTheWholePlaylist(importedList);
            setOpenModal(false);
            clearSelection();
          }}
        >
          <FileSelector />
        </Modal>
      )}
      <FlexBox $spaceBetween $center="y" style={{ padding: "32px 16px" }}>
        <h2>My Playlist</h2>
        <FlexBox>
          <IconButton
            disabled={playingIndex > 0}
            onClick={() => openFlyout(FlyoutType.SONG_LIST)}
            icon={<FiPlus />}
          />
          <IconButton
            disabled={playingIndex > 0}
            onClick={shufflePlaylist}
            icon={<FiShuffle />}
          />
          <Dropdown
            options={[
              {
                label: "Import a list",
                value: "import",
                onClick: () => {
                  setOpenModal(true);
                },
              },
              {
                label: "Export my list",
                value: "export",
                onClick: () => exportPlaylist(),
              },
              {
                label: "Clear list",
                value: "clear",
                onClick: () => {
                  clearPlaylist();
                  updateTheWholePlaylist([]);
                },
              },
              {
                label: "Use recommendation",
                value: "recommend",
                onClick: async () => {
                  const recommendedList = await fetch("/recommend.json");
                  const recommendedData = await recommendedList.json();
                  updateTheWholePlaylist(recommendedData);
                },
              },
            ]}
          >
            <IconButton icon={<FiMenu />} disabled={playingIndex > 0} />
          </Dropdown>
        </FlexBox>
      </FlexBox>

      {myPlaylist.length > 0 ? (
        <FlexBox
          $center="y"
          $direction="column"
          style={{
            padding: "16px",
            height: "calc(100% - 104px)",
            overflowY: "auto",
          }}
        >
          {myPlaylist.map((playlistItem, index) => {
            const songName = allSongs?.find(
              (song) => song.cid === playlistItem.cid
            )?.name;

            return (
              <FlexBox
                style={{
                  width: "100%",
                  padding: "8px 16px",
                  border: `1px solid ${themeColors[selectedTheme].border}`,
                  borderRadius: "4px",
                  backgroundColor:
                    index === playingIndex - 1
                      ? themeColors[selectedTheme].active
                      : "transparent",
                }}
                $center="y"
                $spaceBetween
                key={playlistItem.cid}
              >
                <p style={{ fontWeight: "bold" }}>{songName}</p>
                <IconButton
                  disabled={playingIndex > 0}
                  onClick={() => removeFromPlaylist(playlistItem.cid)}
                  icon={<FiTrash />}
                  title="Remove"
                  style={{ maxWidth: "100px" }}
                />
              </FlexBox>
            );
          })}
        </FlexBox>
      ) : (
        <FlexBox $center="xy" $direction="column" style={{ padding: "16px" }}>
          <p>No saved playlist found.</p>
          <PrimaryButton onClick={() => openFlyout(FlyoutType.SONG_LIST)}>
            Build Your Playlist
          </PrimaryButton>
        </FlexBox>
      )}
    </div>
  );
};
