import { motion } from 'framer-motion';
import React from 'react';

export default function Home() {
    return (
        <div className='rel'>
          <div className='center'>
          <motion.h1 
            // initial={{opacity:0}} animate={{scale: 1.5, opacity:1, transition:{duration:1}}}
          >Welcome Home</motion.h1>
          </div>
        </div>
      )
}
