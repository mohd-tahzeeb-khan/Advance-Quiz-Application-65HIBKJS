import Image from 'next/image'
import WholeLogo from '../../../public/Images/full logo.png'
import React from 'react'
import Link from 'next/link'
import Instagram from '../../../public/icons/instagram.png'
import Youtube from '../../../public/icons/youtube.png'

import Website from '../../../public/icons/website.png'

import Linkedin from '../../../public/icons/linkedin.png'

import Github from '../../../public/icons/github.png'

const footer = () => {
  return (
    <>
    <div className='footer min-h-90 min-w-full
    flex flex-col justify-between px-10 border-white bg-lightblue border-2'>
      <div className='upper-footer flex justify-between'> 
        <div className='left min-w-[50%] my-auto mx-auto px-10'><Image src={WholeLogo} height={300} width={300} alt='logo'/></div>
        <div className='right  mx-auto text-black'>
          <ul className='flex flex-col gap-3 my-4'>
              <Link className='uppercase' href={''}>HOME</Link>
              <Link className='uppercase' href={''}>about</Link>
              <Link className='uppercase' href={''}>how to?</Link>
              <div className='flex gap-2 my-3'>
                <Image  src={Instagram} height={35} width={32} alt='social-instagram' />
                <Image  src={Youtube} height={35} width={32} alt='social-instagram' />
              </div>
          </ul>
        </div>
      </div>

      {/* <--------------Lower footer -----------------> */}
      <div className='lower-footer flex flex-row justify-between border-t-2 border-t-black pt-3 h-[100%]
                      '>
        <div className='px-3 justify-center items-center'>        
          <h2 className='text-black pt-3'>Designed and Developed By <strong ><Link className='hover:scale-110 hover:duration-150' href="">Mohammad Tahzeeb Khan</Link></strong></h2>
        </div>
        <div className='Socail-media-icons text-black flex gap-4 px-3'>
          <Link className='flex flex-col justify-center hover:scale-105 hover:duration-150' href={""}>
            
              <div className='text-center'><Image  src={Instagram} height={35} width={32} alt='social-instagram' /> </div>
              <div>Instagram</div> 
          </Link>
          <Link className='flex flex-col justify-center hover:scale-105 hover:duration-150' href={""}>
            <Image  src={Linkedin} height={35} width={32} alt='social-linkedin' />
            <div>Linkedin</div>
          </Link>
          <Link className='flex flex-col justify-center hover:scale-105 hover:duration-150' href={""}>
            <Image  src={Github} height={35} width={32} alt='social-github' />
            <div>Github</div>
          </Link>
          <Link className='flex flex-col justify-center hover:scale-105 hover:duration-150' href={""}>
            <Image  src={Youtube} height={35} width={32} alt='social-youtube' />
            <div>Youtube</div>
          
          </Link>
          <Link className='flex flex-col justify-center hover:scale-105 hover:duration-150' href={""}>
            <Image  src={Website} height={35} width={32} alt='social-website' />
            <div>website</div>
          </Link>
        </div>
      </div>

    </div>
    
    </>
  )
}

export default footer