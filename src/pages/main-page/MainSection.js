import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import styled from 'styled-components'

import BackgroundImage from 'gatsby-background-image'

const Shadow = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    /* background-color: rgba(0, 0, 0, 0.44); */
    background-color: rgba(0, 0, 0, 0.24);
`

const ArrowDown = styled.div`
    width: 100%;
    text-align: center;
    cursor: pointer;

    svg {
        animation: action 600ms infinite alternate;
    }

    @keyframes action {
        0% {
            transform: translateY(0);
        }
        100% {
            transform: translateY(-10px);
        }
    }
`

const MainContent = styled.div`
    position: relative;
    z-index: 1;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;
    height: 100%;
    color: white;
    /* h1 {
        font-size: 50px;
        font-weight: 900;
        margin-bottom: 80px;
    } */

    /* Custom, iPhone Retina */
    @media only screen and (min-width: 320px) {
        margin: 0 10px;
        h1 {
            font-size: 22px;
            font-weight: 900;
            margin-bottom: 30px;
            margin-top: 50px;
        }
        p {
            font-size: 16px;
            font-weight: 600;
            font-stretch: normal;
            font-style: normal;
            line-height: normal;
            letter-spacing: normal;
            color: #ffffff;
            margin: 0;
            padding-bottom: 3px;
        }
        .button {
            margin-top: 40px;
            margin-bottom: 40px;
            text-align: center;
            width: 100%;
        }
    }

    /* Extra Small Devices, Phones */
    @media only screen and (min-width: 375px) {
        margin: 0 20px;
        h1 {
            /* font-size: 40px; */
            font-size: 30px;
        }
        p {
            font-size: 18px;
        }
    }

    /* Small Devices, Tablets */
    @media only screen and (min-width: 768px) {
        margin: 0 80px;
        h1 {
            font-size: 40px;
            margin-bottom: 65px;
        }
        p {
            font-size: 25px;
            line-height: 1.6;
        }
        .button {
            margin-top: 80px;
        }
    }

    @media screen and (min-width: 1200px) {
        margin: 0 80px;
        h1 {
            font-size: 43px;
            margin-bottom: 35px;
        }
        p {
            font-size: 23px;
        }
        .button {
            margin-top: 50px;
        }
    }
`

const Button = styled.button`
    padding: 17px 93px;
    cursor: pointer;
    border: solid 2px white;
    background: white;
    font-size: 18px;
    color: #000000;
    font-weight: 600;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: center;
    transition: all 600ms;
    &:hover {
        border: solid 2px #000000;
        background: #000000;
        color: white;
    }
`

const MainContainer = ({ className, scrollToElement }) => {
    const { mobileImage, desktopImage } = useStaticQuery(
        graphql`
            query {
                mobileImage: file(
                    relativePath: { eq: "main_page_mobile.jpg" }
                ) {
                    childImageSharp {
                        fluid(maxWidth: 490, quality: 100) {
                            ...GatsbyImageSharpFluid_withWebp
                        }
                    }
                }
                desktopImage: file(relativePath: { eq: "main_page.jpg" }) {
                    childImageSharp {
                        fluid(quality: 100, maxWidth: 1440) {
                            ...GatsbyImageSharpFluid_withWebp
                        }
                    }
                }
            }
        `
    )

    // Set up the array of image data and `media` keys.
    // You can have as many entries as you'd like.
    const sources = [
        mobileImage.childImageSharp.fluid,
        {
            ...desktopImage.childImageSharp.fluid,
            media: `(min-width: 491px)`,
        },
    ]

    return (
        <BackgroundImage
            Tag="section"
            className={className}
            fluid={sources}
            backgroundColor={`#040e18`}
            style={{ zIndex: 3, marginBottom: 150 }}
        >
            <Shadow />
            <MainContent>
                <h1>КРОВАТЬ ОТ ПРОИЗВОДИТЕЛЯ</h1>
                <div>
                    <p>
                        <span>-</span> Ручная работа
                    </p>
                    <p>
                        <span>-</span> Контроль качества
                    </p>
                    <p>
                        <span>-</span> Металлическая рамка
                    </p>
                    <p>
                        <span>-</span> Ортопедические буковые ламели
                    </p>
                    <p>
                        <span>-</span> Усиленный подъёмный механизм
                    </p>
                    <p>
                        <span>-</span> Сертифицированные материалы
                    </p>
                </div>
                <div className="button" style={{ zIndex: 9 }}>
                    <Button onClick={scrollToElement}>Подробнее</Button>
                </div>
                <ArrowDown onClick={scrollToElement}>
                    <svg width="40" height="40" viewBox="0 0 512.011 512.011">
                        <path
                            fill="white"
                            d="M505.755,123.592c-8.341-8.341-21.824-8.341-30.165,0L256.005,343.176L36.421,123.592c-8.341-8.341-21.824-8.341-30.165,0
			s-8.341,21.824,0,30.165l234.667,234.667c4.16,4.16,9.621,6.251,15.083,6.251c5.462,0,10.923-2.091,15.083-6.251l234.667-234.667
			C514.096,145.416,514.096,131.933,505.755,123.592z"
                        />
                    </svg>
                </ArrowDown>
            </MainContent>
        </BackgroundImage>
    )
}

const StyledMainContainer = styled(MainContainer)`
    position: relative;
    width: 100%;
    height: calc(100vh - 64px);
    background-position: bottom center;
    background-repeat: repeat-y;
    background-size: cover;
    z-index: 1;
`

export default StyledMainContainer
