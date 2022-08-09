import { getSavedArtists } from '../../lib/spotify';
import { getSession } from 'next-auth/react';

const handler = async (req, res) => {
  const after = req.query.after;
  const {
    token: { accessToken },
  } = await getSession({ req });
  const response = await getSavedArtists(accessToken, after);
  const { artists } = await response.json();

  return res.status(200).json({ artists });
};

export default handler;