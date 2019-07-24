import React, { Fragment } from "react"
import { Link } from "gatsby"
import { Styled, css } from "theme-ui"

import Layout from "../../components/Layout"
import SEO from "../../components/Seo"
import Footer from "../../components/HomeFooter"
import useTitle from "../../hooks/useTitle"

const Posts = ({ location, posts }) => {
  const title = useTitle()
  return (
    <Layout location={location} title={title}>
      <main>
        {posts.map(post => {
          const title = post.title || post.slug
          const keywords = post.keywords || []
          return (
            <Fragment key={post.slug}>
              <SEO title="Home" keywords={keywords} />
              <div>
                <Styled.h2
                  css={css({
                    mb: 1,
                  })}
                >
                  <Styled.a
                    as={Link}
                    css={{
                      textDecoration: `none`,
                    }}
                    to={post.slug}
                  >
                    {title}
                  </Styled.a>
                </Styled.h2>
                <small>{post.date}</small>
                <Styled.p>{post.excerpt}</Styled.p>
              </div>
            </Fragment>
          )
        })}
      </main>
      <Footer />
    </Layout>
  )
}

export default Posts
