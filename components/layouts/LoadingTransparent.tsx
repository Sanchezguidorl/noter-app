import React from 'react'

function LoadingTransparent({text="Cargando datos..."}:{text:string}) {
  return (
    <div className=" bg-overlay-transparent w-full h-full flex justify-center items-center fixed top-0 left-0 z-20">
      <div className='flex flex-col items-center text-primary-buttons'><span className='loader'></span>
      <p className='text-center'>{text}</p>
    </div>
    </div>
  )
}

export default LoadingTransparent
