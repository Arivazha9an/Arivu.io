"use client";

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { slideInFromLeft, slideInFromRight, slideInFromTop } from '@/utils/motion'
import { SparklesIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline'
import Image from 'next/image';

const HeroContent = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            className='flex flex-col md:flex-row items-center justify-center px-6 md:px-20 mt-36 md:mt-40 w-full z-[20] gap-10'
        >
            <div className='flex flex-col gap-5 justify-center items-center md:items-start text-center md:text-start'>

                <motion.div
                    variants={slideInFromTop}
                    className='Welcome-box py-[8px] px-[7px] border border-[#7042f88b] opacity-[0.9]'
                >
                    <SparklesIcon className='text-[#b49bff] mr-[10px] h-5 w-5' />
                    <h1 className='Welcome-text text-[13px]'>Flutter Developer </h1>
                </motion.div>

                <motion.div
                    variants={slideInFromLeft(0.5)}
                    className='flex flex-col gap-6 mt-2 text-5xl md:text-6xl font-bold text-white max-w-[600px]'
                >
                    <span className='text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500'> Arivazhagan</span>
                </motion.div>

                <motion.div
                    variants={slideInFromLeft(0.8)}
                    className='text-lg text-gray-400 max-w-[600px] flex flex-col gap-3'
                >
                    <p>
                        A passionate flutter developer crafting seamless, high-performance mobile experiences. I specialize in building intuitive, scalable applications that transform ideas into reality. From concept to deployment, I deliver polished, user-centric solutions that stand out.
                    </p>
                    <p>Explore my work and let&apos;s build something together.</p>

                    <button 
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="flex items-center gap-2 text-purple-400 hover:text-purple-300 text-sm font-semibold transition-colors self-center md:self-start mt-2 bg-purple-900/20 px-4 py-2 rounded-full border border-purple-500/30"
                    >
                        {isExpanded ? "Hide Story" : "Read My Story"}
                        {isExpanded ? <ChevronUpIcon className="w-4 h-4" /> : <ChevronDownIcon className="w-4 h-4" />}
                    </button>

                    <AnimatePresence>
                        {isExpanded && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.4, ease: "easeInOut" }}
                                className="overflow-hidden"
                            >
                                <div className="text-base text-gray-300 space-y-4 mt-4 p-5 bg-[#030014]/40 border border-[#2A0E61] rounded-xl backdrop-blur-md text-left">
                                    <h3 className="text-xl font-bold text-white mb-2">Who I Am</h3>
                                    
                                    <p>I wasn’t the kid who dreamed about becoming a software developer. I was the kid who spent countless hours playing computer games, fascinated by how virtual worlds worked. That curiosity slowly became an obsession with computers, technology, and electronics.</p>
                                    
                                    <p>During my school days, I started experimenting with anything I could get my hands on. I downloaded C++, watched random tutorials, and searched silly things like <i>&quot;how to create games&quot;</i> or <i>&quot;how to hack WiFi.&quot;</i> I didn’t know where it would lead — I just knew technology excited me more than anything else.</p>
                                    
                                    <p>One day, my laptop suddenly stopped working. Instead of giving up, I tried fixing it myself by reinstalling the operating system. That single moment changed everything. From then on, I spent hours learning how computers worked — installing operating systems, troubleshooting hardware issues, fixing broken PCs, and understanding technology piece by piece.</p>
                                    
                                    <p>After school, I wanted to pursue a course related to computers, but my father initially didn’t support the idea. Somehow, I managed to get admission into a tier-3 college, and I paid my first semester fees through part-time jobs. Seeing how serious and passionate I was about technology, my family slowly began supporting my journey.</p>
                                    
                                    <p>During my final year of college, I discovered Flutter. I instantly fell in love with the idea of building beautiful apps from a single codebase. I started learning day and night and eventually created my first app — <strong>Tamil Stickers</strong>. I published it on the Play Store, and to my surprise, it crossed <strong>100,000+ downloads</strong>. Earning even a small amount through ads felt unreal. That was the moment I truly believed I could build a career doing what I love.</p>
                                    
                                    <p>Since then, I’ve worked with startups, built real-world applications, faced failures, and even experienced companies that didn’t pay salaries on time. But I never quit. Because for me, technology was never just about money — it was passion, curiosity, and the excitement of creating something meaningful.</p>
                                    
                                    <p>Today, I’m still learning, still building, and still chasing bigger dreams. I’m searching for an opportunity where I can contribute, grow, and continue doing what I genuinely love — building technology that impacts people.</p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                <motion.a
                    variants={slideInFromLeft(1)}
                    className='py-2 mt-4 button-primary text-center text-white cursor-pointer rounded-lg w-[200px]'
                    href='#contact'
                >
                    Let&apos;s Connect
                </motion.a>

            </div>
            <motion.div
                variants={slideInFromRight(0.8)}
                className='hidden lg:flex justify-center items-center'
            >
                <Image
                    src="/mainIconsdark.svg"
                    alt="work icons"
                    height={650}
                    width={650}
                    className='w-64 md:w-auto'
                    style={{ height: 'auto' }}
                    priority
                />

            </motion.div>
        </motion.div>
    )
}

export default HeroContent;
