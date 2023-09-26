import { useDispatch, useSelector } from "react-redux";
import { styled } from "styled-components";
import { FaSearch, FaPrint } from "react-icons/fa";
import { changeItemStatus } from "./orderSlice";
import InfoItem from "@components/InfoItem";
import ProductTable from "@components/ProductTable";
import OrderHeader from "@components/OrderHeader";
import { colors } from "themes/colors";
import { useEffect, useState } from "react";
import { debounce, shippingDateToCurrentYear } from "utils";

const OrderContainerWrapper = styled.div`
  margin-top: 100px;
  height: 70vh;
  overflow-y: auto;
`;

const MainContainer = styled.div`
  width: 85vw;
  margin: auto;

  @media (max-width: 1000px) {
    width: 95vw;
  }
`;

const SupplierContainer = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 1rem 1.5rem;
  row-gap: 2rem;
`;

const TableContainer = styled.div`
  margin-top: 2rem;
  padding: 1rem 1.5rem;
  border: 1px solid ${colors.borderGray};
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(193, 194, 192, 0.2);
`;

const MoreContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

const SearchContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: inset 0px 0px 5px rgba(0, 0, 0, 0.2);
  border: 1px solid #ccc;
  border-radius: 20px;
  padding: 8px 8px;
  width: 40%;
`;

const SearchInput = styled.input`
  border: none;
  outline: none;
  width: 85%;
`;

const SearchIcon = styled(FaSearch)`
  z-index: 1;
  background-color: transparent;
  padding: 4px;
  border-radius: 20px;
  color: #ccc;
`;

const PrintIcon = styled(FaPrint)`
  color: ${colors.primaryGreen};
  font-size: 1.5rem;
  margin-left: 20px;
`;

const ActionContainer = styled.div`
  display: flex;
  align-items: center;
`;

const OutlineButton = styled.button`
  background-color: transparent;
  outline: none;
  border: 2px solid ${colors.primaryGreen};
  color: ${colors.primaryGreen};
  padding: 8px 15px;
  margin-right: 10px;
  cursor: pointer;
  font-weight: bold;
  border-radius: 20px;
`;

function OrderContainer() {
  const [searchQuery, setSearchQuery] = useState("");

  const order = useSelector((state) => state.order.orderData);
  const dispatch = useDispatch();

  const {
    orderId,
    supplier,
    totalPrice,
    category,
    department,
    shippingDate,
    approvalStatus,
    items,
  } = order;

  const [filteredItems, setFilteredItems] = useState(items);
  const currentDate = new Date();

  const formattedProductShippingDate = shippingDateToCurrentYear(shippingDate);

  useEffect(() => {
    const filtered = items.filter((item) =>
      item.productName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredItems(filtered);
  }, [searchQuery, items]);

  const handleStatusChange = (orderId, itemId, newStatus) => {
    if (currentDate < formattedProductShippingDate) {
      dispatch(changeItemStatus({ orderId, itemId, status: newStatus }));
    }
  };

  const debouncedSetSearchQuery = debounce(
    (value) => setSearchQuery(value),
    300
  );

  const handleSearchInputChange = (event) => {
    const { value } = event.target;
    debouncedSetSearchQuery(value);
  };

  return (
    <>
      <OrderHeader orderId={orderId} />
      <OrderContainerWrapper>
        <MainContainer>
          <SupplierContainer>
            <InfoItem heading={"Supplier"} value={supplier.name} />
            <InfoItem heading={"Shipping date"} value={shippingDate} />
            <InfoItem heading={"Total"} value={`$${totalPrice}`} />
            <InfoItem heading={"Category"} value={category} />
            <InfoItem heading={"Department"} value={department} />
            <InfoItem
              heading={"Status"}
              value={approvalStatus ? "Approved" : "Awaiting your approval"}
            />
          </SupplierContainer>
          <TableContainer>
            <MoreContainer>
              <SearchContainer>
                <SearchInput
                  type="text"
                  placeholder="Search..."
                  onChange={handleSearchInputChange}
                />
                <SearchIcon />
              </SearchContainer>
              <ActionContainer>
                <OutlineButton>Add Item</OutlineButton>
                <PrintIcon />
              </ActionContainer>
            </MoreContainer>
            <ProductTable
              items={filteredItems}
              handleStatusChange={handleStatusChange}
              orderId={orderId}
              isBeforeShipping={currentDate < formattedProductShippingDate}
            />
          </TableContainer>
        </MainContainer>
      </OrderContainerWrapper>
    </>
  );
}

export default OrderContainer;
