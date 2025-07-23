import React, { useContext, useMemo, useEffect } from 'react'
import NavBar from './NavBar'
import SongItem from './SongItem'
import { useParams } from 'react-router-dom'
import { albumsData, assets, songsData, podcastsData } from '../assets/assets';
import { PlayerContext } from '../context/PlayerContext';
import PodcastItem from './PodcastItem'

const DisplayAlbum = () => {

    const {id} = useParams();
    const albumData = albumsData[id]
    const {playWithId} = useContext(PlayerContext)

    const { searchQuery } = useContext(PlayerContext)

    const searchableData = useMemo(() => [
            ...songsData.map(item => ({ ...item, type: 'song'})),
            ...podcastsData.map(item => ({...item, type: 'podcast'}))
    ],[])
    
    const filteredData = searchableData.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.desc && item.desc.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    
    const isSearching = searchQuery.trim() !== ''

    const [contextMenu, setContextMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
    songId: null,
  });

  return (
    <>
        <NavBar/>

        {isSearching ? (
        <div className='relative pt-28 px-4'> 
            <div className='mb-4 font-nunito'>
                <h1 className='my-5 font-bold text-2xl'>Search Results</h1>
                {filteredData.length > 0 ? (
                    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'> 
                    {filteredData.map((item, index) => {
                        if (item.type === 'song'){
                            return (
                                <SongItem
                                key = {`song-${index}`}
                                name = {item.name}
                                desc = {item.desc}
                                id = {item.id}
                                image = {item.image}
                                onContextMenu={handleContextMenu}
                                />
                            )
                        }
                        else if (item.type === 'podcast') {
                            return (
                                <PodcastItem
                                key = {`podcast-${index}`}
                                name = {item.name}
                                desc = {item.desc}
                                id = {item.id}
                                image = {item.image}
                                />
                            )
                        }
                        return null
                    }
                )
            }
        </div>
          ) : (
            <p className='text-slate-300'>No songs found for “{searchQuery}”.</p>
          )}
        </div>
        </div>
      ) : (
        <>
        <div className='pt-28 mt-10 flex gap-8 flex-col md:flex-row md:items-end font-nunito'>
            <img className='w-48 rounded' src={albumData.image} alt="" />
            <div className='flex flex-col'>
                <p>Playlist</p>
                <h2 className='text-5xl font-bold mb-4 md:text-6xl'>{albumData.name}</h2>
                <h4>{albumData.desc}</h4>
                <p className='mt-1'>
                    <img className='inline-block w-5' src={assets.spotify_logo} alt="" />
                    <b> Spotify </b>
                    • 13,23,154 likes
                    • <b>50 songs, </b>
                    about 2 hr 30 mins
                </p>
            </div>
        </div>

        <div className='grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7] font-nunito'>
            <p><b className='mr-4'>#</b>Title</p>
            <p>Album</p>
            <p className='hidden sm:block'>Date Added</p>
            <img className='m-auto w-4' src={assets.clock_icon} alt="" />
        </div>

        <hr/>
        {
            songsData.map((item, index) => (
                <div onClick={() => playWithId(item.id)} key={index} className='grid grid-cols-3 sm:grid-cols-4 gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer font-nunito'>
                    <p className='text-white'>
                        <b className='mr-4 text-[#a7a7a7]'>{index+1}</b>
                        <img className='inline w-10 mr-5' src={item.image} alt="" />
                        {item.name}
                    </p>

                    <p className='text-[15px]'>{albumData.name}</p>
                    <p className='text-[15px] hidden sm:block'>5 days ago</p>
                    <p className='text-[15px] text-center'>{item.duration}</p>
                </div>
            ))
        }
        </>
      )}
    </>
  )
}

export default DisplayAlbum