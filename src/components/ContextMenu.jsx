import React, { useState, useEffect, useContext } from 'react';
import { PlayerContext } from '../context/PlayerContext'
import { MinusCircleIcon } from 'lucide-react';



/**
 * A custom context menu component that intelligently adjusts its position to stay within the viewport.
 * @param {object} props 
 * @param {number} props.x 
 * @param {number} props.y 
 * @param {string} props.songId 
 * @param {function} props.onClose 
 */
const ContextMenu = ({ x, y, songId, onClose }) => {
  
  const [position, setPosition] = useState({ x, y });

  const { addToQueue, likedSongs, toggleLikeSong, PlusCircleIcon, QueueIcon, ShareIcon, ArrowRightIcon } = useContext(PlayerContext)

  const isLiked = likedSongs.some(song => song.id === songId)

  const menuItems = [
    { 
      label: isLiked ? 'Remove from your Liked Songs' : 'Save to your Liked Songs', 
      icon: isLiked ? <MinusCircleIcon/> : <PlusCircleIcon />, 
      action: () => toggleLikeSong(songId)
    },
    { 
      label: 'Add to queue', 
      icon: <QueueIcon />, 
      action:  () => addToQueue(songId) 
    },
    { 
      type: 'divider' 
    },
    { 
      label: 'Share', 
      icon: <ShareIcon />, 
      hasSubmenu: true, 
      action: () => console.log('Action: Share') 
    },
  ];

  useEffect(() => {
    const menuWidth = 208; 
    const menuHeight = 160; 
    const padding = 8; 

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let adjustedX = x;
    let adjustedY = y;

   
    if (x + menuWidth + padding > viewportWidth) {
     
      adjustedX = Math.max(padding, x - menuWidth);
    } else {
      adjustedX = Math.max(padding, x);
    }

   
    if (y + menuHeight + padding > viewportHeight) {
      adjustedY = Math.max(padding, y - menuHeight);
    } else {
      adjustedY = Math.max(padding, y);
    }

   
    if (x < menuWidth && y < menuHeight) {
      adjustedX = x + 10;
      adjustedY = y + 10;
    }

    adjustedX = Math.min(adjustedX, viewportWidth - menuWidth - padding);
    adjustedY = Math.min(adjustedY, viewportHeight - menuHeight - padding);
    
    adjustedX = Math.max(padding, adjustedX);
    adjustedY = Math.max(padding, adjustedY);

    setPosition({ x: adjustedX, y: adjustedY });
  }, [x, y]);

  return (
    <div
      style={{ 
        top: position.y, 
        left: position.x,
        zIndex: 9999 
      }}
      className="fixed bg-[#282828] text-gray-300 text-[15px] font-semibold p-1 rounded shadow-xl  font-nunito w-52"
      onClick={(e) => e.stopPropagation()}
    >
      <ul className="flex flex-col">
        {menuItems.map((item, index) => (
          item.type === 'divider' ? (
            <hr key={index} className="border-gray-600 my-1" />
          ) : (
            <li
              key={index}
              onClick={() => {
                if (item.action) item.action();
                onClose();
              }}
              className="p-2 hover:bg-[#3e3e3e] rounded cursor-pointer flex justify-between items-center transition-colors duration-150"
            >
              <div className="flex items-center gap-3">
                {item.icon}
                <span>{item.label}</span>
              </div>
              {item.hasSubmenu && <ArrowRightIcon />}
            </li>
          )
        ))}
      </ul>
    </div>
  );
};

export default ContextMenu;