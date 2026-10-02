import axios from "axios";

// IGDB authenticates with a Twitch app access token (client-credentials
// grant). Those tokens expire after ~60 days, so rather than pinning one in
// an env var we mint it on demand and cache it for the life of the server
// instance, refreshing shortly before Twitch says it expires.
const REFRESH_MARGIN_MS = 60 * 60 * 1000;

let cached: { token: string; expiresAt: number } | null = null;
let inflight: Promise<string> | null = null;

async function fetchToken(): Promise<string> {
  const { data } = await axios.post(
    "https://id.twitch.tv/oauth2/token",
    null,
    {
      params: {
        client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
        client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
        grant_type: "client_credentials",
      },
    }
  );
  cached = {
    token: data.access_token,
    expiresAt: Date.now() + data.expires_in * 1000 - REFRESH_MARGIN_MS,
  };
  return cached.token;
}

async function getAccessToken(): Promise<string> {
  if (cached && Date.now() < cached.expiresAt) return cached.token;
  // Concurrent requests on a cold instance share one token fetch.
  inflight ??= fetchToken().finally(() => {
    inflight = null;
  });
  return inflight;
}

export async function getIgdbHeaders() {
  return {
    "Client-ID": process.env.NEXT_PUBLIC_CLIENT_ID,
    Authorization: `Bearer ${await getAccessToken()}`,
  };
}
