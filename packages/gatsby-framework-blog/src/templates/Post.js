import React from "react"
import { graphql } from "gatsby"
import Post from "../components/Post"

function PostTemplate({ data, pathContext, ...props }) {
  const { previous, next } = pathContext
  return (
    <Post
      {...props}
      data={data}
      post={data.post}
      previous={previous}
      next={next}
    />
  )
}

export default PostTemplate

export const query = graphql`
  query($slug: String!) {
    post: blogPost(slug: { eq: $slug }) {
      id
      title
      date(formatString: "MMMM DD, YYYY")
      excerpt
      body
    }
  }
`
