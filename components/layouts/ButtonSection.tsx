import React from 'react'

function ButtonSection({text, isActive}:{text:string, isActive:boolean}) {
  return (
    <div className={`cursor-pointer border-b-4  ${isActive ? "text-primary-buttons border-primary-buttons":"border-c-transparent"}`}>
      {text}
    </div>
  )
}

export default ButtonSection
