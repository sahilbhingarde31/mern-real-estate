import { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import OAuth from '../component/OAuth';

export default function Signup() {
  const [formData, setFormData] = useState({})
  const [error, setError] = useState(null);
  const [loading, setLoading] =useState(false);
  const navigate =useNavigate();
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
      setLoading(true);
    const res = await fetch('/api/auth/signup', 
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
      setLoading(false);
      setError(data.message);
      return;
    }
    setLoading(false);
    setError(null);
    navigate('/sign-in'); // use for naviagte signup page to signin page
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };
  return (
    <div className='my-9 p-3 max-w-lg mx-auto shadow-lg shadow:opacity-0 bg-slate-200'>
      <h1 className='text-3xl text-center underline font-serif my-7'>Sign up</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type="text" id="username" placeholder='Username' className='border-none p-3 rounded-lg font-semibold text-center' onChange={handleChange}/>
        <input type="email" id="email" placeholder='E-mail' className='border-none p-3 rounded-lg font-semibold text-center' onChange={handleChange}/>
        <input type="password" id="password" placeholder='Password' className='border-none p-3 rounded-lg font-semibold text-center' onChange={handleChange}/>
        <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>{loading ? 'Loading...' : 'Sign Up'}</button>
        <OAuth/>
      </form>
      <div className="flex gap-3 mt-5">
        <p className='text-underline'>Have an account?</p>
        <Link to={"/sign-in"}>
        <span className='text-blue-700 hover:underline'>Sign in</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  )
};
