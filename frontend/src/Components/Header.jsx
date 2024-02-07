import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaSearch } from 'react-icons/fa';
import { useSelector } from 'react-redux'
import { GoSun } from "react-icons/go";
import { IoMoonOutline } from "react-icons/io5";



const Header = ({ themeStatus, onSetTheme }) => {
  const navigate = useNavigate();
  const {currentUser} = useSelector((state) => state.user)
  const [searchTerm, setSearchTerm]  = useState();


  const handleSubmit = (e) =>{
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);

  };


  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTerm = urlParams.get('searchTerm');
    if (searchTerm) {
      setSearchTerm(searchTerm);
    }
  }, [location.search])
    
  return (
    <header >
    <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
      <Link to='/'>
        <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
          <span className=' font-bold'>Hoomyz</span>
          <span className='text-slate-500 font-bold'>Estate</span>
        </h1>
      </Link>
      <form
        onSubmit={handleSubmit}
        className='bg-slate-100 p-3 rounded-lg flex items-center'
      >
        <input
          type='text'
          placeholder='Search...'
          className='bg-transparent text-black focus:outline-none w-24 sm:w-64'
          value={searchTerm}
           onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button>
          <FaSearch className='text-slate-600' />
        </button>
      </form>
      <ul className='flex gap-4'>
        <Link to='/'>
          <li className='hidden sm:inline font-semibold hover:underline'>
            Home
          </li>
        </Link>
        <Link to='/about'>
          <li className='hidden sm:inline  font-semibold hover:underline'>
            About
          </li>
        </Link>
        <Link to='/profile'>
          {currentUser ? (
            <img
              className='rounded-full h-7 w-7 object-cover'
              src={currentUser.avatar}
              alt='profile'
            />
          ) : (
            <li className=' text-slate-700 hover:underline'> Sign in</li>
          )}
           {/* <li className=' text-slate-700 hover:underline'> Sign in</li> */}
        </Link>
        <li>
        {themeStatus ? (
          <GoSun className="text-3xl cursor-pointer" onClick={onSetTheme} />
        ) : (
          <IoMoonOutline
            className="text-3xl cursor-pointer"
            onClick={onSetTheme}
          />
        )}
        </li>
      </ul>
    </div>
  </header>
  )
}

export default Header
