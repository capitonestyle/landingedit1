import React from 'react'
import '../components/layout.css'
import styled from 'styled-components'
import { useStaticQuery, graphql } from 'gatsby'
// import { Link } from 'gatsby'
// import Image from '../components/image'
import SEO from '../components/seo'

// Utils
import debounce from '../utils/debaouce'

// Main Page components
import Header from '../components/header'
import Footer from '../components/Footer'
import MainContainer from './main-page/MainSection'
import ProductSlider from './main-page/ProductSlider'
import HowLongWeAre from './main-page/HowLongWeAre'
import MapSection from './main-page/MapSection'
import WeHaveForYouSomething from './main-page/weHaveForYouSomething'
import Modal from '../components/Modal'
import ScrollToTop from '../components/ScrollToTop'
import DiscountModal from '../components/DiscountModal'

// Icons
import SocialIcons from '../components/SocialIcons'

const SideMenu = styled.div`
    padding: 20px;
    /* Custom, iPhone Retina */
    @media only screen and (min-width: 320px) {
        h2 {
            font-size: 12px;
            font-weight: normal;
            font-stretch: normal;
            font-style: normal;
            line-height: normal;
            letter-spacing: normal;
            margin-bottom: 5px;
        }
        p {
            font-size: 10px;
            font-weight: normal;
            font-stretch: normal;
            font-style: normal;
            line-height: normal;
            letter-spacing: normal;
            margin-bottom: 0px;
        }
        a {
            font-size: 12px;
            font-weight: normal;
            font-stretch: normal;
            font-style: normal;
            line-height: normal;
            letter-spacing: normal;
            text-decoration: underline;
            margin: 0;
            color: white;
        }
        ul {
            margin: 0;
            list-style: none;
            li {
                font-size: 14px;
                font-weight: normal;
                font-stretch: normal;
                font-style: normal;
                line-height: normal;
                letter-spacing: normal;
            }
        }
    }

    /* Extra Small Devices, Phones */
    @media only screen and (min-width: 375px) {
        h2 {
            font-size: 17px;
        }
        p {
            font-size: 13px;
        }
        a {
            font-size: 13px;
        }
        ul {
            li {
                font-size: 13px;
            }
        }
    }

    @media only screen and (min-width: 768px) {
        h2 {
            font-size: 23px;
        }
        p {
            font-size: 16px;
        }
        a {
            font-size: 16px;
        }
        ul {
            li {
                font-size: 16px;
            }
        }
    }
`

const scrollToRef = ref => window.scrollTo(0, ref.current.offsetTop - 105)

