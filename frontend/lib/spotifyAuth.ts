// Simple Spotify authentication
export const getAuthUrl = () => {
  const params = new URLSearchParams({
    client_id: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID!,
    response_type: 'code',
    redirect_uri: process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI || 'http://localhost:3000/callback',
    scope: 'user-read-private user-read-email user-top-read playlist-read-private playlist-modify-public playlist-modify-private',
  });
  return `https://accounts.spotify.com/authorize?${params.toString()}`;
};

export const exchangeCodeForTokens = async (code: string) => {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';
  const response = await fetch(`${API_BASE_URL}/api/spotify/auth/callback`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code }),
  });

  if (!response.ok) {
    throw new Error('Failed to exchange code for tokens');
  }

  return response.json();
};
