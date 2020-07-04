import React from 'react'
import Modal from 'react-modal'
import styled from 'styled-components'
import axios from 'axios'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

// components
import InputField from './InputField'

const SweetAlert = withReactContent(Swal)

const CloseButton = styled.button`
    background-color: transparent;
    border: none;
    cursor: pointer;
    position: absolute;
    top: 0;
    right: 0;
`

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
}

const Button = styled.button`
    border: solid 2px #000000;
    background: #000000;
    color: white;
    cursor: pointer;
    transition: all 300ms;

    /* Custom, iPhone Retina */
    @media only screen and (min-width: 320px) {
        padding: 16px 50px;
        width: 100%;
    }

    /* Small Devices, Tablets */
    @media only screen and (min-width: 768px) {
        padding: 16px 80px;
    }

    &:hover {
        background: white;
        color: black;
    }
`

Modal.setAppElement('#___gatsby')

const DiscountModal = ({ modalIsOpen, onHandelCloseModal }) => {
    const [email, setEmail] = React.useState('')
    const [emailError, setEmailError] = React.useState(false)

    const onHandelCloseDiscountModal = () => {
        onHandelCloseModal()
        setEmailError(false)
        setEmail('')
    }

    const onHandleSubmit = e => {
        e.preventDefault()

        if (email.length === 0) {
            setEmailError('Обязательное поле*')
        } else {
            const schema = {
                email,
            }

            axios
                .post('https://capitonestylemailer.now.sh/api/v1', schema)
                .then(() => {
                    SweetAlert.fire({
                        title: (
                            <p>
                                Спасибо! Мы свяжемся с Вами в ближайшее время.
                            </p>
                        ),
                        icon: 'success',
                        confirmButtonText: 'Закрыть',
                    })

                    onHandelCloseModal()
                    setEmail('')
                })
                .catch(() => {
                    SweetAlert.fire({
                        title: <p>Что то пошло не так, попробуете еще раз</p>,
                        icon: 'error',
                        confirmButtonText: 'Закрыть',
                    })
                })
        }
    }

    const handleChange = e => {
        setEmail(e.target.value)
    }

    return (
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
    )
}

export default DiscountModal
