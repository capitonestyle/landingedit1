import React from 'react'
import Select, { components } from 'react-select'
import styled from 'styled-components'

// Components
import ProductImage from './ProductImage'
import Tooltip from './Tooltip'

const Span = styled.span`
    font-size: 20px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    color: #000000;
`

const ErrorMessage = styled.div`
    position: absolute;
    bottom: -22px;
    color: red;
    font-size: 15px;
`

const Option = props => {
    const hasImage = props.options.some(item => item.img)
    return (
        <components.Option {...props}>
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    position: 'relative',
                }}
            >
                {hasImage && (
                    <div
                        style={{
                            position: 'absolute',
                            width: '21%',
                            height: '100%',
                            top: -6.6,
                            left: -10,
                        }}
                    >
                        <ProductImage
                            alt="product"
                            filename={props.data.label}
                        />
                    </div>
                )}
                <div style={{ marginLeft: hasImage ? 60 : 0 }}>
                    {props.data.label}
                </div>
            </div>
        </components.Option>
    )
}

const NoOptionsMessage = props => {
    return (
        <components.NoOptionsMessage {...props}>
            Нечего не найдено
        </components.NoOptionsMessage>
    )
}

const SingleValue = ({ children, ...props }) => {
    const hasImage = props.options.some(item => item.img)
    return (
        <components.SingleValue {...props}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                {hasImage ? (
                    <div
                        style={{
                            width: 30,
                            height: 30,
                            marginTop: 5,
                            marginRight: 10,
                        }}
                    >
                        <ProductImage
                            alt="product"
                            filename={props.data.label}
                        />
                    </div>
                ) : (
                    ''
                )}
                <div style={{ paddingBottom: 1 }}>{children}</div>
            </div>
        </components.SingleValue>
    )
}

const ReactSelect = ({
    selectName,
    label,
    onChange,
    onBlur,
    options,
    error,
    touched,
    isDisabled,
    placeholder,
    defaultValue,
    withToolTip,
    value,
    iconStyles,
}) => {
    const handleChange = value => {
        // this is going to call setFieldValue and manually update values of the selectName
        onChange(selectName, value)
    }

    const handleBlur = () => {
        // this is going to call setFieldTouched and manually update touched of the selectName
        if (onBlur) {
            onBlur(selectName, true)
        }
    }

    return (
        <div style={{ marginBottom: 10, position: 'relative' }}>
            <div style={{ marginBottom: 5, marginTop: 5 }}>
                <label
                    htmlFor="color"
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}
                >
                    <Span>{label}</Span>
                    <span>
                        {withToolTip && (
                            <Tooltip iconStyles={iconStyles}>
                                <div>
                                    <p>MAGITEX MT Velour Deluxe</p>
                                    <p>Производитель: Турция</p>
                                    <p>Поставщик: Magitex</p>
                                    <p>Коллекция: MT Velour Deluxe</p>
                                    <p>Тип ткани: велюр</p>
                                    <p>
                                        Износостойкость: 150000 циклов по
                                        Мартиндейлу
                                    </p>
                                    <p>
                                        Особенности: Soft Touch, антикоготь,
                                        гипоаллергенная
                                    </p>
                                    <p>Плотность: 410 г/м.п.</p>
                                    <p style={{ color: '#f95047' }}>
                                        Цвет материала может отличаться от цвета
                                        на вашем экране
                                    </p>
                                </div>
                            </Tooltip>
                        )}
                    </span>
                </label>
            </div>
            <Select
                value={value}
                onChange={handleChange}
                onBlur={handleBlur}
                options={options}
                isDisabled={isDisabled}
                defaultValue={defaultValue}
                components={{
                    Option,
                    NoOptionsMessage,
                    SingleValue,
                }}
                placeholder={
                    <span className="floating-label">{placeholder}</span>
                }
                styles={{
                    dropdownIndicator: (base, state) => ({
                        ...base,
                        transition: 'all .2s ease',
                        transform: state.isFocused ? 'rotate(180deg)' : null,
                    }),
                    multiValueLabel: base => ({
                        ...base,
                        backgroundColor: 'black',
                        color: 'white',
                    }),
                    option: base => ({
                        ...base,
                        border: `0.5px solid #ccc`,
                        height: '100%',
                    }),
                    control: (base, props) => ({
                        ...base,
                        background: 'white',
                        border:
                            !!error && touched
                                ? 'solid 1px #e01e25'
                                : 'solid 1px #ccc',
                        borderRadius: 1,
                        '&:hover': {
                            border:
                                !!error && touched
                                    ? 'solid 1px #e01e25'
                                    : 'solid 1px #ccc',
                        },
                        transition: 'all 300ms',
                        '&:hover': { borderColor: 'lightgray' },
                        border:
                            !!error && touched
                                ? 'solid 1px #e01e25'
                                : '1px solid #000000',
                        boxShadow: 'none',
                    }),
                    valueContainer: (base, props) => ({
                        ...base,
                        background: props.selectProps.isDisabled
                            ? 'rgba(0, 0, 0, 0.12)'
                            : '',
                        color: 'white',
                        width: '100%',
                        padding: '10px 14px',
                    }),
                    placeholder: base => ({
                        ...base,
                        color: 'black',
                    }),
                    menu: base => ({
                        ...base,
                        background: 'white',
                        color: 'black',
                        zIndex: 2,
                    }),
                }}
            />
            {!!error && touched && <ErrorMessage>{error}</ErrorMessage>}
        </div>
    )
}

export default ReactSelect
