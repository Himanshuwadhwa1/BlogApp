import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";
import { url } from "./utils/url";

export default function Headers(){
    const url2 = url;
    const {userInfo, setUserInfo}= useContext(UserContext);
    useEffect(()=>{
        fetch(`${url2}/profile`,{ //get endpoint of api /profile to get cookies from webpage to api
            credentials:'include',
        }).then((response)=>{
            response.json().then((userInfo)=>{
                setUserInfo(userInfo);
            })
        });
    },[])

    async function logout(){
        await fetch(`${url2}/logout`,{ //get endpoint of api /logout to delete
            method: 'POST',
            credentials: 'include',
        });
        setUserInfo(null);
    }
    const username = userInfo?.username;
    return(
        <header>
        <Link to="/" className="logo">MyBlog</Link>
        <nav>
            {username && (
                <>
                    <span>Hello, {username}</span>
                    <Link to={'/create'}>Create New Post</Link>
                    <a onClick={logout}>Logout</a>
                </>
            )}
            {!username && (
                <>
                <Link to={'/login'} >Login</Link>
                <Link to={'/register'} >Register</Link>    
                </>
            )}
            
        </nav>
    </header>
    )
}