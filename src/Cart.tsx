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

const CartWrapper = styled.div`
  text-align: left;
  width: 100%;
`;

const BagWrapper = styled.div`
  padding: 20px 100px;
  width: 100%;
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  grid-template-rows: 55%;
  gap: 20px;
`;

const Bag = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const ScrollWrapper = styled.section`
  overflow-y: scroll;
  > div {
    display: grid;
    grid-template-columns: 0.5fr 1fr 0.5fr;
    gap: 20px;
    place-content: start;
    height: auto;
    padding: 20px 0px;
    border-bottom: 1px solid var(--line-light-grey);
    > img {
      height: 166px;
      width: 166px;
    }
  }
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
  height: 60%;
  vertical-align: middle;

  > div {
    display: flex;
    justify-content: space-between;
  }
`;

const Total = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  border-top: 1px solid var(--line-light-grey);
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

const Cart = () => {
  const [cart, setCart] = useState<dataType[]>([]);
  const [products, setProducts] = useState<ProductType[]>([]);
  const [bag, setBag] = useState<ProductType[]>([]);
  const [total, setTotal] = useState<number>(300);
  const [subtotal, setSubTotal] = useState<number>(2449.98);
  const [quantity, setQuantity] = useState<number>(2);
  const navigate = useNavigate();

  const decrement = (quantity: number, i: number) => {
    let cartItem = { ...cart[i], quantity: quantity - 1 };

    if (quantity > 0) setCart([...cart, cartItem]);
  };
  const increment = (quantity: number, i: number) => {
    let cartItem = { ...cart[i], quantity: quantity + 1 };
    setCart([...cart, cartItem]);
  };

  useEffect(() => {
    fetch("/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      });
    fetch("/cart")
      .then((response) => response.json())
      .then((data) => {
        setCart(data);
      });
  }, []);

  return (
    <CartWrapper>
      <Header onViewCart={() => navigate("/cart")} />
      <BagWrapper>
        <Bag>
          <h1>Your Bag</h1>
          <ScrollWrapper>
            {products.map((product, i) => {
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
          </ScrollWrapper>
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
            <p>${subtotal + 20}</p>
          </Total>
          <CheckoutBtn>
            <p>Checkout</p>
            <ArrowRight />
          </CheckoutBtn>
        </Summary>
      </BagWrapper>
      <Footer />
    </CartWrapper>
  );
};

export default Cart;
