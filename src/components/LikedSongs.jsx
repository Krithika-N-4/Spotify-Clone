import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import { PlayerContext } from '../context/PlayerContext';
import { assets } from '../assets/assets';


const LikedSongs = () => {
  const {track, pause, play, likedSongs,playStatus, playWithId, toggleLikeSong, PauseIcon, PlayIcon, ShuffleIcon, DownloadIcon,RemoveIcon } = useContext(PlayerContext);
  const navigate = useNavigate();

  const isThisPlaylistPlaying = likedSongs.some(song => song.id === track.id);

  useEffect(() => {
    if (likedSongs.length === 0) {
      navigate('/');
    }
  }, [likedSongs, navigate]);

  return (
    <>
      <NavBar />
      <div className='pt-35 px-6 text-white font-nunito mb-5'>
        <div className='flex items-end gap-8 mb-8'>
          <img className='w-48 h-48 rounded-md shadow-2xl' src={assets.main_liked_songs} alt="Liked Songs Playlist" />
          <div>
            <p className='text-sm font-bold'>Playlist</p>
            <h1 className='text-7xl font-bold mb-4'>Liked Songs</h1>
            <p className='font-semibold'>{likedSongs.length} song{likedSongs.length > 1 ? 's' : ''}</p>
          </div>
        </div>

        <div className='flex items-center gap-6 mb-8'>
          <button
            className='w-14 h-14 bg-green-500 hover:bg-green-400 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105 shadow-lg'
            disabled={likedSongs.length === 0}
          >
            {playStatus  && isThisPlaylistPlaying ? <PauseIcon /> : <PlayIcon onClick={play} />}
          </button>

          <button
            className='w-8 h-8 text-gray-400 hover:text-white transition-colors duration-200'
            title="Shuffle Play"
          >
            <ShuffleIcon />
          </button>

          <button
            className='w-8 h-8 text-gray-400 hover:text-white transition-colors duration-200'
            title="Download"
          >
            <DownloadIcon />
          </button>
        </div>


        <div className='grid grid-cols-[50px_1fr_200px_100px] items-center gap-4 p-2 border-b border-gray-700 text-gray-400 mb-4'>
          <p className='text-center'>#</p>
          <p>Title</p>
          <p>Singer</p>
          <img className='w-4 justify-self-center' src={assets.clock_icon} alt="Duration" />
        </div>

        {likedSongs.map((item, index) => (
          <div
            onClick={() => playWithId(item.id)}
            key={item.id || index}
            className='grid grid-cols-[50px_1fr_200px_100px] items-center gap-4 p-2 rounded cursor-pointer hover:bg-[#ffffff2b] group'
          >
            <p className='text-gray-400 text-center group-hover:text-white'>
              {index + 1}
            </p>
            <div className='flex items-center gap-3'>
              <img className='w-10 h-10 rounded' src={item.image} alt={item.name} />
              <div>
                <p className='text-white font-semibold'>{item.name}</p>
              </div>
            </div>
            <p className='text-gray-400 text-md'>{item.desc}</p>

            <div className='flex items-center justify-center relative'>
              <p className='text-gray-400 text-sm group-hover:opacity-0'>{item.duration}</p>
              <div
                className="absolute opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={(e) => {
                  e.stopPropagation(); 
                  toggleLikeSong(item.id);
                }}
              >
                <RemoveIcon />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default LikedSongs;
