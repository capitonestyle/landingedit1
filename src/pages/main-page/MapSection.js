import React from 'react'
import styled from 'styled-components'
import { graphql, useStaticQuery } from 'gatsby'

// Components
import GoogleMap from '../../components/GoogleMap'
import ProductImage from '../../components/ProductImage'

const Grid = styled.div`
    display: grid;
    /* grid-template-columns: repeat(2, 1fr); */
    grid-column-gap: 53px;

    /* Custom, iPhone Retina */
    @media only screen and (min-width: 320px) {
        grid-template-columns: repeat(1, 1fr);
        .scroll {
            .col {
                grid-template-columns: 1fr;
                .logo {
                    width: 50%;
                    margin: 0 auto;
                    margin-bottom: 15px;
                }
            }
        }
    }

    /* Small Devices, Tablets */
    @media only screen and (min-width: 1024px) {
        grid-template-columns: repeat(2, 1fr);
        .scroll {
            .col {
                grid-template-columns: 0.4fr 1fr;
                .logo {
                    width: 126px;
                    margin: 0;
                }
            }
        }
    }

    margin: 0 auto;
    max-width: 1300px;
    padding: 0 1.0875rem 1.45rem;
    .scroll {
        /* height: 80vh;
        overflow: scroll; */

        .col {
            padding: 30px;
            cursor: pointer;
            /* display: flex;
            align-items: center; */
            display: grid;
            /* grid-template-columns: 0.4fr 1fr; */
            div {
                align-self: center;
            }
            /* justify-content: center; */
            transition: all 600ms;
            p {
                margin: 0;
                padding: 4px 0;
                line-height: normal;
            }
            &:nth-child(odd) {
                background: #e6e6e6;
            }
            &:hover {
                box-shadow: 0 2px 10px 0 #8e8e93;
                transform: translate3d(0, -3px, 0);
            }
        }
        .isActive {
            box-shadow: 0 2px 10px 0 #8e8e93;
            transform: translate3d(0, -3px, 0);
        }
    }
`

const ArrowRight = () => {
    return (
        <svg
            viewBox="0 0 512 512"
            width="15"
            height="15"
            style={{ marginLeft: 5 }}
        >
            <path d="M508.875,248.458l-160-160c-4.167-4.167-10.917-4.167-15.083,0c-4.167,4.167-4.167,10.917,0,15.083l141.792,141.792    H10.667C4.771,245.333,0,250.104,0,256s4.771,10.667,10.667,10.667h464.917L333.792,408.458c-4.167,4.167-4.167,10.917,0,15.083    c2.083,2.083,4.813,3.125,7.542,3.125c2.729,0,5.458-1.042,7.542-3.125l160-160C513.042,259.375,513.042,252.625,508.875,248.458z    " />
        </svg>
    )
}

const MapSection = ({ onHandleOpenDiscountModal }) => {
    const [state, setState] = React.useState({
        id: '1',
        shopType: 'Магазин',
        shopLogo: 'barinhouse.jpg,',
        shop: '«BARIN HOUSE»',
        address: 'ул. 135-а Садовая 3 (район Осокорки)',
        workingHours: 'ПН-СБ 10:00 - 20:00, ВС - выходной',
        phone: '+38 (097) 403-82-28',
        lat: 50.390243,
        lng: 30.604721,
    })

    const { allShopLocationOnMapJson } = useStaticQuery(
        graphql`
            query {
                allShopLocationOnMapJson {
                    nodes {
                        id
                        shopType
                        shopLogo
                        shop
                        address
                        workingHours
                        phone
                        lat
                        lng
                    }
                }
            }
        `
    )
    const onHandleSelect = list => {
        setState(list)
    }

    return (
        <section style={{ margin: '100px 0 ' }}>
            <h2
                style={{
                    textAlign: 'center',
                    marginBottom: 86,
                    fontSize: 28,
                    fontWeight: 'bold',
                    color: '#000000',
                }}
            >
                УВИДЕТЬ ВЖИВУЮ И ОЦЕНИТЬ КАЧЕСТВО НАШЕЙ МЕБЕЛИ МОЖНО ЗДЕСЬ
            </h2>
            <Grid>
                <div className="scroll">
                    {allShopLocationOnMapJson.nodes.map(list => (
                        <div
                            className={`col ${
                                list.lat === state.lat ? 'isActive' : ''
                            }`}
                            key={list.id}
                            onClick={() => onHandleSelect(list)}
                        >
                            <div className="logo">
                                <ProductImage
                                    alt="product"
                                    filename={list.shopLogo}
                                />
                            </div>
                            <div>
                                <p style={{ color: '#000000' }}>
                                    <span
                                        style={{
                                            fontSize: 16,
                                            marginRight: 10,
                                        }}
                                    >
                                        {list.shopType}
                                    </span>
                                    <span style={{ fontSize: 20 }}>
                                        {list.shop}
                                    </span>
                                </p>
                                <p style={{ fontSize: 16 }}>
                                    <span
                                        style={{
                                            color: '#6f6f75',
                                            paddingRight: 15,
                                        }}
                                    >
                                        Адрес:
                                    </span>{' '}
                                    {list.address}
                                </p>
                                <p style={{ fontSize: 16 }}>
                                    <span
                                        style={{
                                            color: '#6f6f75',
                                            paddingRight: 15,
                                        }}
                                    >
                                        Режим работы:
                                    </span>
                                    {list.workingHours}
                                </p>
                                <p style={{ fontSize: 16 }}>
                                    <span
                                        style={{
                                            color: '#6f6f75',
                                            paddingRight: 15,
                                        }}
                                    >
                                        Телефон:
                                    </span>{' '}
                                    {list.phone}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
                <div style={{ position: 'relative' }}>
                    <div
                        style={{ position: 'sticky', top: 120, height: '50vh' }}
                    >
                        <GoogleMap list={state} />
                        <button
                            style={{
                                background: 'transparent',
                                border: 'none',
                                textDecoration: 'underline',
                                paddingTop: 10,
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                outlineWidth: 0,
                            }}
                            type="button"
                            onClick={onHandleOpenDiscountModal}
                        >
                            Получить ПРОМО-КОД на покупку в магазине{' '}
                            <ArrowRight />
                        </button>
                    </div>
                </div>
            </Grid>
        </section>
    )
}

export default MapSection
