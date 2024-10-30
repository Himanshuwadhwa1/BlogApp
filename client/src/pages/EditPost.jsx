import { useEffect, useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Navigate, useParams } from "react-router-dom";
import { url } from "../utils/url";


const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'code-block'],
    ['link', 'image', 'video', 'formula'],
  
    [{ 'header': 1 }, { 'header': 2 }], 
    [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
    [{ 'script': 'sub'}, { 'script': 'super' }],
    [{ 'indent': '-1'}, { 'indent': '+1' }],
    [{ 'direction': 'rtl' }],               
  
    [{ 'size': ['small', false, 'large', 'huge'] }],
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  
    [{ 'color': [] }, { 'background': [] }],        
    [{ 'font': [] }],
    [{ 'align': [] }],
  
    ['clean']                                  
  ];


export default function EditPost(){
    const {id} = useParams();

    const [title,setTitle] = useState('');
    const [summary,setSummary] = useState('');
    const [content,setContent] = useState('');
    const [files,setFiles] = useState('');
    const [redirect,setRedirect] = useState(false);
    const url2 = url;

    useEffect(()=>{
        fetch(`${url2}/post/${id}`).then(response =>{
            response.json().then(postInfo=>{
                setTitle(postInfo.title);
                setSummary(postInfo.summary);
                setContent(postInfo.content);
            })
        })
    },[])
    async function updatePost(ev){
        ev.preventDefault();
        const data = new FormData();
        data.set('title',title);
        data.set('summary',summary);
        data.set('content',content);
        data.set('id',id);
        if(files?.[0]){
            data.set('file',files?.[0])
        }
        
        const response = await fetch(`${url2}/post`,{
            method:'PUT',
            body:data,
            credentials:'include',
        })
        if(response.ok){
            setRedirect(true); 
        }
    }

    if(redirect){
        return <Navigate to={`/post/${id}`} />
    }
    return (
        <form onSubmit={updatePost}>
            <input type="title" placeholder={'title'} value={title} onChange={event=>{setTitle(event.target.value)}} />
            <input type="summary" placeholder={'summary'} value={summary} onChange={event=>{setSummary(event.target.value)}}/>
            <input type="file" placeholder={'title'} onChange={event=>{setFiles(event.target.files)}} />
            <ReactQuill modules={{toolbar:toolbarOptions}} placeholder={'Write summary'} value={content} onChange={setContent} />
            <button style={{marginTop : "15px"}}>Update Post</button>
        </form>
    )
}