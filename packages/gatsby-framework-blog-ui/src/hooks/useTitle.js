import { useStaticQuery, graphql } from "gatsby"

const titleQuery = graphql`
  query TitleQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`

function useTitle() {
  const data = useStaticQuery(titleQuery)

  return data.site.siteMetadata.title
}

export default useTitle
