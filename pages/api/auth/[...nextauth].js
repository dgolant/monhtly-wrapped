import NextAuth from 'next-auth';
import SpotifyProvider from 'next-auth/providers/spotify';

const scopes = ['user-read-email', 'playlist-read-private', 'user-top-read', 'user-follow-read', 'user-library-read'];

const qp = new URLSearchParams({
  scope: scopes.join(',')
});
export default NextAuth({
  providers: [
    SpotifyProvider({
      authorization:
        'https://accounts.spotify.com/authorize?' + qp,
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.refresh_token;
      }
      return token;
    },
    async session(session, user) {
      session.user = user;
      return session;
    },
  },
});