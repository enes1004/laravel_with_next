// 'use client';
import Date from '@/app/_components/date';
import utilStyles from '@/styles/utils.module.css';

import { getAllPostsData } from '@/lib/post';
import Link from 'next/link';
import axios from 'axios';
import { Suspense, useEffect, useState } from 'react';
// import useSWR from 'swr';

export default async function PostList() {
  // const [data,setData]=useState<PostData[]>([]);
  // useEffect(()=>{
  //     if(data.length)return;
  //     const asyncCall=async ()=>setData(await fetch(process.env.NEXT_PUBLIC_LARAVEL_API+"/api/post",{cache:'no-store'}).then(res=>res.json()));
  //     asyncCall();
  //   },[])
    const data:PostData[] = await fetch(process.env.NEXT_PUBLIC_LARAVEL_API+"/api/post",{cache:'no-store'}).then(res=>res.json())
    // const data:PostData[] = await axios(process.env.NEXT_PUBLIC_LARAVEL_API+"/api/post").then(res=>res.data);
    console.log('rerender PostList');
    return (
      <Suspense>
       <ul className={utilStyles.list} style={{position:'absolute',left:0,maxWidth:'30vh'}}>
         {data.map(({ id, created_at, title,user }) => (
             <li className={utilStyles.listItem} key={id}>
              <Link href={`/post/${id}`}>
                {title}
                <br/>
                <div className={utilStyles.lightText}>
                  By {(user?.name)??"Anonymous"}
                </div>
              <br />

              <small className={utilStyles.lightText}>
                <Date dateString={created_at} />
              </small>
            </Link>

           </li>
         ))}
       </ul>
      </Suspense>
  );
}
