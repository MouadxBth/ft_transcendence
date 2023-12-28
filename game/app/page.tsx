
"use client";
import Pong from "./Pong"
import { useState } from "react"



export default function Home() {
  let [color, setColor] : any = useState("");

  return (
    <div> 
      <div>
        <button onClick= {() => setColor("black")}>
          black
        </button>
          <br />
        <button onClick= {() => setColor("green")}>
          green
        </button>
        <br />
        <button onClick= {() => setColor("purple")}>
          purple
        </button>
        <br />
      </div>
      <Pong  color = {color} />
    </div>
  )
}


// import React from 'react';
// // import Pong from './Game';
// import Pong from './class_game'
// import './App.css';

// function App() {
//   return (
//     <div>
//       <Pong />
//     </div>
//   );
// }

// export default App;