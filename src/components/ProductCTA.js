import { AiOutlineCheck } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import { styled } from "styled-components";
import { colors } from "themes/colors";
import { PRODUCT_STATUS } from "utils/constants";

const FlexContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1rem;
  text-align: center;
`;

const TickIcon = styled(AiOutlineCheck)`
  color: ${(props) => (props.isApproved ? colors.success : colors.mutedGray)};
  font-size: 1.5rem;
`;
const CrossIcon = styled(RxCross2)`
  color: ${(props) =>
    props.isMissing
      ? colors.alarm
      : props.isMissingUrgent
      ? colors.danger
      : colors.mutedGray};
  font-size: 1.5rem;
`;

const Button = styled.button`
  outline: none;
  border: none;
  color: ${colors.mutedGray};
  background-color: transparent;
  font-weight: medium-bold;
  font-size: 0.9rem;
`;

function ProductCTA({ onEdit, status, onMissing, onApprove }) {
  return (
    <FlexContainer>
      <TickIcon
        onClick={onApprove}
        isApproved={status === PRODUCT_STATUS.approved}
      />
      <CrossIcon
        onClick={onMissing}
        isMissing={status === PRODUCT_STATUS.missing}
        isMissingUrgent={status === PRODUCT_STATUS.missingUrgent}
      />
      <Button onClick={() => {}}>Edit</Button>
    </FlexContainer>
  );
}

export default ProductCTA;
