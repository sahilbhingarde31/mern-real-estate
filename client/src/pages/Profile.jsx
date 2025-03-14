import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from "../firebase";
import {updateuserStart, updateuserSuccess, updateuserFailure, deleteuserFailure, deleteuserStart, deleteuserSuccess, signoutStart, signoutFailure, signoutSuccess } from '../redux/user/userSlice.js';
import { useDispatch } from "react-redux";

export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0); 
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const dispatch = useDispatch();
  // firebase storage
  // allow Read;
  // allow write: if
  // request.resource.size<2*1024*1024 &&
  // request.resource.contentType.matches('image/.*')

  useEffect(() =>{
    if(file){
      handleFileUpload(file);
    }
  },[file]);
   
    // create EventHandler for FileUpload
  const handleFileUpload = (file) =>{
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
      (snapshot) =>{
        const progress = (snapshot.bytesTransferred/
        snapshot.totalBytes) * 100;
        setFilePerc[Math.round(progress)]
      },
      (error) =>{
      setFileUploadError(true);
      },
      () =>{
      getDownloadURL(uploadTask.snapshot.ref).then
      ((downloadURL) =>
        setFormData({...formData, avatar: downloadURL})
      ); 
     }
    );
  };

   // create EventHandler for Changing the data
  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value});
  };

    // create EventHandler for Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateuserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`,
        {
          method: 'POST',
          headers: {
            'Content-Type' : 'application/json',
          },
          body: JSON.stringify(formData),
        });
        const data =await res.json();
        if(data.success === false){
          dispatch(updateuserFailure(data.message));
          return;
        }

        dispatch(updateuserSuccess(data));
        setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateuserFailure(error.message));
    }
  };

  // create EventHandler for DeleteUser account
  const handleDeleteUser = async () => {
    try {
      dispatch(deleteuserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`,{
        method: 'DELETE',
    });
     const data = await res.json();
     if(data.success === false){
      dispatch(deleteuserFailure(data.message));
      return;
     }
     dispatch(deleteuserSuccess(data));
    } catch (error) {
      dispatch(deleteuserFailure(error.message));
    }
  };

  // create EventHandler for SignOut 
  const handlesignout = async () => {
    try {
      dispatch(signoutStart());
      const res = await fetch('/api/auth/signout');
      const data = await res.json();
      if(data.success === false){
        dispatch(deleteuserFailure(data.message));
        return;
      }
      dispatch(deleteuserSuccess(data));
    } catch (error) {
      dispatch(deleteuserFailure(data.message));
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto my-9 p-3 max-w-lg mx-auto shadow-lg shadow:opacity-0 bg-slate-200">
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
         onChange={(e) => setFile(e.target.files[0])} 
         type="file"
         ref={ fileRef } 
         hidden 
         accept="image/*"/>
        <img 
         onClick={() => fileRef.current.click()} 
         src={formData.avatar || currentUser.avatar} 
         alt="Profile" 
         className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"/>
        <p className="text-sm self-center">
          {fileUploadError ? (
            <span className="text-red-700">Error Image upload</span>) :
          filePerc > 0 && filePerc < 100 ? 
            (<span className ="text-slate-700">
              {`uploading ${filePerc}%`}
            </span>) :
            filePerc === 100 ? 
           (<span className="text-green-700">Image Successfully upload</span>)
            :(
            "")
          }
        </p>
        <input 
         type="text"
         placeholder="Username" 
         id="username"   
         defaultValue={currentUser.username}
         className="border p-3 rounded-lg" 
         onChange={handleChange}
        />
        <input 
         type="text" 
         placeholder="Email" 
         id="email" 
         defaultValue={currentUser.email}
         className="border p-3 rounded-lg" 
         onChange={handleChange}
        />
        <input 
         type="password" 
         placeholder="Password" 
         id="password" 
         className="border p-3 rounded-lg" 
         onChange={handleChange}
        />
        <button disabled={loading} className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-90 disabled:opacity-80">{loading ? 'Loading...' : 'Update'}</button>
      </form>
      <div className="flex justify-between mt-5">
        <span onClick={handleDeleteUser} className="text-red-700 cursor-pointer">Delete account</span>
        <span onClick={handlesignout} className="text-red-700 cursor-pointer">Sign out</span>
      </div>
      <p className="text-red-700 mt-5">{error ? error : ''}</p>
      <p className="text-green-700 mt-5">{updateSuccess ? 'user is updated Successfully!' : ''}</p>
    </div>
  )
}
