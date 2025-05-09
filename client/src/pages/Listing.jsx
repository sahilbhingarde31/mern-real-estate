import { useEffect, useState } from 'react';
import {  useParams } from 'react-router-dom';
import { Swiper, SwiperSlide} from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import {
    FaBath,
    FaBed,
    FaChair,
    FaMapMarkedAlt,
    FaParking,
    FaShare
} from 'react-icons/fa';
import { useSelector } from 'react-redux';
import Contact from '../component/Contact';

export default function Listing() {
    SwiperCore.use((Navigation));
    const {currentUser} = useSelector((state) => state.user);
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [copied, setCopied] = useState(false);
    const [contact, setContact] =useState(false);
    const params = useParams();
    useEffect(()=> {
        const fetchListing = async () => {
            try {
                setLoading(true);
                const res = await fetch(`/api/listing/get/${params.listingId}`);
                const data = await res.json();
                if(data.success === false){
                    setError(true);
                    setLoading(false);
                    return;
                }
                setListing(data);
                setLoading(false);
                setError(false);
            } catch (error) {
                setError(true);  
                setLoading(false); 
            }
        }
        fetchListing();
    }, [params.listingId]);
  return (
    <main>
        {
         loading && <p className='text-center font-semibold my-7 text-2xl'>Loading...</p>
        }
        {
         error && <p className='text-red-700 font-bold text-center my-7 text-2xl'>OOP's,Something went wrong!</p>
        }
        {
            listing && !loading && !error && <div>
            <Swiper navigation>
                {listing.imageUrls.map((url) => {
                    return (
                    <SwiperSlide key={url}>
                        <div 
                         className="h-[450px]" 
                         style={{background:`url(${url}) center no-repeat`,
                         backgroundSize:'cover',
                         }}></div>
                    </SwiperSlide>)
                })}
            </Swiper>
            <div className="fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer">
                <FaShare className='text-slate-500' onClick={()=>{
                    navigator.clipboard.writeText(window.location.href);
                    setCopied(true);
                    setTimeout(()=>{
                        setCopied(true);
                    },2000);
                }}></FaShare>
            </div>
            {
                copied && (
                    <p 
                     className='fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2'
                     >
                        Link copied
                    </p>
                )
            }
            <div className="flex flex-col max-w-4xl mx-auto p-3 my-5 gap-4">
                <p className='text-2xl font-semibold'>
                {listing.name} - ₹{' '}
                {listing.offer
                   ? listing.discountPrice.toLocaleString('en-IN')  // Correct method and locale for Indian Rupees
                   : listing.regularPrice.toLocaleString('en-IN')
                }
                {listing.type === 'rent' && '/month'}
                </p>
                <p className='flex items-center  mt-6 gap-2 text-slate-600 text-sm'>
                    <FaMapMarkedAlt className='text-green-700'></FaMapMarkedAlt>
                    {listing.address}
                </p>
                <div className="flex gap-4 ">
                    <p className='bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
                        {listing.type === 'rent' ? 'For Rent' : 'For Sale'}
                    </p>
                    {
                        listing.offer && (
                            <p className='bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
                                ₹ {+listing.regularPrice - +listing.discountPrice }/- OFF
                            </p>
                        )
                    }
                </div>
                <p className='text-slate-800 truncate'>
                    <span className='font-semibold text-black'>Description - {' '} </span>
                    {listing.description}
                </p>
                <ul className='flex flex-wrap gap-4 sm:gap-6 text-green-900 font-semibold text-sm'>
                    <li className='flex items-center gap-2 whitespace-nowrap'>
                        <FaBed className='text-lg'></FaBed> {listing.bedrooms > 1 ? `${listing.bedrooms}beds` : `${listing.bedrooms}bed`}
                    </li>
                    <li className='flex items-center gap-2 whitespace-nowrap'>
                        <FaBath className='text-lg'></FaBath> {listing.bathrooms > 1 ? `${listing.bathrooms}beds` : `${listing.bathrooms}bed`}
                    </li>
                    <li className='flex items-center gap-2 whitespace-nowrap'>
                        <FaParking className='text-lg'></FaParking> {listing.parking ? 'Parking spot' : 'No Parking'}
                    </li>
                    <li className='flex items-center gap-2 whitespace-nowrap'>
                        <FaChair className='text-lg'></FaChair> {listing.furnished ? 'furnished' :'Unfurnished'}
                    </li>
                </ul>
                {currentUser && listing.userRef !== currentUser._id && !contact && (
                    <button onClick={()=>setContact(true)} className='bg-slate-700 text-white rounded-lg uppercase hover:opacity-90 p-3'>Contact LandLord</button>
                )}
                {contact && <Contact listing={listing}></Contact>}
            </div>
        </div>
    }          
    </main>
  )
}
