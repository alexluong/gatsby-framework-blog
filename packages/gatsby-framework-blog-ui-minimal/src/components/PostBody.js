import React from "react"
import styled from "styled-components"
import Body from "gatsby-framework-blog/src/components/Body"

const Container = styled.div`
  margin-top: 4rem;
`

function PostBody({ post }) {
  return (
    <Container>
      <Body post={post} />
    </Container>
  )
}

export default PostBody
