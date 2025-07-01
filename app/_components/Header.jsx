'use client'

import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'
import Link from 'next/link'

function Header() {
  return (
    <div className='flex justify-between p-3 shadow-sm items-center'>
      <Image src="/logo.png" alt="Company Logo" width={100} height={50} />
      
      <Link href="/dashboard">
        <Button variant="success" size="lg">
          Get Started
        </Button>
      </Link>
    </div>
  )
}

export default Header
