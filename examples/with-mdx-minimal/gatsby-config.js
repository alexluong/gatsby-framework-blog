require("dotenv").config()

module.exports = {
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
  ],
}
