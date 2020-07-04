import React from 'react'
import styled from 'styled-components'
import { graphql, useStaticQuery } from 'gatsby'

// Components
import Card from '../../components/Card'
import SingleProducts from '../../components/SingleProducts'
import ZoomInImageModal from '../../components/ZoomInImageModal'

const Section = styled.section`
    margin: 0 auto;
    max-width: 1300px;
    padding: 0 1.0875rem 1.45rem;
`

const ProductList = styled.div`
    display: grid;

    /* Custom, iPhone Retina */
    @media only screen and (min-width: 320px) {
        grid-template-columns: repeat(1, 1fr);
        grid-row-gap: 30px;
    }

    /* Small Devices, Tablets */
    @media only screen and (min-width: 1024px) {
        grid-template-columns: repeat(3, 1fr);
        grid-column-gap: 12px;
        grid-row-gap: 0;
    }
`

const scrollToRef = ref => window.scrollTo(0, ref.current.offsetTop - 115)

const ProductSlider = ({ productSectionRef }) => {
    const [modalIsOpen, setZoomInModal] = React.useState(false)
    const [filename, setFilename] = React.useState('')

    const singleProductReference = React.useRef([
        React.createRef(),
        React.createRef(),
        React.createRef(),
    ])

    const { allFurnitureJson } = useStaticQuery(
        graphql`
            query {
                allFurnitureJson {
                    nodes {
                        id
                        image
                        title
                        description
                        reference
                        price
                    }
                }
            }
        `
    )

    const onHandleSelectProductId = productId => {
        singleProductReference.current.map(item => {
            if (item.current.id === productId) {
                scrollToRef(item)
            }
        })
    }

    const onHandelCloseModal = () => {
        setZoomInModal(false)
    }

    const onHandleOpenZoomInModal = () => {
        setZoomInModal(true)
    }

    return (
        <Section ref={productSectionRef}>
            <ProductList>
                {allFurnitureJson.nodes.map(item => (
                    <Card
                        key={item.id}
                        imageSources={item.image}
                        title={item.title}
                        content={item.description}
                        reference={item.reference}
                        price={item.price}
                        onHandleClick={() => onHandleSelectProductId(item.id)}
                    />
                ))}
            </ProductList>

            {allFurnitureJson.nodes.map((item, index) => (
                <div
                    style={{ marginBottom: 200, marginTop: 200 }}
                    key={item.id}
                >
                    <SingleProducts
                        reference={singleProductReference.current[index]}
                        productId={item.id}
                        setFilename={setFilename}
                        onHandleOpenZoomInModal={onHandleOpenZoomInModal}
                    />
                </div>
            ))}

            <ZoomInImageModal
                modalIsOpen={modalIsOpen}
                onHandelCloseModal={onHandelCloseModal}
                filename={filename}
            />
        </Section>
    )
}

export default ProductSlider
