"use client";
import Image from "next/image";
import { ReactElement, useEffect, useRef, useState } from "react";
import { FiAirplay, FiPause, FiPlay, FiRewind } from "react-icons/fi";
import { usePlaylist } from "../SongContext";
import { IconButton } from "../components/Button";
import { FlexBox } from "../components/FlexBox";

export const Player = (): ReactElement => {
  const { allSongs, allAlbums, myPlaylist } = usePlaylist();

  const [playingIndex, setPlayingIndex] = useState<number>(0);
  const [curAudioSrc, setCurAudioSrc] = useState<string>("");
  const [albumCoverUrl, setAlbumCoverUrl] = useState<string>("");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [hasPaused, setHasPaused] = useState<boolean>(false);

  useEffect(() => {
    const fetchSongDetail = async () => {
      const songDetail = await fetch(
        `/api/song/${myPlaylist[playingIndex - 1].cid}`
      );
      const detail = await songDetail.json();

      setAlbumCoverUrl(
        allAlbums?.find((album) => album.cid === detail.albumCid)?.coverUrl ||
          ""
      );
      setCurAudioSrc(detail.sourceUrl);
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
    <div style={{ width: "50%" }}>
      <h2 style={{ padding: "16px 32px" }}>Now Playing</h2>
      <FlexBox style={{ padding: "16px" }} $center="xy" $direction="column">
        {albumCoverUrl ? (
          <Image
            alt="cover"
            src={albumCoverUrl}
            width={300}
            height={300}
          ></Image>
        ) : null}
        <h3>
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

        <FlexBox $spaceBetween>
          <IconButton
            onClick={() => {
              setPlayingIndex(1);
            }}
            disabled={playingIndex > 0}
            icon={<FiAirplay />}
            title="Play List"
          />

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
            }}
            icon={<FiRewind />}
            title="Start Over"
          />
        </FlexBox>
      </FlexBox>
    </div>
  );
};
