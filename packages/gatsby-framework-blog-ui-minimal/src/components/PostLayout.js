import React from "react"
import { Link } from "gatsby"
import Wrapper from "./Wrapper"
import Content from "./Content"
import PrevNext from "./PrevNext"
import Header from "./Header"
import Footer from "./Footer"
import PostBody from "./PostBody"
import PostTitle from "./PostTitle"

function PostLayout({ post, prev, next }) {
  return (
    <React.Fragment>
      <Wrapper>
        <Header>
          <Link to="/">Minimal</Link>
        </Header>
        <Content>
          <PostTitle
            title={post.title}
            date={post.date}
            tags={post.tags}
            featuredImage="abc"
            author={post.author}
          />

          <PostBody post={post} />
          <PrevNext prev={prev} next={next} />
        </Content>
      </Wrapper>
      <Footer />
    </React.Fragment>
  )
}

export default PostLayout
