
import { useState } from "react";


function useVisualMode(initial) {

  const [history, setHistory] = useState([initial]);
  
  const transition = function (newMode, replace = false) {  
    setHistory(prev => {
      if (replace) {
        const newHistory = [...prev];
        newHistory[newHistory.length - 1] = newMode;
        return newHistory;
      } else {
        return [...prev, newMode];
      }
    });
  };
  
  const back = function () {
    if (history.length > 1) {
      setHistory(prev => {
        return [...prev.slice(0, history.length - 1)];
      });
    };
  }
  
  const mode = history.slice(-1)[0];

  return {mode, transition, back};
}

export default useVisualMode;