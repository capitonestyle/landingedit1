import React from 'react'
import GoogleMapReact from 'google-map-react'
import styled from 'styled-components'

const MarkerStyle = styled.div`
    position: absolute;
    border-radius: 50% 50% 50% 0;
    border: 4px solid #82b1ff;
    width: 20px;
    height: 20px;
    transform: rotate(-45deg);
    cursor: pointer;
    &:after {
        position: absolute;
        content: '';
        width: 10px;
        height: 10px;
        border-radius: 50%;
        top: 50%;
        left: 50%;
        margin-left: -5px;
        margin-top: -5px;
        background-color: #82b1ff;
    }
`

const Marker = ({ text, onMarkerClick }) => (
    <MarkerStyle title={text} onClick={onMarkerClick} />
)

const defaultValue = {
    center: {
        lat: 50.588486,
        lng: 30.493072,
    },
    zoom: 16,
}

const GoogleMap = ({ list }) => {
    const [state, setState] = React.useState({
        center: {
            lat: 50.588486,
            lng: 30.493072,
        },
        zoom: 16,
    })

    React.useEffect(() => {
        if (list) {
            setState({
                center: {
                    lat: list.lat,
                    lng: list.lng,
                },
            })
        }
    }, [list])

    function onMarkerClick() {
        window.open(
            `https://www.google.com/maps/search/?api=1&query=${state.center.lat},${state.center.lng}`,
            '_blank'
        )
    }

    return (
        <GoogleMapReact
            bootstrapURLKeys={{
                key: 'AIzaSyCZStmPBeamfUsYDp7S83TOqHGyV1dRH5k',
                language: 'ua',
            }}
            defaultCenter={defaultValue.center}
            defaultZoom={defaultValue.zoom}
            center={state.center}
            zoom={state.zoom}
        >
            <Marker
                lat={state.center.lat}
                lng={state.center.lng}
                text={list ? list.shop : ''}
                onMarkerClick={onMarkerClick}
            />
        </GoogleMapReact>
    )
}

export default GoogleMap
