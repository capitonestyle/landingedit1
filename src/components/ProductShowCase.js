import React from 'react'
import Flickity from 'react-flickity-component'
import styled from 'styled-components'

// Components
import ProductImage from './ProductImage'

const ProductShowCaseStyles = styled.div`
    position: sticky;
    top: 100px;

    /* Custom, iPhone Retina */
    @media only screen and (min-width: 320px) {
        .hide-on-mobile {
            display: none;
        }
        .product-slider {
            padding-bottom: 50px;
        }
    }

    /* Small Devices, Tablets */
    @media only screen and (min-width: 768px) {
        .hide-on-mobile {
            display: block;
        }
        .product-slider {
            padding-bottom: 50px;
        }
    }

    @media only screen and (min-width: 1024px) {
        .product-slider {
            padding-bottom: 0px;
        }
    }
`

const flickityOptions = {
    initialIndex: 1,
    lazyLoad: 2,
    groupCells: 1,
    wrapAround: true,
    fullscreen: true,
    pageDots: false,
}

const ProductShowCase = ({ item, setFilename, onHandleOpenZoomInModal }) => {
    const [imageValue, setImage] = React.useState()

    const onHandleChangeImage = img => {
        setImage(img)
    }

    const onHandleZoomProductImage = img => {
        setFilename(img)
        onHandleOpenZoomInModal(true)
    }

    return (
        <ProductShowCaseStyles>
            <div
                className="hide-on-mobile"
                onClick={() => onHandleChangeImage(item.image)}
            >
                {/* <div onClick={() => onHandleZoomProductImage(item.image)}>
                    Icon
                </div> */}
                <ProductImage
                    alt="product"
                    filename={!imageValue ? item.image : imageValue}
                />
            </div>
            <div className="product-slider">
                <Flickity
                    className={'carousel'} // default ''
                    elementType={'div'} // default 'div'
                    options={flickityOptions} // takes flickity options {}
                    disableImagesLoaded={true} // default false
                    // reloadOnUpdate // default false
                    // static // default false
                >
                    {item.product.map(product => (
                        <div
                            onClick={() => onHandleChangeImage(product.image)}
                            key={product.id}
                        >
                            <ProductImage
                                alt={product.image}
                                filename={product.image}
                                className="product-carousel-image"
                                placeholderClassName="product-carousel-image"
                            />
                        </div>
                    ))}
                </Flickity>
            </div>
        </ProductShowCaseStyles>
    )
}

export default ProductShowCase
