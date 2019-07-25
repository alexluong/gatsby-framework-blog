import React from "react"
import { MDXRenderer } from "gatsby-plugin-mdx"

function Body({ post }) {
  return <MDXRenderer>{post.body}</MDXRenderer>
}

export default Body
