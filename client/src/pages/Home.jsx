import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/bundle';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import Listingitem from '../component/Listingitem';
import { FaCopyright } from 'react-icons/fa';

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  SwiperCore.use([Navigation]);
  console.log(offerListings);
  useEffect(()=>{
    const fetchOfferListings = async()=>{
      try {
        const res = await fetch('/api/listing/get?offer=true&limit=4');
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();//call after offerlisting get fetch
      } catch (error) {
        console.log(error);
      }
    }

    const fetchRentListings = async() =>{
      try {
        const res = await fetch('/api/listing/get?type=rent&limit=4');
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    }

    const fetchSaleListings = async() =>{
      try {
        const res = await fetch('/api/listing/get?type=sale&limit=4');
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchOfferListings();
  },[]);
  return (
    <div className='bg-slate-200 md:h-[3320px] sm:h-[3670px]'> 
      {/* top */}
      <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
        <h1 className=' flex gap-2 text-slate-700 font-bold text-3xl lg:text-6xl'>Find your next 
          <span className='text-slate-500'>perfect</span></h1>
        <h1 className='text-slate-700 font-bold text-3xl lg:text-6xl'>place with ease</h1>
        <div className="text-gray-400 text-xl sm:text-sm">
          <h2>HomeHaven is the best place to find your next perfect place to live.</h2>
          <h2>we have a wide range of properties for you to choose from.</h2>
        </div>
        <Link className='text-3xl sm:text-sm text-blue-800 font-bold hover:underline' to={'/search'}>
        Let's get started....
        </Link>
      </div>
      {/* swiper */}
      <Swiper navigation>
      {
        offerListings && offerListings.length > 0 && offerListings.map((listing)=>{
          return (
          <SwiperSlide>
            <div className="h-[500px]" key={listing._id} style={{background:`url(${listing.imageUrls[0]}) center no-repeat`, backgroundSize:'cover'}}></div>
          </SwiperSlide>
          );
        })
      }
      </Swiper>
      {/* listing results for offer, rent and sale */}

      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">

        {/* showing listing for Offer */}
        {
          offerListings && offerListings.length > 0 && (
            <div className="">
              <div className="my-3">
                <h2 className='text-2xl font-semibold text-slate-600'>Recent Offer</h2>
                <Link className='text-sm text-blue-800 hover:underline' to={'/search?offer=true'}>
                Show more offers
                </Link>
              </div>
              <div className="flex flex-wrap gap-2">
                {
                  offerListings.map((listing)=>{
                    return(
                    <Listingitem listing={listing} key={listing._id}></Listingitem>
                    );
                  })
                }
              </div>
            </div>
          )
        }

        {/* showing listing for Rent */}
        {
          rentListings && rentListings.length > 0 && (
            <div className="">
              <div className="my-3">
                <h2 className='text-2xl font-semibold text-slate-600'>Recent places for  Rent</h2>
                <Link className='text-blue-800 text-sm hover:underline' to={'/search?type=rent'}>Show more rents</Link>
              </div>
              <div className="flex flex-wrap gap-2">
                {
                  offerListings.map((listing) => {
                    return(
                      <Listingitem listing={listing} key={listing._id}></Listingitem>
                    );
                  })
                }
              </div>
            </div>
          )
        }

        {/* showing listing for Sale */}
        {
          saleListings && saleListings.length > 0 && (
            <div className="">
              <div className="my-3">
                <h2 className='text-2xl font-semibold text-slate-600'>Recent places for Sell</h2>
                <Link className='text-blue-800 text-sm hover:underline' to={'/search?type=sale'}>Show more Sell</Link>
              </div>
              <div className="flex flex-wrap gap-2">
                {
                  saleListings.map((listing => {
                    return(
                    <Listingitem listing={listing} key={listing._id}></Listingitem>
                    );
                  }))
                }
              </div>
            </div>
          )
        }
      </div>
    </div>
  )
}
