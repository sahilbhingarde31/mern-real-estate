import {Link} from 'react-router-dom';

export default function Signup() {
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign up</h1>
      <form className='flex flex-col gap-4'>
        <input type="text" id="username" placeholder='username' className='border p-3 rounded-lg' />
        <input type="text" id="email" placeholder='email' className='border p-3 rounded-lg' />
        <input type="text" id="password" placeholder='password' className='border p-3 rounded-lg' />
        <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>Sign up</button>
      </form>
      <div className="flex gap-3 mt-5">
        <p>Have an account?</p>
        <Link to={"/signin"}>
        <span className='text-blue-700'>Sign in</span>
        </Link>
      </div>
    </div>
  )
}
