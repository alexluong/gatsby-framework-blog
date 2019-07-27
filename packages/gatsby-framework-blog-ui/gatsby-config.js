require("dotenv").config()

module.exports = (options = {}) => {
  return {
    plugins: [
      "gatsby-framework-blog",

      {
        resolve: "gatsby-source-filesystem",
        options: {
          path: options.assetPath || "content/assets",
          name: options.assetPath || "content/assets",
        },
      },

      {
        resolve: "gatsby-transformer-remark",
        options: {
          plugins: [
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
