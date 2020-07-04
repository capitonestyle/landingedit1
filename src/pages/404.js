import React from 'react'
import styled from 'styled-components'

// Components
// import Layout from '../components/layout'
import SEO from '../components/seo'

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: calc(100vh - 210px);
`

const NotFoundPage = () => (
    <>
        <Container>
            <SEO title="404: Not found" />
            <h1>NOT FOUND</h1>
            <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
        </Container>
    </>
)

export default NotFoundPage
