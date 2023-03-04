"use client"
import { usePathname, useRouter } from 'next/navigation'

export default function refreshData () {
    const router = useRouter()
    const path = usePathname()
    router.replace(path);
  }