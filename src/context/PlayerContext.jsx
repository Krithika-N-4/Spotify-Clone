import { createContext, useEffect, useRef, useState } from "react";
import { songsData } from "../assets/assets";
import { useNavigate, useLocation } from "react-router-dom";

export const PlayerContext = createContext()

const PlayerContextProvider = (props) => {

    const audioRef = useRef()
    const seekBg = useRef()
    const seekBar = useRef()

    const volumeBg = useRef()
    const volumeBar = useRef()

    const location = useLocation()
    const navigate = useNavigate()

    const [track, setTrack] = useState(songsData[0])
    const [playStatus, setPlayStatus] = useState(false)
    const [time, setTime] = useState({
        currentTime:{
            second:0,
            minute:0
        },
        totalTime: {
            second: 0, 
            minute: 0
        }
    })

    const [searchQuery, setSearchQuery] = useState('')
    const [search, setSearch] = useState('')
    const [isSearchActive, setIsSearchActive] = useState(false)

    const [isMuted, setIsMuted] = useState(false)
    const [previousVolume, setPreviousVolume] = useState(1)

    const [isLooping, setIsLooping] = useState(false)

    const play = () => {
        audioRef.current.play()
        setPlayStatus(true)
    }

    const pause = () => {
        audioRef.current.pause()
        setPlayStatus(false)
    }

    const playWithId = async (id) => {
        await setTrack(songsData[id])
        await audioRef.current.play()
        setPlayStatus(true)
    }

    const previous = async() => {
        if (track.id > 0) {
            await setTrack(songsData[track.id - 1])
            await audioRef.current.play()
            setPlayStatus(true)
        }
    }

    const [queue, setQueue] = useState([]);

    /**
     * Adds a song to the end of the queue.
     * @param {string} songId - The ID of the song to add.
     */

    const playFromQueue = async (song) => {
        await setTrack(song);
        await audioRef.current.play();
        setPlayStatus(true);
    }

    const addToQueue = (songId) => {
        const songToAdd = songsData.find(song => song.id === songId)
        if (songToAdd) {
            setQueue(prevQueue => [...prevQueue, songToAdd])
            console.log(`Added "${songToAdd.name}" to the queue`)
        }
    }

    /**
     * Removes a song from the queue by its index.
     * @param {number} index - The index of the song to remove from the queue.
     */

    const removeFromQueue = (index) => {
        setQueue(prevQueue => prevQueue.filter((_, i) => i !== index))
        console.log(`Removed song at index ${index} from queue`)
    }


    const next = async() => {
        if (queue.length > 0) {
            const nextSong = queue[0]
            await playFromQueue(nextSong)
            setQueue(prevQueue => prevQueue.slice(1));
        }
        else if (track.id < songsData.length-1) {
            await setTrack(songsData[track.id + 1])
            await audioRef.current.play()
            setPlayStatus(true)
        }
    }

    const seekSong = async(e) => {
        audioRef.current.currentTime = ((e.nativeEvent.offsetX / seekBg.current.offsetWidth)*audioRef.current.duration)
    }

    const setVolume = async(e) => {
        const newVolume = e.nativeEvent.offsetX / volumeBg.current.offsetWidth
        audioRef.current.volume = newVolume

        volumeBar.current.style.width = Math.floor(newVolume*100) + "%"
        setIsMuted(newVolume === 0)
    }

    const toggleMute = () => {
        if(isMuted){
            audioRef.current.volume = previousVolume
            volumeBar.current.style.width = Math.floor(previousVolume * 100) + "%"
            setIsMuted(false)
        } else {
            setPreviousVolume(audioRef.current.volume)
            audioRef.current.volume = 0
            volumeBar.current.style.width = "0%"
            setIsMuted(true)
        }
    }

    const toggleLoop = () => {
        setIsLooping(prev => !prev)
    }

    useEffect(() => {
        if(audioRef.current) {
            audioRef.current.loop = isLooping
        }
    }, [isLooping])

    const getButtonClass = (path) => {
        const baseClasses = 'px-4 py-1 rounded-2xl cursor-pointer flex-shrink-0'
        if(location.pathname === path) {
            return `${baseClasses} bg-white text-black`
        } else {
            return `${baseClasses} bg-black text-white`
        }
    }

    const handleToggleNowPlaying = () => {
        if (location.pathname === '/now-playing'){
            navigate(-1)
        } else {
            navigate('/now-playing')
        }
    }

    const handleToggleLyrics = () => {
        if (location.pathname === '/lyrics'){
            navigate(-1)
        } else {
            navigate('/lyrics')
        }
    }

    const handleBrowse = () => {
        if (location.pathname === '/browse'){
            navigate(-1)
        } else {
            navigate('/browse')
        }
    }

    const handleToggleQueue = () => {
        if (location.pathname === '/queue') navigate(-1);
        else navigate('/queue');
    };

    const [contextMenu, setContextMenu] = useState({
        visible: false,
        x: 0,
        y: 0,
        songId: null,
    })

    const openContextMenu = (x, y, songId) => {
        setContextMenu({ visible: true, x, y, songId })
    }

    const closeContextMenu = () => {
        setContextMenu(prev => ({ ...prev, visible: false }))
    }

    const [likedSongs, setLikedSongs] = useState(() => {
        const saved = localStorage.getItem('likedSongs')
        return saved ? JSON.parse(saved) : []
    })
    
    const toggleLikeSong = (songId) => {
        setLikedSongs(prevLiked => {
            const isLiked = prevLiked.some(song => song.id === songId)
            let newLikedSongs
            if (isLiked) {
                newLikedSongs = prevLiked.filter(song => song.id !== songId)
            } else {
                const addSong = songsData.find(song => song.id === songId) 
                if (addSong) {
                    newLikedSongs = [...prevLiked, addSong]
                } else {
                    return prevLiked
                }
            }

            localStorage.setItem('likedSongs', JSON.stringify(newLikedSongs))
            return newLikedSongs
        })
    }
    
    const PlusCircleIcon = () => <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="opacity-70"><path d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8z"></path><path d="M11.5 8.5h-3v3h-1v-3h-3v-1h3v-3h1v3h3v1z"></path></svg>
    const QueueIcon = () => <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="opacity-70"><path d="M15 4H1v2h14V4zm0 4H1v2h14V8zm-7.5 4H1v2h6.5v-2z"></path></svg>
    const ShareIcon = () => <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="opacity-70"><path d="M13 1a2 2 0 012 2v10a2 2 0 01-2 2H3a2 2 0 01-2-2V3a2 2 0 012-2h10zM3 3v10h10V3H3z"></path><path d="M9.5 7.253a.5.5 0 00-.5.5v2.5a.5.5 0 001 0V8.414l1.793 1.793a.5.5 0 00.707-.707L10.207 7.5h.793a.5.5 0 000-1h-2a.5.5 0 00-.5.5z"></path></svg>
    const ArrowRightIcon = () => <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="opacity-70"><path d="M6 12l4-4-4-4 1.5-1.5L13 8 7.5 13.5 6 12z"></path></svg>
    const RemoveIcon = () => (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 hover:text-white cursor-pointer mr-1">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    )

    const PlayIcon = () => (
    <svg onClick={play} width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5v14l11-7z"/>
      
    </svg>
  );

  const PauseIcon = () => (
    <svg onClick={pause} width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
    </svg>
  );

  const ShuffleIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16,3 21,3 21,8"></polyline>
      <line x1="4" y1="20" x2="21" y2="3"></line>
      <polyline points="21,16 21,21 16,21"></polyline>
      <line x1="15" y1="15" x2="21" y2="21"></line>
      <line x1="4" y1="4" x2="9" y2="9"></line>
    </svg>
  );

  const DownloadIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
      <polyline points="7,10 12,15 17,10"></polyline>
      <line x1="12" y1="15" x2="12" y2="3"></line>
    </svg>
  );

    useEffect(() => {
        const handleClick = () => closeContextMenu()
        document.addEventListener('click', handleClick)
        return () => document.removeEventListener('click', handleClick)
    }, [])


    useEffect(() => {
        setTimeout(() => {
            
            audioRef.current.ontimeupdate = () => {
                seekBar.current.style.width = (Math.floor(audioRef.current.currentTime/audioRef.current.duration*100))+"%"
                setTime(
                {
                    currentTime:{
                        second: Math.floor(audioRef.current.currentTime % 60),
                        minute: Math.floor(audioRef.current.currentTime / 60)
                    },
                    totalTime: {
                        second: Math.floor(audioRef.current.duration % 60),
                        minute: Math.floor(audioRef.current.duration / 60)
                    }
                }
                )
            }

        }, 1000)
    }, [audioRef])

    // Add this inside your PlayerContextProvider component, after your existing useEffect

    useEffect(() => {
    if (audioRef.current) {
        const audio = audioRef.current;
        
        const handleSongEnd = async () => {
            if (isLooping) {
                return;
            }
            
            if (queue.length > 0) {
                const nextSong = queue[0];
                try {
                    await setTrack(nextSong);
                    setTimeout(async () => {
                        await audio.play();
                        setPlayStatus(true);
                    }, 100);
                    setQueue(prevQueue => prevQueue.slice(1));
                } catch (error) {
                    console.error('Error playing next song from queue:', error);
                    setPlayStatus(false);
                }
            }
            else {
                setPlayStatus(false);
                console.log('Queue finished, stopping playback');
            }
        };

        audio.addEventListener('ended', handleSongEnd);
        
        return () => {
            audio.removeEventListener('ended', handleSongEnd);
        };
    }
    }, [queue, track.id, isLooping]); 

    const contextValue = {
        audioRef,
        seekBar, 
        seekBg, 
        track, setTrack,
        playStatus, setPlayStatus,
        time, setTime,
        play, pause,
        playWithId,
        previous, next,
        seekSong,
        searchQuery, setSearchQuery,
        volumeBar,
        volumeBg,
        setVolume,
        isSearchActive, setIsSearchActive,
        toggleMute,
        getButtonClass,
        handleToggleNowPlaying,
        handleToggleLyrics,
        handleBrowse,
        PlusCircleIcon, QueueIcon, ShareIcon, ArrowRightIcon,RemoveIcon,
        PauseIcon, PlayIcon, ShuffleIcon, DownloadIcon,
        isLooping,
        toggleLoop,
        contextMenu,
        openContextMenu,
        closeContextMenu,
        queue, addToQueue, removeFromQueue, playFromQueue, handleToggleQueue,
        likedSongs,toggleLikeSong
    }

    return(
        <PlayerContext.Provider value={contextValue}>
            {props.children}
        </PlayerContext.Provider>
    )
}

export default PlayerContextProvider