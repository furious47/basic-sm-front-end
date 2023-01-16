import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Error = () => {
  return (
  
      <ErrorContainer>
        <h5>There was an error! Please go back to Home</h5>
        <Link to="/" className="btn">
          Dashboard
        </Link>
      </ErrorContainer>
    
  );
};


const ErrorContainer = styled.section`
  text-align: center;
  padding-top: 6rem; ;
`;

export default Error;

