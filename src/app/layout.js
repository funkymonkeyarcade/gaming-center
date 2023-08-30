import { Header } from '@/components/Header'
import './globals.css'
import { Footer } from '@/components/Footer'
import { FirebaseAnalytics } from "@/utils/Analytics"
import { Analytics } from '@vercel/analytics/react';
import Head from 'next/head';

export const metadata = {
  title: 'eGamers.rw - Funky Monkey Arcade in Mundi Center Rwandex,',
  keywords: 'eGamers, Funky Monkey Arcade, arcade games, entertainment, Mundi Center Rwandex, Rwanda',
  description: "Welcome to eGamers.rw! Explore the ultimate gaming experience at Funky Monkey Arcade, located in Mundi Center Rwandex, Rwanda. Enjoy a wide range of arcade games and entertainment for all ages. Join us for a fun-filled adventure in the heart of Rwanda's gaming scene.",
}

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <Head>
        <meta property="og:title" content="eGamers.rw - Funky Monkey Arcade" />
        <meta property="og:description" content="Explore the ultimate gaming experience at Funky Monkey Arcade in Rwanda." />
        <meta property="og:image" content="https://firebasestorage.googleapis.com/v0/b/gaming-906ed.appspot.com/o/image.jpg?alt=media&token=04f8cca6-e7bb-4e30-8249-f4d89140ccdf" />
        <meta property="og:url" content="https://egamers.rw/about" />

        <link rel="icon" href="/favicon.ico" type="image/x-icon"></link>
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon"></link>
      </Head>
      <body className='bg-primary'>
        <Header />
          {children}
        <Footer />
        <FirebaseAnalytics />
        <Analytics />
      </body>
    </html>
  )
}
