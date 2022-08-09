const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
const PLAYLISTS_ENDPOINT = 'https://api.spotify.com/v1/me/playlists';
const TRACKS_ENDPOINT = 'https://api.spotify.com/v1/me/top/tracks';
const FOLLOWED_ARTISTS_ENDPOINT = 'https://api.spotify.com/v1/me/following';
const SAVED_TRACKS_ENDPOINT = 'https://api.spotify.com/v1/me/tracks';

const getAccessToken = async (refresh_token) => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token,
    }),
  });

  return response.json();
};

export const getUsersPlaylists = async (refresh_token) => {
  const { access_token } = await getAccessToken(refresh_token);
  return fetch(PLAYLISTS_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};

export const getUsersTopTracksLastMonth = async (refresh_token) => {
  const { access_token } = await getAccessToken(refresh_token);
  const tracksUri = `${TRACKS_ENDPOINT}?` + new URLSearchParams({
    limit: 50,
    time_range: 'short_term'
  });
  return fetch(
    tracksUri, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};

export const getSavedArtists = async (refresh_token, after = undefined) => {
  const { access_token } = await getAccessToken(refresh_token);
  const qp = {
    limit: 50,
    type: 'artist'
  };

  if (after) {
    qp.after = after;
  }
  const tracksUri = `${FOLLOWED_ARTISTS_ENDPOINT}?` + new URLSearchParams(qp);
  return fetch(
    tracksUri, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};

export const getSavedSongs = async (refresh_token, offset = undefined) => {
  const { access_token } = await getAccessToken(refresh_token);
  const qp = {
    limit: 50,
  };

  if (offset) {
    qp.offset = offset;
  }
  const tracksUri = `${SAVED_TRACKS_ENDPOINT}?` + new URLSearchParams(qp);
  return fetch(
    tracksUri, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};