import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Profile from './pages/Profile'
import About from './pages/About'
import { SignUp } from './pages/SignUp'
import { SignIn } from './pages/SignIn.jsx'
import Header from './Components/Header.jsx'
import PrivateRoute from './Components/PrivateRoute.jsx'
import CreateListing from './pages/CreateListing.jsx'
import UpdateListing from './pages/UpdateListing.jsx'
import Listing from './pages/Listing.jsx'
import Search from './pages/Search.jsx'




export default function App() {
  const [themeLight, setTheme] = useState(true);

  const onsetThemeHandler = () => {
    setTheme((status) => !status);
  };

  return (
   <BrowserRouter>
   <div className={`min-h-screen ${themeLight === true ? "" : "bg-[#0a1929] text-white"}`}>
   <Header themeStatus={themeLight} onSetTheme={onsetThemeHandler} />
   <Routes>
      <Route path='/' element={ <Home  themeStatus={themeLight} />} />
      <Route path='/about' element={<About /> } />
      <Route path='/listing/:id' element={ <Listing />} />
      <Route path='/search' element={ <Search />} />
      <Route element={<PrivateRoute />} >
      <Route path='/profile' element={ <Profile themeStatus={themeLight} />} />
      <Route path='/create-listing' element={<CreateListing />} />
      <Route path='/update-listing/:id' element={<UpdateListing />} />
      </Route>
      <Route path='/sign-up' element={ <SignUp />} />
      <Route path='/sign-in' element={ <SignIn />} />
   </Routes>
   </div> 
   </BrowserRouter>
  )
}
