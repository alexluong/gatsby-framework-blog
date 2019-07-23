const fs = require("fs")
const path = require("path")
const crypto = require("crypto")
const mkdirp = require("mkdirp")

const PostTemplate = require.resolve("./src/templates/Post")
const PostsTemplate = require.resolve("./src/templates/Posts")

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

exports.createPages = async ({ graphql, actions, reporter }, themeOptions) => {
  const { createPage } = actions

  const result = await graphql(`
    {
      allBlogPost(sort: { fields: [date, title], order: DESC }, limit: 1000) {
        nodes {
          id
          slug
          title
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panic(result.errors)
  }

  // Create a page for each Post
  const posts = result.data.allBlogPost.nodes
  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1]
    const next = index === 0 ? null : posts[index - 1]
    const { slug } = post
    createPage({
      path: slug,
      component: PostTemplate,
      context: { ...post, previous, next },
    })
  })

  // Create the Posts page
  createPage({
    path: themeOptions.basePath || "/",
    component: PostsTemplate,
  })
}
