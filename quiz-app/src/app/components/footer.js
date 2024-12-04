import Image from 'next/image'
import WholeLogo from '../../../public/Images/full logo.png'
import React from 'react'
import Link from 'next/link'
import Instagram from '../../../public/icons/instagram.png'
import Youtube from '../../../public/icons/youtube.png'

import Website from '../../../public/icons/website.png'

import Linkedin from '../../../public/icons/linkedin.png'

import Github from '../../../public/icons/github.png'

// const footer = () => {
//   return (
//     <>
//     <div className='footer min-h-90 min-w-full
//     flex flex-col justify-between px-10 border-white bg-lightblue border-2'>
//       <div className='upper-footer flex justify-between'> 
//         <div className='left min-w-[50%] my-auto mx-auto px-10'><Image src={WholeLogo} height={300} width={300} alt='logo'/></div>
//         <div className='right  mx-auto text-black'>
//           <ul className='flex flex-col gap-3 my-4'>
//               <Link className='uppercase' href={''}>HOME</Link>
//               <Link className='uppercase' href={''}>about</Link>
//               <Link className='uppercase' href={''}>how to?</Link>
//               <div className='flex gap-2 my-3'>
//                 <Image  src={Instagram} height={35} width={32} alt='social-instagram' />
//                 <Image  src={Youtube} height={35} width={32} alt='social-instagram' />
//               </div>
//           </ul>
//         </div>
//       </div>

//       {/* <--------------Lower footer -----------------> */}
//       <div className='lower-footer flex flex-row justify-between border-t-2 border-t-black pt-3 h-[100%]
//                       '>
//         <div className='px-3 justify-center items-center'>        
//           <h2 className='text-black pt-3'>Designed and Developed By <strong ><Link className='hover:scale-110 hover:duration-150' href="">Mohammad Tahzeeb Khan</Link></strong></h2>
//         </div>
//         <div className='Socail-media-icons text-black flex gap-4 px-3'>
//           <Link className='flex flex-col justify-center hover:scale-105 hover:duration-150' href={""}>
            
//               <div className='text-center'><Image  src={Instagram} height={35} width={32} alt='social-instagram' /> </div>
//               <div>Instagram</div> 
//           </Link>
//           <Link className='flex flex-col justify-center hover:scale-105 hover:duration-150' href={""}>
//             <Image  src={Linkedin} height={35} width={32} alt='social-linkedin' />
//             <div>Linkedin</div>
//           </Link>
//           <Link className='flex flex-col justify-center hover:scale-105 hover:duration-150' href={""}>
//             <Image  src={Github} height={35} width={32} alt='social-github' />
//             <div>Github</div>
//           </Link>
//           <Link className='flex flex-col justify-center hover:scale-105 hover:duration-150' href={""}>
//             <Image  src={Youtube} height={35} width={32} alt='social-youtube' />
//             <div>Youtube</div>
          
//           </Link>
//           <Link className='flex flex-col justify-center hover:scale-105 hover:duration-150' href={""}>
//             <Image  src={Website} height={35} width={32} alt='social-website' />
//             <div>website</div>
//           </Link>
//         </div>
//       </div>

//     </div>
    
//     </>
//   )
// }

// export default footer



const footer = () => {
  return (
    <footer className="bg-slate-700 text-white py-6 border-t-2 border-t-white">
      <div className="container mx-auto px-4">
        {/* Top Section */}
        <div className="md:flex justify-between items-start space-y-6 md:space-y-0">
          {/* About Section */}
          {/* <div className="md:w-1/3">
            <h3 className="text-lg font-bold mb-2">About QuizApp</h3>
            <p>
              QuizApp is a platform to take and manage quizzes seamlessly. 
              Perfect for students, teachers, and organizations.
            </p>
          </div> */}

          {/* Links Section */}
          <div className="md:w-1/3 ml-5">
            <h3 className="text-lg font-bold mb-2">Quick Links</h3>
            <ul>
              <li>
                <a href="/" className="hover:text-gray-300">Home</a>
              </li>
              <li>
                <a href="/about" className="hover:text-gray-300">About</a>
              </li>
              <li>
                <a href="/Courses" className="hover:text-gray-300">Quizzes</a>
              </li>
              <li>
                <a href="/contact" className="hover:text-gray-300">Contact</a>
              </li>
            </ul>
          </div>
          <div className='flex flex-col'>
            <div className='flex flex-col gap-3 justify-center'>
            <Link className="bg-green-500 text-blue-600 px-4 py-2 rounded hover:bg-gray-100 mr-2 hover:text-black" href="/Auth/user-login">
             Login
            </Link>
            <Link className="bg-green-500 text-blue-600 px-4 py-2 rounded hover:bg-green-600" href="/Auth/user-signup">
             Sign Up
            </Link>
          </div>
            </div>
          {/* Developers Section */}
          <div className="md:w-1/3">
            <h3 className="text-lg font-bold mb-2">Developed By</h3>
            <p>
              <strong>Mohammad Tahzeeb Khan</strong><br />
              Diploma(CSE) | Btech(CSE) | MBA(HR/FM)<br />
              Full Stack Java Developer Intern at <a href="https://www.innobyteservices.com/" className="text-gray-300 hover:underline">Inno Bytes Services Ltd.</a><br />
              
            </p>
            <p className="mt-2">
              Connect with me on:
              <a
                href="https://github.com/mohammadtahzeebkhan"
                className="text-gray-300 hover:underline ml-1"
              >
                GitHub
              </a>
              |
              <a
                href="https://linkedin.com/in/mohammadtahzeebkhan"
                className="text-gray-300 hover:underline ml-1"
              >
                LinkedIn
              </a>
            </p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-6 border-t border-gray-400 pt-4 text-center">
          <p>
            &copy; {new Date().getFullYear()} QuizApp. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default footer;
