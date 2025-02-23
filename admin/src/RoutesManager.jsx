import React from 'react'
import { Route, Routes } from 'react-router-dom'
import BlogEditor from './pages/BlogEditor'

function RoutesManager() {
  return (
    <>
        <Routes>
            <Route exact path="/" element ={<>blogs</>} />
            <Route exact path="/blogs" element ={<>blogs</>} />
            <Route exact path="/create-blog" element ={<BlogEditor />} />
            <Route exact path="/profile" element ={<>Profile</>} />
            
        </Routes>
    </>
  )
}

export default RoutesManager