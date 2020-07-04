import React from 'react'
import styled from 'styled-components'

// Icons
import { Facebook, Instagram, Gmail } from './Icons'

const Icons = styled.div`
    display: flex;
    justify-content: space-around;
    /* Custom, iPhone Retina */
    @media only screen and (min-width: 320px) {
        margin: 0px;
    }
    @media only screen and (min-width: 1024px) {
        margin: 0 55px;
    }
    a {
        cursor: pointer;
        transition: all 600ms;
        &:hover {
            transform: scale(1.1);
        }
    }
`

const SocialIcons = () => {
    return (
        <Icons>
            <a
                href="https://www.facebook.com/capitonestylefurniture"
                target="_blank"
                rel="noopener noreferrer"
                role="button"
            >
                <Facebook />
            </a>
            <a
                href="https://www.instagram.com/capitone_style_furniture/"
                target="_blank"
                rel="noopener noreferrer"
                role="button"
            >
                <Instagram />
            </a>
            <a
                href="mailto:capitonestyleua@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                role="button"
            >
                <Gmail />
            </a>
        </Icons>
    )
}

export default SocialIcons
