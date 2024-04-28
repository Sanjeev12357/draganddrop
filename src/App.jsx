import React from 'react'
import { useState } from 'react'
import Notes from './Notes'
const App = () => {
  const [notes, setNotes] = useState([
    {
      id:1,
      text:"Learn React"
    },
    {
      id:2,
      text:"Learn JS"
    },
    
  ])
  
  return (
    <div>
      <Notes
      
      notes={notes}
      setNotes={setNotes}
      />
    </div>
  )
}

export default App