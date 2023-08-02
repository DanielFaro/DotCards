import React from "react";
import { IProduct } from "./Product";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { ReactComponent as SunCoDark } from "./icons/suncoLogoDark.svg";
import { ReactComponent as CartIcon } from "./icons/cartIcon.svg";
// import { home as cosmicHome } from "./assets/shoes/cosmic";

interface HeaderProps {
  Header: IProduct[];
}

interface Images {
  [key: number]: string;
}

interface dataType {
  [key: string]: any;
}

// interface headerProps {
//   onViewCart: () => function navigate(path: string);
// }

const Header = ({ onViewCart }: any) => {
  const [data, setData] = useState<dataType[]>([]);
  async function fetchUrl(url: string) {
    const response = await fetch(url);
    const json = await response;
    console.log("## inside fetchUrl ==", url, json);
    // setData(json);
  }

  // useEffect(() => {
  //   fetch("/Header")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setData(data.Header);
  //     });
  //   // fetchUrl("/Header");
  // }, []);

  // ADD automatic route to /Header maybe
  // const HeaderWrapper = styled.div`
  //   text-align: left;
  // `;

  const HeaderWrapper = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 64px;
    width: 100%;
    background-color: var(--white);
    border-bottom: 1px solid var(--line-light-grey);
    padding: 0px 100px;

    /* > div {
      width: 100%;
      height: 400px;
      text-align: left;
      > img {
        height: 60%;
        width: 100%;
      }
      h2 {
        margin-block-start: 10px;
        margin-block-end: 0;
      }
      > p {
        font-weight: bold;
      }
    } */
  `;

  const CartBtn = styled.button`
    height: 40px;
    display: grid;
    grid-template-columns: 40px auto;
    place-content: center;
    align-items: center;
    width: 142px;
    border: 1px solid var(--black);
    border-radius: 10px;
    color: var(--black);
    background-color: var(--white);

    &:hover {
      cursor: pointer;
    }
  `;

  return (
    <HeaderWrapper>
      <SunCoDark />
      <CartBtn onClick={() => onViewCart()}>
        <CartIcon />
        <h3>View Cart</h3>
      </CartBtn>
    </HeaderWrapper>
  );
};

export default Header;
