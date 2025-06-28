import Image from 'next/image';
import React from 'react';

function Header() {
  return (
    <div>
      <Image
        src="/logo.png"
        alt="Logo"
        width={100}
        height={100}
        // ✅ DO NOT use className to set width/height here
      />
    </div>
  );
}

export default Header;
