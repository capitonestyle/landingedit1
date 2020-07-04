import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import styled from 'styled-components'

import BackgroundImage from 'gatsby-background-image'

// Components
import Carousel from '../../components/FlickityCarusel'

const Shadow = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.44);
`

const Grid = styled.div`
    display: grid;
    /* grid-template-columns: repeat(3, 1fr); */
    grid-column-gap: 12px;

    /* Custom, iPhone Retina */
    @media only screen and (min-width: 320px) {
        grid-template-columns: repeat(1, 1fr);
        .col {
            &:nth-child(1) {
                margin-top: 40px;
                margin-bottom: 10px;
            }
            &:nth-child(2) {
                margin-bottom: 10px;
            }
            h3 {
                font-size: 30px;
                font-weight: bold;
                color: #ffffff;
                margin: 0;
            }
            p {
                height: 48px;
                font-size: 20px;
                font-weight: 600;
                color: #ffffff;
                margin: 0;
            }
        }
    }

    /* Extra Small Devices, Phones */
    @media only screen and (min-width: 375px) {
        .col {
            &:nth-child(1) {
                margin-top: 40px;
                margin-bottom: 40px;
            }
            &:nth-child(2) {
                margin-bottom: 40px;
            }
            h3 {
                font-size: 35px;
                font-weight: bold;
                color: #ffffff;
                margin: 0;
            }
            p {
                height: 48px;
                font-size: 23px;
                font-weight: 600;
                color: #ffffff;
                margin: 0;
            }
        }
    }

    /* Small Devices, Tablets */
    @media only screen and (min-width: 768px) {
        grid-template-columns: repeat(1, 1fr);
        .col {
            h3 {
                font-size: 45px;
            }
            p {
                font-size: 32px;
            }
        }
    }

    /* Small Devices, Tablets */
    @media only screen and (min-width: 1024px) {
        grid-template-columns: repeat(3, 1fr);
        .col {
            &:nth-child(1) {
                margin-top: 0px;
                margin-bottom: 0px;
            }
            &:nth-child(2) {
                margin-bottom: 0px;
            }
            h3 {
                font-size: 92px;
            }
            p {
                font-size: 32px;
            }
        }
    }

    margin: 0 auto;
    max-width: 1300px;
    padding: 0 1.0875rem 1.45rem;
    width: 100%;
    z-index: 1;
    .col {
        text-align: center;
    }
`

const HowLongWeAre = ({ className, scrollToAboutRef }) => {
    const {
        mobileImage,
        desktopImage,
        allExhibitionJson,
        allProductionJson,
    } = useStaticQuery(
        graphql`
            query {
                mobileImage: file(relativePath: { eq: "couch_mobile.jpg" }) {
                    childImageSharp {
                        fluid(maxWidth: 490, quality: 100) {
                            ...GatsbyImageSharpFluid_withWebp
                        }
                    }
                }
                desktopImage: file(relativePath: { eq: "couch.jpg" }) {
                    childImageSharp {
                        fluid(quality: 100, maxWidth: 1440) {
                            ...GatsbyImageSharpFluid_withWebp
                        }
                    }
                }
                allExhibitionJson {
                    nodes {
                        id
                        image
                    }
                }
                allProductionJson {
                    nodes {
                        id
                        image
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
        <section style={{ overflow: 'hidden' }} ref={scrollToAboutRef}>
            <BackgroundImage
                Tag="section"
                className={className}
                fluid={sources}
                backgroundColor={`#040e18`}
            >
                <Shadow />
                <Grid>
                    <div className="col">
                        <h3>с 2016</h3>
                        <p>года на рынке</p>
                    </div>
                    <div className="col">
                        <h3>5480+</h3>
                        <p>готовых изделий</p>
                    </div>
                    <div className="col">
                        <h3>80+</h3>
                        <p>городов</p>
                    </div>
                </Grid>
            </BackgroundImage>
            <div style={{ marginBottom: 80, marginTop: 80 }}>
                <Carousel
                    sliderTitle="ВЕДЬ В НАШЕ ПРОИЗВОДСТВО ВЛОЖЕНА ДУША"
                    data={allProductionJson.nodes}
                />
            </div>
            <Carousel
                sliderTitle="ТАКЖЕ МЫ УЧАСНИКИ МЕЖДУНАРОДНЫХ ВЫСТАВОК"
                data={allExhibitionJson.nodes}
            />
        </section>
    )
}

const StyledHowLongWeAre = styled(HowLongWeAre)`
    position: relative;
    width: 100%;
    height: 50vh;
    background-position: bottom center;
    background-repeat: repeat-y;
    background-size: cover;
    z-index: -1;
    display: flex;
    align-items: center;
    justify-content: center;
`

export default StyledHowLongWeAre
