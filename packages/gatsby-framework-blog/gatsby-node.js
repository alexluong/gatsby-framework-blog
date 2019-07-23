const crypto = require("crypto")

exports.createSchemaCustomization = ({ actions, schema }) => {
  const { createTypes } = actions

  const BlogPost = `
    interface BlogPost @nodeInterface {
      id: ID!
      slug: String!
      title: String!
      date: Date! @dateformat
      excerpt: String!
      body: String!
    }
  `

  createTypes(BlogPost)
}
