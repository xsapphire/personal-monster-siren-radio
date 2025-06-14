import { ReactElement } from "react";
import styled from "styled-components";
import { FlexBox } from "../components/FlexBox";
import { themeColors } from "../themeColors";

const Link = styled.a`
  color: ${themeColors.light.accent};
  text-decoration: underline;
`;

export const About = (): ReactElement => {
  return (
    <FlexBox $direction="column" $gap="16px">
      <p>
        <b>Monster Siren Records (MSR)</b>, commonly known as{" "}
        <b>Monster Siren</b> or simply <b>Siren</b>, is a record label within
        the world of the game <i>Arknights</i>.
      </p>
      <p>
        The game’s developer, <b>Hypergryph</b>, releases all music created for{" "}
        <i>Arknights</i> under the <b>Monster Siren Records</b> label. They have
        also launched an official <b>MSR</b> website, where many Arknights
        tracks, both from past and upcoming events, are available for streaming.
      </p>
      <p>
        However, as a loyal <i>Arknights</i> player living overseas, I find the
        official website incredibly inconvenient for listening to the music I
        enjoy. As a user, I can either listen to the tracks sequentially from
        newest to oldest, or manually navigate into each album to play a
        specific track.
      </p>
      <p>
        I want to listen to music I like while I work. I want the tracks I like
        to play continuously without needing to click or interact during my
        tasks. I also do not want to be interrupted by ads on YouTube.
      </p>
      <p>
        <b>That’s why I created this website.</b>
      </p>
      <p>
        It’s designed to be simple, like a radio, but with customizable
        playlists, providing a unique and seamless listening experience.
      </p>
      <p>
        This is a free, non-profit website for all <i>Arknights</i> players, and
        even for non-players who are simply interested in the game’s diverse and
        versatile music. I’d like to thank <b>Hypergryph</b> for open-sourcing
        the song data and making this project possible.
      </p>

      <h2 style={{ marginTop: "32px" }}>Website Author</h2>
      <p>
        <b>Arknights Uid (Bilibili Server) 714904592</b>
      </p>
      <i>
        Made by <b>Next.js</b> and hosted on <b>Vercel</b>
        <br />
        Data fetched from{" "}
        <Link href="https://monster-siren.hypergryph.com/">
          Monster Siren official website
        </Link>
      </i>
    </FlexBox>
  );
};
