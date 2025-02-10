import React, { useEffect, useState } from 'react';
import Instragram from './icon/Instragram';
import Facebook from './icon/Facebook';
import X from './icon/X';
import silver from '/silver.png'
import { ComputerData } from '../data/MockData';
import {motion, AnimatePresence, easeInOut} from 'framer-motion';
import { SlideRight } from './icon/util/animation';

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export default function Hero() {
    const [activeData, setActiveData] = useState(ComputerData[1])

    const [currentIndex, setCurretnIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurretnIndex((prevIndex) => (prevIndex + 1) % ComputerData.length)
        }, 3000) // change every 3 seconds

        return () => clearInterval(interval); // cleanup interval on component unmount
    },[currentIndex])


    useEffect(() => {   
        setActiveData(ComputerData[currentIndex]);
    }, [currentIndex])


    return (
        <Card className="border-b-0">
            <CardContent className="md:mx-auto md:w-[1500px] bg-white">
                <motion.section
                    
                >   
            <div className='container grid grid-cols-1 md:grid-cols-2 p-10
            h-screen md:h-[500px] relative '>
                <div className='flex flex-col justify-center py-14 md:py-0 
                5rem:max-w-[500px] order-2 md:order-1 mx-auto '>
                    <div className='space-y-5 md:space-y-7 text-center  
                    md:text-left p-20'>
                        <AnimatePresence mode='wait'>
                            <motion.h1 key={activeData.id} variants={SlideRight(0.2)} initial="hidden" animate="show" exit="exit" className='text-black text-3xl 4rem:text-4xl 5rem:text-5xl font-bold'>{activeData.title}</motion.h1>
                        </AnimatePresence>
                        <AnimatePresence mode='wait'>
                            <motion.p key={activeData.id} variants={SlideRight(0.4)} initial="hidden" animate="show" exit="exit" className='text-sm leading-loose text-black/80'>{activeData.subtitle}</motion.p>
                        </AnimatePresence>
                        <motion.p key={activeData.id} variants={SlideRight(0.6)} initial="hidden" animate="show" exit="exit" className='text-black text-3xl 4rem:text-4xl 5rem:text-5xl font-bold'>{activeData.price}</motion.p>
                        <div className='flex items-center justify-center 
                        md:justify-start gap-4 text-3xl text-black'>
                            <Instragram className="cursor-pointer border rounded-full
                            p-[6px]" />
                            <Facebook className="cursor-pointer border rounded-full
                            p-[6px]" />
                            <X className="cursor-pointer border rounded-full
                            p-[6px]" />
                        </div>
                    </div>
                </div>
                <div className='flex flex-col items-center justify-center
                md:order-2'>
                    <AnimatePresence mode='wait'>
                        <motion.img
                        key={activeData.id}
                        initial={{opacity : 0, x : 100}}
                        animate={{opacity : 1, x : 0}}
                        transition={{duration : 0.4, ease : easeInOut, delay : 0.2}}
                        exit={{ opacity: 0, x: -100 }}
                        src={activeData.image} alt="" className='w-[300px] md:w-[400px]
                        4rem:w-[500px] relative z-10'/>
                    </AnimatePresence>
                    {/* <div className='text-[300px] absolute top-0 left-1/2
                    -translate-x-1/2 -translate-y-1/2 z-0 
                    font-poppins font-extrabold'>
                        Silver
                    </div> */}
                </div>
            </div>
                </motion.section>
            </CardContent>
        </Card>
    )
}
        