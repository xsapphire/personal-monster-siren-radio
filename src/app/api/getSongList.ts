import { AlbumListItem, Song, SongListItem } from "../type";

const songListUrl = "https://monster-siren.hypergryph.com/api/songs";
const songUrl = "https://monster-siren.hypergryph.com/api/song/";
const albumsUrl = "https://monster-siren.hypergryph.com/api/albums/";

export const getSongList = async (): Promise<SongListItem[] | null> => {
    const response = await fetch(songListUrl);
    const songListJson = await response.json();
    if (!response.ok || !songListJson.data) {
        console.error("Failed to fetch song list");
        return null;
    }
    return songListJson.data.list;
}

export const getSong = async (cid: string): Promise<Song | null> => {
    const response = await fetch(songUrl + cid);
    if (!response.ok) {
        console.error("Failed to fetch song");
        return null;
    }
    const songJson = await response.json();
    return songJson.data;
}

export const getAlbums = async (): Promise<AlbumListItem[] | null> => {
    const response = await fetch(albumsUrl);
    if (!response.ok) {
        console.error("Failed to fetch albums");
        return null;
    }
    const albumJson = await response.json();
    return albumJson.data;
}

