"use client";
import Image from "next/image";
import { ReactElement, useEffect, useRef, useState } from "react";
import { FiMusic, FiPause, FiPlay, FiStopCircle } from "react-icons/fi";
import { IconButton, PrimaryButton } from "../components/Button";
import { FlexBox } from "../components/FlexBox";
import { Spinner } from "../components/Spinner";
import { usePlaylist } from "../context/SongContext";

export const Player = (): ReactElement => {
  const { allSongs, allAlbums, myPlaylist, playingIndex, setPlayingIndex } =
    usePlaylist();

  const [isFetchingSong, setIsFetchingSong] = useState<boolean>(false);
  const [curAudioSrc, setCurAudioSrc] = useState<string>("");
  const [albumCoverUrl, setAlbumCoverUrl] = useState<string>("");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [hasPaused, setHasPaused] = useState<boolean>(false);

  useEffect(() => {
    const fetchSongDetail = async () => {
      setIsFetchingSong(true);
      const songDetail = await fetch(
        `/api/song/${myPlaylist[playingIndex - 1].cid}`
      );
      const detail = await songDetail.json();

      setAlbumCoverUrl(
        allAlbums?.find((album) => album.cid === detail.albumCid)?.coverUrl ||
          ""
      );
      setCurAudioSrc(detail.sourceUrl);
      setIsFetchingSong(false);
    };

    if (playingIndex > 0) {
      fetchSongDetail();
    }
  }, [playingIndex]);

  useEffect(() => {
    console.log("Current audio source changed:", curAudioSrc);
    console.log("Audio ref:", audioRef.current);
    if (audioRef.current && curAudioSrc) {
      audioRef.current.play();
    }
  }, [audioRef.current, curAudioSrc]);

  return (
    <FlexBox
      style={{ width: "50%", height: "100%" }}
      $center="xy"
      $direction="column"
    >
      <h2 style={{ padding: "16px 32px" }}>Now Playing</h2>

      {isFetchingSong ? (
        <FlexBox $center="xy" style={{ height: "100px" }}>
          <Spinner />
          <p>Fetching song...</p>
        </FlexBox>
      ) : albumCoverUrl ? (
        <Image alt="cover" src={albumCoverUrl} width={300} height={300} />
      ) : null}

      <h3 style={{ marginTop: "8px" }}>
        {playingIndex > 0
          ? allSongs?.find(
              (song: { cid: string; name: string }) =>
                song.cid === myPlaylist[playingIndex - 1].cid
            )?.name
          : "None"}
      </h3>

      {curAudioSrc && (
        <audio
          ref={audioRef}
          src={curAudioSrc}
          onEnded={() => {
            if (playingIndex === myPlaylist.length) {
              console.log("No more songs to play");
              return;
            }

            console.log("Song ended");
            audioRef.current?.pause();
            setPlayingIndex((prevIndex) => prevIndex + 1);
          }}
        />
      )}

      <FlexBox $spaceBetween style={{ marginTop: "16px" }}>
        {playingIndex === 0 && (
          <PrimaryButton
            onClick={() => {
              setPlayingIndex(1);
            }}
            disabled={playingIndex > 0}
          >
            <FlexBox $center="y">
              <FiMusic /> Play Music
            </FlexBox>
          </PrimaryButton>
        )}

        {playingIndex > 0 && (
          <>
            <IconButton
              onClick={() => {
                if (hasPaused) {
                  audioRef.current?.play();
                  setHasPaused(false);
                  return;
                }

                audioRef.current?.pause();
                setHasPaused(true);
              }}
              icon={hasPaused ? <FiPlay /> : <FiPause />}
              title={hasPaused ? "Resume" : "Pause"}
            />

            <IconButton
              onClick={() => {
                setPlayingIndex(0);
                setCurAudioSrc("");
                setAlbumCoverUrl("");
              }}
              icon={<FiStopCircle />}
              title="Terminate"
            />
          </>
        )}
      </FlexBox>
    </FlexBox>
  );
};
