import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Listingitem from '../component/Listingitem';

export default function Search() {
    const navigate = useNavigate();
    const [sidebardata, setSidebardata] = useState({
        searchTerm: ' ',
        type: 'all',
        parking: false,
        furnished: false,
        offer: false,
        sort: 'created_at',
        order: 'desc',
    });
    const [loading, setLoading] = useState(false);
    const [listings, setListings] =useState([]);
    console.log(listings);
    const handleChange = (e) => {
        if(e.target.id === 'all' || e.target.id === 'rent' || e.target.id === 'sale'){
            setSidebardata({
                ...sidebardata, 
                type: e.target.id
            });
        }

        if(e.target.id === 'searchTerm'){
            setSidebardata({
                ...sidebardata,
                searchTerm: e.target.value
            });
        }

        if(e.target.id === 'offer' || e.target.id === 'parking' || e.target.id === 'furnished'){
            setSidebardata({
                ...sidebardata,
                [e.target.id]: e.target.checked || e.target.checked === 'true' ? true : false,
            });
        }

        if(e.target.id === 'sort_order'){
            const sort = e.target.value.split('_')[0] || 'created_at';
            const order = e.target.value.split('_')[1] || 'desc';
            setSidebardata({
                ...sidebardata,
                sort,
                order,
            });
        }
    };
    
    // this hook use for fetching the previous data or updating the DOM(Document object model)
    useEffect(()=> {
        const urlParams = new URLSearchParams(location.search); // firstly get the info from url
        const searchTermFormUrl = urlParams.get('searchTerm');
        const typeFormUrl = urlParams.get('type');
        const parkingFormUrl = urlParams.get('parking');
        const furnishedFormUrl = urlParams.get('furnished');
        const offerFormUrl = urlParams.get('offer');
        const sortFormUrl = urlParams.get('sort');
        const orderFormUrl = urlParams.get('order');

        if(
            searchTermFormUrl || 
            typeFormUrl || 
            parkingFormUrl || 
            furnishedFormUrl || 
            offerFormUrl || 
            sortFormUrl || 
            orderFormUrl){
                setSidebardata({
                    searchTerm: searchTermFormUrl || ' ',
                    type: typeFormUrl || 'all',
                    parking: parkingFormUrl ==='true' ? true : false,
                    furnished: furnishedFormUrl ==='true' ? true : false,
                    offer: offerFormUrl === 'true' ? true: false,
                    sort: sortFormUrl || 'created_at',
                    order: orderFormUrl || 'desc',
                });
            }

            const fetchListings = async()=>{
                setLoading(true);
                const searchQuery = new URLSearchParams(urlParams).toString(); // we will get the urlParams info in this variable
                const res = await fetch(`/api/listing/get?${searchQuery}`);
                const data = await res.json(); // convert to json(javascript object notation)
                setListings(data);
                setLoading(false);
            };
            fetchListings();
    },[location.search]);
    const handleSubmit = (e) =>{
        e.preventDefault(); // default behaviour on form submission which refresh the page 

        const urlParams = new URLSearchParams(); // we will get the url parameters here
        urlParams.set('searchTerm',sidebardata.searchTerm)
        urlParams.set('type',sidebardata.type)
        urlParams.set('parking',sidebardata.parking)
        urlParams.set('furnished',sidebardata.furnished)
        urlParams.set('offer',sidebardata.offer)
        urlParams.set('sort',sidebardata.sort)
        urlParams.set('order',sidebardata.order)

        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    }
  return (
    <div className='flex flex-col md:flex-row'>
      <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">
        <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
            <div className=" flex items-center gap-2 ">
                <label className='whitespace-nowrap font-semibold'>Search Term:</label>
                <input 
                 type="text" 
                 placeholder='Search...' 
                 id="searchTerm"  
                 className='border rounded-lg p-3 w-full'
                 value={sidebardata.searchTerm}
                 onChange={handleChange}
                />
            </div>
            <div className="flex flex-wrap items-center gap-2">
                <label className='font-semibold'>Type:</label>
                <div className="flex gap-2">
                    <input 
                     type="checkbox" 
                     id="all" 
                     className='w-5'
                     onChange={handleChange}
                     checked={sidebardata.type === 'all'}
                    />
                     <span>Rent & Sale</span>
                </div>
                <div className="flex gap-2">
                    <input 
                     type="checkbox" 
                     id="rent" 
                     className='w-5'
                     onChange={handleChange}
                     checked={sidebardata.type === 'rent'}
                    />
                     <span>Rent</span>
                </div>
                <div className="flex gap-2">
                    <input 
                     type="checkbox" 
                     id="sale" 
                     className='w-5'
                     onChange={handleChange}
                     checked={sidebardata.type === 'sale'}
                    />
                     <span>Sale</span>
                </div>
                <div className="flex gap-2">
                    <input 
                     type="checkbox" 
                     id="offer" 
                     className='w-5'
                     onChange={handleChange}
                     checked={sidebardata.offer}
                    />
                     <span>Offer</span>
                </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
                <label className='font-semibold'>Amenities:</label>
                <div className="flex gap-2">
                    <input 
                     type="checkbox" 
                     id="parking" 
                     className='w-5'
                     onChange={handleChange}
                     checked={sidebardata.parking}
                    />
                     <span>Parking</span>
                </div>
                <div className="flex gap-2">
                    <input 
                     type="checkbox" 
                     id="furnished" 
                     className='w-5'
                     onChange={handleChange}
                     checked={sidebardata.furnished}
                    />
                     <span>Furnished</span>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <label className='font-semibold'>Sort:</label>
                <select 
                 onChange={handleChange} 
                 defaultValue={'created_at_desc'} 
                 id="sort_order" 
                 className='border rounded-lg p-3'
                 >
                    <option value='regularPrice_desc'>Price high to low</option>
                    <option value='regularPrice_asc'>Price low to high</option>
                    <option value='createdAt_desc'>Latest</option>
                    <option value='createdAt_asc'>Oldest</option>
                </select>
            </div>
            <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-80'>Search</button>
        </form>
      </div>
      <div className="flex-1">
         <h1 className='text-3xl font-semibold border-b p-3 text-slate-700 mt-5'>Listing Result :-</h1>
         <div className="p-7 flex flex-wrap gap-4">
            {!loading && listings.length === 0 &&(
                <p className='text-xl text-slate-700'>No Listing found!</p>
            )}
            {loading && (
                <p className='text-xl text-slate-700 uppercase text-center w-full'>Loading...</p>
            )}
            {!loading && listings && listings.map((listing)=>{
                return(
                    <Listingitem key={listing._id} listing={listing}>
                    </Listingitem>
                );
            })}
         </div>
      </div>
    </div>
  )
}
