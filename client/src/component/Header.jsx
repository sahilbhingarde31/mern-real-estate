import { FaSearch } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
export default function header() {
  const {currentUser } = useSelector(state => state.user)
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search); //get previus data in url
    urlParams.set('searchTerm',searchTerm); 
    const searchQuery = urlParams.toString(); //convert urlParams because some are number or char
    navigate(`/search?${searchQuery}`);
  };

  useEffect(()=>{
    const urlParams = new URLSearchParams(location.search);
    const searchTermFormUrl = urlParams.get('searchTerm');
    if(searchTermFormUrl){
      setSearchTerm(searchTermFormUrl);
    }
  },[location.search]);
  return (
    <header className='bg-transparent shadow-md sticky top-0 backdrop-blur-md shadow-md z-50'>
        <div className='flex justify-between items-center max-w-6xl mx-auto p-3'> 
        <Link to='/'>
         <div className="flex gap-2 hover:underline">
           <img className='w-8 h-8 rounded-lg flex' src="/company logo/logo.png" alt="" />
           <h1 className='font-bold text-sm:text-xl flex flex-wrap '>
             <span className='text-slate-500 text-xl'>Home</span>
             <span className='text-slate-700 text-xl'>Haven</span>
           </h1>
         </div>
        </Link>
        <form onSubmit={handleSubmit} className='bg-slate-300 p-3 rounded-lg flex items-center'>
            <input type="text" placeholder='Search...' className='bg-transparent focus:outline-none w-24 sm:w-64' value={searchTerm} onChange={((e)=>setSearchTerm(e.target.value))}/>
            <button>
              <FaSearch className='text-slate-600'/>
            </button>
        </form>
        <ul className='flex gap-4'>
            <Link to='/'>
            <li className='hidden sm:inline text-slate-800 hover:underline'>Home</li>
            </Link>
            <Link to='/about'>
            <li className='hidden sm:inline  text-slate-800 hover:underline'>About</li>
            </Link>
            <Link to='/profile'>
            { currentUser ? (
              <img className='rounded-full h-7 w-7 object-cover' src={ currentUser.avatar} alt="profile" />
            ): (<li className='text-slate-800 hover:underline'>{' '}Sign in</li>)}
            </Link> 
        </ul>
        </div>
    </header>
  )
}
