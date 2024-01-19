import React from 'react'

function ButtonSection({text}:{text:string}) {
  return (
    <div className=' hover:text-primary-buttons cursor-pointer border-b-4 border-c-transparent hover:border-primary-buttons'>
      {text}
    </div>
  )
}

export default ButtonSection
