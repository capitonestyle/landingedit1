import React from 'react'
import styled from 'styled-components'
import { Tooltip } from 'react-tippy'
import 'react-tippy/dist/tippy.css'

// Icons
import { Information } from './Icons'

const StyledTooltip = styled.div`
    text-align: left;
    p {
        font-size: 18px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: normal;
        color: #000000;
        margin: 0;
    }
    h5 {
        font-size: 25px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: normal;
        text-align: center;
        color: #000000;
        margin: 0;
        padding-bottom: 14px;
    }
`

const TooltipComponent = ({ children, iconStyles }) => {
    return (
        <Tooltip
            sticky={true}
            html={<StyledTooltip>{children}</StyledTooltip>}
            theme="light"
            animation="fade"
            arrow={true}
        >
            <Information styles={iconStyles} />
        </Tooltip>
    )
}

export default TooltipComponent
