'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function Contact() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [mounted, setMounted] = useState(false)
  const [stars] = useState(() => 
    [...Array(60)].map(() => ({
      size: Math.random() * 4 + 2,
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

  return (
    <div 
      className="min-h-screen pt-0 p-8 relative overflow-hidden"
      style={{
        background: 'linear-gradient(to bottom, #fb923c 0%, #fdba74 40%, #6ee7b7 100%)'
      }}
    >
      {/* Sun in top left corner */}
      <div 
        className="absolute pointer-events-none"
        style={{
          top: '40px',
          left: '40px',
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, #fef3c7 0%, #fcd34d 50%, #fb923c 100%)',
          boxShadow: '0 0 60px rgba(251, 146, 60, 0.8), 0 0 100px rgba(252, 211, 77, 0.5)',
          animation: 'pulse 4s ease-in-out infinite',
        }}
      />

      {/* Animated stars */}
      {mounted && stars.map((star, i) => {
        const starX = (star.left / 100) * (typeof window !== 'undefined' ? window.innerWidth : 1)
        const starY = (star.top / 100) * (typeof window !== 'undefined' ? window.innerHeight : 1)
        const distanceX = mousePosition.x - starX
        const distanceY = mousePosition.y - starY
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY)
        
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
              animationDelay: `${star.delay}s`,
            }}
          />
        )
      })}

      <div className="max-w-4xl mx-auto relative z-10 pt-8">
        <h1 className="text-5xl font-bold mb-4 text-gray-900">Get In Touch</h1>
        <p className="text-xl text-gray-600 mb-12">
          I'd love to hear from you! Feel free to reach out through any of these channels.
        </p>
        
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="space-y-8">
            {/* Email */}
            <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
              <span className="text-4xl">📧</span>
              <div className="flex-1">
                <p className="font-bold text-gray-900 text-xl mb-2">Email</p>
                <a 
                  href="mailto:zahtoobusiness@example.com" 
                  className="text-green-600 hover:text-green-700 text-lg hover:underline"
                >
                  zahtoobusiness@example.com
                </a>
                <p className="text-gray-600 mt-2">
                  Best for business inquiries and project collaborations
                </p>
              </div>
            </div>

            {/* LinkedIn */}
            <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
              <span className="text-4xl">🔗</span>
              <div className="flex-1">
                <p className="font-bold text-gray-900 text-xl mb-2">LinkedIn</p>
                <a 
                  href="https://www.linkedin.com/in/zahir-alston-84690031b/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 hover:text-green-700 text-lg hover:underline"
                >
                  linkedin.com/in/zahir-alston-84690031b
                </a>
                <p className="text-gray-600 mt-2">
                  Connect with me professionally and see my work experience
                </p>
              </div>
            </div>

            {/* YouTube */}
            <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
              <span className="text-4xl">🎥</span>
              <div className="flex-1">
                <p className="font-bold text-gray-900 text-xl mb-2">YouTube</p>
                <a 
                  href="https://www.youtube.com/@ZahTooFunny/featured" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 hover:text-green-700 text-lg hover:underline"
                >
                  youtube.com/@ZahTooFunny
                </a>
                <p className="text-gray-600 mt-2">
                  Check out my content and creative projects
                </p>
              </div>
            </div>

            {/* GitHub */}
            <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
              <span className="text-4xl">💻</span>
              <div className="flex-1">
                <p className="font-bold text-gray-900 text-xl mb-2">GitHub</p>
                <a 
                  href="https://github.com/ZahMVPCoder" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 hover:text-green-700 text-lg hover:underline"
                >
                  github.com/ZahMVPCoder
                </a>
                <p className="text-gray-600 mt-2">
                  Explore my code and open-source contributions
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-green-50 border-2 border-green-200 rounded-lg p-8 text-center">
          <h3 className="font-bold text-green-900 mb-3 text-2xl">💬 Let's Build Something Amazing!</h3>
          <p className="text-green-800 text-lg mb-4">
            Whether you have a project idea, want to collaborate, or just want to say hi, 
            I'm always open to new opportunities and connections.
          </p>
          <p className="text-green-700 font-semibold">
            I typically respond within 24-48 hours
          </p>
        </div>
      </div>
    </div>
  )
}
