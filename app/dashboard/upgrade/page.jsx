'use client'
import React from 'react'
import { Button } from '@/components/ui/button'
import { HiOutlineShieldCheck } from 'react-icons/hi2'

function page() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-start pt-20 px-4 bg-white text-center">
      <div className="max-w-xl">
        <div className="text-6xl text-primary mb-4">
          <HiOutlineShieldCheck />
        </div>

        <h2 className="text-3xl font-bold text-gray-800 mb-4">Upgrade to Pro</h2>

        <p className="text-gray-600 mb-6 text-lg">
          Unlock unlimited course generation and gain access to premium AI-powered features designed to help you build smarter, faster.
        </p>

        <div className="flex justify-center gap-4 mt-4">
          <Button className="bg-primary text-white px-6 py-2 text-lg hover:bg-primary/90 transition">
            Upgrade Now
          </Button>
          <Button variant="outline" className="px-6 py-2 text-lg">
            Learn More
          </Button>
        </div>
      </div>
    </div>
  )
}

export default page
