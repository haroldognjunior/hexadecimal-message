import styled from "styled-components";

//Buttons
export const Button = styled.button`
  cursor: pointer;
  color: #bf4f74;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid #bf4f74;
  border-radius: 3px;
  display: block;
`;

export const TomatoButton = styled(Button)`
  color: tomato;
  border-color: tomato;
`;

//Divs

export const FlexContainer = styled.div`
  display: block;
  @media screen and (min-width: 720px) {
    display: flex;
  }
`;

export const Container = styled.div`
  margin: 5em;
  background-color: ${props => props.color};
  padding: 5em;
`;

//Elements/Tags

export const Title = styled.h1`
  color: tomato;
  text-align: center;
`;

export const PBold = styled.p`
  font-weight: bold;
  font-family: "Courier New", Courier, monospace;
`;
