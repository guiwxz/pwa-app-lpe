import styled from "styled-components";

interface DisplayModal {
  open?: boolean;
}

export const ModalContainer = styled.div<DisplayModal>`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 99;
  opacity: 100%;
  -webkit-transition: all 0.5s 0.5s ease-in-out;
  transition: all 0.5s 0.5s ease-in-out;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${(props) => (props.open ? "block" : "none")};
`;

export const ModalContent = styled.div`
  padding: 10px 20px 20px 20px;
  width: 600px;
  //height: 500px;
  //max-width: 600px;
  //min-width: 360px;
  max-height: 85%;
  overflow: auto;
  position: absolute;
  top: 10%;
  left: 50%;
  z-index: 2;
  opacity: 100%;
  border-radius: 3px;
  background: #f0f0f0;
  -webkit-transform: translate(-50%, 0);
  -ms-transform: translate(-50%, 0);
  transform: translate(-50%, 0);
  -webkit-transition: all 0.5s ease-in-out;
  transition: all 0.5s ease-in-out;
  color: black;
`;
export const IconButton = styled.div`
  padding: 7px;
  cursor: pointer;
  display: flex;
  align-items: center;
  color: grey;
  border-radius: 5px;
  transition: 0.4s;

  &:hover {
    
    opacity: 60%;
  }
`;
