import { ReactElement, ReactNode } from "react";
import { FiMenu, FiPlus, FiShuffle } from "react-icons/fi";
import { FlexBox } from "../components/FlexBox";

const ManualSection = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}): ReactElement => {
  return (
    <FlexBox $direction="column" $gap="16px">
      <h2>{title}</h2>
      {children}
    </FlexBox>
  );
};

export const Manual = (): ReactElement => {
  return (
    <FlexBox $direction="column" $gap="32px">
      <ManualSection title="Build Your Own Playlist">
        <p>
          When visiting this website for the first time, you can find the{" "}
          <b>Build Your Playlist</b> button under the <b>My Playlist</b>{" "}
          section. Clicking this button opens a flyout panel from the right side
          of the screen, displaying a list of all available songs from the
          official MSR website. You can search for songs by name using the
          search bar at the top of the flyout. To add a song to your playlist,
          simply click on the song title. Added songs will be highlighted in
          green and will appear in your playlist on the left side of the screen.
        </p>
        <p>
          Clicking on the same song again will remove it from your playlist. You
          can also remove a song by clicking the <b>Remove</b> button next to it
          in your playlist.
        </p>
        <p>
          To reopen the flyout, click the <FiPlus /> next to the{" "}
          <b>My Playlist</b> section title.
        </p>
      </ManualSection>

      <ManualSection title="Not Sure What to Listen To?">
        <p>
          <b>Try a built-in playlist: </b>
          Click the <FiMenu /> next to the <b>My Playlist</b> section title and
          select <b>Use Recommendation</b>. This playlist features a selection
          of favorite songs curated by the website creator. The selection is
          subjective, so you may or may not enjoy it. Feel free to modify the
          list or click <b>Clear list</b> to start building your own.
        </p>

        <p>
          <b>Import other playlist: </b>
          To import a playlist, click the <FiMenu /> next to the{" "}
          <b>My Playlist</b> section title and select <b>Import a list</b>.
          Choose a JSON file previously exported from this website, click{" "}
          <b>Confirm</b>, and the playlist will be imported.
        </p>
      </ManualSection>

      <ManualSection title="Randomize your Playlist">
        <p>
          Listening to songs in the same order can get repetitive. To randomize
          your playlist, click the <FiShuffle /> next to the <b>My Playlist</b>{" "}
          section title. The songs in your playlist will be shuffled into a new
          random order.
        </p>
      </ManualSection>

      <ManualSection title="Share your Playlist">
        <p>
          To export and share your playlist, click the <FiMenu /> next to the{" "}
          <b>My Playlist</b> section title and select <b>Export my list</b>. A
          JSON file will be downloaded to your computer. This file can later be
          imported by clicking the same icon and choosing <b>Import a list</b>.
        </p>
      </ManualSection>

      <ManualSection title="Play your Playlist">
        <p>
          Once you’re happy with your playlist, click the <b>Play List</b>{" "}
          button on the right side of the screen. After playback begins, your
          playlist becomes locked and cannot be modified, all the buttons in the{" "}
          <b>My Playlist</b> section will be disabled. You can pause and resume
          the audio (note: it may take multiple clicks to pause), or click{" "}
          <b>Terminate</b> to stop playback. Once terminated, the next time you
          click <b>Play List</b>, playback will restart from the beginning.
        </p>
      </ManualSection>

      <ManualSection title="Theme">
        <p>
          This website supports both light and dark themes. You can switch
          between them using the theme selector on the right side of the
          navigation bar.
        </p>
      </ManualSection>
    </FlexBox>
  );
};
