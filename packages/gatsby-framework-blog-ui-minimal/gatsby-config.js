require("dotenv").config()

module.exports = (options = {}) => {
  return {
    plugins: [
      "gatsby-framework-blog",
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
          ],
        },
      },
    ].filter(Boolean),
  }
}
