const React = require("react")

function Body({ post }) {
  return React.createElement("div", {
    dangerouslySetInnerHTML: {
      __html: post.body,
    },
  })
}

module.exports = Body
