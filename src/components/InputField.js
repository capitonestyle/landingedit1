import React from 'react'
import styled from 'styled-components'

const ErrorMessage = styled.div`
    position: absolute;
    bottom: -20px;
    color: red;
    font-size: 15px;
`

const InputField = ({
    value,
    name,
    placeholder,
    type,
    handleChange,
    error,
    touched,
}) => {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                marginTop: 10,
                position: 'relative',
            }}
        >
            <input
                style={{
                    border:
                        !!error && touched
                            ? 'solid 1px red'
                            : 'solid 1px #000000',
                    padding: '13px 21px',
                    width: '100%',
                    margin: '5px 0',
                }}
                id={name}
                name={name}
                placeholder={placeholder}
                type={type}
                onChange={handleChange}
                value={value}
            />
            {!!error && touched && <ErrorMessage>{error}</ErrorMessage>}
        </div>
    )
}

export default InputField
