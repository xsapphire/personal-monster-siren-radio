import { NextResponse } from 'next/server';
import { getAlbums, getSongList } from '../getSongList';

export async function GET() {
    const songList = await getSongList();
    const albumList = await getAlbums();
    return NextResponse.json({ songs: songList, albums: albumList });
}