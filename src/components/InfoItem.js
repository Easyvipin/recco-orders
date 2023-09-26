import { styled } from "styled-components";

const InfoCard = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 1rem;
  h5 {
    color: #b2b7b4;
    margin: 0;
  }
  p {
    margin: 0;
    margin-top: 0.5rem;
    text-align: left;
  }
  &:not(:last-child) {
    border-right: 1px solid #c1c2c0;
  }
`;

function InfoItem({ heading, value }) {
  return (
    <InfoCard>
      <h5>{heading}:</h5>
      <p>
        <strong>{value}</strong>
      </p>
    </InfoCard>
  );
}

export default InfoItem;
