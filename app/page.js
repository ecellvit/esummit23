import Image from 'next/image'
import { Inter } from '@next/font/google'
import Card from '@/components/card'
import Navbar from '@/components/navbar'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Navbar />
    </>
  )
}
