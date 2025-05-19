import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'

function Header() {
  return (
    <div className='flex justify-between p-3 shadow-sm'>
      <Image src="/logo.png" alt="Company Logo" width={100} height={50} />
      <Button variant="success" size="lg" >Get Started</Button>
    </div>
  )
}

export default Header
