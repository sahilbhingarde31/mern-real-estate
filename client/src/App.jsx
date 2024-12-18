import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Signin from './pages/Sign-in';
import Signup from './pages/Sign-up';
import About from './pages/About';
import Profile from './pages/Profile';
import Header from './component/Header';
import PrivateRoute from './component/PrivateRoute';

export default function App() {
  return (
     <BrowserRouter>
     <Header/>
     <Routes>
     <Route path='/' element={<Home/>}></Route>
     <Route path='/sign-in' element={<Signin/>}></Route>
     <Route path='/sign-up' element={<Signup/>}></Route>
     <Route path='/about' element={<About/>}></Route>
     <Route element={ <PrivateRoute/>}>
       <Route path='/profile' element={<Profile/>}></Route>
     </Route>
     </Routes>
     </BrowserRouter>
  );

}
