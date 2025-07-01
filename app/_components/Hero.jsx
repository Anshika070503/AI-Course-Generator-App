import React from 'react'
import "@fontsource/inter"
import "@fontsource/montserrat"


function Hero() {
  return (
    <section className="bg-white lg:h-screen flex items-center justify-center">
      <div className="w-full max-w-5xl px-6 py-16 sm:px-8 sm:py-24 lg:py-32">
        <div className="text-center space-y-6">
          <h1 className="text-3xl font-extrabold text-indigo-600 sm:text-5xl leading-tight font-montserrat">
            AI Course Generator
            <br />
            <strong className="font-bold text-black"> Custom Learning Paths, <br /> Powered by AI</strong>
          </h1>

          <p className="text-base text-gray-700 sm:text-lg max-w-2xl mx-auto">
            Unlock personalized education with AI-driven course creation. Tailor your learning journey to fit your unique goals and pace
          </p>

          <div className="flex justify-center gap-4 pt-4">
            <a
              className="inline-block rounded border border-indigo-600 bg-indigo-600 px-6 py-3 font-medium text-white shadow-sm transition-colors hover:bg-indigo-700"
              href="dashboard"
            >
              Get Started
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
