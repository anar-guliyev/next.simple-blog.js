import React from "react";
import styled from "styled-components";

const SectionContainer = styled.section`
  width: 100%;
  padding: 0 5vw 2vw 5vw;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
`;

export const Section: React.FC = ({ children }) => {
  return <SectionContainer>{children}</SectionContainer>;
};
