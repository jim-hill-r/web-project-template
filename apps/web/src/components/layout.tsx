import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import PropTypes from 'prop-types'
import { useMediaQuery } from '@material-ui/core'
import LayoutDesktop from './layout-desktop'
import LayoutMobile from './layout-mobile'
import './layout.css'

const Layout = ({ children } : { children : any}) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  const isMobile = !useMediaQuery('(min-width:600px)')
  if(isMobile) {
    return(
      <LayoutMobile title={data.site.siteMetadata.title}>
        {children}
      </LayoutMobile>
    )
  }
  else {
    return(
      <LayoutDesktop title={data.site.siteMetadata.title}>
        {children}
      </LayoutDesktop>
    )
  }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
