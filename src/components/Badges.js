import React from "react";
import styled from "styled-components";

const Badge = styled.div`
  display: block;
  padding: 8px 12px;
  border-radius: 20px;
  font-size: 10px;
  font-weight: bold;
  text-align: center;
  color: white;
`;

const BadgeType = {
  SUCCESS: "success",
  DANGER: "danger",
  ALARM: "alarm",
};

const getBadgeStyles = (type) => {
  switch (type) {
    case BadgeType.SUCCESS:
      return `
        background-color: #5ed797;
      `;
    case BadgeType.DANGER:
      return `
        background-color: #da2115;
      `;
    case BadgeType.ALARM:
      return `
        background-color: #f66d44;
      `;
    default:
      return "";
  }
};

const StyledBadge = styled(Badge)`
  ${(props) => getBadgeStyles(props.type)}
`;

const BadgeComponent = ({ type, children }) => {
  return <StyledBadge type={type}>{children}</StyledBadge>;
};

export default BadgeComponent;
