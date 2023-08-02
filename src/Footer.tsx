import styled from "styled-components";
import { ReactComponent as SunCoLight } from "./icons/suncoLogoLight.svg";
import { ReactComponent as InstagramIcon } from "./icons/Instagram.svg";
import { ReactComponent as TwitterIcon } from "./icons/Twitter.svg";
import { ReactComponent as YoutubeIcon } from "./icons/Youtube.svg";

const FooterWrapper = styled.footer`
  display: flex;
  position: fixed;
  bottom: 0;
  justify-content: space-between;
  align-items: center;
  height: 64px;
  width: 100%;
  background-color: var(--black);
  padding: 0px 100px;

  > p {
    color: var(--dark-grey);
  }
`;

const Icons = styled.div`
  display: flex;
  width: 100px;
  justify-content: space-between;
`;
const Footer = () => {
  return (
    <FooterWrapper>
      <SunCoLight />
      <p>&copy; 2023 dot.cards text task. All rights reserved</p>
      <Icons>
        <InstagramIcon />
        <TwitterIcon />
        <YoutubeIcon />
      </Icons>
    </FooterWrapper>
  );
};

export default Footer;
