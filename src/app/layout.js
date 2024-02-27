import { NavBar, Footer } from '@/components'
import { Inter } from "next/font/google";
import './globals.css'

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: "creativetho",
    template: "%s | creativetho"
  },
  description: 'Next.js starter app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body  className={inter.className}>
        <div className='container'>
          <NavBar />
            {children}
          <Footer />
        </div> 
      </body>
    </html>
  )
}