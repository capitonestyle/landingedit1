import React from 'react'
import { useFormik } from 'formik'
import styled from 'styled-components'
import axios from 'axios'
import * as Yup from 'yup'

// Components
import ReactSelect from './ReactSelect'
import InputField from './InputField'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

// Utils
import numberWithSpaces from '../utils/numberWithSpaces'

const SweetAlert = withReactContent(Swal)

const phoneRegExp = /^\+?3?8?(0\d{9})$/

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

const Grid = styled.div`
    display: grid;

    /* Custom, iPhone Retina */
    @media only screen and (min-width: 320px) {
        grid-template-columns: repeat(1, 1fr);
    }

    /* Small Devices, Tablets */
    @media only screen and (min-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
    }

    grid-column-gap: 20px;
    .product-full-price {
        background: pink;
    }
`

const colorOptions = [
    { value: 1, label: 'MT Velour DELUXE 1', img: true },
    { value: 5, label: 'MT Velour DELUXE 5', img: true },
    { value: 7, label: 'MT Velour DELUXE 7', img: true },
    { value: 9, label: 'MT Velour DELUXE 9', img: true },
    { value: 12, label: 'MT Velour DELUXE 12', img: true },
    { value: 13, label: 'MT Velour DELUXE 13', img: true },
    { value: 14, label: 'MT Velour DELUXE 14', img: true },
    { value: 17, label: 'MT Velour DELUXE 17', img: true },
    { value: 18, label: 'MT Velour DELUXE 18', img: true },
    { value: 19, label: 'MT Velour DELUXE 19', img: true },
    { value: 21, label: 'MT Velour DELUXE 21', img: true },
    { value: 25, label: 'MT Velour DELUXE 25', img: true },
    { value: 26, label: 'MT Velour DELUXE 26', img: true },
    { value: 30, label: 'MT Velour DELUXE 30', img: true },
    { value: 32, label: 'MT Velour DELUXE 32', img: true },
    { value: 33, label: 'MT Velour DELUXE 33', img: true },
    { value: 34, label: 'MT Velour DELUXE 34', img: true },
    { value: 37, label: 'MT Velour DELUXE 37', img: true },
    { value: 39, label: 'MT Velour DELUXE 39', img: true },
    { value: 40, label: 'MT Velour DELUXE 40', img: true },
    { value: 44, label: 'MT Velour DELUXE 44', img: true },
]

