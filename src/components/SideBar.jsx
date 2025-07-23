import React, { useContext } from 'react'
import {assets} from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { PlayerContext } from '../context/PlayerContext'

const SideBar = () => {

    const navigate = useNavigate()

    const { setIsSearchActive, likedSongs } = useContext(PlayerContext)

    const handleSearchClick = () => {
        setIsSearchActive(true)
    }

  return (
    <div className='w-[25%] h-full p-2 flex-col gap-2 text-white hidden lg:flex font-nunito'>
            <div className='bg-[#121212] h-[15%] rounded flex flex-col justify-around'>
                <div onClick={() => navigate('/')} className='flex items-center gap-3 pl-8 cursor-pointer'>
                    <img className='w-6' src={assets.home_icon} alt="Home" />
                    <p className='font-bold'>Home</p>
                </div>
                <div onClick={handleSearchClick} className='flex items-center gap-3 pl-8 cursor-pointer'>
                    <img className='w-6' src={assets.search_icon} alt="Search" />
                    <p className='font-bold'>Search</p>
                </div>
            </div>

            <div className='bg-[#121212] h-[85%] rounded'>
                <div className='p-4 flex items-center justify-between'>
                    <div className='flex items-center gap-3'>
                        <img className='w-8' src={assets.stack_icon} alt="Library" />
                        <p className='font-semibold'>Your Library</p>
                    </div>
                    <div className='flex items-center gap-3'>
                        <img className='w-5' src={assets.arrow_icon} alt="" />
                        <img className='w-5' src={assets.plus_icon} alt="" />
                    </div>
                </div>

                {likedSongs.length === 0 ? (
                    <>
                        <div className='p-4 bg-[#242424] m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 pl-4'>
                            <h1>Create your first playlist</h1>
                            <p className='font-light'>It's easy, we'll help you!</p>
                            <button className='px-4 py-1.5 bg-white text-[15px] text-black rounded-full mt-4 cursor-pointer transform transition-transform duration-200 hover:scale-105'>Create Playlist</button>
                        </div>
                        <div className='p-4 bg-[#242424] m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 pl-4'>
                            <h1>Let's find some podcasts to follow</h1>
                            <p className='font-light'>We'll keep you updated on new episodes.</p>
                            <button className='px-4 py-1.5 bg-white text-[15px] text-black rounded-full mt-4 cursor-pointer transform transition-transform duration-200 hover:scale-105'>Browse Podcasts</button>
                        </div>
                    </>
                ) : (
                    <div className="px-2 py-1 overflow-y-auto">
                         <div onClick={() => navigate('/liked-songs')} className='p-2 flex items-center gap-3 cursor-pointer hover:bg-[#ffffff2b] rounded'>
                            <img className='w-12 h-12 rounded' src={assets.liked_songs} alt="Liked Songs" />
                            <div>
                                <p className='text-lg font-semibold'>Liked Songs</p>
                                <p className='text-sm text-gray-400'>Playlist • {likedSongs.length} song{likedSongs.length > 1 ? 's' : ''}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
  )
}

export default SideBar