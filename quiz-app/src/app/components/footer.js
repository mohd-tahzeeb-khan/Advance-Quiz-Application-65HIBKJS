import Image from 'next/image'
import WholeLogo from '../../../public/Images/full logo.png'
import React from 'react'
const footer = () => {
  return (
    <>
    <div className='footer min-h-80 min-w-full
    flex justify-between px-10 border-white bg-lightblue border-2'>
        <div className='left min-w-[50%] my-auto mx-auto px-10'><Image src={WholeLogo} height={300} width={300} alt='logo'/></div>
        <div className='right min-w-[50%]'></div>

    </div>
    
    </>
  )
}

export default footer