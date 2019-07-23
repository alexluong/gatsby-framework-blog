module.exports = options => {
  return {
    plugins: [
      {
        resolve: "gatsby-source-filesystem",
        options,
      },
    ],
  }
}
