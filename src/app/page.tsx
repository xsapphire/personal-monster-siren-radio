import { FlexBox } from "./components/FlexBox";
import { MyPlayList } from "./module/MyPlayList";
import { Player } from "./module/Player";
import { SongList } from "./module/SongList";
import styles from "./page.module.css";
import { SongContextProvider } from "./SongContext";

export default function Home() {
  return (
    <div className={styles.page}>
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
}
