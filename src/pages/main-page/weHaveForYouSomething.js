import React from 'react'
import styled from 'styled-components'
import { graphql, useStaticQuery } from 'gatsby'

// Components
import Carousel from '../../components/FlickityCarusel'
import { PdfFile } from '../../components/Icons'

const Button = styled.button`
    /* Custom, iPhone Retina */
    @media only screen and (min-width: 320px) {
        padding: 16px 65px;
    }

    /* Small Devices, Tablets */
    @media only screen and (min-width: 768px) {
        padding: 16px 100px;
    }

    border: solid 2px #000000;
    background: #000000;
    color: white;
    cursor: pointer;
    transition: all 300ms;
    display: flex;
    align-items: center;
    svg {
        fill: white;
        margin-left: 15px;
    }
    &:hover {
        background: white;
        color: black;
        svg {
            fill: black;
        }
    }
`

const WeHaveForYouSomething = () => {
    const { allOtherFurnitureJson } = useStaticQuery(
        graphql`
            query {
                allOtherFurnitureJson {
                    nodes {
                        id
                        image
                    }
                }
            }
        `
    )

    const downloadPdf = () => {
        window.open(
            'https://res.cloudinary.com/https-capitonestyle-com/image/upload/v1590743532/price-list_iwvni4.pdf',
            '_blank'
        )
    }

    return (
        <>
            <Carousel
                sliderTitle="А ТАКЖЕ У НАС ЕСТЬ ЧТО ПРЕДЛОЖИТЬ ВАМ ЕЩЕ"
                data={allOtherFurnitureJson.nodes}
            />
            <div style={{ textAlign: 'center', marginTop: 100 }}>
                <div
                    style={{
                        textAlign: 'center',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: 40,
                    }}
                >
                    <Button onClick={downloadPdf}>
                        Скачать каталог <PdfFile />
                    </Button>
                </div>
                <div
                    style={{
                        marginBottom: 45,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <a
                        href="https://res.cloudinary.com/https-capitonestyle-com/image/upload/v1581886341/warranty_vvjfhy.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        role="button"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            color: '#000000',
                        }}
                    >
                        ОПЛАТА ДОСТАВКА ГАРАНТИЯ
                        <PdfFile style={{ marginLeft: 15 }} />
                    </a>
                </div>
            </div>
        </>
    )
}

export default WeHaveForYouSomething
