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
  openGraph: {
    title: 'eGamers.rw - Funky Monkey Arcade in Mundi Center Rwandex,',
    description: "Welcome to eGamers.rw! Explore the ultimate gaming experience at Funky Monkey Arcade, located in Mundi Center Rwandex, Rwanda. Enjoy a wide range of arcade games and entertainment for all ages. Join us for a fun-filled adventure in the heart of Rwanda's gaming scene.",
    url: 'https://www.egamers.rw',
    siteName: 'eGamers',
    images: [
      {
        url: 'https://firebasestorage.googleapis.com/v0/b/gaming-906ed.appspot.com/o/image.jpg?alt=media&token=04f8cca6-e7bb-4e30-8249-f4d89140ccdf',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  icons: {
    icon: "https://egamers.rw/favicon.ico"
  }
}

export default function RootLayout({ children }) {

  return (
    <html lang="en">
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
