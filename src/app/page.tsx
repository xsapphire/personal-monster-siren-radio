"use client";

import { ReactElement } from "react";
import { FlexBox } from "./components/FlexBox";
import { FileProvider } from "./context/FileContext";
import { FlyoutProvider } from "./context/FlyoutContext";
import { SongContextProvider } from "./context/SongContext";
import { ThemeContextProvider, useTheme } from "./context/ThemeContext";
import { MyPlayList } from "./module/MyPlayList";
import { NavBar } from "./module/NavBar";
import { Player } from "./module/Player";
import styles from "./page.module.css";
import { themeColors } from "./themeColors";

const Main = (): ReactElement => {
  const { selectedTheme } = useTheme();

  return (
    <SongContextProvider>
      <FlyoutProvider>
        <div
          style={{
            color: themeColors[selectedTheme].text,
            backgroundColor: themeColors[selectedTheme].primaryBackground,
            height: "100vh",
          }}
        >
          <NavBar />

          <main className={styles.main}>
            <FileProvider>
              <FlexBox style={{ width: "100%" }}>
                <MyPlayList />
                <Player />
              </FlexBox>
            </FileProvider>
          </main>
        </div>
      </FlyoutProvider>
    </SongContextProvider>
  );
};

export default function Home() {
  return (
    <ThemeContextProvider>
      <Main />
    </ThemeContextProvider>
  );
}
