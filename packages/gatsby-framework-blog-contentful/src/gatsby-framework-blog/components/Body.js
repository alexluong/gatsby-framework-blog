import React from "react"

function Body({ post }) {
  return <div dangerouslySetInnerHTML={{ __html: post.body }} />
}

export default Body
