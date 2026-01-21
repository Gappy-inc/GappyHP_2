'use client'

import { useEffect, useRef, ReactNode } from 'react'

interface ScrollAnimationProps {
  children: ReactNode
  className?: string
  animation?: 'fade-in' | 'fade-left' | 'fade-right' | 'scale-in'
  delay?: number
}

export default function ScrollAnimation({ 
  children, 
  className = '', 
  animation = 'fade-in',
  delay = 0 
}: ScrollAnimationProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [])

  const animationClass = {
    'fade-in': 'scroll-fade-in',
    'fade-left': 'scroll-fade-left',
    'fade-right': 'scroll-fade-right',
    'scale-in': 'scroll-scale-in'
  }[animation]

  const delayClass = delay > 0 ? `delay-${delay}` : ''

  return (
    <div 
      ref={ref} 
      className={`${animationClass} ${delayClass} ${className}`}
    >
      {children}
    </div>
  )
}
