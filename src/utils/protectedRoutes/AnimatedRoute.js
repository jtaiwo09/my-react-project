import { motion } from 'framer-motion'
import React from 'react'
import { Route } from 'react-router-dom'

export default function AnimatedRoute({children, ...rest}) {
    return (
        <Route {...rest} >
            <motion.div initial={{opacity:0}} animate={{opacity:1, scale:1, transition:{duration:0.5}}} exit={{scale:0, transition:{duration:1}}}>
                {children}
            </motion.div>
        </Route>
    )
}
