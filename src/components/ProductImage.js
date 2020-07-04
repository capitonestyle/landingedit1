import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'

const ProductImage = ({ alt, filename, ...args }) => (
    <StaticQuery
        query={graphql`
            query {
                images: allFile {
                    edges {
                        node {
                            relativePath
                            name
                            childImageSharp {
                                # fluid(maxWidth: 500, quality: 100) {
                                fluid(quality: 100) {
                                    ...GatsbyImageSharpFluid
                                }
                            }
                        }
                    }
                }
            }
        `}
        render={data => {
            const image = data.images.edges.find(n => {
                return n.node.relativePath.includes(filename)
            })

            if (!image) {
                return null
            }

            return (
                <Img
                    alt={alt}
                    fluid={image.node.childImageSharp.fluid}
                    {...args}
                />
            )
        }}
    />
)

export default ProductImage
