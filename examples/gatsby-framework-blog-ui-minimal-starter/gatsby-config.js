require("dotenv").config()

module.exports = {
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
  plugins: [
    "gatsby-framework-blog-ui-minimal",

    {
      resolve: "gatsby-framework-blog-mdx",
      options: {
        fsOptions: {
          path: "content/posts",
          name: "mdxPosts",
        },
        mdxOptions: {
          remarkPlugins: [require("remark-slug")],
        },
      },
    },

    {
      resolve: "gatsby-framework-blog-contentful",
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
      },
    },
  ],
}
