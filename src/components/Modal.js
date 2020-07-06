import React from 'react'
import Modal from 'react-modal'
import styled from 'styled-components'
import { graphql, useStaticQuery } from 'gatsby'
import ReactSelect from './ReactSelect'

// Components
import MainFrom from './MainForm'

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

const couchOptions = [
    { value: 'fc50543e-6628-4a74-af10-d2817422b513', label: 'Кровать DAKOTA' },
    { value: 'd10ffc35-eb7e-4dd7-bfd5-4e19edb24ccc', label: 'Кровать BRIDGET' },
    { value: 'a91d4a1b-44ff-4477-9533-0d5e9de3578d', label: 'Кровать EMILIA' },
]

Modal.setAppElement('#___gatsby')

const ModalComponent = ({ modalIsOpen, onHandelCloseModal, setIsOpen }) => {
    const [productId, setProductId] = React.useState(
        'fc50543e-6628-4a74-af10-d2817422b513'
    )
    const [couchModel, setCouchModel] = React.useState({
        value: 'fc50543e-6628-4a74-af10-d2817422b513',
        label: 'Кровать DAKOTA',
    })
    const { allFurnitureJson } = useStaticQuery(
        graphql`
            query {
                allFurnitureJson {
                    nodes {
                        id
                        image
                        product {
                            id
                            image
                        }
                        title
                        description
                        reference
                        price
                        couchSize {
                            value
                            price
                            label
                        }
                        mattress {
                            value
                            label
                        }
                        mattressSize {
                            value
                            label
                            sans
                            soft
                        }
                    }
                }
            }
        `
    )

    const data = allFurnitureJson.nodes.find(item => item.id === productId)

    const onHandleChangeCouchOption = (_, value) => {
        setProductId(value.value)
        setCouchModel(value)
    }

    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={onHandelCloseModal}
            style={customStyles}
            contentLabel="Form modal"
        >
            <div style={{ position: 'relative', padding: '30px 30px 0 30px' }}>
                <CloseButton onClick={onHandelCloseModal}>
                    <svg height="30" viewBox="0 0 413.348 413.348" width="30">
                        <path d="m413.348 24.354-24.354-24.354-182.32 182.32-182.32-182.32-24.354 24.354 182.32 182.32-182.32 182.32 24.354 24.354 182.32-182.32 182.32 182.32 24.354-24.354-182.32-182.32z" />
                    </svg>
                </CloseButton>
                <MainFrom
                    isModal
                    data={data}
                    couchModel={couchModel}
                    setIsOpen={setIsOpen}
                >
                    <ReactSelect
                        label="КРОВАТЬ:"
                        options={couchOptions}
                        selectName="couchModel"
                        value={couchModel}
                        defaultValue={couchModel}
                        onChange={onHandleChangeCouchOption}
                        placeholder="Выберите модель "
                    />
                </MainFrom>
                <p
                    style={{
                        fontSize: 16,
                        fontWeight: 300,
                        lineHeight: 'normal',
                    }}
                >
                    После оформления заказа, с вами свяжется оператор: уточнит
                    адрес доставки. <br /> После подтверждения заказа и оплаты
                    50% стоимости товара мебель будет <br /> сделана в течении 30 дней и отправлена по указанному адресу и оплаты второй части<br />По факту
                    отправки Вы получаете фото ТТН.
                </p>
            </div>
        </Modal>
    )
}

export default ModalComponent
