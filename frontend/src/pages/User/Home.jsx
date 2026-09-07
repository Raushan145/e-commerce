import React, { useEffect, useState } from 'react'
import Banner from '../../components/Banner'
import Category from '../../components/Category'
import ShopCollections from '../../components/ShopCollections'
import JustForYou from '../../components/JustForYou'
import NewArrival from '../../components/NewArrival'
import RecentlyView from '../../components/RecentlyView'
import TrustFeatures from '../../components/TrustFeatures'
import FAQ from '../../components/FAQ'
import ContactUs from '../../components/ContactUs'
import { useDispatch, useSelector } from 'react-redux'
import { getJustForYouThunk } from '../../redux/Product/productThunk'
import { getRecentlyViewed } from '../../utils/recentlyViewed'
import AllProducts from '../../components/AllProducts'


const Home = () => {
  const dispatch = useDispatch()
  const { justForYou, recentlyViewed } = useSelector((state) => state.product)
  const {categories,loading} = useSelector((state) => state.category)
  const { isAuthenticated } = useSelector((state) => state.user)
  const [localRecentlyViewed, setLocalRecentlyViewed] = useState(() => getRecentlyViewed())

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getJustForYouThunk())
    }
  }, [dispatch, isAuthenticated])

  useEffect(() => {
    const refreshRecentlyViewed = () => setLocalRecentlyViewed(getRecentlyViewed())
    window.addEventListener('recentlyViewedUpdated', refreshRecentlyViewed)
    window.addEventListener('storage', refreshRecentlyViewed)

    return () => {
      window.removeEventListener('recentlyViewedUpdated', refreshRecentlyViewed)
      window.removeEventListener('storage', refreshRecentlyViewed)
    }
  }, [])

  
 if (loading) {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#f7f5e2]">
      <div className="text-center">
        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-gray-200 border-t-[#293b25]" />

        <h2 className="mt-4 text-sm tracking-widest text-[#293b25]">
          LOADING...
        </h2>
      </div>
    </div>
  );
}
  return (
    <div className="w-full">
      <Banner />
      {categories.length >0 && <Category />}
      <ShopCollections />
      {justForYou.length > 0 && <JustForYou products={justForYou} />}
      <NewArrival />
      <AllProducts />
      {(localRecentlyViewed.length > 0 || recentlyViewed.length > 0) && (
        <RecentlyView products={localRecentlyViewed.length ? localRecentlyViewed : recentlyViewed} />
      )}
      <TrustFeatures />
      <FAQ />
      <ContactUs />
    </div>
  )
}

export default Home
