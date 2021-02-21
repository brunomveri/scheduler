import React, { useState } from "react";


function useVisualMode(initial) {

  // const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = function (newMode) {
    setHistory(prev => {
      return [...prev, newMode];
    });
  }
  
  const back = function () {
    setHistory(prev => {
      return [...prev.slice(0, history.length - 1)];
    });
  
  }

  const mode = history.slice(-1)[0];


  return {mode, transition, back};
}

export default useVisualMode;