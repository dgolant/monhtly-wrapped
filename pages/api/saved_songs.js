import { getSavedSongs } from '../../lib/spotify';
import { getSession } from 'next-auth/react';

const handler = async (req, res) => {
  const offset = req.query.offset;
  const {
    token: { accessToken },
  } = await getSession({ req });
  const response = await getSavedSongs(accessToken, offset);
  const x = await response.json();
  const artists = x;
  console.dir(x);
  return res.status(200).json({ artists });
};

export default handler;