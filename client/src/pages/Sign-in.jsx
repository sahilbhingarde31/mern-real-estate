import { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {signinStart, signinSuccess, signinFailure } from '../redux/user/userSlice';

export default function Signin() {
  const [formData, setFormData] = useState({})
  const {loading, error} = useSelector((state) => state.user);
  const navigate =useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) =>{
    setFormData({
       ...formData,
       [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async(e) =>{
    e.preventDefault();

    // for response and submit formdata into database
    
    try {
      dispatch(signinStart());
    const res = await fetch('/api/auth/signin', 
      {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json',
        },
        body: JSON.stringify(formData),
      }
    );
    const  data = await res.json();
    console.log(data);
    if(data.success === false){
       dispatch(signinFailure(data.message));
      return;
    }
    dispatch(signinSuccess(data));
    navigate('/'); // use for naviagte to home page
    } catch (error) {
      dispatch(signinFailure(error.message));
    }
  };
  return (
    <div className='mt-10 p-3 max-w-lg mx-auto shadow-lg shadow:opacity-0 bg-slate-200'>
      <h1 className='text-3xl text-center underline font-serif my-7'>Sign In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type="email" id="email" placeholder='E-mail' className='border-none p-3 rounded-lg font-semibold text-center' onChange={handleChange}/>
        <input type="password" id="password" placeholder='Password' className='border-none p-3 rounded-lg font-semibold text-center' onChange={handleChange}/>
        <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>{loading ? 'Loading...' : 'Sign in'}</button>
      </form>
      <div className="flex gap-3 mt-5">
        <p className='text-underline'>Dont Have an account?</p>
        <Link to={"/sign-up"}>
        <span className='text-blue-700 hover:underline'>Sign up</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  )
};
