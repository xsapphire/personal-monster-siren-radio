"use client";

import { ReactElement } from "react";
import { FlexBox } from "./components/FlexBox";
import { SongContextProvider } from "./context/SongContext";
import { ThemeContextProvider, useTheme } from "./context/ThemeContext";
import { MyPlayList } from "./module/MyPlayList";
import { NavBar } from "./module/NavBar";
import { Player } from "./module/Player";
import { SongList } from "./module/SongList";
import styles from "./page.module.css";
import { themeColors } from "./themeColors";

const Main = (): ReactElement => {
  const { selectedTheme } = useTheme();

  return (
    <div
      style={{
        color: themeColors[selectedTheme].text,
        backgroundColor: themeColors[selectedTheme].primaryBackground,
        height: "100vh",
      }}
    >
      <NavBar />

      <main className={styles.main}>
        <SongContextProvider>
          <FlexBox style={{ width: "100%" }}>
            <MyPlayList />
            <Player />
          </FlexBox>

          <SongList />
        </SongContextProvider>
      </main>
    </div>
  );
};

export default function Home() {
  return (
    <ThemeContextProvider>
      <Main />
    </ThemeContextProvider>
  );
}
