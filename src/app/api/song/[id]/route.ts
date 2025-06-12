import { NextResponse } from "next/server";
import { getSong } from "../../getSongList";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const songDetail = await getSong(id);
  return NextResponse.json({
    sourceUrl: songDetail?.sourceUrl,
    albumCid: songDetail?.albumCid,
  });
}
