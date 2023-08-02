import "./Cart.css";
import { IProduct } from "./Product";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Header from "./Header";
import Footer from "./Footer";
import { ReactComponent as ArrowRight } from "./icons/arrow-right.svg";
interface dataType {
  id: number;
  quantity: number;
}

interface ProductType {
  [key: string]: any;
}

const ContentWrapper = styled.div`
  text-align: left;
  width: 100%;
`;

const CartWrapper = styled.div`
  padding: 20px 100px;
  width: 100%;
  height: 70%;
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  grid-template-rows: 600px;
  gap: 20px;
  /* > div {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    text-align: left;
    /* > img {
        height: 100%;
        width: 100%;
      } */
  /* h2 {
      margin-block-start: 10px;
      margin-block-end: 0;
    } */
`;

const CheckoutBtn = styled.button`
  height: 60px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--black);
  color: var(--white);
  font-size: 18px;
  border-radius: 10px;
  transform: translateY(2px);
  transition: transform 0.5s ease-in-out;

  > p {
    margin-right: 10px;
  }
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

const Summary = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 70%;
  vertical-align: middle;

  > div {
    /* padding: 20px 50px; */
    display: flex;
    justify-content: space-between;
    /* padding: 0px 50px; */
    /* width: 100%; */
    /* &:last-child {
    display: grid;
    place-content: center;
  } */
  }
`;

const Total = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  border-top: 1px solid var(--line-light-grey);
`;

const Bag = styled.div`
  height: 70%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Cart = () => {
  const [cart, setCart] = useState<dataType[]>([]);
  const [products, setProducts] = useState<ProductType[]>([]);
  const [bag, setBag] = useState<ProductType[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [subtotal, setSubTotal] = useState<number>(0);
  const navigate = useNavigate();

  const decrement = (quantity: number, i: number) => {
    let cartItem = { ...cart[i], quantity: quantity - 1 };

    if (quantity > 0) setCart([...cart, cartItem]);
  };
  const increment = (quantity: number, i: number) => {
    let cartItem = { ...cart[i], quantity: quantity + 1 };
    setCart([...cart, cartItem]);
  };

  // const updateQuantity = () => {
  //   console.log("## addToCart clicked ==");
  //   const productId = Number(id);

  //   fetch("/cart", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       id: productId,
  //       quantity,
  //     }),
  //   });
  // };

  // let cartItems: ProductType[] = [];
  // const fillCartItems = () =>
  //   quantitiesArr.forEach((item) => {
  //     let product = products.filter((shoe) => shoe.id === item.id);
  //     console.log("## product in map ", product);
  //     cartItems.push(product[0]);
  //   });
  // console.log("## bag in Cart ==", bag);

  // products.filter((product) => product.id )
  // const ProductItem = (product) => {

  // }
  // console.log("## data in Cart", cart, products);
  useEffect(() => {
    fetch("/products")
      .then((response) => response.json())
      .then((data) => {
        console.log("## data in products useEffect ==", data);
        setProducts(data);
      });
    fetch("/cart")
      .then((response) => response.json())
      .then((data) => {
        console.log("## data in cart useEffect ==", data);
        setCart(data);
      });
    const quantitiesArr = cart.filter((shoe) => shoe.quantity > 0);
    console.log("## quantities arr ==", quantitiesArr);
    let cartItems: ProductType[] = [];
    for (let i = 0; i < quantitiesArr.length; i++) {
      let product = products.filter((shoe) => shoe.id === cart[i].id);
      cartItems.push(product[0]);
    }
    console.log("## bag in Cart ==", cartItems);
    setBag(cartItems);
    // fetchUrl("/products");
  }, []);
  const Bag = styled.div`
    height: 100%;
    border: 1px dashed black;
    display: flex;
    flex-direction: column;
    > div {
      display: grid;
      grid-template-columns: 0.5fr 1fr 0.5fr;
      height: 215px;
      border-bottom: 1px solid var(--line-light-grey);
      > img {
        height: 166px;
        width: 166px;
      }
      /* > div {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      } */
    }
  `;

  const Quantity = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
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

  // const getQuantity = (product) => {
  //   return ;
  // };
  return (
    <ContentWrapper>
      <Header onViewCart={() => navigate("/cart")} />
      <CartWrapper>
        <Bag>
          <h1>Your Bag</h1>
          <>
            {bag.map((product, i) => {
              let quantity = cart.filter(
                (cartItem) => cartItem.id === product.id
              )[0].quantity;
              console.log("## quantity in map ==", quantity);
              return (
                <div>
                  <img alt="cart-img" src={product.home} />
                  <Quantity>
                    <div>
                      <h3>{product.brand}</h3>
                      <p>{product.name}</p>
                    </div>
                    <CounterWrapper>
                      <IncrementBtn onClick={() => decrement(quantity, i)}>
                        -
                      </IncrementBtn>
                      <input type="text" value={quantity} />
                      <IncrementBtn onClick={() => increment(quantity, i)}>
                        +
                      </IncrementBtn>
                    </CounterWrapper>
                  </Quantity>
                  <p>${product.price}</p>
                </div>
              );
            })}
          </>
        </Bag>
        <Summary>
          <h1>Summary</h1>
          <div>
            <p>Subtotal</p>
            <p>${subtotal}</p>
          </div>
          <div>
            <p>Shipping and Delivery</p>
            <p>$20.00</p>
          </div>
          <div>
            <p>Tax</p>
            <p>$6.00</p>
          </div>
          <div>
            <p>Discount</p>
            <p>-$6.00</p>
          </div>
          <Total>
            <h2>Total</h2>
            <p>${total}</p>
          </Total>
          <CheckoutBtn>
            <p>Checkout</p>
            <ArrowRight />
          </CheckoutBtn>
        </Summary>
      </CartWrapper>
      <Footer />
    </ContentWrapper>
  );
};

export default Cart;
