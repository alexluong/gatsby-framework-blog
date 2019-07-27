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
    "gatsby-framework-blog-ui",

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

    {
      resolve: "gatsby-framework-blog-wordpress",
      options: {
        sourceOptions: {
          baseUrl: process.env.WORDPRESS_BASE_URL,
          protocol: "https",
          hostingWPCOM: process.env.WORDPRESS_WPCOM === "true",
          auth: {
            wpcom_user: process.env.WORDPRESS_USER,
            wpcom_pass: process.env.WORDPRESS_PASSWORD,
          },
        },
      },
    },
  ],
}
