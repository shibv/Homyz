import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ListingCard from '../Components/ListingCard';


function Search() {

   const [loading, setLoading] = useState(false);
   const navigate = useNavigate();
   const [listing, setListing] =useState([])
   const [showMore, setShowMore] = useState(false);
   const [sidebardata, setSideBarData] = useState({
    searchTerm: '',
    type: 'all',
    parking: false,
    furnished: false,
    offer: false,
   sort: 'created_at',
   order :'desc', 

   });
  //  console.log(listing);

   useEffect(() => {
     const urlparams = new URLSearchParams(window.location.search);
     const searchTermFromURL = urlparams.get('searchTerm');
     const typeFromURL = urlparams.get('type');
     const parkingFromURL = urlparams.get('parking');
     const furnishedFromURL = urlparams.get('furnished');
     const offerFromURL = urlparams.get('offer');
     const sortFromURL = urlparams.get('sort');
     const orderFromURL = urlparams.get('order');

     if(searchTermFromURL || typeFromURL || parkingFromURL || furnishedFromURL || offerFromURL || sortFromURL || orderFromURL){
      setSideBarData({
        searchTerm: searchTermFromURL || '',
        type: typeFromURL || 'all',
        parking: parkingFromURL  === 'true' ? true : false,
        furnished: furnishedFromURL === 'true' ? true : false,
        offer: offerFromURL === 'true' ? true : false,
        sort: sortFromURL || 'created_at',
        order: orderFromURL || 'desc',
      })
     }

     const fetchListings = async () => {
         setLoading(true);
         setShowMore(false)
         const serachQuery = urlparams.toString();
         const res = await fetch(`/api/listings/get?${serachQuery}`);
         const data = await res.json();
        
         if(data.length > 5){
            setShowMore(true);
         }
         setLoading(false);
         setListing(data)
     }

     fetchListings();



   }, [location.search])


    const handleSubmit = (e) => {
      e.preventDefault();
      const urlparams = new URLSearchParams(window.location.search);
      urlparams.set('searchTerm', sidebardata.searchTerm);
      urlparams.set('type', sidebardata.type);
      urlparams.set('parking', sidebardata.parking);
      urlparams.set('furnished', sidebardata.furnished);
      urlparams.set('offer', sidebardata.offer);
      urlparams.set('sort', sidebardata.sort);
      urlparams.set('order', sidebardata.order);
      // search query by converting this to string and then adding it to the url
      const serachQuery = urlparams.toString();
      navigate(`/search?${serachQuery}`);
        
    }

    const handleChange = (e) => {

      if(e.target.id==='all' || e.target.id==='rent' || e.target.id==='sale'){
        setSideBarData({...sidebardata, type : e.target.id})
      }

      if(e.target.id === 'searchTerm'){
        setSideBarData({...sidebardata, searchTerm: e.target.value})
      }

      if(e.target.id==='parking' || e.target.id==='furnished' || e.target.id==='offer'){
        setSideBarData({...sidebardata, [e.target.id] : e.target.checked || e.target.checked === 'true' ? true : false})
      }

      if(e.target.id ==='sort_order'){
       const sort = e.target.value.split('_')[0] || 'created_at';
       const order = e.target.value.split('_')[1] || 'desc';
       setSideBarData({...sidebardata, sort, order});
      }
      
    }

    const onShowMoreClick = async() =>{
       const numberOfListings = listing.length;
       const startIndex = numberOfListings;
       const urlparams = new URLSearchParams(window.location.search);
       urlparams.set('startIndex', startIndex);
       const serachQuery = urlparams.toString();
       const res = await fetch(`/api/listings/get?${serachQuery}`);
       const data = await res.json();
       if(data.length<6) {
        setShowMore(false);
       }

       setListing([...listing, ...data]);
    }

    console.log(sidebardata);
  return (
    <div className='flex flex-col md:flex-row'>
    <div className='p-7  border-b-2 md:border-r-2 md:min-h-screen'>
      <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
        <div className='flex items-center gap-2'>
          <label className='whitespace-nowrap font-semibold'>
            Search Term:
          </label>
          <input
            type='text'
            id='searchTerm'
            placeholder='Search...'
            className='border text-black rounded-lg p-3 w-full'
            value={sidebardata.searchTerm}
           onChange={handleChange}
          />
        </div>
        <div className='flex gap-2 flex-wrap items-center'>
          <label className='font-semibold'>Type:</label>
          <div className='flex gap-2'>
            <input
              type='checkbox'
              id='all'
              className='w-5'
             onChange={handleChange}
             checked={sidebardata.type === 'all'}
            />
            <span>Rent & Sale</span>
          </div>
          <div className='flex gap-2'>
            <input
              type='checkbox'
              id='rent'
              className='w-5'
              onChange={handleChange}
              checked={sidebardata.type === 'rent'}
            />
            <span>Rent</span>
          </div>
          <div className='flex gap-2'>
            <input
              type='checkbox'
              id='sale'
              className='w-5'
               onChange={handleChange}
               checked={sidebardata.type === 'sale'}
            />
            <span>Sale</span>
          </div>
          <div className='flex gap-2'>
            <input
              type='checkbox'
              id='offer'
              className='w-5'
              onChange={handleChange}
              checked={sidebardata.offer}
            />
            <span>Offer</span>
          </div>
        </div>
        <div className='flex gap-2 flex-wrap items-center'>
          <label className='font-semibold'>Amenities:</label>
          <div className='flex gap-2'>
            <input
              type='checkbox'
              id='parking'
              className='w-5'
              onChange={handleChange}
              checked={sidebardata.parking}
            />
            <span>Parking</span>
          </div>
          <div className='flex gap-2'>
            <input
              type='checkbox'
              id='furnished'
              className='w-5'
              onChange={handleChange}
              checked={sidebardata.furnished}
            />
            <span>Furnished</span>
          </div>
        </div>
        <div className='flex items-center gap-2'>
          <label className='font-semibold'>Sort:</label>
          <select
             onChange={handleChange}
            defaultValue={'created_at_desc'}
            id='sort_order'
            className='border text-black rounded-lg p-3'
          >
            <option value='regularPrice_desc'>Price high to low</option>
            <option value='regularPrice_asc'>Price low to hight</option>
            <option value='createdAt_desc'>Latest</option>
            <option value='createdAt_asc'>Oldest</option>
          </select>
        </div>
        <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>
          Search
        </button>
      </form>
    </div>
    <div className='flex-1'>
      <h1 className='text-3xl font-semibold border-b p-3 text-slate-700 mt-5'>
        Listing results:
      </h1>
      <div className='p-7 flex flex-wrap gap-4'>
        {!loading && listing.length === 0 && (
          <p className='text-xl text-slate-700'>No listing found!</p>
        )}
        {loading && (
          <p className='text-xl text-slate-700 text-center w-full'>
            Loading...
          </p>
        )}

        {!loading &&
          listing &&
          listing.map((listing) => (
            
            <ListingCard key={listing._id} listing={listing} />
          ))} 

         {showMore && (
          <button
            onClick={onShowMoreClick}
            className='text-green-700 hover:underline p-7 text-center w-full'
          >
            Show more
          </button>
        )}
      </div>
    </div>
  </div>
  )
}

export default Search