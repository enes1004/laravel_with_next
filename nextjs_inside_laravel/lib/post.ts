

const api_path=process.env.NEXT_PUBLIC_LARAVEL_API;

export async function getAllPostsData():Promise< Array<PostData> > {
   const res= await fetch(api_path+"/api/post",{});
  return await res.json();
}

export async function getPostData(id: number): Promise<PostData> {
  return await fetch(`${api_path}/api/post/${id}`,{}).then(res=>res.json());
}

export async function getAllPostIds():Promise< Array<{id:number} >> {
  const res= await fetch(api_path+"/api/post",{});
  const data=await res.json();
  return data.map((one: PostData) => {
    return {
        id: one.id.toString(),
      }
  });
}