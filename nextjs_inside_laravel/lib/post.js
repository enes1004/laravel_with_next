
const api_path=process.env.NEXT_PUBLIC_LARAVEL_API;

export async function getAllPostsData() {
   const res= await fetch(api_path+"/api/post",{});
  return await res.json();
}

export async function getPostData(id) {
  return await fetch(`${api_path}/api/post/${id}`,{}).then(res=>res.json());
}

export async function getAllPostIds() {
  const res= await fetch(api_path+"/api/post",{});
  const data=await res.json();
  return data.map((one) => {
    return {
      params: {
        id: one.id.toString(),
      },
    };
  });
}