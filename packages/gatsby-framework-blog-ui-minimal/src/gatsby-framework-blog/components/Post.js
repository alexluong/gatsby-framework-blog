import React from "react"
import PostLayout from "../../components/PostLayout"

const Post = ({ post, location, previous, next }) => {
  return <PostLayout post={post} prev={previous} next={next} />
}

export default Post
