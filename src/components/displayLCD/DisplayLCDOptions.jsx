import React, { useEffect, useState } from "react";
import { Container, PBold, Title } from "../assets/styles/styles";

export default function DisplayLCDOptions({ mensajeHexadecimal }) {
  // Función para convertir de hexadecimal a ASCII
  const convertirHexAASCII = hex => {
    let str = "";
    for (let i = 0; i < hex.length; i += 2) {
      const charCode = parseInt(hex.substr(i, 2), 16);
      str += String.fromCharCode(charCode);
    }
    return str;
  };

  const [ASCIIMessage, setASCIIMessage] = useState(convertirHexAASCII(mensajeHexadecimal));

  // Effect to receive messages from the server
  useEffect(() => {
    //definimos los valores de pesos chilenos y la moneda a qué iremos convertir
    const inputMessage = document.querySelector("#message");
    const selectCommand = document.querySelector("#selectCommand");

    let valorSeleccionado = selectCommand.value;

    // Obtiene el valor actual del input (lo que el usuario ha ingresado)
    inputMessage.addEventListener("input", function () {
      // Asignamos el valor ingresado a la variable
      setASCIIMessage(convertirHexAASCII(valorSeleccionado + inputMessage.value));
    });

    // Obtiene el valor actual del select mediante el evento 'change'
    selectCommand.addEventListener("change", function () {
      // Obtiene el valor actualmente seleccionado en el select
      valorSeleccionado = selectCommand.value;

      // Hacer algo con el valor seleccionado
      setASCIIMessage(convertirHexAASCII(valorSeleccionado + inputMessage.value));
    });
  }, []);

  // Función para mostrar el mensaje en el "display LCD"
  const mostrarMensajeEnLCD = () => {
    return (
      <Container color="#DAD8D8">
        <Title>Display LCD</Title>
        <div>
          Palabra convertida en ASCII: <PBold> {ASCIIMessage}</PBold>
        </div>

        <select id="selectCommand">
          <option value="0A">0x0A</option>
          <option value="0B">0x0B</option>
        </select>

        <input
          placeholder={`ej: ${mensajeHexadecimal.substring(2)}`}
          type="text"
          pattern="#[0-9a-fA-F]{3}([0-9a-fA-F]{3})?"
          id="message"
        ></input>
        <div>
          <small>{`Escribe la palabra en hexadecimal, por ejemplo: 486f6c61204d756e646f21`}</small>
        </div>
      </Container>
    );
  };

  return <div>{mostrarMensajeEnLCD()}</div>;
}
