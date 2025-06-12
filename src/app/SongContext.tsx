"use client";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { AlbumListItem, SongListItem } from "./type";

const LOCAL_STORAGE_KEY = "custonm-arknights-playlist";

export type MyPlayListItem = {
  cid: string;
  createDateTime: Date;
};

type SongContextType = {
  allSongs: SongListItem[];
  allAlbums: AlbumListItem[];
  myPlaylist: MyPlayListItem[];

  addToPlaylist: (cid: string) => void;
  removeFromPlaylist: (cid: string) => void;
  shufflePlaylist: () => void;

  clearPlaylist: () => void;
  updateTheWholePlaylist: (newPlaylist: MyPlayListItem[]) => void;

  configPlaylistOpen: boolean;
  toggleConfigPlaylistModal: () => void;
};

const SongContext = createContext<SongContextType | null>(null);

export const SongContextProvider = ({ children }: { children: ReactNode }) => {
  const [playlist, setPlaylist] = useState<MyPlayListItem[]>([]);
  const [configPlaylistOpen, setConfigPlaylistOpen] = useState<boolean>(false);

  const [allSongs, setAllSongs] = useState<SongListItem[]>([]);
  const [allAlbums, setAllAlbums] = useState<AlbumListItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/list");
      const data = await response.json();
      setAllSongs(data.songs);
      setAllAlbums(data.albums);
    };
    fetchData();
  }, []);

  useEffect(() => {
    fetchSavedPlaylist();
  }, []);

  useEffect(() => {
    if (playlist.length > 0) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(playlist));
      return;
    }

    clearPlaylist();
  }, [playlist]);

  const fetchSavedPlaylist = () => {
    const savedPlaylist = localStorage.getItem(LOCAL_STORAGE_KEY);
    setPlaylist(JSON.parse(savedPlaylist || "[]"));
  };

  const clearPlaylist = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  };

  const addToPlaylist = (cid: string) => {
    setPlaylist((prev) => [...prev, { cid, createDateTime: new Date() }]);
  };

  const removeFromPlaylist = (cid: string) => {
    setPlaylist((prev) => prev.filter((item) => item.cid !== cid));
  };

  const shufflePlaylist = () => {
    setPlaylist((prev) => {
      const shuffled = [...prev].sort(() => Math.random() - 0.5);
      return shuffled;
    });
  };

  const toggleConfigPlaylistModal = () => {
    setConfigPlaylistOpen((prev) => !prev);
  };

  const updateTheWholePlaylist = (newPlaylist: MyPlayListItem[]) => {
    setPlaylist(newPlaylist);
  };

  return (
    <SongContext.Provider
      value={{
        allSongs,
        allAlbums,
        myPlaylist: playlist,
        addToPlaylist,
        removeFromPlaylist,
        shufflePlaylist,
        clearPlaylist,
        updateTheWholePlaylist,
        configPlaylistOpen,
        toggleConfigPlaylistModal,
      }}
    >
      {children}
    </SongContext.Provider>
  );
};

export const usePlaylist = () => {
  const context = useContext(SongContext);
  if (!context) {
    throw new Error("usePlaylist must be used within a SongContextProvider");
  }
  return context;
};
