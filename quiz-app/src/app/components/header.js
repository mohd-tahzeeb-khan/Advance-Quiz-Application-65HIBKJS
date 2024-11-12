import React from 'react'
import Link from 'next/link'
const header = () => {
  return (
    <>
    <div className='header w-full h-[8vh] bg-lightblue2 text-slate-700
    flex flex-row justify-between px-10 py-5'>
            <div className='logo min-w-[33%]'></div>
        <div className='links min-w-[33%] 
        flex gap-12 items-center justify-center'>
            <Link className='hover:scale-105 hover:duration-200 text-2xl font-bold hover:text-slate-900' href={""}>Home</Link>
            <Link className='hover:scale-105 hover:duration-200 text-2xl font-bold hover:text-slate-900' href={""}>About</Link>
            <Link className='hover:scale-105 hover:duration-200 text-2xl font-bold hover:text-slate-900' href={""}>How to?</Link>

        </div>
        <div className='loginbtn min-w-[33%]
        flex gap-3 justify-end items-center
        font-bold text-xl'>
            <div className='signup    hover:scale-105 hover:duration-150 px-4 py-2 border-2'>Signup</div>
            <div className='loginbtn  hover:scale-105 hover:duration-150 px-4 py-2 border-2  '>Login</div>
        </div>


    </div>
    </>
  )
}

export default header