import React, { useContext } from 'react';
import { PlayerContext } from '../context/PlayerContext';
import NavBar from './NavBar';



const Queue = () => {
  const { track, queue, removeFromQueue, playFromQueue, RemoveIcon } = useContext(PlayerContext);

  return (
    <>
      <NavBar />
      <div className="pt-28 px-6 mt-4 text-white font-nunito">
        <h1 className="text-2xl font-bold">Your Queue</h1>
        
        <div className="mt-3 mb-8">
          <h2 className="text-lg font-semibold mb-2 text-gray-400">Now Playing</h2>
          <div className="flex items-center p-2 rounded-md bg-[#ffffff10]">
            <img src={track.image} alt={track.name} className="w-12 h-12 rounded mr-4" />
            <div>
              <p className="font-bold text-green-500">{track.name}</p>
              <p className="text-md text-gray-300">{track.desc}</p>
            </div>
          </div>
        </div>

        {queue.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold mb-2 text-gray-400">Next Up</h2>
            {queue.map((song, index) => (
              <div key={index} className="group flex items-center justify-between p-2 rounded-md hover:bg-[#ffffff1a] cursor-pointer">
                <div className="flex items-center flex-grow" onClick={() => playFromQueue(song)}>
                  <span className="mr-4 text-gray-400">{index + 1}</span>
                  <img src={song.image} alt={song.name} className="w-12 h-12 rounded mr-4" />
                  <div>
                    <p className="font-bold">{song.name}</p>
                    <p className="text-md text-gray-300">{song.desc}</p>
                  </div>
                </div>
                <div 
                  className="opacity-0 group-hover:opacity-100 transition-opacity" 
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFromQueue(index);
                  }}
                >
                  <RemoveIcon />
                </div>
              </div>
            ))}
          </div>
        )}

        {queue.length === 0 && (
            <div className="text-center py-10">
                <p className="text-gray-400">The queue is empty.</p>
                <p className="text-sm text-gray-500">Add some songs to see them here!</p>
            </div>
        )}

      </div>
    </>
  );
};

export default Queue;