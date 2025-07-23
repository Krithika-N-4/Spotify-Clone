import React, { useState, useContext } from 'react'
import { assets } from '../assets/assets'
import { useLocation, useNavigate } from 'react-router-dom'
import { PlayerContext } from '../context/PlayerContext'

const NavBar = () => {
    const navigate = useNavigate()
    const [search, setSearch] = useState('')

    const { setSearchQuery, isSearchActive, setIsSearchActive, getButtonClass, handleBrowse} = useContext(PlayerContext)
    
    const handleSearchChange = (e) => {
        setSearch(e.target.value)
        setSearchQuery(e.target.value)
    }
    
    return (
        <div className='fixed top-2 left-[24.9%] right-2 z-10 bg-[#121212] p-4 rounded-sm'>
            <div className='w-full flex justify-between items-center font-semibold font-nunito'>
                <div className='flex items-center gap-2 flex-shrink-0'>
                    <img 
                        onClick={() => navigate(-1)} 
                        className='w-8 bg-black p-2 rounded-2xl cursor-pointer' 
                        src={assets.arrow_left} 
                        alt="" 
                    />
                    <img 
                        onClick={() => navigate(1)} 
                        className='w-8 bg-black p-2 rounded-2xl cursor-pointer' 
                        src={assets.arrow_right} 
                        alt="" 
                    />
                </div>
                
                <div className={`flex items-center bg-black px-4 py-3 rounded-full mx-4 flex-1 max-w-[400px] border ${isSearchActive ? 'border-white' : 'border-transparent'} focus-within:border-white`}>
                    <ion-icon name="search-outline" class="text-white mr-3 text-2xl flex-shrink-0"></ion-icon>
                    <input
                        type="text"
                        value={search}
                        onChange={handleSearchChange}
                        placeholder="What do you want to play?"
                        className='bg-transparent outline-none text-white w-full placeholder:text-slate-200 min-w-0'
                        onFocus={() => setIsSearchActive(true)}
                        onBlur={() => setIsSearchActive(false)}
                    />
                    <ion-icon onClick={handleBrowse} name="archive-outline" class="text-white ml-3 text-2xl flex-shrink-0 cursor-pointer"></ion-icon>
                </div>
                
                <div className='flex items-center gap-2 lg:gap-4 flex-shrink-0'>
                    <p className="bg-white text-black text-[13px] lg:text-[15px] px-3 lg:px-4 py-1 rounded-2xl hidden lg:block cursor-pointer transform transition-transform duration-200 hover:scale-105 whitespace-nowrap">
                        Explore Premium
                    </p>
                    <p className='text-slate-300 text-[13px] lg:text-[15px] cursor-pointer hover:text-white hover:underline hover:underline-offset-1 transform transition-transform duration-200 hover:scale-110 hidden md:block whitespace-nowrap'>
                        Install App
                    </p>
                    <p className='bg-purple-500 text-white w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transform transition-transform duration-200 hover:scale-110 font-bold'>
                        K
                    </p>
                </div>
            </div>
            
            <div className='flex items-center gap-2 mt-4 overflow-x-auto tex-md'>
                <p onClick={() => navigate('/')} className={getButtonClass('/')}>All</p>
                <p onClick={() => navigate('/music')} className={getButtonClass('/music')}>Music</p>
                <p onClick={() => navigate('/podcasts')} className={getButtonClass('/podcasts')}>Podcasts</p>
            </div>
        </div>
    )
}

export default NavBar