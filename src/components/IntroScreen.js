import React from 'react'
import {ReactComponent as HoumLogo} from '../assets/img/HoumLogo.svg'
import { motion } from 'framer-motion'

const MotionHoum = motion(HoumLogo)

const bounceTransition = {
  y: {
    duration: 0.6,
    yoyo: Infinity,
    ease: 'easeOut'
  }
}
export const IntroScreen = () => {
  return (
    <div style={{display: 'flex', flexDirection: 'column' ,justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
      <MotionHoum transition={bounceTransition} animate={{y: ['20%', '-20%']}} />
      <div style={{textAlign: 'center'}}>
          <h1 style={{color: '#263238'}}>¡Preparando tu nueva experiencia!</h1>
      </div>
    </div>
  )
}
