import React from 'react'

const PodcastItem = ({name, image, desc, id, onContextMenu}) => {

  const handleRightClick = (e) => {
    e.preventDefault()
    if (onContextMenu) {
      onContextMenu(e.clientX, e.clientY, id)
    }
  }

  return (
    <div onContextMenu={handleRightClick} className='min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff2b] font-nunito'>
        <img className='rounded' src={image} alt="" />
        <p className='font-bold mt-2 mb-1'>{name}</p>
        <p className='text-slate-200 text-sm'>{desc}</p>
    </div>
  )
}

export default PodcastItem