const IndexPage = () => {
    const [modalIsOpen, setIsOpen] = React.useState(false)
    const [discountModalIsOpen, setDiscountIsOpen] = React.useState(false)
    const [scrollDirection, setScrollDirection] = React.useState('')
    const [isSideMenuOpen, setSideMenu] = React.useState(false)

    const productSectionRef = React.useRef(null)
    const scrollToAboutRef = React.useRef(null)
    const scrollToContactUsRef = React.useRef(null)

    const scrollToElement = () => {
        scrollToRef(productSectionRef)
    }

    React.useEffect(() => {
        //courtesy of BoogieJack.com
        function killCopy(e) {
            return false
        }
        function reEnable() {
            return true
        }
        document.onselectstart = new Function('return false')
        if (window.sidebar) {
            document.onmousedown = killCopy
            document.onclick = reEnable
        }
    }, [])

    React.useEffect(() => {
        if (!!scrollDirection) {
            scrollDirection === 'about'
                ? scrollToRef(scrollToAboutRef)
                : scrollToRef(scrollToContactUsRef)
        }
    }, [scrollDirection])

    const data = useStaticQuery(graphql`
        query SiteTitleQuery {
            site {
                siteMetadata {
                    title
                }
            }
        }
    `)

    const onHandleOpenModal = () => {
        setIsOpen(true)
    }

    const onHandleOpenDiscountModal = () => {
        setDiscountIsOpen(true)
    }

    const onHandelCloseModal = () => {
        setIsOpen(false)
    }

    const onHandelCloseDiscountModal = () => {
        setDiscountIsOpen(false)
    }

    const onHandleScrollTo = args => {
        setScrollDirection(args)
    }

    const onHandleOpenSlider = () => {
        setSideMenu(!isSideMenuOpen)
    }

    const onHandleCloseSideMenu = () => {
        setSideMenu(false)
    }

    const onHandleTouchMove = debounce(() => {
        setSideMenu(false)
    }, 10)

    return (
        <>
            <Header
                siteTitle={data.site.siteMetadata.title}
                onHandleOpenModal={onHandleOpenModal}
                onHandleScrollTo={onHandleScrollTo}
                onHandleOpenSlider={onHandleOpenSlider}
                isSideMenuOpen={isSideMenuOpen}
            />
            <main onClick={onHandleCloseSideMenu} style={{ marginTop: 94 }}>
                <SEO title="Home" />
                <MainContainer scrollToElement={scrollToElement} />
                <ProductSlider productSectionRef={productSectionRef} />
                <HowLongWeAre scrollToAboutRef={scrollToAboutRef} />
                <MapSection
                    onHandleOpenDiscountModal={onHandleOpenDiscountModal}
                />
                <WeHaveForYouSomething />
            </main>
            {isSideMenuOpen && (
                <div
                    id="sideMenu"
                    className={isSideMenuOpen ? 'slide-in' : 'slide-out'}
                    onTouchMove={onHandleTouchMove}
                >
                    <SideMenu>
                        <h2>НУЖНА КОНСУЛЬТАЦИЯ </h2>
                        <p>Звоните по телефонам:</p>
                        <p>+38 (098) 777-67-60</p>
                        <p>+38 (099) 777-67-80</p>
                        <div style={{ marginBottom: 23 }}>
                            <a
                                href="mailto:sales@capitone-style.com"
                                role="link"
                            >
                                sales@capitone-style.com
                            </a>
                            {/* <a
                                href="mailto:sales2@capitone-style.com"
                                role="link"
                            >
                                sales2@capitone-style.com
                            </a> */}
                        </div>
                        <h2>КОРПОРАТИВНЫМ И ОПТОВЫМ КЛИЕНТАМ </h2>
                        <a href="mailto:support@capitone-style.com" role="link">
                            support@capitone-style.com
                        </a>
                        <h2>ОПЛАТА </h2>
                        <p>
                            При покупке вы оплачиваете 50%, остача, перед
                            отправкой готовой продукции
                        </p>
                        <p style={{ margin: '15px 0' }}>Варианты оплаты: </p>
                        <ul>
                            <li>1. Безналичная оплата на расчетный счет</li>
                            <li>2. Перевод на карту ПриватБанка</li>
                        </ul>
                        <h2>ДОСТАВКА </h2>
                        <p style={{ marginBottom: 14 }}>
                            Отправляем по Украине транспортными компаниями до
                            отделения в Вашем населенном пункте
                        </p>
                        <p style={{ marginBottom: 10 }}>
                            Доставка по миру обсуждается индивидуально с
                            менеджером
                        </p>
                        <SocialIcons />
                    </SideMenu>
                </div>
            )}
            <Modal
                modalIsOpen={modalIsOpen}
                onHandelCloseModal={onHandelCloseModal}
                setIsOpen={setIsOpen}
            />

            <DiscountModal
                modalIsOpen={discountModalIsOpen}
                onHandelCloseModal={onHandelCloseDiscountModal}
            />
            <Footer scrollToContactUsRef={scrollToContactUsRef} />
            <ScrollToTop />
            <div id="fb-root"></div>
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={onHandelCloseDiscountModal}
            style={customStyles}
            contentLabel="Discount modal"
        >
            <div style={{ position: 'relative', padding: '30px 30px 0 30px' }}>
                <CloseButton onClick={onHandelCloseDiscountModal}>
                    <svg height="30" viewBox="0 0 413.348 413.348" width="30">
                        <path d="m413.348 24.354-24.354-24.354-182.32 182.32-182.32-182.32-24.354 24.354 182.32 182.32-182.32 182.32 24.354 24.354 182.32-182.32 182.32 182.32 24.354-24.354-182.32-182.32z" />
                    </svg>
                </CloseButton>
                <form style={{ textAlign: 'center' }} onSubmit={onHandleSubmit}>
                    <h3>Уважаемые клиенты Capitone Style!</h3>
                    <p>
                        При покупке изделий в магазинах наших партнеров, <br />{' '}
                        получите{' '}
                        <span style={{ fontWeight: 'bold', color: 'black' }}>
                            СКИДКУ 5%
                        </span>
                        . Введите свой E-mail,{' '}
                        <span style={{ fontWeight: 'bold', color: 'black' }}>
                            ПРОМО- <br />
                            КОД
                        </span>{' '}
                        придет в течении 10 минут, либо свяжитесь с <br /> нами
                        по телефону
                    </p>
                    <InputField
                        name="email"
                        type="email"
                        placeholder="Email"
                        value={email}
                        handleChange={handleChange}
                        error={emailError}
                        touched={!!emailError}
                    />
                    <br />
                    <div className="product-submit">
                        <Button type="submit">Отправить заказ</Button>
                    </div>
                </form>
            </div>
        </Modal>
        </>
    )
}

export default IndexPage
