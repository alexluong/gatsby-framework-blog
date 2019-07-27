import React from "react"
import styled from "styled-components"
import Subline from "./Subline"

const Title = styled.h1`
  margin-bottom: 1rem;
`

function PostTitle({ title, date }) {
  return (
    <React.Fragment>
      <Title>{title}</Title>
      <Subline>
        {date} &mdash; {5} Min Read &mdash; In{" "}
      </Subline>
    </React.Fragment>
  )
}

export default PostTitle
