const crypto = require("crypto")

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  const BlogPost = `
    interface BlogPost @nodeInterface {
      id: ID!
      slug: String!
      title: String!
      date: Date! @dateformat
      excerpt(pruneLength: Int = 140): String!
      body: String!
    }
  `

  createTypes(BlogPost)
}
