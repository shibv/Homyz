import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { signInStart , signInFaliure, signInSuccess} from '../redux/userSlice';
import OAuth from '../Components/OAuth';



export const SignIn = () => {
  const [formData, setFormData] = useState({});
 const {loading, error} = useSelector((state) => state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  


   const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const response = await fetch("/api/auth/signin", {
        method:"POST", 
        headers: {
          "Content-Type": "application/json",
        }, 
        body: JSON.stringify(formData),
      })
      const data = await response.json();
      console.log(data);
      if(data.success === false){
      
       dispatch(signInFaliure(data.message))
        return ;
      }
     dispatch(signInSuccess(data))
      navigate("/")
    } catch (error) {
      dispatch(signInFaliure(data.message))
    }
   }



  const handleChange = (e) => {

    setFormData({
      ...formData, 
      [e.target.id] : e.target.value
    })}







  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type='email'
          placeholder='email'
          className='border text-black p-3 rounded-lg'
          id='email'
          onChange={handleChange}
        />
        <input
          type='password'
          placeholder='password'
          className='border text-black p-3 rounded-lg'
          id='password'
          onChange={handleChange}
        />

        <button
          disabled={loading}
          className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
        >
          {loading ? 'Loading...' : 'Sign In'}
        </button>
      <OAuth />
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Dont have an account?</p>
        <Link to={'/sign-up'}>
          <span className='text-blue-700'>Sign up</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  )
}
