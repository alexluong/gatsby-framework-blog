import React from "react"
import { Body as MdxBody } from "gatsby-framework-blog-mdx"
import { Body as ContentfulBody } from "gatsby-framework-blog-contentful"
import { Body as WordpressBody } from "gatsby-framework-blog-wordpress"

function Body({ post }) {
  switch (post.__typename) {
    case "FrameworkMdxBlogPost":
      return <MdxBody post={post} />
    case "FrameworkContentfulBlogPost":
      return <ContentfulBody post={post} />
    case "FrameworkWordpressBlogPost":
      return <WordpressBody post={post} />
    default:
      return null
  }
}

export default Body
