const crypto = require("crypto")

exports.createSchemaCustomization = ({ actions, schema }) => {
  const { createTypes } = actions

  createTypes(
    schema.buildObjectType({
      name: "FrameworkWordpressBlogPost",
      interfaces: ["Node", "BlogPost"],
      extensions: {
        infer: true,
      },
      fields: {
        id: { type: "ID!" },
        slug: { type: "String!" },
        title: { type: "String!" },
        date: { type: "Date!", extensions: { dateformat: {} } },
        excerpt: {
          type: "String!",
          args: {
            pruneLength: {
              type: "Int",
              defaultValue: 140,
            },
          },
        },
        body: { type: "String!" },
      },
    }),
  )
}

exports.onCreateNode = ({ node, actions, createNodeId }) => {
  const { createNode } = actions

  if (node.internal.type === "wordpress__POST") {
    const fieldData = {
      slug: node.slug,
      title: node.title,
      date: node.date,
      excerpt: node.excerpt,
      body: node.content,
    }

    createNode({
      ...fieldData,
      id: createNodeId(`${node.id} >>> FrameworkWordpressBlogPost`),
      parent: node.id,
      internal: {
        type: "FrameworkWordpressBlogPost",
        contentDigest: crypto
          .createHash("md5")
          .update(JSON.stringify(fieldData))
          .digest("hex"),
        content: JSON.stringify(fieldData),
        description: "Satisfies the BlogPost interface for Mdx",
      },
    })
  }
}
