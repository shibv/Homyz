import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AliceCarousel from "react-alice-carousel";
import 'react-alice-carousel/lib/alice-carousel.css';
import OfferCard from '../Components/OfferCard';
import ListingCard from '../Components/ListingCard';
import icon from '../assets/real-estate.png'

const responsiveSettings = {
  0: {
    items: 2,
  },
  580: {
    items: 3,
  },
};

export default function Home({themeStatus}) {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch('/api/listings/get');
        const data = await res.json();
        setOfferListings(data);
        console.log(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRentListings = async () => {
      try {
        const res = await fetch('/api/listings/get?type=rent&limit=4');
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch('/api/listings/get?type=sale&limit=4');
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        log(error);
      }
    };
    fetchOfferListings();
  }, []);
  return (
    <div className='overflow-hidden'>
    {/* top */}
    <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto'>
      <h1 className='text-slate-700 font-bold text-3xl lg:text-6xl'>
        Find your next <span className='text-slate-500'>perfect</span>
        <br />
        place with <span className='text-red-400'>Hoomyz</span>
      </h1>
      <div className={`${themeStatus ? 'text-gray-400 text-xs sm:text-sm' : 'text-black'}`}>
        Hoomyz Estate is the best place to find your next perfect place to
        live.
        <br />
        We have a wide range of properties for you to choose from.
      </div>
      <Link
        to={'/search'}
        className='text-xs sm:text-sm text-blue-800 font-bold hover:underline'
      >
        Let's get started...
      </Link>
    </div>

    {/* swiper */}
    <div  className=' w-[95% max-w-[1200px] mx-auto rounded-lg p-6 mt-4 shadow-[0_4px_12px_rgba(0,0,0,0.1)] mb-6  '>
      <div className='flex items-center mb-4 gap-2'>
        <img src={icon} className='w-8 h-8' alt="" />
        <p className=' font-bold'>Offer Listings</p>
      </div>
      
        <AliceCarousel 
         mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsiveSettings}
        autoPlay >
           {
            offerListings.map((listing) => {
                return (
                    
                  <div className={` shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-[200px]  sm:w-[250px] `}>
                    <h2 className={` ${themeStatus ? 'text-black' : 'text-white'} text-sm z-[10]  absolute top-1 left-1  font-semibold text-slate-700 `}>{listing.name}</h2>
                  <Link to={`/listing/${listing._id}`}>
                    <img
                      src={
                        listing.imageUrls[0] ||
                        'https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/Sales_Blog/real-estate-business-compressor.jpg?width=595&height=400&name=real-estate-business-compressor.jpg'
                      }
                      alt='listing cover'
                      className='h-[200px] w-[90%] sm:h-[200px] sm:w-[100%] object-cover hover:scale-105 transition-scale duration-300'
                    />
                 
                  </Link>
                  
                </div>
                   
                )

            })
           }


        </AliceCarousel>
      


    </div>
    <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
       
        {rentListings && rentListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold '>Recent places for rent</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=rent'}>Show more places for rent</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {rentListings.map((listing) => (
                <ListingCard listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {saleListings && saleListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold '>Recent places for sale</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=sale'}>Show more places for sale</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {saleListings.map((listing) => (
                <ListingCard listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
   
  </div>
  )
}
