import { useContext, useState } from "react"
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import { url } from "../utils/url";

export default function LoginPage(){
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [redirect,setRedirect] = useState(false);
    const url2 = url;
    const {setUserInfo} = useContext(UserContext);

    async function login(event){
        event.preventDefault();
        const response = await fetch(`${url2}/login`,{
            method: 'POST',
            body:JSON.stringify({username,password}),
            headers:{'Content-Type': 'application/json',},
            credentials: 'include',
        })
        if(response.ok){
            response.json().then(userInfo=>{
                setUserInfo(userInfo);
                setRedirect(true);
            })
        }else{
            alert('Invalid username or password');
        }
    }

    if(redirect){
        return <Navigate to={'/'}/>
    }

    return (
        <form className="login" onSubmit={login}>
            <h1>Login</h1>
            <input type="text" placeholder="username" value={username} onChange={(e)=>{setUsername(e.target.value)}} />
            <input type="password" placeholder="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
            <button>Login</button>
        </form>
    )
}