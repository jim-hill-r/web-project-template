import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql, navigate, Link } from "gatsby"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import { useMediaQuery, Typography } from "@material-ui/core"
import { AppBar, Toolbar, Drawer, IconButton, BottomNavigation, BottomNavigationAction } from "@material-ui/core"
import HomeIcon from "@material-ui/icons/Home"
import RestoreIcon from "@material-ui/icons/Restore"
import FavoriteIcon from "@material-ui/icons/Favorite"
import LocationOnIcon from "@material-ui/icons/LocationOn"
import MoreHorizIcon from "@material-ui/icons/MoreHoriz"
import MenuIcon from "@material-ui/icons/Menu"
import "./layout.css"

const navItems = [
  { label: "Primary", icon: "<HomeIcon />", route:  "/primary" },
  { label: "Secondary", icon: "<FavoriteIcon />", route: "/secondary" },
  { label: "Tertiary", icon: "<LocationOnIcon />", route: "/tertiary" },
  { label: "Quarternary", icon: "<RestoreIcon />", route: "/quarternary" },
  { label: "Overflow One", route: "/overflow/one" },
  { label: "Overflow Two", route: "/overflow/two" }
]

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      textDecoration: 'none',
      color: 'white'
    },
    stickToBottom: {
      width: '100%',
      position: 'fixed',
      bottom: 0,
    },
    main: {
      margin: `0 auto`,
      maxWidth: 960,
      padding: `0 1.0875rem 1.45rem`,
    },
    hidden: {
      display: 'none'
    },
  }),
);

const Layout = ({ children } : { children : any}) => {
  const isDesktop = useMediaQuery('(min-width:600px)')
  const useBottomNavigation = !isDesktop
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)
  const classes = useStyles()
  const [state, setState] = React.useState({
    isDrawerOpen: false,
    selectedNavItem: 0
  });

  const toggleDrawer = 
    (open: boolean) => 
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setState({ ...state, isDrawerOpen: open });
    }

  return (
    <>
      <div className={useBottomNavigation ? classes.hidden : ''}>
        <AppBar position="static">
          <Toolbar variant="dense">
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit">
              <Link to="/" className={classes.title}> {data.site.siteMetadata.title} </Link>
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
      <Drawer anchor={useBottomNavigation ? "bottom" : "left"} open={state.isDrawerOpen} onClose={toggleDrawer(false)} >
        <div onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)} >
          © {new Date().getFullYear()}
        </div>
      </Drawer>

      <div className={classes.main} >
        <main>{children}</main>
      </div>

      <footer>
        <BottomNavigation
          value={state.selectedNavItem}
          onChange={(event, newValue: number) => {
            if(newValue < 4) {
              navigate(navItems[newValue].route)
            } else {
              setState({ ...state, isDrawerOpen: true });
            }
          }}
          showLabels
          className={useBottomNavigation ? classes.stickToBottom : classes.hidden}
        >
          <BottomNavigationAction label={navItems[0].label} icon={<HomeIcon />} />
          <BottomNavigationAction label={navItems[1].label} icon={<FavoriteIcon />} />
          <BottomNavigationAction label={navItems[2].label} icon={<LocationOnIcon />} />
          <BottomNavigationAction label={navItems[3].label} icon={<RestoreIcon />} />
          <BottomNavigationAction label="More" icon={<MoreHorizIcon />} />
        </BottomNavigation>
      </footer>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
