import styled from "styled-components";
import { ReactComponent as SunCoDark } from "./icons/suncoLogoDark.svg";
import { ReactComponent as CartIcon } from "./icons/cartIcon.svg";

const Header = ({ onViewCart }: any) => {
  const HeaderWrapper = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 64px;
    width: 100%;
    background-color: var(--white);
    border-bottom: 1px solid var(--line-light-grey);
    padding: 0px 100px;
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
