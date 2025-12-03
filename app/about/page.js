'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'

export default function About() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [mounted, setMounted] = useState(false)
  const [stars] = useState(() => 
    [...Array(40)].map(() => ({
      size: Math.random() * 4 + 2,
      left: Math.random() * 100,
      top: Math.random() * 100,
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

  return (
    <div 
      className="min-h-screen pt-0 p-8 relative overflow-hidden"
      style={{
        background: 'linear-gradient(to bottom, #581c87 0%, #c026d3 20%, #f97316 50%, #fbbf24 80%, #fef3c7 100%)'
      }}
    >
      {/* Animated stars */}
      {mounted && stars.map((star, i) => {
        // Calculate distance from cursor to star
        const starX = (star.left / 100) * (typeof window !== 'undefined' ? window.innerWidth : 1)
        const starY = (star.top / 100) * (typeof window !== 'undefined' ? window.innerHeight : 1)
        const distanceX = mousePosition.x - starX
        const distanceY = mousePosition.y - starY
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY)
        
        // Push stars away from cursor
        const pushStrength = 100
        const pushRadius = 150
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
              transition: 'transform 0.2s ease-out',
              background: '#FCD34D',
              boxShadow: '0 0 10px rgba(252, 211, 77, 0.9), 0 0 15px rgba(252, 211, 77, 0.6)',
              animation: `twinkle ${2 + (i % 3)}s ease-in-out infinite`,
              animationDelay: `${(i % 5) * 0.3}s`,
            }}
          />
        )
      })}
      
      <div className="max-w-5xl mx-auto relative z-10 py-8">
        {/* Header with fade-in animation */}
        <div className="text-center mb-16 animate-fade-in pt-8">
          <h1 className="text-6xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-pink-600 to-purple-600 drop-shadow-lg">
            About Me
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-orange-400 to-pink-500 mx-auto rounded-full"></div>
        </div>
        
        {/* Profile Section */}
        <div className="flex flex-col md:flex-row gap-10 items-center mb-16 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-10 hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]">
          {/* Profile photo */}
          <div className="flex-shrink-0 transform transition-transform duration-500 hover:scale-110 hover:rotate-3">
            <Image 
              src="https://ui-avatars.com/api/?name=Zahir&size=300&background=16a34a&color=fff&bold=true"
              alt="Zahir's profile photo"
              width={300}
              height={300}
              className="rounded-full shadow-2xl ring-4 ring-green-200"
            />
          </div>
          
          {/* Bio */}
          <div className="flex-1">
            <h2 className="text-4xl font-bold mb-6 text-gray-900">Hello! I'm Zahir</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              I'm a passionate web designer that loves to create beautiful and functional websites. On my spare time I make funny YouTube videos about me playing horror games. I edit and make the design for the thumbnail myself.
            </p>
          </div>
        </div>

        {/* Skills Section */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-10 mb-16 hover:shadow-2xl transition-all duration-500">
          <h2 className="text-3xl font-bold mb-8 text-gray-900 flex items-center gap-3">
            <span className="text-4xl">💻</span>
            My Skills
          </h2>
          <div className="flex flex-wrap gap-4">
            {['HTML & CSS', 'JavaScript', 'React', 'Next.js', 'Tailwind CSS', 'Git & GitHub', 'Responsive Design', 'Web Development'].map((skill, index) => (
              <span 
                key={skill}
                className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 px-6 py-3 rounded-full font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-default border border-green-200"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Goals Section */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-10 hover:shadow-2xl transition-all duration-500">
          <h2 className="text-3xl font-bold mb-8 text-gray-900 flex items-center gap-3">
            <span className="text-4xl">🎯</span>
            My Goals
          </h2>
          <div className="space-y-8">
            <div className="flex items-start gap-6 p-6 rounded-xl hover:bg-green-50 transition-all duration-300 group">
              <span className="text-5xl group-hover:scale-125 transition-transform duration-300">🎯</span>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Master Modern Web Development</h3>
                <p className="text-gray-700 leading-relaxed">
                  Continue building expertise in React, Next.js, and modern web technologies to create 
                  fast, accessible, and user-friendly applications.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-6 p-6 rounded-xl hover:bg-green-50 transition-all duration-300 group">
              <span className="text-5xl group-hover:scale-125 transition-transform duration-300">💼</span>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Build Real-World Projects</h3>
                <p className="text-gray-700 leading-relaxed">
                  Work on meaningful projects that solve real problems and help me grow as a developer, 
                  while building a strong portfolio to showcase my skills.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-6 p-6 rounded-xl hover:bg-green-50 transition-all duration-300 group">
              <span className="text-5xl group-hover:scale-125 transition-transform duration-300">📸</span>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">YouTube Content Creation</h3>
                <p className="text-gray-700 leading-relaxed">
                  Continue creating engaging and entertaining content on my YouTube channel, focusing on 
                  gaming videos, especially horror games, to grow my audience and improve my video production skills.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
