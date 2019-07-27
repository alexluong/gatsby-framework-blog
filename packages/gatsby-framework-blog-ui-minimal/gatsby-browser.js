const React = require("react")
const Main = require("./src/index").default

exports.wrapRootElement = ({ element, props }) => {
  return <Main {...props}>{element}</Main>
}
