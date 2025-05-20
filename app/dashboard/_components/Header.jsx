import Image from 'next/image'
import React from 'react'

function Header() {
  return (
    <div>
      <Image src="/logo.png" alt="Company Logo" width={100} height={50} />
    </div>
  )
}

export default Header
