import React from 'react'
import Modal from 'react-modal'
import styled from 'styled-components'

// Compoennts
import ProductImage from './ProductImage'

const CloseButton = styled.button`
    background-color: transparent;
    border: none;
    cursor: pointer;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 99999;
`

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        width: '90%',
        height: '90%',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
}

Modal.setAppElement('#___gatsby')

function ZoomInImageModal({ modalIsOpen, onHandelCloseModal, filename }) {
    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={onHandelCloseModal}
            style={customStyles}
            contentLabel="Image modal"
        >
            <div style={{ position: 'relative' }}>
                <CloseButton onClick={onHandelCloseModal}>
                    <svg height="30" viewBox="0 0 413.348 413.348" width="30">
                        <path d="m413.348 24.354-24.354-24.354-182.32 182.32-182.32-182.32-24.354 24.354 182.32 182.32-182.32 182.32 24.354 24.354 182.32-182.32 182.32 182.32 24.354-24.354-182.32-182.32z" />
                    </svg>
                </CloseButton>
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                    }}
                >
                    <ProductImage alt="product" filename={filename} />
                </div>
            </div>
        </Modal>
    )
}

export default ZoomInImageModal
