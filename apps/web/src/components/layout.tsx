import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import IconButton from "@material-ui/core/IconButton"
import BottomNavigation from "@material-ui/core/BottomNavigation"
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction"
import HomeIcon from "@material-ui/icons/Home"
import RestoreIcon from "@material-ui/icons/Restore"
import FavoriteIcon from "@material-ui/icons/Favorite"
import LocationOnIcon from "@material-ui/icons/LocationOn"
import MoreHorizIcon from "@material-ui/icons/MoreHoriz"
import MenuIcon from "@material-ui/icons/Menu"
import "./layout.css"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
  }),
);

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
  const classes = useStyles();

  return (
    <>
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit">
            {data.site.siteMetadata.title}
          </Typography>
        </Toolbar>
      </AppBar>
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `0 1.0875rem 1.45rem`,
        }}
      >
        <main>{children}</main>

        © {new Date().getFullYear()}

        <footer>
          <BottomNavigation
            //value={value}
            //onChange={(event, newValue) => {
            //  setValue(newValue);
            //}}
            showLabels
          >
            <BottomNavigationAction label="Home" icon={<HomeIcon />} />
            <BottomNavigationAction label="Restore" icon={<RestoreIcon />} />
            <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
            <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
            <BottomNavigationAction label="More" icon={<MoreHorizIcon />} />
          </BottomNavigation>
        </footer>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
