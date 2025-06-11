import { NextResponse } from 'next/server';
import { getSong } from '../../getSongList';

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const id = params.id;
    const songDetail = await getSong(id);
    return NextResponse.json({ sourceUrl: songDetail?.sourceUrl, albumCid: songDetail?.albumCid });
}