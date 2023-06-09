import { getAllPostIds, getPostData} from '@/lib/post';
import Head from 'next/head';
import Date from '@/components/date';
import utilStyles from '@/styles/utils.module.css';
import { Metadata } from 'next';
import MyDiv from '@/components/MyDiv';
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
    const postData = await getPostData(params.id);
    return <> 
      <h1 className={utilStyles.headingXl}>{postData?.title}</h1>
      <MyDiv className={utilStyles.lightText}>
        By {(postData?.user?.name)??"Anonymous"}
      </MyDiv>
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
