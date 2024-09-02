import './globals.css'
import { Inter } from 'next/font/google'
import { ClientWrapper } from '@/components/ClientWrapper'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'RavenCash',
  description: 'A modern financial app for managing your money',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  )
}