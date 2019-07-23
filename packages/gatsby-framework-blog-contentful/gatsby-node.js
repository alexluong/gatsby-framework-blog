const crypto = require("crypto")

exports.createSchemaCustomization = ({ actions, schema }) => {
  const { createTypes } = actions

  createTypes(
    schema.buildObjectType({
      name: "FrameworkContentfulBlogPost",
      interfaces: ["Node", "BlogPost"],
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
          resolve: async (source, args, context, info) => {
            const contentfulNode = context.nodeModel.getNodeById({
              id: source.parent,
            })
            const contentfulBodyNode = context.nodeModel.getNodeById({
              id: contentfulNode.body___NODE,
            })
            const markdownRemarkResolver = info.schema
              .getType("contentfulBlogPostBodyTextNode")
              .getFields()["childMarkdownRemark"].resolve
            const markdownRemarkNode = await markdownRemarkResolver(
              contentfulBodyNode,
              {},
              context,
              { fieldName: "childMarkdownRemark" },
            )
            const resolver = info.schema.getType("MarkdownRemark").getFields()[
              "html"
            ].resolve
            return resolver(markdownRemarkNode, {}, context, {
              fieldName: "html",
            })
          },
        },
      },
    }),
  )
}

exports.onCreateNode = ({ node, actions, getNode, createNodeId }) => {
  const { createNodeField, createNode, createParentChildLink } = actions

  if (node.internal.type === "ContentfulBlogPost") {
    const parent = getNode(node.parent)
    const fieldData = {
      title: node.title,
      date: node.date,
    }

    createNode({
      ...fieldData,
      id: createNodeId(`${node.id} >>> FrameworkContentfulBlogPost`),
      parent: node.id,
      internal: {
        type: "FrameworkContentfulBlogPost",
        contentDigest: crypto
          .createHash("md5")
          .update(JSON.stringify(fieldData))
          .digest("hex"),
        content: JSON.stringify(fieldData),
        description: "Satisfies the BlogPost interface for ContentfulBlogPost",
      },
    })
  }
}
