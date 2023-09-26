import React, { useState } from "react";
import { styled } from "styled-components";
import { colors } from "themes/colors";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  padding: 2rem 2rem;
  width: 40vh;
  height: 18vh;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Heading = styled.span`
  font-size: 1.2rem;
  font-weight: bold;
  color: ${colors.textGray};
`;
const CloseIcon = styled.span`
  font-size: 1.8rem;
  color: ${colors.lightGray};
  font-weight: bold;
  cursor: pointer;
`;

function Modal({ isOpen, onClose, children, header }) {
  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalHeader>
          <Heading>{header}</Heading>
          <CloseIcon onClick={onClose}>&times;</CloseIcon>
        </ModalHeader>
        {children}
      </ModalContent>
    </ModalOverlay>
  );
}

export default Modal;
