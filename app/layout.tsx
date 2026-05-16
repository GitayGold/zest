import type { Metadata } from 'next'
import { Bricolage_Grotesque, DM_Sans } from 'next/font/google'
import './globals.css'
import { FlavorProvider } from '@/lib/FlavorContext'
import { SoundProvider } from '@/lib/SoundContext'
import CustomCursor from '@/components/CustomCursor'
import Nav from '@/components/Nav'

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-bricolage',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
  weight: ['400', '500', '600'],
})

export const metadata: Metadata = {
  title: 'ZEST — Flavors that shouldn\'t work. Until they do.',
  description:
    'Sparkling water for people who are bored of sparkling water. Bold, unexpected flavors. No artificial anything.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${dmSans.variable}`}
    >
      <body>
        <FlavorProvider>
          <SoundProvider>
            <CustomCursor />
            <Nav />
            {children}
          </SoundProvider>
        </FlavorProvider>
      </body>
    </html>
  )
}
