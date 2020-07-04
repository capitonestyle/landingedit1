import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import styled from 'styled-components'

import BackgroundImage from 'gatsby-background-image'

function BackGroundImage({ className, imageName, bgImageSize }) {
    const { mobileImage, desktopImage } = useStaticQuery(
        graphql`
            query {
                mobileImage: allFile {
                    edges {
                        node {
                            relativePath
                            name
                            childImageSharp {
                                fluid(maxWidth: 490, quality: 100) {
                                    ...GatsbyImageSharpFluid_withWebp
                                }
                            }
                        }
                    }
                }
                desktopImage: allFile {
                    edges {
                        node {
                            relativePath
                            name
                            childImageSharp {
                                fluid(quality: 100, maxWidth: 1400) {
                                    ...GatsbyImageSharpFluid_withWebp
                                }
                            }
                        }
                    }
                }
            }
        `
    )

    const filteredDesktopImage = desktopImage.edges.find(
        image => image.node.relativePath === imageName
    )

    const filteredMobileImage = mobileImage.edges.find(
        image => image.node.relativePath === imageName
    )

    // Set up the array of image data and `media` keys.
    // You can have as many entries as you'd like.
    const sources = [
        filteredMobileImage.node.childImageSharp.fluid,
        {
            ...filteredDesktopImage.node.childImageSharp.fluid,
            media: `(min-width: 491px)`,
        },
    ]

    return (
        <BackgroundImage
            Tag="section"
            className={className}
            fluid={sources}
            backgroundColor={`#040e18`}
            style={{
                width: '100%',
                height: bgImageSize,
                backgroundPosition: 'bottom center',
                backgroundRepeat: 'repeat-y',
                backgroundSize: 'cover',
            }}
        />
    )
}

// const StyledBackGroundImage = styled(BackGroundImage)`
//     width: 100%;
//     height: 306px;
//     background-position: bottom center;
//     background-repeat: repeat-y;
//     background-size: cover;
// `

export default BackGroundImage
