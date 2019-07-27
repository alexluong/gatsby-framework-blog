import React from "react"
import styled from "styled-components"

const Container = styled.footer`
  text-align: center;
  padding: 3rem 1rem;
`

function Footer() {
  return (
    <Container>
      &copy; {new Date().getFullYear()} All rights reserved. <br />
    </Container>
  )
}

export default Footer
