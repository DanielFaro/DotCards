import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "./Header";
import Footer from "./Footer";
interface dataType {
  [key: string]: any;
}
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
  border-radius: 2em;
  padding: 22px;
  margin-bottom: 50px;

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
  grid-template-columns: 1fr 1fr 1fr 1fr;
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

const Products = () => {
  const [data, setData] = useState<dataType[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/products")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  return (
    data && (
      <ContentWrapper>
        <Header onViewCart={() => navigate("/cart")} />
        <ProductsWrapper>
          <Sale>
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
    )
  );
};

export default Products;
