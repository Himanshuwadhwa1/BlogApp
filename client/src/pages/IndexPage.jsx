import { useEffect, useState } from "react";
import Post from "../Post";

export default function IndexPage(){
    const [posts,setPosts] = useState([]);
    useEffect(()=>{
        fetch('http://localhost:3000/post').then(response=>{
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