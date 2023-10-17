import React from "react";
import DisplayLCD from "./displayLCD/DisplayLCD.jsx";
import DisplayLCDOptions from "./displayLCD/DisplayLCDOptions.jsx";

function App() {
  const mensajeHexadecimal = "0A4D454E53414A45"; // Un mensaje en formato hexadecimal

  return (
    <div className="App">
      <DisplayLCDOptions mensajeHexadecimal={mensajeHexadecimal} />
      <DisplayLCD />
    </div>
  );
}

export default App;
