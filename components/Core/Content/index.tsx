import React from "react";
import styled from "styled-components";

const ContentContainer = styled.main`
  width: 100%;
  min-height: calc(100vh - 100px);
  position: relative;
`;

export const Content: React.FC = ({ children }) => {
  return <ContentContainer>{children}</ContentContainer>;
};
