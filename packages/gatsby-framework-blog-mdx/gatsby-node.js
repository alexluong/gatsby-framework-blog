const crypto = require("crypto")
const { createFilePath } = require("gatsby-source-filesystem")

const mdxResolverPassthrough = fieldName => (source, args, context, info) => {
  const mdxNode = context.nodeModel.getNodeById({
    id: source.parent,
  })
  const type = info.schema.getType("Mdx")
  const resolver = type.getFields()[fieldName].resolve
  return resolver(mdxNode, args, context, { fieldName })
}

exports.createSchemaCustomization = ({ actions, schema }) => {
  const { createTypes } = actions

  createTypes(
    schema.buildObjectType({
      name: "FrameworkMdxBlogPost",
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
          resolve: mdxResolverPassthrough("excerpt"),
        },
        body: {
          type: "String!",
          resolve: mdxResolverPassthrough("body"),
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

  if (node.internal.type === "Mdx") {
    const parent = getNode(node.parent)

    if (parent.sourceInstanceName === pluginOptions.fsOptions.name) {
      const slug = createFilePath({
        node: parent,
        getNode,
        basePath: pluginOptions.fsOptions.path,
      })

      const fieldData = {
        slug,
        title: node.frontmatter.title,
        date: node.frontmatter.date,
        excerpt: node.frontmatter.excerpt,
      }

      createNode({
        ...fieldData,
        id: createNodeId(`${node.id} >>> FrameworkMdxBlogPost`),
        parent: node.id,
        internal: {
          type: "FrameworkMdxBlogPost",
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
}
