require("dotenv").config()

module.exports = {
  plugins: [
    "gatsby-framework-blog",

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
