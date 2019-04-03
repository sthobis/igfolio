import React, { useState, useEffect } from "react"
import Head from "next/head"
import classnames from "classnames"
import "isomorphic-unfetch"
import FadeInImage from "../components/FadeInImage"

const Index = ({ username, images }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setTimeout(setMounted, 1000, true)
  }, [])

  return (
    <main>
      <Head>
        <link href="https://fonts.googleapis.com/css?family=Raleway:900" rel="stylesheet" />
        <style>
          {`
            * {
              box-sizing: border-box;
            }

            html {
              font-size: 16px;
            }

            body {
              margin: 0;
              font-family: 'Raleway', sans-serif;
            }
          `}
        </style>
      </Head>
      <section>      
        <a href={`https://instagram.com/${username}`}><h1 className={classnames(mounted && "visible")}>{username}</h1></a>
      </section>
      {images.map((src, index) => (
        <section key={index}>
          <FadeInImage src={src} username={username} />
        </section>
      ))}
      <style jsx>
        {`
          section {
            height: 100vh;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            padding: 0 8rem;
          }

          section:nth-child(2n) {
            justify-content: flex-end;
          }

          a {
            text-decoration: none;
          }

          a:visited {
            color: initial;
          }

          h1 {
            font-size: 3.5rem;
            text-transform: uppercase;
            margin: 0 0 2rem 0;
            color: #000;
            opacity: 0;
            transform: translateX(4rem);
            transition: .6s;
          }

          .visible {
            opacity: 1;
            transform: translateX(0);
          }
        `}
      </style>
    </main>
  )
}

Index.getInitialProps = async ({ req, query }) => {
  try {
    const protocol = process.env.NOW_REGION === 'dev1' ? 'http' : 'https'
    const baseUrl = `${protocol}://${req.headers.host}/api/instagram.js`
    const username = query.username || "thobiisnaga"
    const { images } = (await (await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username })
    })).json())
    return { username, images }
  } catch (e) {
    return {
      username: e.message || e.toString(),
      images: []
    }
  }
}

export default Index
