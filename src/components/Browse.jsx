import React, { useContext, useMemo } from 'react';
import NavBar from './NavBar';
import SongItem from './SongItem';
import { useParams } from 'react-router-dom';
import { assets, songsData, podcastsData } from '../assets/assets';
import { PlayerContext } from '../context/PlayerContext';
import PodcastItem from './PodcastItem';
import { startBrowsingImages, browseAllImages } from '../assets/browseAsset'

const Browse = () => {
  const { searchQuery } = useContext(PlayerContext);
  const searchableData = useMemo(() => [
    ...songsData.map(item => ({ ...item, type: 'song' })),
    ...podcastsData.map(item => ({ ...item, type: 'podcast' }))
  ], []);

  const filteredData = searchableData.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (item.desc && item.desc.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const isSearching = searchQuery.trim() !== '';

  return (
    <>
      <NavBar />
      {isSearching ? (
        <div className='pt-28 px-4'>
          <div className='mb-4 font-nunito'>
            <h1 className='my-5 font-bold text-2xl'>Search Results</h1>
            
            {filteredData.length > 0 ? (
              <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
                {filteredData.map((item, index) => {
                  if (item.type === 'song') {
                    return (
                      <SongItem
                        key={`song-${index}`}
                        name={item.name}
                        desc={item.desc}
                        id={item.id}
                        image={item.image}
                      />
                    );
                  } else if (item.type === 'podcast') {
                    return (
                      <PodcastItem
                        key={`podcast-${index}`}
                        name={item.name}
                        desc={item.desc}
                        id={item.id}
                        image={item.image}
                      />
                    );
                  }
                  return null;
                })}
              </div>
            ) : (
              <p className='text-slate-300'>No results found for “{searchQuery}”.</p>
            )}
            
          </div>
        </div>
      ) : (
        <div className='pt-28 px-4'> 
            <div className='mb-4 font-nunito'>
            <h1 className='my-5 font-bold text-2xl text-white'>Start browsing</h1>
            <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4'>
                {startBrowsingImages.map((image) => (
                    <div key={image.id} className="cursor-pointer">
                        <img
                        src={image.src}
                        alt={image.alt}
                        className="h-auto w-full rounded-lg transition-transform duration-300 hover:scale-105"
                        />
                    </div>
                ))}
            </div>

            <h1 className='my-5 font-bold text-2xl text-white'>Browse all</h1>

            <div className='grid grid-cols-2 gap-4.5 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4'>
                {browseAllImages.map((image) => (
                    <div key={image.id} className="cursor-pointer">
                        <img
                        src={image.src}
                        alt={image.alt}
                        className="h-auto w-full rounded-lg transition-transform duration-300 hover:scale-105"
                        />
                    </div>
                ))}
            </div>

            </div>
        </div>
      )}
    </>
  );
};

export default Browse;