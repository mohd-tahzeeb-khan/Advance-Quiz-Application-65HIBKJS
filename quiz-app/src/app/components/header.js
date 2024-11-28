import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Horizontalogo from '../../../public/Images/horizon logo.png'
// import Signup from '../userLogs/Signup'
// import Signup from '../userLogs/signup'
// import signup from '../userLogs/signup'
const header = () => {
  return (
    <>
    <div className='header w-full h-[8vh] bg-lightblue2 text-slate-700
    flex flex-row justify-between px-10 my-2'>
            <div className='logo min-w-[33%] p-0'><Image src={Horizontalogo} width={150} height={100} alt='logo' /></div>
        <div className='links min-w-[33%] 
        flex gap-12 items-center justify-center'>
            <Link className='hover:scale-105 hover:duration-200 text-2xl font-bold hover:text-slate-900' href={""}>Home</Link>
            <Link className='hover:scale-105 hover:duration-200 text-2xl font-bold hover:text-slate-900' href={""}>About</Link>
            <Link className='hover:scale-105 hover:duration-200 text-2xl font-bold hover:text-slate-900' href={""}>How to?</Link>

        </div>
        <div className='loginbtn min-w-[33%]
        flex gap-3 justify-end items-center
        font-bold text-xl'>
            <Link className='signup    hover:scale-105 hover:duration-150 px-4 py-2 border-2 cursor-pointer' href="/userLogs">Signup</Link>

            <Link href="/mcQuestions" className='loginbtn  hover:scale-105 hover:duration-150 px-4 py-2 border-2  cursor-pointer'>Login</Link>
        </div>


    </div>
    </>
  )
}

export default header