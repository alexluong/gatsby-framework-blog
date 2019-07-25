require("dotenv").config()

module.exports = (options = {}) => {
  const { mdx = true } = options

  return {
    siteMetadata: {
      title: `Blog Title Placeholder`,
      author: `Name Placeholder`,
      description: `Description placeholder`,
      social: [
        {
          name: `Twitter`,
          url: `https://twitter.com/gatsbyjs`,
        },
        {
          name: `GitHub`,
          url: `https://github.com/gatsbyjs`,
        },
      ],
    },
    plugins: [
      "gatsby-framework-blog",
      mdx && {
        resolve: "gatsby-framework-blog-mdx",
        options: {
          fsOptions: {
            path: "content/posts",
            name: "mdxPosts",
          },
          mdxOptions: {
            gatsbyRemarkPlugins: [
              {
                resolve: "gatsby-remark-images",
                options: {
                  maxWidth: 1380,
                  linkImagesToOriginal: false,
                },
              },
              { resolve: "gatsby-remark-copy-linked-files" },
              { resolve: "gatsby-remark-numbered-footnotes" },
              { resolve: "gatsby-remark-smartypants" },
            ],
            remarkPlugins: [require("remark-slug")],
          },
        },
      },
      {
        resolve: "gatsby-source-filesystem",
        options: {
          path: options.assetPath || "content/assets",
          name: options.assetPath || "content/assets",
        },
      },
      "gatsby-transformer-sharp",
      "gatsby-plugin-sharp",
      "gatsby-plugin-react-helmet",
      "gatsby-plugin-twitter",
      "gatsby-plugin-emotion",
      "gatsby-plugin-theme-ui",
    ].filter(Boolean),
  }
}