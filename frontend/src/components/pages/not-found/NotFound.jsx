import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Theme } from "../../../assets/styles/Theme";

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  text-align: center;
`;

const IconWrapper = styled.div`
  background-color: #ffffff;
  border-radius: 50%;
  margin-top: 100px;

  img {
    width: 500px;
    height: auto;
  }
`;

const Title = styled.h1`
  font-size: 80px;
  font-weight: bold;
  margin: 0;
  /* color: ${Theme.logo}; */
`;

const Message = styled.p`
  font-size: 24px;
  color: #666;
`;

const BackLink = styled(Link)`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: ${Theme.logo};
  color: white;
  border-radius: 6px;
  text-decoration: none;
`;

const NotFound = () => {
  return (
    <NotFoundContainer>
      <IconWrapper>
        <img src="/images/404-icon.png" alt="404 icon" />
      </IconWrapper>
      <Title>404</Title>
      <Message>Trang không tồn tại</Message>
    </NotFoundContainer>
  );
};

export default NotFound;
