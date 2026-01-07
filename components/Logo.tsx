'use client'

import Image from 'next/image'

export default function Logo() {
  return (
    <div className="flex items-center select-none cursor-pointer">
      <Image
        src="/logo.png"
        alt="Unified Labs"
        width={160}
        height={64}
        className="h-12 md:h-16 w-auto object-contain"
        priority
      />
    </div>
  )
}
