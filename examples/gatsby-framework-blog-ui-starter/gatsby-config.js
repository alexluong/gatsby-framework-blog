require("dotenv").config()

module.exports = {
  plugins: ["gatsby-framework-blog-ui"],
  siteMetadata: {
    title: "My Blog Title",
    author: "My Name",
    description: "My site description...",
    social: [
      {
        name: "twitter",
        url: "https://twitter.com/gatsbyjs",
      },
      {
        name: "github",
        url: "https://github.com/gatsbyjs",
      },
    ],
  },
}
