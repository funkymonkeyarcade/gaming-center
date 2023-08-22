import { Header } from '@/components/Header'
import './globals.css'
import { Footer } from '@/components/Footer'
import { FirebaseAnalytics } from "@/utils/Analytics"

export const metadata = {
  title: 'Game Center',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className='bg-primary'>
        <Header />
          {children}
        <Footer />
        <FirebaseAnalytics />
      </body>
    </html>
  )
}
