const crypto = require("crypto")

exports.createSchemaCustomization = ({ actions, schema }) => {
  const { createTypes } = actions

  createTypes(
    schema.buildObjectType({
      name: "FrameworkMarkdownBlogPost",
      interfaces: ["Node", "BlogPost"],
      extensions: {
        infer: true,
      },
      fields: {
        id: { type: "ID!" },
        title: { type: "String" },
        date: {
          type: "Date",
          extensions: {
            dateformat: {
              formatString: "YYYY-MM-DD",
            },
          },
        },
        body: {
          type: "String",
          resolve: (source, args, context, info) => {
            const type = info.schema.getType("MarkdownRemark")
            const mdNode = context.nodeModel.getNodeById({
              id: source.parent,
            })
            const resolver = type.getFields()["html"].resolve
            return resolver(mdNode, {}, context, { fieldName: "html" })
          },
        },
      },
    }),
  )
}

exports.onCreateNode = ({ node, actions, getNode, createNodeId }) => {
  const { createNodeField, createNode, createParentChildLink } = actions

  if (node.internal.type === "MarkdownRemark") {
    const parent = getNode(node.parent)

    if (parent.sourceInstanceName === "posts") {
      const fieldData = {
        title: node.frontmatter.title,
        date: node.frontmatter.date,
      }

      createNode({
        ...fieldData,
        id: createNodeId(`${node.id} >>> FrameworkMarkdownBlogPost`),
        parent: node.id,
        internal: {
          type: "FrameworkMarkdownBlogPost",
          contentDigest: crypto
            .createHash("md5")
            .update(JSON.stringify(fieldData))
            .digest("hex"),
          content: JSON.stringify(fieldData),
          description: "Satisfies the BlogPost interface for MarkdownRemark",
        },
      })
    }
  }
}
