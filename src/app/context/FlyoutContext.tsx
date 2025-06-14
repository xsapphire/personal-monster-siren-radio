import React, { createContext, ReactNode, useContext, useState } from "react";
import { Flyout } from "../components/Flyout";
import { About } from "../module/About";
import { Manual } from "../module/Manual";
import { SongList } from "../module/SongList";

export enum FlyoutType {
  SONG_LIST = "songlist",
  MANUAL = "manual",
  ABOUT = "about",
}

type FlyoutContextType = {
  openFlyout: (type: FlyoutType) => void;

  flyoutIsOpen: boolean;
  closeFlyout: () => void;
  flyoutTitle: string;
};

const FlyoutContext = createContext<FlyoutContextType | undefined>(undefined);

const getFlyoutTitle = (type: FlyoutType): string => {
  switch (type) {
    case FlyoutType.SONG_LIST:
      return "Build Your Playlist";
    case FlyoutType.MANUAL:
      return "How to Use";
    case FlyoutType.ABOUT:
      return "About";
    default:
      return "";
  }
};

export const FlyoutProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [openType, setOpenType] = useState<FlyoutType | null>(null);
  const [flyoutIsOpen, setFlyoutIsOpen] = useState<boolean>(false);
  const [flyoutTitle, setFlyoutTitle] = useState<string>("");

  const openFlyout = (type: FlyoutType) => {
    setOpenType(type);
    setFlyoutTitle(getFlyoutTitle(type));
    setFlyoutIsOpen(true);
  };

  const closeFlyout = () => {
    setOpenType(null);
    setFlyoutTitle("");
    setFlyoutIsOpen(false);
  };

  return (
    <FlyoutContext.Provider
      value={{ openFlyout, flyoutIsOpen, closeFlyout, flyoutTitle }}
    >
      {openType && (
        <Flyout>
          {openType === FlyoutType.SONG_LIST && <SongList />}
          {openType === FlyoutType.MANUAL && <Manual />}
          {openType === FlyoutType.ABOUT && <About />}
        </Flyout>
      )}
      {children}
    </FlyoutContext.Provider>
  );
};

export const useFlyout = (): FlyoutContextType => {
  const context = useContext(FlyoutContext);
  if (!context) {
    throw new Error("useFlyout must be used within a FlyoutProvider");
  }
  return context;
};
