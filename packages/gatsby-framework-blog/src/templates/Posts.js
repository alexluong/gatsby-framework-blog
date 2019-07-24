import React from "react"
import { graphql } from "gatsby"
import Posts from "../components/Posts"

function PostsTemplate({ data, ...props }) {
  return <Posts {...props} data={data} posts={data.allBlogPost.nodes} />
}

export default PostsTemplate

export const query = graphql`
  query {
    allBlogPost(sort: { fields: [date, title], order: DESC }, limit: 1000) {
      nodes {
        id
        slug
        title
        date(formatString: "MMMM DD, YYYY")
        excerpt
        body
      }
    }
  }
`
