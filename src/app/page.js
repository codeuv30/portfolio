import TextReveal from '@/components/TextReveal'
import React from 'react'

const page = () => {
  return (
    <main className='h-[300vh] w-full bg-[#010101]'>
      <div className="h-[50%]"></div>
      <TextReveal splitBy="words" trigger="scroll" className="text-[3rem] text-white">Hello Everyone</TextReveal>
    </main>
  )
}

export default page