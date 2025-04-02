import { useEffect, useState } from "react";
import Post from "../Post";
import { url } from "../utils/url";
import {OrbitProgress} from "react-loading-indicators"

export default function IndexPage(){
    const [posts,setPosts] = useState([]);
    const [isloading,setIsloading] = useState(true);
    const url2 = url;
    useEffect(()=>{
        fetch(`${url2}/post`).then(response=>{
            response.json().then(post=>{
                if(post){
                    setIsloading(false);
                }
                setPosts(post);
            })
        })
    },[])
    return(
        <>
        {isloading && (
            <div className="loading">
                <OrbitProgress variant="dotted" color="#888" size="large" text="" textColor="" />
            </div>
        ) }
            {!isloading && posts.length>0 && posts.map((post)=>{
                return <Post {...post} />;
            })}
        </>
    )
}