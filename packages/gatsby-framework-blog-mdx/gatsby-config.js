module.exports = options => {
  const { fsOptions, mdxOptions } = options
  return {
    plugins: [
      {
        resolve: "gatsby-source-filesystem",
        options: fsOptions,
      },
      {
        resolve: `gatsby-plugin-mdx`,
        options: mdxOptions,
      },
    ],
  }
}
