import InfiniteCarousel from '@/components/InfiniteCarousel'
import TextReveal from '@/components/TextReveal'
import React from 'react'
import { projects } from '@/data/projects'

const page = () => {
  return (
    <main className='h-screen w-full bg-[#010101] flex items-center'>
      <InfiniteCarousel projects={projects} />
    </main>
  )
}

export default page