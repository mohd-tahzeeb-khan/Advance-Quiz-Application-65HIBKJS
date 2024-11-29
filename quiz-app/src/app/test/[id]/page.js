'use client'

import { useEffect, useState } from "react";

//import { useRouter } from 'next/navigation';
export default function Page({params}) {
  const [id, setid] = useState(0);
 useEffect(() => {
   const { id }=params;
   setid(id)
   console.log(`${id}`);

 
   return () => {
    // <div>Exam ID: {id}</div>;
   }
 }, [id])
 
  return <div>Exam ID: {id}</div>;
}
