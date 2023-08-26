import { getAllPostIds, getPostData} from '@/lib/post';
import utilStyles from '@/styles/utils.module.css';
import Link from 'next/link';
import { useEffect } from 'react';
// export async function getServerSideProps(info){
//   console.log(info);
//   return {props:{}};
// }

// export async function generateMetadata({ params }:{params:{id:number}}) {
//     return {
//       title: params.title,
//     };
//   }
export async function generateStaticParams() {
  const paths = await getAllPostIds();
  return paths;
}

export default async function Post({params}:{params:{id:number}}) {
    const postData= await fetch(`${process.env.NEXT_PUBLIC_LARAVEL_API}/api/post/${params.id}`).then(res=>res.json());
    console.log('will rerender post');
    return <> 
      <h1 className={utilStyles.headingXl}>{postData?.title}</h1>
      <div className={utilStyles.lightText}>
        By {(postData?.user?.name)??"Anonymous"}
      </div>
      <div className={utilStyles.lightText}>
        {/* {postData?<Date dateString={postData.created_at} />:null} */}
      </div>
      <div dangerouslySetInnerHTML={{ __html: postData?.content }} />
  </>;
}

// export async function getServerSideProps({ params,req,res }) {
//   console.log("get again getPostDataForCaching");
//   const postData = await getPostDataForCaching(params.id);
//   const session= JSON.parse(JSON.stringify(await getServerSession(req, res, authOptions)))
//   return {
//     props: {
//       postData,
//       session,
//     },
//   };
// }
