const crypto = require("crypto")

exports.createSchemaCustomization = ({ actions, schema }) => {
  const { createTypes } = actions

  const BlogPost = `
    interface BlogPost @nodeInterface {
      id: ID!
      title: String
      date: Date @dateformat
      body: String
    }
  `

  createTypes(BlogPost)
}
