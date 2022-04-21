import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>TradeRight application</title>
        <meta name="description" content="Trading Application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to TradeRight!
        </h1>

        <div className={styles.grid}>
          <a href="/api/login" className={styles.card}>
            <h2>Login &rarr;</h2>
            <p></p>
          </a>
        </div>
        <div className={styles.grid}>
          <a href="/api/watchTarget" className={styles.card}>
            <h2>Watch Target &rarr;</h2>
            <p></p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
      </footer>
    </div>
  )
}
