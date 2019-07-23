import React from "react"
import { graphql } from "gatsby"
import Posts from "../components/Posts"

function PostsTemplate({ data, ...props }) {
  return <Posts {...props} posts={data.allBlogPost.nodes} />
}

export default PostsTemplate

export const query = graphql`
  query {
    allBlogPost(sort: { fields: [date, title], order: DESC }, limit: 1000) {
      nodes {
        id
        slug
        title
        excerpt
        body
      }
    }
  }
`
