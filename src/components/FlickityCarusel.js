import React from 'react'
import Flickity from 'react-flickity-component'

import styled from 'styled-components'

// Styles
import './flickity.css'
import ProductImage from './ProductImage'

const H3 = styled.div`
    font-size: 28px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: center;
    color: #000000;
    margin-bottom: 16px;
`

const flickityOptions = {
    initialIndex: 1,
    lazyLoad: 2,
    wrapAround: true,
    fullscreen: true,
    pageDots: false,
}

const Carousel = ({ sliderTitle, data }) => {
    return (
        <div style={{ margin: '42px 0' }}>
            <H3>{sliderTitle}</H3>
            <Flickity
                className={'carousel'} // default ''
                elementType={'div'} // default 'div'
                options={flickityOptions} // takes flickity options {}
                disableImagesLoaded={false} // default false
                reloadOnUpdate // default false
                static // default false
            >
                {data.map(item => (
                    <ProductImage
                        key={item.id}
                        alt={item.image}
                        className="carousel-image"
                        placeholderClassName="carousel-image"
                        filename={item.image}
                    />
                ))}
            </Flickity>
        </div>
    )
}

export default Carousel
