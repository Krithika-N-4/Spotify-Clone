import React, { useContext, useMemo} from 'react';
import NavBar from './NavBar';
import { songsData, albumsData, podcastsData } from '../assets/assets';
import AlbumItem from './AlbumItem';
import SongItem from './SongItem';
import PodcastItem from './PodcastItem';
import { PlayerContext } from '../context/PlayerContext';
import ContextMenu from './ContextMenu';
import { useNavigate } from 'react-router-dom';

const DisplayHome = () => {
    const { searchQuery, contextMenu, openContextMenu, closeContextMenu } = useContext(PlayerContext);
    
    const searchableData = useMemo(() => [
        ...songsData.map(item => ({ ...item, type: 'song' })),
        ...podcastsData.map(item => ({ ...item, type: 'podcast' }))
    ], []);

    const filteredData = searchableData.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.desc && item.desc.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const isSearching = searchQuery.trim() !== '';

    const navigate = useNavigate()
    return (
        <div className="relative h-full">
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
                                                onContextMenu={openContextMenu}
                                            />
                                        );
                                    }
                                    else if (item.type === 'podcast') {
                                        return (
                                            <PodcastItem
                                                key={`podcast-${index}`}
                                                name={item.name}
                                                desc={item.desc}
                                                id={item.id}
                                                image={item.image}
                                                onContextMenu={openContextMenu}
                                            />
                                        );
                                    }
                                    return null;
                                })}
                            </div>
                        ) : (
                            <p className='text-slate-300'>No results found for "{searchQuery}".</p>
                        )}
                    </div>
                </div>
            ) : (
                <div className='pt-28 px-4'>
                    <div className='mb-4 font-nunito'>
                        <h1 className='my-5 font-bold text-2xl'>Featured Charts</h1>
                        <div className='flex overflow-auto'>
                            {albumsData.map((item, index) => (
                                <AlbumItem
                                    key={index}
                                    name={item.name}
                                    desc={item.desc.slice(0, 45) + "..."}
                                    id={item.id}
                                    image={item.image}
                                    onClick={() => navigate(`/album/${item.id}`)}
                                />
                            ))}
                        </div>
                    </div>

                    <div className='mb-4 font-nunito'>
                        <h1 className='my-5 font-bold text-2xl'>Today's Biggest Hits</h1>
                        <div className='flex overflow-auto'>
                            {songsData.map((item, index) => (
                                <SongItem
                                    key={index}
                                    name={item.name}
                                    desc={item.desc}
                                    id={item.id}
                                    image={item.image}
                                    onContextMenu={openContextMenu}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            )}
            
            {contextMenu.visible && (
            <ContextMenu
              x={contextMenu.x}
              y={contextMenu.y}
              songId={contextMenu.songId}
              onClose={closeContextMenu}
            />
          )}
        </div>
    );
};

export default DisplayHome;