import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { Container, FlexContainer, PBold, Title, TomatoButton } from "../assets/styles/styles";

const DisplayLCD = () => {
  // Component states
  const [displayMessage, setDisplayMessage] = useState(""); // Stores the display message
  const [type, setType] = useState(""); // Represents the type of message (transmission or reception)
  const [response, setResponse] = useState(""); // Represents the response status
  const [listHistory, setListHistory] = useState([]); // Stores a list of messages
  const socket = io(process.env.REACT_APP_SOCKET_URL); // Connect to the socket server

  // Effect to receive messages from the server
  useEffect(() => {
    const receiveMessage = msg => {
      // Update the list of messages with the received message
      setListHistory(prevMessages => [...prevMessages, msg]);
    };

    // Listen for "hexadecimalMessage" events from the server
    socket.on("hexadecimalMessage", receiveMessage);

    // Remove the event listener when the component unmounts
    return () => socket.off("hexadecimalMessage", receiveMessage);
  }, [socket]);

  const handleSubmit = e => {
    // Send a message to the server
    socket.emit("hexadecimalMessage", { body: displayMessage, type: type, response: response });

    // Add the new message to the list
    const newMsg = {
      body: displayMessage,
      type: type,
      response: response,
    };
    setListHistory(prevMessages => [...prevMessages, newMsg]);
  };

  // Function to convert from hexadecimal to ASCII
  const convertHexToASCII = hex => {
    const command = hex.slice(0, 2); // Get the first two characters (e.g., "0A")
    const hexMessage = hex.slice(2); // Get the message in hexadecimal (e.g., "4D454E53414A45")

    let str = command; // Keep the command (e.g., "0A")

    for (let i = 0; i < hexMessage.length; i += 2) {
      const charCode = parseInt(hexMessage.substr(i, 2), 16);
      str += String.fromCharCode(charCode);
    }

    handleSubmit(); // Submit the message

    return str;
  };

  const sendCommand = (command, commandType, response) => {
    if (commandType === 1 && response === "0x02") {
      // Transmission command
      // Simulate the response from the LCD display
      if (command.startsWith("0A")) {
        const message = `Mensaje enviado: ${command.substring(2)}`;
        setDisplayMessage(message);
        setType(commandType);
        setResponse(response);
      }
    } else if (commandType === 2) {
      setType(commandType);
      if (response === "0x02") {
        setResponse(response);
        // Reception command
        // Simulate the response here
        if (command.startsWith("0B")) {
          const message = `Mensaje recibido: _${command.substring(2)}`;
          setDisplayMessage(message);
        } else if (command.startsWith("0C")) {
          const receivedMessage = `Mensaje recibido: ${command.substring(3)}`;

          setDisplayMessage(receivedMessage);
        } else if (command.startsWith("0D")) {
          setDisplayMessage("Mensaje recibido: ");
        }
      } else if (response === "0x05") {
        setDisplayMessage(`Error: ${command}`);
      } else {
        console.log("Unrecognized command");
      }
    }
  };

  return (
    <Container color="#EAE8E8">
      <Title>Display LCD</Title>
      <span>
        Mensaje convertido a ASCII: <PBold>{displayMessage}</PBold>
      </span>
      <FlexContainer>
        <TomatoButton onClick={() => sendCommand(convertHexToASCII("0A4D454E53414A45"), 1, "0x02")}>
          0x0A
        </TomatoButton>
        <TomatoButton onClick={() => sendCommand(convertHexToASCII("0B4D454E53414A45"), 2, "0x02")}>
          0x0B
        </TomatoButton>
        <TomatoButton onClick={() => sendCommand(convertHexToASCII("0C4D454E53414A45"), 2, "0x02")}>
          0x0C
        </TomatoButton>
        <TomatoButton onClick={() => sendCommand("0D", 2, "0x02")}>0x0D</TomatoButton>
        <TomatoButton onClick={() => sendCommand("N/A", 2, "0x05")}>Todos</TomatoButton>
      </FlexContainer>
      <div>
        <div>
          <p>Bienvenido</p>
          {listHistory.map(
            (message, i) =>
              message.type && (
                <div key={`${message.type}-${i}`}>
                  Tipo de Mensaje: {message.type}
                  {" - "}
                  <span>Código Respuesta: {message.response}</span> <PBold> {message.body}</PBold>
                </div>
              )
          )}
        </div>
      </div>
    </Container>
  );
};

export default DisplayLCD;
