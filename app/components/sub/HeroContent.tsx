"use client";

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { slideInFromLeft, slideInFromRight, slideInFromTop } from '@/utils/motion'
import { SparklesIcon } from '@heroicons/react/24/outline'
import MagneticPixelImage from './MagneticPixelImage';

const HeroContent = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            className='flex flex-col items-center px-6 md:px-20 mt-36 md:mt-40 w-full z-[20] gap-8'
        >
            {/* ── Top row: text left · avatar right ── */}
            <div className='flex flex-col md:flex-row items-center justify-center w-full gap-10'>

                {/* Left: name, tagline, CTA */}
                <div className='flex flex-col gap-5 justify-center items-center md:items-start text-center md:text-start flex-1'>

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
                    </motion.div>

                    {/* CTA buttons row */}
                    <motion.div
                        variants={slideInFromLeft(1)}
                        className='flex flex-wrap gap-3 items-center justify-center md:justify-start mt-2'
                    >
                        <a
                            className='py-2 px-6 button-primary text-center text-white cursor-pointer rounded-lg'
                            href='#contact'
                        >
                            Let&apos;s Connect
                        </a>

                        {/* Premium "Read My Story" button */}
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="relative group overflow-hidden flex items-center gap-2 text-sm font-semibold px-5 py-2 rounded-lg border border-purple-500/50 text-white transition-all duration-300 hover:border-purple-400 hover:shadow-[0_0_20px_rgba(112,66,248,0.4)]"
                            style={{
                                background: isExpanded
                                    ? 'linear-gradient(135deg, rgba(112,66,248,0.35), rgba(80,200,220,0.20))'
                                    : 'linear-gradient(135deg, rgba(112,66,248,0.18), rgba(80,200,220,0.08))',
                            }}
                        >
                            {/* shimmer sweep */}
                            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
                            <span className="text-[15px]">{isExpanded ? '✕' : '📖'}</span>
                            <span>{isExpanded ? 'Hide Story' : 'Read My Story'}</span>
                        </button>
                    </motion.div>
                </div>

                {/* Right: pixel avatar – never pushed down */}
                <motion.div
                    variants={slideInFromRight(0.8)}
                    className='flex justify-center items-center w-full md:w-auto shrink-0'
                >
                    <MagneticPixelImage />
                </motion.div>
            </div>

            {/* ── Story panel – full-width BELOW both columns ── */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.45, ease: 'easeInOut' }}
                        className="overflow-hidden w-full max-w-4xl"
                    >
                        <div className="text-base text-gray-300 space-y-4 p-6 bg-[#030014]/50 border border-[#2A0E61] rounded-2xl backdrop-blur-md text-left">
                            <h3 className="text-xl font-bold text-white mb-2">Who I Am</h3>

                            <p>I wasn&apos;t the kid who dreamed about becoming a software developer. I was the kid who spent countless hours playing computer games, fascinated by how virtual worlds worked. That curiosity slowly became an obsession with computers, technology, and electronics.</p>

                            <p>During my school days, I started experimenting with anything I could get my hands on. I downloaded C++, watched random tutorials, and searched silly things like <i>&quot;how to create games&quot;</i> or <i>&quot;how to hack WiFi.&quot;</i> I didn&apos;t know where it would lead — I just knew technology excited me more than anything else.</p>

                            <p>One day, my laptop suddenly stopped working. Instead of giving up, I tried fixing it myself by reinstalling the operating system. That single moment changed everything. From then on, I spent hours learning how computers worked — installing operating systems, troubleshooting hardware issues, fixing broken PCs, and understanding technology piece by piece.</p>

                            <p>After school, I wanted to pursue a course related to computers, but my father initially didn&apos;t support the idea. Somehow, I managed to get admission into a tier-3 college, and I paid my first semester fees through part-time jobs. Seeing how serious and passionate I was about technology, my family slowly began supporting my journey.</p>

                            <p>During my final year of college, I discovered Flutter. I instantly fell in love with the idea of building beautiful apps from a single codebase. I started learning day and night and eventually created my first app — <strong>Tamil Stickers</strong>. I published it on the Play Store, and to my surprise, it crossed <strong>100,000+ downloads</strong>. Earning even a small amount through ads felt unreal. That was the moment I truly believed I could build a career doing what I love.</p>

                            <p>Since then, I&apos;ve worked with startups, built real-world applications, faced failures, and even experienced companies that didn&apos;t pay salaries on time. But I never quit. Because for me, technology was never just about money — it was passion, curiosity, and the excitement of creating something meaningful.</p>

                            <p>Today, I&apos;m still learning, still building, and still chasing bigger dreams. I&apos;m searching for an opportunity where I can contribute, grow, and continue doing what I genuinely love — building technology that impacts people.</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}

export default HeroContent;
