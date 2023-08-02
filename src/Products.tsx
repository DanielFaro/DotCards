import "./Products.css";
import React from "react";
import { IProduct } from "./Product";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "./Header";
import Footer from "./Footer";
// import { home as cosmicHome } from "./assets/shoes/cosmic";
// import { home as gammaHome } from "./assets/shoes/gamma";
// import { adidasImgs } from "./assets/shoes/adidas";
// import { home as arrowHome } from "./assets/shoes/offWhite";
// import {sale as saleImg} from "/assets/shoes/gamma/sale";

interface ProductsProps {
  products: IProduct[];
}

interface Images {
  [key: number]: string;
}

// const imgIndex: Images = {
//   1: gammaHome,
//   2: cosmicHome,
//   3: arrowHome,
//   4: adidasHome,
// };

// const useFetch = (url) => {

interface dataType {
  [key: string]: any;
}

const Products = () => {
  const [data, setData] = useState<dataType[]>([]);
  const navigate = useNavigate();
  async function fetchUrl(url: string) {
    const response = await fetch(url);
    const json = await response;
    // setData(json);
  }

  useEffect(() => {
    fetch("/products")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      });
    // fetchUrl("/products");
  }, []);

  // ADD automatic route to /products maybe
  const ContentWrapper = styled.div`
    text-align: left;
    width: 100%;
  `;

  const ProductsWrapper = styled.div`
    padding: 20px 100px;
    width: 100%;
  `;

  const Sale = styled.section`
    display: grid;

    grid-template-columns: 1fr;
    justify-content: center;
    // background-color: var(--hero-bg);
    border-radius: 2em;
    padding: 22px;
    margin-bottom: 50px;

    /* > div {
      display: grid;
      place-content: center;
    } */
    > img {
      height: 427px;
      max-height: 40vh;
      width: 100%;
      border-radius: 50px;
    }
  `;

  const Inventory = styled.section`
    display: grid;
    gap: 20px;
    // grid-template-rows: auto;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    // grid-template-columns: repeat(4fr);
    //sgrid-template-columns: 1fr;
    height: 400px;
    width: 100%;

    > div {
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
    }
  `;

  const SaleBtn = styled.button`
    height: 64px;
    width: 60%;
    color: var(--white);
    background-color: var(--black);
  `;

  // const Div = styled.div`
  //   display: grid;
  //   place-content: center;
  // `;

  return (
    data && (
      <ContentWrapper>
        <Header onViewCart={() => navigate("/cart")} />
        <ProductsWrapper>
          <Sale>
            {/* <div>
              <h2>25% Off</h2>
              <h1>Summer Sale</h1>
              <p>Discover our summer styles with discount </p>
              <SaleBtn>Shop Now</SaleBtn>
            </div> */}

            <img src={data[3]?.sale} alt="sale_img" />
          </Sale>
          <h1>Explore our latest drops</h1>
          <Inventory>
            {data.map((shoe, i) => {
              return (
                <div onClick={() => navigate(`/product/${data[i].id}`)}>
                  <img alt="home" src={data[i]?.home} />
                  <h2>{shoe.brand}</h2>
                  <div>{shoe.name}</div>
                  <p>${shoe.price}</p>
                </div>
              );
            })}
          </Inventory>
        </ProductsWrapper>
        <Footer />
      </ContentWrapper>
      // <ul>
      //   {data.length > 0 &&
      //     data.map((shoe) => {
      //       // const img = imgIndex[shoe.name];
      //       return <img src={adidasHome} alt="cosmic"></img>;
      //     })}
      // </ul>
    )
  );
  // return products.map((product: IProduct) => (
  //   <div key="product.name">{product.name}</div>
  // ));
};

export default Products;