const MainForm = ({ isModal, children, data, couchModel, setIsOpen }) => {
    const [priceValue, setPrice] = React.useState({
        price: 0,
    })

    const formik = useFormik({
        initialValues: {
            firstName: '',
            phone: '+380',
            couchModel: '',
            couchSize: '',
            color: '',
            mattress: '',
        },
        enableReinitialize: false,
        validationSchema: () => {
            return Yup.object().shape({
                couchSize: Yup.string()
                    .ensure()
                    .required('Обязательное поле*'),
                color: Yup.string()
                    .ensure()
                    .required('Обязательное поле*'),
                mattress: Yup.string()
                    .ensure()
                    .required('Обязательное поле*'),
                        : null,
                firstName: Yup.string()
                    .min(1, 'Too Short!')
                    .max(50, 'Too Long!')
                    .required('Обязательное поле*'),
                phone: Yup.string()
                    .matches(phoneRegExp, 'Номер телефона не валидный')
                    .required('Обязательное поле*'),
            })
        },
        onSubmit: (values, { resetForm }) => {
            const schema = {
                couchTitle: data.title,
                firstName: values.firstName,
                phone: values.phone,
                couchSize: values.couchSize.label,
                color: values.color.label,
                mattress: values.mattress.label,
                amountPrice: priceValue.price,
            }

            axios
                .post('https://capitonestylemailer.now.sh/api/v1', schema)
                .then(() => {
                    SweetAlert.fire({
                        title: (
                            <p>
                                Спасибо! Ваш заказ принят. Мы свяжемся с Вами в
                                ближайшее время.
                            </p>
                        ),
                        icon: 'success',
                        confirmButtonText: 'Закрыть',
                    })

                    resetForm()

                    setPrice({
                        price: 0,
                    })

                    if (setIsOpen) {
                        setIsOpen(false)
                    }
                })
                .catch(() => {
                    SweetAlert.fire({
                        title: <p>Что то пошло не так, попробуете еще раз</p>,
                        icon: 'error',
                        confirmButtonText: 'Закрыть',
                    })
                })
        },
    })

    React.useEffect(() => {
        if (formik.values.couchSize) {
            setPrice({
                price: formik.values.couchSize.price,
            })
        }

        if (formik.values.mattressSize) {
            if (formik.values.mattress.value === 1) {
                setPrice({
                    price: formik.values.couchSize.price,
                })
            }
            if (formik.values.mattress.value === 2) {
                setPrice({
                    price:
                        formik.values.mattressSize.sans +
                        formik.values.couchSize.price,
                })
            }
            if (formik.values.mattress.value === 3) {
                setPrice({
                    price:
                        formik.values.mattressSize.soft +
                        formik.values.couchSize.price,
                })
            }
        }
    }, [
        formik.values.couchSize,
        formik.values.mattress,
        formik.values.mattressSize,
        couchModel,
    ])
    return (
        <div className="main-form">
            <form
                onSubmit={formik.handleSubmit}
                className="product-select-form"
            >
                {isModal && children}
                <Grid>
                    <ReactSelect
                        label="РАЗМЕР КРОВАТИ:"
                        options={data.couchSize}
                        selectName="couchSize"
                        value={formik.values.couchSize}
                        onChange={formik.setFieldValue}
                        onBlur={formik.setFieldTouched}
                        error={formik.errors.couchSize}
                        touched={formik.touched.couchSize}
                        placeholder="Выберите кровать"
                    />
                    <ReactSelect
                        label="ЦВЕТ ОБИВКИ:"
                        withToolTip
                        options={colorOptions}
                        selectName="color"
                        value={formik.values.color}
                        onChange={formik.setFieldValue}
                        onBlur={formik.setFieldTouched}
                        error={formik.errors.color}
                        touched={formik.touched.color}
                        isDisabled={!formik.values.couchSize}
                        placeholder="Выберите обивку"
                        iconStyles={false}
                    />
                    <ReactSelect
                        label="МАТРАС:"
                        options={data.mattress}
                        selectName="mattress"
                        value={formik.values.mattress}
                        onChange={formik.setFieldValue}
                        onBlur={formik.setFieldTouched}
                        error={formik.errors.mattress}
                        touched={formik.touched.mattress}
                        isDisabled={!formik.values.color}
                        placeholder="Выберите матрас"
                    />

                    <ReactSelect
                        label="РАЗМЕР МАТРАСА:"
                        options={data.mattressSize}
                        selectName="mattressSize"
                        value={formik.values.mattressSize}
                        onChange={formik.setFieldValue}
                        onBlur={formik.setFieldTouched}
                        error={formik.errors.mattressSize}
                        touched={formik.touched.mattressSize}
                        isDisabled={
                            !formik.values.mattress ||
                            formik.values.mattress.value === 0
                        }
                        placeholder="Выберите размер матраса"
                    />

                    <InputField
                        name="firstName"
                        type="text"
                        placeholder="Введите ваше имя"
                        value={formik.values.firstName}
                        handleChange={formik.handleChange}
                        error={formik.errors.firstName}
                        touched={formik.touched.firstName}
                    />

                    <InputField
                        name="phone"
                        type="phone"
                        placeholder="Номер телефона"
                        value={formik.values.phone}
                        handleChange={formik.handleChange}
                        error={formik.errors.phone}
                        touched={formik.touched.phone}
                    />
                </Grid>

                <div
                    className="product-full-price"
                    style={{ fontSize: 22, color: '#000000', marginTop: 20 }}
                >
                    Итого:{' '}
                    <span style={{ fontSize: 36, fontWeight: 600 }}>
                        {numberWithSpaces(priceValue.price)} грн
                    </span>
                </div>
                <div className="product-submit" style={{ marginTop: 42 }}>
                    <Button type="submit">Отправить заказ</Button>
                </div>
            </form>
        </div>
    )
}

export default MainForm
