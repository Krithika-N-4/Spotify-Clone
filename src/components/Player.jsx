import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { PlayerContext } from '../context/PlayerContext'
import { useNavigate, useLocation } from 'react-router-dom'


const Player = () => {

    const {track, seekBar, seekBg, playStatus, play, pause, time, previous, next, seekSong, volumeBar, volumeBg, setVolume, toggleMute, handleToggleNowPlaying, handleToggleLyrics, isLooping,
        toggleLoop,  handleToggleQueue} = useContext(PlayerContext)

    const navigate = useNavigate()
    const location = useLocation()
    
  return (
    <div className='h-[10%] bg-black flex justify-between items-center text-white px-4'>
        <div className='hidden lg:flex items-center gap-4'>
            <img className='w-12' src={track.image} alt="" />
            <div>
                <p>{track.name}</p>
                <p>{track.desc.slice(0,25)}</p>
            </div>
        </div>
        <div className='absolute left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-1'>
            <div className='flex gap-4'>
                <img className='w-4 cursor-pointer' src={assets.shuffle_icon} alt="" />
                <img onClick={previous} className='w-4 cursor-pointer' src={assets.prev_icon} alt="" />
                {playStatus 
                ? <img onClick={pause} className='w-4 cursor-pointer' src={assets.pause_icon} alt="" /> 
                : <img onClick={play} className='w-4 cursor-pointer' src={assets.play_icon} alt="" />}
                <img onClick={next} className='w-4 cursor-pointer' src={assets.next_icon} alt="" />
                <div onClick={toggleLoop} className='relative cursor-pointer'>
                    <img className='w-4 cursor-pointer' src={assets.loop_icon} alt="" />
                    {isLooping && (
                        <div className='absolute top-full mt-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-green-500 rounded-full' />
                    )}
                </div>
                
            </div>
            <div className='flex items-center gap-5'>
                <p>{time.currentTime.minute}:{time.currentTime.second.toString().padStart(2, '0')}</p>
                <div ref={seekBg} onClick={seekSong} className='w-[60vw] max-w-[500px] bg-gray-600 rounded-full cursor-pointer relative h-1 flex items-center'>
                    <div ref={seekBar} className='h-1 bg-green-500 rounded-full relative' style={{width: '0%'}}>
                        <div className='absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg hover:scale-110 transition-transform'/>
                    </div>
                </div>
                <p>{time.totalTime.minute}:{time.totalTime.second.toString().padStart(2, '0')}</p>
            </div>
        </div>
        <div className='hidden lg:flex items-center gap-3.5 opacity-75 cursor-pointer'>
            <div onClick={handleToggleNowPlaying} className="relative group">
                <img className="w-4" src={assets.mini_player_icon} alt="" />
                <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 scale-0 group-hover:scale-100 transition-all text-sm font-semibold bg-[#3d3b3b] text-white px-2 py-1 rounded whitespace-nowrap">
                    Now playing view
                </span>
                {location.pathname === '/now-playing' && (
                    <div className="absolute top-full mt-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-green-500 rounded-full" />
                )}
            </div>
            <div onClick={handleToggleLyrics} className="relative group">
                <img className="w-4" src={assets.mic_icon} alt="" />
                <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 scale-0 group-hover:scale-100 transition-all text-sm font-semibold bg-[#3d3b3b] text-white px-2 py-1 rounded whitespace-nowrap">
                    Lyrics
                </span>
                {location.pathname === '/lyrics' && (
                    <div className="absolute top-full mt-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-green-500 rounded-full" />
                )}
            </div>

            <div onClick={handleToggleQueue} className="relative group">
                <img className="w-4" src={assets.queue_icon} alt="" />
                <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 scale-0 group-hover:scale-100 transition-all text-sm font-semibold bg-[#3d3b3b] text-white px-2 py-1 rounded whitespace-nowrap">
                    Queue
                </span>
                {location.pathname === '/queue' && (
                    <div className="absolute top-full mt-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-green-500 rounded-full" />
                )}
            </div>

            <div className="relative group">
                <img className="w-4" src={assets.speaker_icon} alt="" />
                <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 scale-0 group-hover:scale-100 transition-all text-sm bg-[#3d3b3b] font-semibold text-white px-2 py-1 rounded whitespace-nowrap">
                    Connect to a device
                </span>
            </div>

            <div className="relative group">
                <img onClick={toggleMute} className="w-4 cursor-pointer" src={assets.volume_icon} alt="" />
                <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 scale-0 group-hover:scale-100 transition-all text-sm bg-[#3d3b3b] font-semibold text-white px-2 py-1 rounded whitespace-nowrap">
                    Mute
                </span>
            </div>

            <div ref={volumeBg} onClick={setVolume} className='w-20 bg-gray-600 h-1 rounded cursor-pointer relative flex items-center mr-1'>
            <div ref={volumeBar} className='h-1 bg-green-400 rounded-full relative' style={{width: '100%'}}>
                <div className='absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg hover:scale-110 transition-transform'/>
                </div>
            </div>

            <div className="relative group">
                <img className='w-4' src={assets.mini_player_icon} alt="" />
                <span className="absolute bottom-full mb-2 right-0 scale-0 group-hover:scale-100 transition-all text-sm font-semibold bg-[#3d3b3b] text-white px-2 py-1 rounded whitespace-nowrap">
                    Open MiniPlayer
                </span>
            </div>

            <div className="relative group">
                <img className='w-4' src={assets.zoom_icon} alt="" />
                <span className="absolute bottom-full mb-2 right-0 scale-0 group-hover:scale-100 transition-all text-sm bg-[#3d3b3b] text-white font-semibold px-2 py-1 rounded whitespace-nowrap">
                    Enter full screen
                </span>
            </div>
            
        </div>
    </div>
  )
}

export default Player