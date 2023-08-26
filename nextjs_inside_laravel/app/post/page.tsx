import Date from '@/app/_components/date';
import utilStyles from '@/styles/utils.module.css';

import { getAllPostsData } from '@/lib/post';
import Link from 'next/link';
import { AppProps } from 'next/app';

export default async function Home() {
    const data = await getAllPostsData();
    return (
      <>
      <section className={utilStyles.headingMd}>
        <p>Lorem Ipsum tests preview function on vercel</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
       <h2 className={utilStyles.headingLg}>Blog</h2>
       <ul className={utilStyles.list}>
         {data.map(({ id, created_at, title,user }) => (
           <li className={utilStyles.listItem} key={id}>
             <Link href={`/post/${id}`}>{title}
              <br/>
              <div className={utilStyles.lightText}>
                By {(user?.name)??"Anonymous"}
              </div>
            </Link>
             <br />

             <small className={utilStyles.lightText}>
               <Date dateString={created_at} />
             </small>
           </li>
         ))}
       </ul>
     </section>
    </>
  );
}
