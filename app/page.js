'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [mounted, setMounted] = useState(false)
  const [stars] = useState(() => 
    [...Array(60)].map(() => ({
      size: Math.random() * 3 + 1,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 3,
    }))
  )

  useEffect(() => {
    setMounted(true)
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Calculate push effect for YouTube logo
  const youtubeX = typeof window !== 'undefined' ? window.innerWidth * 0.28 : 0
  const youtubeY = typeof window !== 'undefined' ? window.innerHeight * 0.35 : 0
  const youtubeDistanceX = mousePosition.x - youtubeX
  const youtubeDistanceY = mousePosition.y - youtubeY
  const youtubeDistance = Math.sqrt(youtubeDistanceX * youtubeDistanceX + youtubeDistanceY * youtubeDistanceY)
  const pushRadius = 200
  let youtubeOffsetX = 0
  let youtubeOffsetY = 0
  if (youtubeDistance < pushRadius && youtubeDistance > 0) {
    const force = (pushRadius - youtubeDistance) / pushRadius
    youtubeOffsetX = -(youtubeDistanceX / youtubeDistance) * force * 60
    youtubeOffsetY = -(youtubeDistanceY / youtubeDistance) * force * 60
  }

  // Calculate push effect for lightbulb
  const lightbulbX = 150
  const lightbulbY = 100
  const lightbulbDistanceX = mousePosition.x - lightbulbX
  const lightbulbDistanceY = mousePosition.y - lightbulbY
  const lightbulbDistance = Math.sqrt(lightbulbDistanceX * lightbulbDistanceX + lightbulbDistanceY * lightbulbDistanceY)
  let lightbulbOffsetX = 0
  let lightbulbOffsetY = 0
  if (lightbulbDistance < pushRadius && lightbulbDistance > 0) {
    const force = (pushRadius - lightbulbDistance) / pushRadius
    lightbulbOffsetX = -(lightbulbDistanceX / lightbulbDistance) * force * 60
    lightbulbOffsetY = -(lightbulbDistanceY / lightbulbDistance) * force * 60
  }

  // Calculate push effect for code monitor
  const codeX = typeof window !== 'undefined' ? window.innerWidth - 200 : 0
  const codeY = 100
  const codeDistanceX = mousePosition.x - codeX
  const codeDistanceY = mousePosition.y - codeY
  const codeDistance = Math.sqrt(codeDistanceX * codeDistanceX + codeDistanceY * codeDistanceY)
  let codeOffsetX = 0
  let codeOffsetY = 0
  if (codeDistance < pushRadius && codeDistance > 0) {
    const force = (pushRadius - codeDistance) / pushRadius
    codeOffsetX = -(codeDistanceX / codeDistance) * force * 60
    codeOffsetY = -(codeDistanceY / codeDistance) * force * 60
  }

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-8 relative overflow-hidden"
      style={{
        background: 'linear-gradient(to bottom, #0f172a 0%, #1e3a8a 40%, #0ea5e9 70%, #0c4a6e 100%)',
        position: 'relative'
      }}
    >
      {/* YouTube logo in center background */}
      <div 
        className="absolute pointer-events-none"
        style={{
          top: '35%',
          left: '28%',
          transform: `translate(calc(-50% + ${youtubeOffsetX}px), calc(-50% + ${youtubeOffsetY}px))`,
          width: '280px',
          height: '195px',
          background: 'linear-gradient(135deg, #ff0000 0%, #cc0000 100%)',
          borderRadius: '45px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 60px rgba(255, 255, 0, 0.6), 0 0 100px rgba(255, 255, 0, 0.4)',
          zIndex: 1,
          transition: 'transform 0.2s ease-out'
        }}
      >
        <div
          style={{
            width: 0,
            height: 0,
            borderLeft: '55px solid white',
            borderTop: '35px solid transparent',
            borderBottom: '35px solid transparent',
            marginLeft: '12px'
          }}
        />
      </div>

      {/* Lightbulb icon top left */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '100px',
          left: '150px',
          fontSize: '120px',
          opacity: 0.8,
          zIndex: 2,
          transform: `translate(${lightbulbOffsetX}px, ${lightbulbOffsetY}px)`,
          transition: 'transform 0.2s ease-out'
        }}
      >
        💡
      </div>

      {/* Code monitor icon top right */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '100px',
          right: '200px',
          fontSize: '120px',
          opacity: 0.8,
          zIndex: 2,
          transform: `translate(${codeOffsetX}px, ${codeOffsetY}px)`,
          transition: 'transform 0.2s ease-out'
        }}
      >
        💻
      </div>

      {/* Animated stars */}
      {mounted && stars.map((star, i) => {
        // Calculate distance from cursor to star
        const starX = (star.left / 100) * window.innerWidth
        const starY = (star.top / 100) * window.innerHeight
        const distanceX = mousePosition.x - starX
        const distanceY = mousePosition.y - starY
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY)
        
        // Push stars away from cursor
        const pushStrength = 80
        const pushRadius = 120
        let offsetX = 0
        let offsetY = 0
        
        if (distance < pushRadius && distance > 0) {
          const force = (pushRadius - distance) / pushRadius
          offsetX = -(distanceX / distance) * force * pushStrength
          offsetY = -(distanceY / distance) * force * pushStrength
        }
        
        return (
          <div
            key={i}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: star.size + 'px',
              height: star.size + 'px',
              left: star.left + '%',
              top: star.top + '%',
              transform: `translate(${offsetX}px, ${offsetY}px)`,
              transition: 'transform 0.3s ease-out',
              background: '#FCD34D',
              boxShadow: '0 0 8px rgba(252, 211, 77, 0.8), 0 0 12px rgba(252, 211, 77, 0.5)',
              animation: `twinkle ${2 + (i % 3)}s ease-in-out infinite`,
              animationDelay: `${star.delay}s`,
            }}
          />
        )
      })}

      <div className="max-w-5xl w-full text-center relative z-10">
        {/* Circular profile photo with animation */}
        <div className="mb-12 flex justify-center">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>
            <Image 
              src="/download.png"
              alt="Zahir's profile photo"
              width={220}
              height={220}
              className="rounded-full shadow-2xl relative z-10 ring-4 ring-white/40 group-hover:ring-white/60 transition-all duration-500"
              priority
            />
          </div>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 text-gray-900 px-4">
          Hi, I'm Zahir!
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-700 mb-14 font-medium px-4"> 
          Web Designer & Content Creator
        </p>

        <div className="flex flex-col md:flex-row gap-6 md:gap-12 justify-center items-center mb-16 px-4">
          <Link 
            href="/about" 
            className="bg-white/90 backdrop-blur-sm border-2 border-green-200 hover:border-green-400 text-gray-900 font-semibold px-12 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 w-48 text-center"
          >
            About Me
          </Link>
          <Link 
            href="/projects" 
            className="bg-white/90 backdrop-blur-sm border-2 border-green-200 hover:border-green-400 text-gray-900 font-semibold px-12 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 w-48 text-center"
          >
            My Projects
          </Link>
          <Link 
            href="/contact" 
            className="bg-white/90 backdrop-blur-sm border-2 border-green-200 hover:border-green-400 text-gray-900 font-semibold px-12 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 w-48 text-center"
          >
            Contact
          </Link>
        </div>

        <div className="bg-white/85 backdrop-blur-sm border-2 border-gray-200 rounded-full p-10 shadow-xl mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 flex items-center justify-center gap-3">
            <span className="text-4xl">📝</span>
            Welcome to My Portfolio
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed text-center">
            Explore my journey as a web designer and content creator. Discover my projects, learn about my skills, and get in touch to collaborate!
          </p>
        </div>
      </div>
    </div>
  )
}
