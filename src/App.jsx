import { useCallback, useState,useEffect, useRef } from 'react'


import './App.css'

function App() {
 const [length,setLength]=useState(9)
 const [number,setNumber]=useState(false)
 const [character,setCharacter]=useState(false)
 const [password,setPassword]=useState()
 const passwordRef=useRef(null);

     const passwordGenerator=useCallback(()=>{
      let pass=""
      let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
      if(character)str+="!@#$%^&*_[]{}~`";
      if(number)str+="0123456789";
      for(let i=0;i<length;i++){
       let char=Math.floor(Math.random()*str.length+1)
       pass+=str.charAt(char)
      }
        setPassword(pass);
    },[length,number,character,setPassword])
      
    const CopytoClipboard=useCallback(()=>{
        passwordRef.current?.select();
        passwordRef.current?.setSelectionRange(0,100);
         window.navigator.clipboard.writeText(password)
      },[password])
     useEffect(()=>{
      passwordGenerator();
     },[passwordGenerator])
  return (
    
    <div className="d-flex justify-content-center align-items-center vh-50">
    <div className="bg-info text-dark-emphasis text-center mt-4" style={{ width: '600px', height: '150px' }}>
      <h2 className="mt-4">Password generator</h2>
    <div className=" m-2 d-flex justify-content-center align-items-center"> 
      <input type="text" value={password} placeholder="Password" readOnly className="p-1 text-center" ref={passwordRef}/>
        <button onClick={CopytoClipboard}className="bg-primary p-1"style={{ width: '45px', height: '35px' }}>Copy</button>
    </div>

     <div className="d-flex justify-content-center align-items-center">
      <input type="range"  min="6"
        max="100" id="pp" value={length} className="cursor-pointer w-30 me-3" onChange={(e)=>{
           setLength( e.target.value)
        }}/><label htmlFor="pp" className="me-3">Length:{length}</label>
      
          <input  type="checkbox" id="pp1" defaultChecked={Number}  onClick={()=>{
          setNumber((prev)=>!prev)
        }}/>
        <label htmlFor="pp1" className="me-3">Number</label>
       
          <input  id="pp2"type="checkbox" defaultChecked={character} 
        onClick={()=>{
          setCharacter((prev)=>!prev)
        }}/>
        <label htmlFor="pp2" className="me-3">Characters</label>
     
     </div>
    </div>
  </div>
  
  )
}

export default App
