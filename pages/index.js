import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useSession, signIn, signOut } from 'next-auth/react';
import { NextResponse } from 'next/server';


export default function Home() {
  const [todos, setTodos] = useState();
  const [list, setList] = useState([]);
  const { data: session } = useSession();

  useEffect(() => {
    async function loadTodos() {
      const resp = await fetch('/api/todos');
      const data = await resp.json();
      setTodos(data);
    }
    loadTodos();
  }, []);

  const getSavedArtists = async () => {
    const res = await fetch('/api/saved_artists');
    let json = await res.json();
    let offset = 0;
    let items = json.items;

    while (after) {
      console.log({ after });
      let nextResp = await (await fetch('/api/saved_artists?' + new URLSearchParams({ after }))).json();
      items.push(...nextResp.artists.items);
      console.log(nextResp.artists);
      after = nextResp.artists?.cursors?.after;
    }

    items.sort((a, b) => a.name.localeCompare(b.name));
    setList(items);

  };

  const getSavedSongs = async () => {
    const res = await fetch('/api/saved_songs');
    let json = await res.json();
    console.dir(json);
    let items = json.artists.items;
    let go = true;
    let offset = res.items.total;
    while (go) {
      let nextResp = await (await fetch('/api/saved_artists?' + new URLSearchParams({ after }))).json();
      offset += nextResp.items.total;
      items.push(...nextResp.items);
      console.log(nextResp);
      go = nextResp.items.length > 0 ? true : false;
    }

    items.sort((a, b) => a.name.localeCompare(b.name));
    setList(items);

  };


  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">
          Welcome to <a href="https://nextjs.org">Monthly Wrapped!</a>
        </h1>

        {session &&
          <>
            Signed in as {session?.token?.email} <br />
            <button onClick={() => signOut()}>Sign out</button>
            <hr />
            <button onClick={() => getSavedSongs()}>Get all my artists</button>
            <div className="grid">
              {list.map((item) => (
                item.images[0]?.url &&
                <div key={item.id} className="card">
                  <h3>{item.name}</h3>
                  <img src={item.images[0]?.url} width="100" align="right" />
                  <p>{item.genres.join(', ')}</p>
                </div>
              ))}
            </div>
          </>
        }

        {!session &&
          <>
            Not signed in <br />
            <button onClick={() => signIn()}>Sign in</button>
          </>
        }
      </main>

      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className="logo" />
        </a>
      </footer>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .subtitle {
          font-size: 2rem;
        }

        .todos-title {
          font-size: 21px;
          font-weight: 500;
          text-decoration: underline;
          margin: 32px 0 8px;
        }

        .todos-loading {
          color: rgba(0, 0, 0, 0.4);
          margin: 0;
        }

        .todos-item {
          margin: 0 0 4px;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
          margin-top: 32px;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          max-width: 800px;
          margin-top: 3rem;
        }

        .card {
          margin: 1rem;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        }

        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }

        .logo {
          height: 1em;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
