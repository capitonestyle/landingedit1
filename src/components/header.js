import { Link } from 'gatsby'
import styled from 'styled-components'
import '../css/hamburger.css'
import React from 'react'

// Components
import ProductImage from './ProductImage'

const Wrapper = styled.div`
    height: 94px;
    display: flex;
    align-items: center;

    @media only screen and (min-width: 320px) {
        margin: 0 20px;
        .logo {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;

            .gatsby-image-wrapper {
                width: 200px;
            }
        }
        .sideMenu {
            margin-right: 30px;
            display: block;
        }
    }
    /* Small Devices, Tablets */
    @media only screen and (min-width: 800px) {
        margin: 0 20px;
        .logo {
            width: 200px;
            display: block;
        }
        .sideMenu {
            margin: 0;
            display: none;
        }
    }

    /* Small Devices, Tablets */
    @media only screen and (min-width: 1030px) {
        margin: 0 50px;
        .logo {
            width: 200px;
            display: block;
        }
        .sideMenu {
            margin: 0;
            display: none;
        }
    }
`

const HeaderStyleComponent = styled.header`
    box-shadow: 0 2px 10px 0 #8e8e93;
    background: white;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 9;
`

const Flex = styled.div`
    /* Custom, iPhone Retina */
    @media only screen and (min-width: 320px) {
        display: none;
    }

    /* Small Devices, Tablets */
    @media only screen and (min-width: 800px) {
        display: flex;
        justify-content: space-between;
        width: 100%;
    }

    .phone {
        position: relative;
        &:before {
            position: absolute;
            top: 27px;
            left: -45px;
            height: 1px;
            width: 56px;
            content: '';
            background: #979797;
            transform: rotate(90deg);
        }
        margin-left: 50px;
        p {
            margin: 0;
        }
    }

    .display-flex {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
`

const Button = styled.button`
    padding: 10px 30px;
    cursor: pointer;
    border: solid 2px #000000;
    background: #000000;
    font-size: 16px;
    color: white;
    transition: all 300ms;
    font-weight: 600;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: center;
    &:hover {
        border: solid 2px #000000;
        background: white;
        color: #000000;
    }
`

const ButtonLink = styled.button`
    position: relative;
    background: transparent;
    cursor: pointer;
    margin-right: 75px;
    border: 0;
    &:before {
        content: '';
        position: absolute;
        width: 100%;
        height: 3px;
        bottom: 0;
        left: 0;
        background: black;
        visibility: hidden;
        border-radius: 5px;
        transform: scaleX(0);
        transition: 0.25s linear;
    }
    &:hover:before,
    &:focus:before {
        visibility: visible;
        transform: scaleX(1);
    }
`

const Header = ({
    onHandleOpenModal,
    onHandleScrollTo,
    onHandleOpenSlider,
    isSideMenuOpen,
}) => (
    <HeaderStyleComponent>
        <Wrapper>
            <div onClick={onHandleOpenSlider} className="sideMenu">
                <button
                    className={`hamburger hamburger--slider ${
                        isSideMenuOpen ? 'is-active' : ''
                    }`}
                    type="button"
                >
                    <span className="hamburger-box">
                        <span className="hamburger-inner"></span>
                    </span>
                </button>
            </div>
            <div className="logo">
                <Link to="/">
                    <ProductImage alt="лого" filename="logo.png" />
                </Link>
            </div>
            <Flex>
                <div className="phone">
                    <p>+38 (098) 777-67-60</p>
                    <p>+38 (099) 777-67-80</p>
                </div>
                <div className="display-flex">
                    <ButtonLink onClick={() => onHandleScrollTo('about')}>
                        О нас
                    </ButtonLink>
                    <ButtonLink onClick={() => onHandleScrollTo('contact-us')}>
                        Контакты
                    </ButtonLink>
                    <Button onClick={onHandleOpenModal}>Оформить заказ</Button>
                </div>
<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-168132724-2"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-168132724-2');
</script>
            </Flex>
        </Wrapper>
    </HeaderStyleComponent>
)

export default Header
