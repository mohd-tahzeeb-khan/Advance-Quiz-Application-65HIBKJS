import React from 'react'
import Link from 'next/link'
const header = () => {
  return (
    <>
    <div className='header w-full h-[10vh] bg-slate-500
    flex flex-row justify-between px-40'>
        <div className='logo'></div>
        <div className='links flex gap-5 items-center justify-center'>
            <Link href={""}>Home</Link>
            <Link href={""}>About</Link>
            <Link href={""}>How to ?</Link>

        </div>
        <div className='loginbtn'>
            <div className='signup'>Signup</div>
            <div className='loginbtn'>Login</div>
        </div>


    </div>
    </>
  )
}

export default header