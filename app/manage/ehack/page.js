'use client'
import Dashboard from '@/components/dashboard'
import NotyNav from '@/components/notyNav'

export default function Home() {
  return (
    <>
      <NotyNav eventName="eHack" />
      <Dashboard eventName="eHack" />
    </>
  )
}
