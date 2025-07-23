import React, { useState, useContext }  from 'react'
import { assets } from '../assets/assets';
import { Play, Pause } from 'lucide-react';
import { lyricsData } from '../assets/LyricsInfo';

import { PlayerContext } from '../context/PlayerContext';


const Lyrics = () => {

    const { track, play, pause, playStatus, toggleLikeSong } = useContext(PlayerContext);
    const currentLyrics = lyricsData.find(item => item.id === track.id)

  return (
    <>
    <div className='p-4 flex gap-8 flex-col md:flex-row md:items-end font-nunito'>
        <img className='w-48 rounded' src={track.image} alt="" />
        <div className='flex flex-col'>
            <p>Song</p>
            <h2 className='text-5xl font-bold mb-3 md:text-6xl'>{track.name}</h2>
            <p className='mt-1'>
                <img className='inline-block w-5 mr-1' src={assets.spotify_logo} alt="" />
                <b className='text-md'> {track.desc} {' • '} </b>
                {track.albumName} {' • '}
                {track.releaseYear} {' • '}
                {track.duration} {' • '}
                {track.plays}
            </p>
        </div>
    </div>
    
    <hr className='border-slate-200'/>

    <div className='mt-1 mb-4 p-4 items-center gap-3.5 font-nunito'>
        <div className="flex items-center gap-4">
            <button 
                onClick={playStatus ? pause : play}
                className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center hover:bg-green-400 transition-colors hover:scale-105 transform"
                >
                {playStatus ? (
                    <Pause className="w-6 h-6 text-black ml-0.5" />
                ) : (
                    <Play className="w-6 h-6 text-black ml-0.5" />
                )}
            </button>

            <ion-icon onClick={() => toggleLikeSong(track.id)} className="w-8 h-8 cursor-pointer p-1 rounded-full hover:bg-[#ffffff2b]" name="add-circle-outline"></ion-icon>
        </div>

        <p className='text-2xl font-semibold mt-3'>Lyrics</p>

        <div className='font-nunito whitespace-pre-wrap text-sm md:text-lg'>
            {currentLyrics ? currentLyrics.data : "Lyrics not available!"}
        </div>
    </div>
    </>
  )
}

export default Lyrics