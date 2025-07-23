import React, { useContext } from 'react';
import { PlayerContext } from '../context/PlayerContext';

const NowPlaying = () => {
  const { track, toggleLikeSong } = useContext(PlayerContext);

  if (!track) return <div className='text-white text-center'>Loading...</div>;

  return (
    <div className='h-full w-full p-4 text-white sm:p-8 flex flex-col items-center justify-center font-nunito'>
      <div className='mb-6'>
        <img
          src={track.image}
          alt={track.name}
          className='w-84 h-84 sm:h-80 sm:w-80 rounded-md shadow-lg shadow-black'
        />
      </div>

      <div className='text-center mb-4 max-w-md'>
        <div className='flex items-center justify-center gap-3 mb-2'>
          <h1 className='text-3xl sm:text-4xl font-bold'>{track.name}</h1>
          <ion-icon onClick={() => toggleLikeSong(track.id)} className="w-8 h-8 cursor-pointer p-1 rounded-full hover:bg-[#ffffff2b]" name="add-circle-outline"></ion-icon>
        </div>
        <p className='text-gray-300 text-lg sm:text-xl'>{track.desc}</p>
      </div>
    </div>
  );
};

export default NowPlaying;
