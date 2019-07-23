const crypto = require("crypto")

exports.createSchemaCustomization = ({ actions, schema }) => {
  const { createTypes } = actions

  createTypes(
    schema.buildObjectType({
      name: "FrameworkContentfulBlogPost",
      interfaces: ["Node", "BlogPost"],
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
          resolve: async (source, args, context, info) => {
            const contentfulNode = context.nodeModel.getNodeById({
              id: source.parent,
            })
            const contentfulExcerptNode = context.nodeModel.getNodeById({
              id: contentfulNode.excerpt___NODE,
            })
            const markdownRemarkResolver = info.schema
              .getType("contentfulBlogPostExcerptTextNode")
              .getFields()["childMarkdownRemark"].resolve
            const markdownRemarkNode = await markdownRemarkResolver(
              contentfulExcerptNode,
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
        body: {
          type: "String!",
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
  const { createNode } = actions

  if (node.internal.type === "ContentfulBlogPost") {
    const parent = getNode(node.parent)
    const fieldData = {
      slug: node.slug,
      title: node.title,
      date: node.date,
      excerpt: "Hi",
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
