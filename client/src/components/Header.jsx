import React from "react";
import logo from "../assets/logo.png";
import styled from "styled-components";

const Wrapper = styled.section`
  img {
    width: 300px;
  }
  @media (max-width: 700px) 
  {
    img 
    {
      display: block;
      margin: auto;
    }
  }
`;

function Header() 
{
    return (
        <Wrapper>
            <img src={logo} />
        </Wrapper>
    );
};

export default Header;