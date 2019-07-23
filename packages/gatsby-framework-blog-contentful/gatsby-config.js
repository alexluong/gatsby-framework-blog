module.exports = options => {
  return {
    plugins: [
      {
        resolve: "gatsby-source-contentful",
        options,
      },
    ],
  }
}
