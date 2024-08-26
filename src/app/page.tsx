
'use client';

import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "../pages/main";
import Welcome from "../pages/entry";



export default function Home() {

  
  

  return (
    <BrowserRouter>
    <Routes>
      <Route path = "/" element = {<Welcome></Welcome>}></Route>
      <Route path = "/main" element = {<Main></Main>}></Route>
      <Route path = "*" element = {<Welcome></Welcome>}></Route>
    </Routes>
    </BrowserRouter>
    
  );
  
}
