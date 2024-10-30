import { useState } from "react"
import { url } from "../utils/url";

export default function RegisterPage(){
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const url = url;
    async function register(event){
        event.preventDefault();
        const response = await fetch(`${url}/register`,{
            method: 'POST',
            body: JSON.stringify({username,password}),
            headers: {'Content-Type' : 'application/json'},
        })
        if(response.status == 200){
            alert("Registration Successful");
        }else{
            alert("Registration Failed");
        }
    }
    return (
        <form className="register" onSubmit={register}>
            <h1>Register</h1>
            <input type="text" placeholder="username" value={username} onChange={(e)=>{setUsername(e.target.value)}} />
            <input type="password" placeholder="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
            <button>Register</button>
        </form>
    )
}