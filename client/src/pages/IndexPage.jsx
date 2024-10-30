import { useEffect, useState } from "react";
import Post from "../Post";
import { url } from "../utils/url";

export default function IndexPage(){
    const [posts,setPosts] = useState([]);
    const url = url;
    useEffect(()=>{
        fetch(`${url}/post`).then(response=>{
            response.json().then(post=>{
                setPosts(post);
            })
        })
    },[])
    return(
        <>
            {posts.length>0 && posts.map((post)=>{
                return <Post {...post} />;
            })}
        </>
    )
}