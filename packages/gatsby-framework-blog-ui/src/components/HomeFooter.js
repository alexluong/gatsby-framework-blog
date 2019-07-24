import React, { Fragment } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Styled, css } from "theme-ui"

const socialLinksQuery = graphql`
  query SocialLinkQuery {
    site {
      siteMetadata {
        social {
          name
          url
        }
      }
    }
  }
`

function Footer() {
  const {
    site: {
      siteMetadata: { social: socialLinks },
    },
  } = useStaticQuery(socialLinksQuery)

  return (
    <footer
      css={css({
        mt: 4,
        pt: 3,
      })}
    >
      © {new Date().getFullYear()}, Powered by
      {` `}
      <a href="https://www.gatsbyjs.org">Gatsby</a>
      {` `}&bull;{` `}
      {socialLinks.map((platform, i, arr) => (
        <Fragment key={platform.url}>
          <Styled.a
            href={platform.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {platform.name}
          </Styled.a>
          {arr.length - 1 !== i && (
            <Fragment>
              {` `}&bull;{` `}
            </Fragment>
          )}
        </Fragment>
      ))}
    </footer>
  )
}

export default Footer
