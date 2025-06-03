import React, { useState, useEffect } from 'react'
import '../styles/components/PageTitle.css'

export function PageTitle() {
  const [displayText, setDisplayText] = useState('')
  const fullText = 'ENCUENTRA TU LUGAR IDEAL'
  const [isTypingComplete, setIsTypingComplete] = useState(false)

  useEffect(() => {
    let currentIndex = 0
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayText(fullText.slice(0, currentIndex))
        currentIndex++
      } else {
        clearInterval(typingInterval)
        setIsTypingComplete(true)
      }
    }, 100)

    return () => clearInterval(typingInterval)
  }, [])

  return (
    <div className="text-center mb-12">
      <h1 className="text-4xl font-bold mb-4">
        <span className="typing-text">{displayText}</span>
        <span className={`cursor ${isTypingComplete ? 'blink' : ''}`}>|</span>
      </h1>
      <p className={`subtitle ${isTypingComplete ? 'fade-in' : 'opacity-0'}`}>
        Descubre espacios únicos que se adaptan a tu estilo de vida
      </p>
    </div>
  )
}