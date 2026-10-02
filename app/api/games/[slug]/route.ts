import axios from "axios";
import { getIgdbHeaders } from "@/lib/igdb";
import { NextRequest, NextResponse } from "next/server";

// IGDB's external_games.external_game_source enum: 1 identifies a Steam
// store listing, with the Steam app id carried in `uid`.
const STEAM_SOURCE = 1;

async function fetchSteamPrice(appId: string) {
  try {
    const { data } = await axios.get(
      `https://store.steampowered.com/api/appdetails?appids=${appId}&cc=in&filters=price_overview,is_free`,
      { timeout: 4000 }
    );
    const entry = data?.[appId];
    if (!entry?.success) return null;
    const info = entry.data;
    if (info?.is_free) {
      return { free: true, current: "Free", original: null, discountPercent: 0 };
    }
    const overview = info?.price_overview;
    if (!overview) return null;
    return {
      free: false,
      current: overview.final_formatted,
      original:
        overview.discount_percent > 0 ? overview.initial_formatted : null,
      discountPercent: overview.discount_percent || 0,
    };
  } catch {
    // Steam's API is unauthenticated and occasionally flaky/rate-limited —
    // pricing is a nice-to-have, so fail quietly rather than break the page.
    return null;
  }
}

export const GET = async (
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) => {
  const headers = await getIgdbHeaders();
  const { slug } = await params;

  const gameRes = await axios.post(
    `${process.env.NEXT_PUBLIC_BASE_URL}/games`,
    `fields id,name,summary,videos.video_id,involved_companies.developer,involved_companies.publisher,involved_companies.company.name,genres.name,aggregated_rating,first_release_date,screenshots.url,screenshots.height,screenshots.width,artworks.url,artworks.height,artworks.width,cover.url,release_dates.human,platforms.name,external_games.external_game_source,external_games.uid,similar_games.id,similar_games.name,similar_games.cover.url,similar_games.slug,similar_games.aggregated_rating,similar_games.first_release_date,similar_games.genres.name,similar_games.hypes; where slug = "${slug}";`,
    { headers }
  );
  const res = gameRes.data[0];
  if (!res) return NextResponse.json(res);

  const steamAppId = (
    res.external_games as
      | { external_game_source: number; uid: string }[]
      | undefined
  )?.find((g) => g.external_game_source === STEAM_SOURCE)?.uid;

  const steamPrice = steamAppId ? await fetchSteamPrice(steamAppId) : null;

  return NextResponse.json({
    ...res,
    steamAppId: steamAppId || null,
    steamPrice,
  });
};
