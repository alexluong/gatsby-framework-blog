const crypto = require("crypto")
const { createFilePath } = require("gatsby-source-filesystem")

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
        slug: { type: "String!" },
        title: { type: "String!" },
        date: { type: "Date!", extensions: { dateformat: {} } },
        excerpt: {
          type: "String!",
          args: {
            pruneLength: {
              type: `Int`,
              defaultValue: 140,
            },
          },
        },
        body: {
          type: "String!",
          resolve: (source, args, context, info) => {
            const mdNode = context.nodeModel.getNodeById({
              id: source.parent,
            })
            const type = info.schema.getType("MarkdownRemark")
            const resolver = type.getFields()["html"].resolve
            return resolver(mdNode, {}, context, { fieldName: "html" })
          },
        },
      },
    }),
  )
}

exports.onCreateNode = (
  { node, actions, getNode, createNodeId },
  pluginOptions,
) => {
  const { createNode } = actions

  if (node.internal.type === "MarkdownRemark") {
    const parent = getNode(node.parent)

    if (parent.sourceInstanceName === pluginOptions.name) {
      const slug = createFilePath({
        node: parent,
        getNode,
        basePath: pluginOptions.path,
      })

      const fieldData = {
        slug,
        title: node.frontmatter.title,
        date: node.frontmatter.date,
        excerpt: node.frontmatter.excerpt,
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
