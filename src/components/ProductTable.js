import React, { useState } from "react";
import styled from "styled-components";
import { colors } from "themes/colors";
import ProductCTA from "./ProductCTA";
import Modal from "./Modal";
import { BadgeType, PRODUCT_STATUS } from "utils/constants";
import BadgeComponent from "./Badges";
import Avocado from "../Avocado.jpg";

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  thead {
    border-radius: 10px 0 0 10px !important;
  }
`;

const TableHead = styled.thead`
  border-bottom: 1px solid ${colors.borderGray};
  .product-name-head {
    text-align: center;
  }
`;

const TableRow = styled.tr``;

const TableHeader = styled.th`
  color: ${colors.mutedGray};
  font-weight: 500;
  padding: 10px;
  text-align: left;
`;

const TableCell = styled.td`
  padding: 1rem 1rem;
  text-align: left;
  border-bottom: 1px solid ${colors.borderGray};

  &.status-cell {
    max-width: 10rem;
    text-align: right;
    background-color: #f9f8f8;
  }

  &.product-name-cell {
    max-width: 10rem;
  }
`;

const ProductContainerList = styled.div`
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  box-shadow: 0 2px 4px rgba(193, 194, 192, 0.2);
  border-bottom: none;
  overflow-x: auto;
`;

const Button = styled.button`
  cursor: pointer;
  outline: none;
  border: none;
  color: #4d4f59;
  background-color: transparent;
  font-weight: bold;
  font-size: 0.9rem;
`;

const ProductMessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 80%;
  justify-content: space-between;
`;

const Message = styled.p`
  font-size: 1rem;
  font-weight: 500;
  text-align: left;
`;

const ActionFlexContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1.5rem;
`;

const StatusCellContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 2rem;
`;

const BadgeContainer = styled.div`
  flex: 1;
`;

const FlexContainer = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: flex-start;
  align-items: center;
`;

const StyledImg = styled.img`
  width: 30px;
  height: 30px;
`;

const ProductContainer = ({ productName }) => {
  return (
    <FlexContainer>
      <StyledImg src={Avocado} />
      <p>{productName.length > 50 ? productName?.slice(0, 50) : productName}</p>
    </FlexContainer>
  );
};

const ProductTable = ({
  items,
  handleStatusChange,
  orderId,
  isBeforeShipping,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productId, setProductId] = useState(null);
  const [productName, setProductName] = useState(null);

  const openModal = (productId, name) => {
    if (isBeforeShipping) {
      setProductId(productId);
      setProductName(name);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const badgeBasedOnStatus = (status) => {
    switch (status) {
      case PRODUCT_STATUS.missing:
        return (
          <BadgeComponent type={BadgeType.ALARM}>
            {PRODUCT_STATUS.missing}
          </BadgeComponent>
        );
      case PRODUCT_STATUS.missingUrgent:
        return (
          <BadgeComponent type={BadgeType.DANGER}>
            {PRODUCT_STATUS.missingUrgent}
          </BadgeComponent>
        );
      case PRODUCT_STATUS.approved:
        return (
          <BadgeComponent type={BadgeType.SUCCESS}>
            {PRODUCT_STATUS.approved}
          </BadgeComponent>
        );
      default:
        return null;
    }
  };

  return (
    <ProductContainerList>
      <Table>
        <TableHead>
          <TableRow className="table-header">
            <TableHeader className="product-name-head">
              Product Name
            </TableHeader>
            <TableHeader>Brand</TableHeader>
            <TableHeader>Price</TableHeader>
            <TableHeader>Quantity</TableHeader>
            <TableHeader>Total</TableHeader>
            <TableHeader>Status</TableHeader>
          </TableRow>
        </TableHead>
        <tbody>
          {items.map((item) => (
            <TableRow key={item.productId}>
              <TableCell className="product-name-cell">
                <ProductContainer productName={item.productName} />
              </TableCell>
              <TableCell>{item.brand}</TableCell>
              <TableCell>${item.price}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>${item.total}</TableCell>
              <TableCell className="status-cell">
                <StatusCellContainer>
                  <BadgeContainer>
                    {badgeBasedOnStatus(item.status)}
                  </BadgeContainer>
                  <ProductCTA
                    onMissing={() => {
                      if (PRODUCT_STATUS.approved !== item.status) {
                        openModal(item.productId, item.productName);
                      }
                    }}
                    status={item.status}
                    onApprove={() => {
                      if (item.status === "REQUESTED") {
                        handleStatusChange(
                          orderId,
                          item.productId,
                          PRODUCT_STATUS.approved
                        );
                      }
                    }}
                  />
                </StatusCellContainer>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
        {items.length === 0 && (
          <TableRow>
            <TableCell
              colSpan={6}
              style={{
                textAlign: "center",
              }}
            >
              Following Product Item is not in order
            </TableCell>
          </TableRow>
        )}
      </Table>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        header="Missing Product!"
        productId={productId}
        productName={productName}
      >
        <ProductMessageContainer>
          <Message>
            Is&nbsp; '
            {productName?.length > 50
              ? `${productName?.slice(0, 50)}...`
              : productName}
            ' urgent ?
          </Message>

          <ActionFlexContainer>
            <Button
              onClick={() => {
                closeModal();
                handleStatusChange(orderId, productId, "Missing");
              }}
            >
              No
            </Button>
            <Button
              onClick={() => {
                closeModal();
                handleStatusChange(orderId, productId, "Missing - Urgent");
              }}
            >
              Yes
            </Button>
          </ActionFlexContainer>
        </ProductMessageContainer>
      </Modal>
    </ProductContainerList>
  );
};

export default ProductTable;
