export type SongListItem = {
    cid: string;
    name: string;
    albumCid: string;
    artists: string[];
}

export type AlbumListItem = {
    cid: string;
    name: string
    coverUrl: string;
}

export type MyPlayListItem = {
    cid: string;
    createDateTime: Date;
}

export type Song = {
    cid: string;
    name: string;
    albumCid: string;
    sourceUrl: string;
    lyricUrl: string;
    mvUrl: string | null;
    mvCoverUrl: string | null;
    artists: string[];
}
