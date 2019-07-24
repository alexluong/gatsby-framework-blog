import React from "react"
import { Styled, css } from "theme-ui"
import { MDXRenderer } from "gatsby-plugin-mdx"
import useTitle from "../../hooks/useTitle"

import PostFooter from "../../components/PostFooter"
import Layout from "../../components/Layout"
import SEO from "../../components/Seo"

const Post = ({ post, location, previous, next }) => {
  const title = useTitle()

  return (
    <Layout location={location} title={title}>
      <SEO title={post.title} description={post.excerpt} />
      <main>
        <Styled.h1>{post.title}</Styled.h1>
        <Styled.p
          css={css({
            fontSize: 1,
            mt: -3,
            mb: 3,
          })}
        >
          {post.date}
        </Styled.p>
        <MDXRenderer>{post.body}</MDXRenderer>
      </main>
      <PostFooter previous={previous} next={next} />
    </Layout>
  )
}

export default Post
