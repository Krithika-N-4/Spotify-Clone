import React, { useContext, useEffect, useRef } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import DisplayHome from './DisplayHome'
import DisplayAlbum from './DisplayAlbum'
import { albumsData } from '../assets/assets'
import Music from './Music'
import Podcasts from './Podcasts'
import NowPlaying from './NowPlaying'
import { PlayerContext } from '../context/PlayerContext'
import Lyrics from './Lyrics'
import Browse from './Browse'
import Queue from './Queue'
import LikedSongs from './LikedSongs'


const Display = () => {

    const displayRef = useRef()
    const location = useLocation()

    const { track } = useContext(PlayerContext)

    const isAlbum = location.pathname.includes("album")
    
    const albumId = isAlbum ? location.pathname.slice(-1) : ""

    const isNP = location.pathname === '/now-playing'
    const isL = location.pathname === '/lyrics'
    const isLikedSongs = location.pathname === '/liked-songs'
    
    useEffect(() => {
        if(isAlbum){
            const bgColor = albumsData[Number(albumId)].bgColor
            displayRef.current.style.background = `linear-gradient(${bgColor}, #121212)`
        } else if (isNP && track) {
            displayRef.current.style.background = `linear-gradient(${track.bgColor}, #121212)`
        } else if (isL && track) {
            displayRef.current.style.background = `linear-gradient(${track.bgColor}, #121212)`
        } 
        else if (isLikedSongs) {
            displayRef.current.style.background = `linear-gradient(#4b3592, #121212)`
        }
        else {
            displayRef.current.style.background = `#121212`
        }
    })
    
  return (
    <div ref = {displayRef} className='w-[100%] m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w-[75%] ml-0'>
        <Routes>
            <Route path='/' element={<DisplayHome/>} />
            <Route path='/album/:id' element={<DisplayAlbum/>} />  
            <Route path='/music' element={<Music/>}/>
            <Route path='/podcasts' element={<Podcasts/>}/>
            <Route path='/now-playing' element={<NowPlaying/>}/>
            <Route path='/lyrics' element={<Lyrics/>}/>
            <Route path='/browse' element={<Browse/>}/>
            <Route path='/queue' element={<Queue/>}/>
            <Route path='/liked-songs' element={<LikedSongs/>}/>
        </Routes>
    </div>
  )
}

export default Display