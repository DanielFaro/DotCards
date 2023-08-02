import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "./Header";
import Footer from "./Footer";
import { ReactComponent as ChevronRight } from "./icons/chevron-right.svg";
import { ReactComponent as ChevronLeft } from "./icons/chevron-left.svg";

export interface IProduct {
  name: string;
  imgs: string[];
  price: number;
}

interface dataType {
  [key: string]: any;
}

const CurrentProductWrapper = styled.div`
  padding: 20px 100px;
  width: 100%;
`;
const CurrentProduct = styled.div`
  /* padding: 20px 100px;
  width: 100%; */
  display: grid;
  place-content: center;
  column-gap: 40px;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 350px 350px;
  > div {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    text-align: left;
    h2 {
      margin-block-start: 10px;
      margin-block-end: 0;
    }
  }
`;

const Carousel = styled.div`
  display: flex;
  flex-direction: column;

  > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;

    > button {
      height: 40px;
      width: 40px;
      border-radius: 100%;
      border: none;
      background-color: var(--white);
      &:hover {
        cursor: pointer;
      }
    }
  }
  > img {
    width: 100%;
    height: 85%;
  }
`;

const Title = styled.div`
  display: grid;
  width: 100%;
  height: auto;
  grid-template-rows: 120px 120px 80px;
  vertical-align: middle;
  > div {
    padding: 10px 50px;
  }
`;

const Name = styled.div`
  border-bottom: 1px solid var(--line-light-grey);
  > p {
    font-weight: bold;
  }
`;

const CounterWrapper = styled.div`
  width: 136px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--line-light-grey);
  border-radius: 10px;

  > input {
    height: 34px;
    width: 50px;
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    display: inline-block;
    border: none;
    vertical-align: middle;
  }
`;
const IncrementBtn = styled.button`
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  background-color: var(--white);
  font-weight: bold;
  font-size: 20px;
`;

const AddToCart = styled.button`
  height: 60px;
  width: 100%;
  background-color: var(--black);
  color: var(--white);
  font-size: 18px;
  border-radius: 10px;
  transform: translateY(2px);
  transition: transform 0.5s ease-in-out;
  &:hover {
    cursor: pointer;
  }
  &:active {
    transform: translateY(-2px);
    transition: transform 0.5s ease-in-out;
  }
`;

const Description = styled.div`
  display: grid;
  grid-template-rows: 80px 1fr 1fr;
  grid-template-columns: auto;

  > p,
  li {
    font-size: 20px;
  }

  > div:nth-child(1) {
    border-bottom: 1px solid var(--line-light-grey);
  }
`;

const CloseUp = styled.div`
  > img {
    height: 100%;
    width: 100%;
  }
`;

const Product = () => {
  const [product, setProduct] = useState<dataType>({});
  const [quantity, setQuantity] = useState<number>(0);
  const [carouselIdx, setCarouselIdx] = useState<number>(0);
  const { carousel1, carousel2, carousel3 } = product;
  const carouselImgs = [carousel1, carousel2, carousel3];

  const { id } = useParams();
  const navigate = useNavigate();

  const decrement = () => {
    if (quantity > 0) setQuantity(quantity - 1);
  };
  const increment = () => setQuantity(quantity + 1);

  const addToCart = () => {
    const productId = Number(id);
    fetch("/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: productId,
        quantity,
      }),
    });
  };

  useEffect(() => {
    fetch(`/product/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
      });
  }, []);

  const ProductWrapper = styled.div`
    text-align: left;
    width: 100%;
  `;

  const carouselClick = (right: boolean) => {
    if (right) {
      if (carouselIdx < 2) {
        setCarouselIdx(carouselIdx + 1);
      } else {
        setCarouselIdx(0);
      }
    } else {
      if (carouselIdx === 0) {
        setCarouselIdx(2);
      } else {
        setCarouselIdx(carouselIdx - 1);
      }
    }
  };
  return (
    <ProductWrapper>
      <Header onViewCart={() => navigate("/cart")} />
      <CurrentProductWrapper>
        <CurrentProduct>
          <Carousel>
            {product && (
              <img alt="carousel-img" src={carouselImgs[carouselIdx]} />
            )}
            <div>
              <button onClick={() => carouselClick(false)}>
                <ChevronLeft />
              </button>
              <button onClick={() => carouselClick(true)}>
                <ChevronRight />
              </button>
            </div>
          </Carousel>
          <Title>
            <Name>
              <h2>{product.brand}</h2>
              <div>{product.name}</div>
              <p>${product.price}</p>
            </Name>
            <div>
              <h3>Quantity</h3>
              <CounterWrapper>
                <IncrementBtn onClick={() => decrement()}>-</IncrementBtn>
                <input type="text" value={quantity} />
                <IncrementBtn onClick={() => increment()}>+</IncrementBtn>
              </CounterWrapper>
            </div>
            <div>
              <AddToCart onClick={() => addToCart()}>Add to Cart</AddToCart>
            </div>
          </Title>
          <Description>
            <div>
              <h2>Description</h2>
            </div>
            <p>
              Energize your look with a fresh take on heritage adidas style. The
              adidas Daily 3.0 Shoes cut a classic profile with a modern suede
              upper. Your walk across campus or commute across town has never
              looked or felt this good.
            </p>
            <ul>
              <li>Regular fit</li>
              <li>Lace closure</li>
              <li>Rubber outsole with vulcanized look</li>
              <li>Imported</li>
            </ul>
          </Description>
          <CloseUp>
            <img alt="closeup" src={product?.zoom} />
          </CloseUp>
        </CurrentProduct>
      </CurrentProductWrapper>
      <Footer />
    </ProductWrapper>
  );
};

export default Product;
