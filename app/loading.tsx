import React from 'react'

function Loading({text="Cargando datos..."}:{text:string}) {
  return (
    <div className=" bg-primary w-full h-full flex justify-center items-center absolute top-0 left-0 z-30">
      <div className='flex flex-col items-center text-primary-buttons'><span className='loader'></span>
      <p className='text-center'>{text}</p>
    </div>
    </div>
  )
}

export default Loading
