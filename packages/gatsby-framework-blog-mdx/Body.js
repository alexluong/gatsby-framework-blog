const React = require("react")
const { MDXRenderer } = require("gatsby-plugin-mdx")

function Body({ post }) {
  return React.createElement(MDXRenderer, null, post.body)
}

module.exports = Body
