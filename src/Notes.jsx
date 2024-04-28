import React, { createRef, useEffect, useRef } from 'react'
import Note from './Note'

const Notes = ({notes,setNotes=()=>{}}) => {
    useEffect(()=>{
        const savedNotes=JSON.parse(localStorage.getItem('notes'))||[];

        const updatedNotes=notes.map((note)=>{
            const savedNote=savedNotes.find(savedNote=>savedNote.id===note.id);
            if(savedNote){
                return{...note,position:savedNote.position}
            }else{
                const position=determineNewPosition();
                return {...note,position}
            }
        });
        setNotes(updatedNotes)
        localStorage.setItem('notes',JSON.stringify(updatedNotes))
    },[notes.length])
    const noteRefs=useRef([]);

    const determineNewPosition=()=>{
        const maxX = window.innerWidth - 200;
        const maxY = window.innerHeight - 200;

        return {
            x:Math.floor(Math.random()*maxX),
            y:Math.floor(Math.random()*maxY)
        }
    }

    const handleDragStart=(note,e)=>{
        const {id}=note
        const noteRef=noteRefs.current[id].current;
        const rect=noteRef.getBoundingClientRect(); //getBoundingClientRect() method returns the size of an element and its position relative to the viewport.
        console.log("rect",rect)

        const offsetX=e.clientX-rect.left;
        const offsetY=e.clientY-rect.top;

        const startPos=note;

        const handleMouseUp=()=>{
           document.removeEventListener('mouseup',handleMouseUp)
           document.removeEventListener('mousemove',handleMouseMove)

           const finalRect=noteRef.getBoundingClientRect();
           const newPosition = {x:finalRect.left,y:finalRect.top}

           if(false){

           }else{
            updateNotePositon(id,newPosition)
           }
        }
        const handleMouseMove=(e)=>{
            const newX = e.clientX-offsetX;
            const newY=-offsetY+e.clientY;
            noteRef.style.left=`${newX}px`;
            noteRef.style.top=`${newY}px`;
        }
        document.addEventListener('mouseup',handleMouseUp)
        document.addEventListener('mousemove',handleMouseMove)
        
    }

    const updateNotePositon=(id,newPosition)=>{
        const updatedNotes=notes.map(note=>note.id === id? {...note,position:newPosition}:note)
        setNotes(updatedNotes)
        localStorage.setItem('notes',JSON.stringify(updatedNotes))
    }

  return (
    <div>{notes.map(note=>{
        return <Note 
        ref={
            noteRefs.current[note.id] 
        ? noteRefs.current[note.id]
        : (noteRefs.current[note.id]=createRef())} 
    initialposition={note.position}
     content={note.text}
      key={note.id}
      onMouseDown={(e)=>handleDragStart(note ,e)}
      />
    })}</div>
  )
}

export default Notes