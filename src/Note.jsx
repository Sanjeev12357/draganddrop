import React, { forwardRef } from 'react'

const Note = forwardRef(({content,initialposition,...props},ref) => {
    return (
      <div 
      ref={ref}
      style={{
          position:"absolute",
          left:`${initialposition?.x}px`,
          top:`${initialposition?.y}px`,
          border:'1px solid black',
          userSelect:'none',
          width:"200px",
          cursor:'move',
          padding:'10px',
          backgroundColor:'lightyellow',
  
  
      }} {...props}>{content}</div>
    )
  })

export default Note