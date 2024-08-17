import { useState } from 'react'
import './App.css'
import Headers from './Headers'
import Post from './Post'
import {Routes,Route} from "react-router-dom"
import Layout from './Layout'
import IndexPage from './pages/IndexPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import { UserContext, UserContextProvider } from './UserContext'
import CreatePost from './pages/CreatePost'
import POstPage from './pages/PostPage'
import EditPost from './pages/EditPost'

function App() {

  return (
    <UserContextProvider>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<IndexPage/>} />
          <Route path={'/login'} element={<LoginPage/>  }/>
          <Route path={'/register'} element={<RegisterPage />}/>
          <Route path={'/create'} element={<CreatePost />} />
          <Route path={'/post/:id'} element={<POstPage />} />
          <Route path={'/edit/:id'} element={<EditPost />} />
        </Route>
      
      </Routes>

    </UserContextProvider>
    
    
  )
}

export default App
