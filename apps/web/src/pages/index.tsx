import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"

class IndexRoute extends React.Component {
  render() {
    return (
      <Layout>
        <SEO title="Home" />
        <div> TODO: Landing content </div>
      </Layout>
    )
  }
}

export default IndexRoute
