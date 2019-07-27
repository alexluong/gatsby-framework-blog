import React from "react"
import { Body as MdxBody } from "gatsby-framework-blog-mdx"
import { Body as ContentfulBody } from "gatsby-framework-blog-contentful"

function Body({ post }) {
  switch (post.__typename) {
    case "FrameworkMdxBlogPost":
      return <MdxBody post={post} />
    case "FrameworkContentfulBlogPost":
      return <ContentfulBody post={post} />
    default:
      return null
  }
}

export default Body
