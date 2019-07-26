module.exports = options => {
  return {
    plugins: [
      {
        resolve: "gatsby-source-wordpress",
        options: options.sourceOptions,
      },
    ],
  }
}
