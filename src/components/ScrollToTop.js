import React from 'react'
import styled from 'styled-components'

const ScrollTo = styled.div`
    position: fixed;
    right: 30px;
    bottom: 50px;
    z-index: 1;
    width: 50px;
    height: 50px;
    border: solid 1px #000000;
    background-color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 600ms;
    &:hover {
        background-color: #bbbbbb;
    }
`

const ScrollToTop = () => {
    const onHandleScrollToTop = () => {
        window.scrollTo({ top: 850, left: 0, behavior: 'smooth' })
    }

    return (
        <ScrollTo onClick={onHandleScrollToTop}>
            <svg width="30" height="30" viewBox="0 0 511.998 511.998">
                <path
                    d="M508.707,365.616L263.374,130.949c-4.125-3.938-10.625-3.938-14.75,0L3.29,365.616c-4.25,4.073-4.406,10.823-0.333,15.083
			c4.073,4.271,10.823,4.417,15.083,0.333l237.958-227.615l237.958,227.615c2.073,1.979,4.719,2.958,7.375,2.958
			c2.813,0,5.615-1.104,7.708-3.292C513.113,376.439,512.957,369.689,508.707,365.616z"
                />
            </svg>
        </ScrollTo>
    )
}

export default ScrollToTop
