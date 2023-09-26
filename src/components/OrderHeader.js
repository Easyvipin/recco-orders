import React from "react";
import styled from "styled-components";
import { colors } from "themes/colors";

const OrderHeaderWrapper = styled.div`
  background-color: #fff;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 56px;
  z-index: 1;
`;

const OrderHeaderContent = styled.div`
  width: 85vw;
  margin: auto;
  padding: 10px 20px;

  @media (max-width: 1000px) {
    width: 95vw;
  }
`;

const Breadcrumb = styled.div`
  font-size: 14px;
  color: #999;
`;

const OrderIDContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2rem;
`;

const OrderID = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-right: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
`;

const OutlineButton = styled.button`
  background-color: transparent;
  outline: none;
  border: 2px solid ${colors.primaryGreen};
  color: ${colors.primaryGreen};
  padding: 6px 12px;
  margin-right: 10px;
  cursor: pointer;
  font-weight: bold;
  border-radius: 20px;

  @media (max-width: 700px) {
    font-size: 0.6rem;
  }
`;

const PrimaryButton = styled.button`
  background-color: #21623e;
  border: none;
  color: ${colors.backgroundGray};
  outline: none;
  padding: 0.5rem 1.2rem;
  cursor: pointer;
  font-weight: bold;
  border-radius: 20px;

  @media (max-width: 700px) {
    font-size: 0.6rem;
  }
`;

const BreadcrumbContainer = styled.div`
  width: 100%;
  text-align: left;
`;

const OrderHeader = ({ orderId }) => {
  return (
    <OrderHeaderWrapper>
      <OrderHeaderContent>
        <BreadcrumbContainer>
          <Breadcrumb>
            <strong>Order</strong> > <u>{orderId}</u>
          </Breadcrumb>
        </BreadcrumbContainer>
        <OrderIDContainer>
          <OrderID>Order {orderId}</OrderID>
          <ButtonContainer>
            <OutlineButton>Back</OutlineButton>
            <PrimaryButton>Approve Order</PrimaryButton>
          </ButtonContainer>
        </OrderIDContainer>
      </OrderHeaderContent>
    </OrderHeaderWrapper>
  );
};

export default OrderHeader;
