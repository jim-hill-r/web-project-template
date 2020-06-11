import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql, navigate, Link } from 'gatsby'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { useMediaQuery, Typography } from '@material-ui/core'
import { AppBar, Toolbar, Drawer, IconButton, BottomNavigation, BottomNavigationAction } from '@material-ui/core'
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home'
import FavoriteIcon from '@material-ui/icons/Favorite'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import MenuIcon from '@material-ui/icons/Menu'
import './layout.css'
import { NavItem } from '../types/nav-item'
import LayoutDrawer from './layout-drawer'

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
    drawerItem: {
      paddingRight: '50px'
    },
    bottomNavStyle: {
      position: 'fixed',
      left: '0px',
      bottom: '0px',
      height: '50px',
      width: '100%',
      zIndex: 100,
      '&:selected': {
         color: "#00bcd4"
      },
    },
    main: {
      margin: `0 auto`,
      maxWidth: 600,
      padding: `0 1.0875rem 1.45rem`,
    },
    hidden: {
      display: 'none'
    },
  }),
);

const navItems : NavItem[] = [
  { label: 'Primary', icon: <HomeIcon />, route:  '/primary' },
  { label: 'Secondary', icon: <FavoriteIcon />, route: '/secondary' },
  { label: 'Tertiary', icon: <LocationOnIcon />, route: '/tertiary' },
  { label: 'Quarternary', icon: <></>, route: '/quarternary' },
  { label: 'Overflow One', icon: <></>, route: '/overflow/one' },
  { label: 'Overflow Two', icon: <></>, route: '/overflow/two' },
]

const LayoutDesktop = ({ children, title } : { children : any, title:string}) => { 
  const classes = useStyles()

  const useBottomNavigation = !useMediaQuery('(min-width:600px)')

  const [selectedNavItem, setSelectedNavItem] = React.useState({label: ''})
  useEffect(() => {
    var currentNavItem = navItems.find((item) => item.route === location.pathname)
    if(currentNavItem != null) {
      setSelectedNavItem(currentNavItem)
    }
  });

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
      <AppBar position='static' className={useBottomNavigation ? classes.hidden : ''}>
        <Toolbar variant='dense'>
          <IconButton edge='start' className={classes.menuButton} color='inherit' aria-label='menu' onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' color='inherit'>
            <Link to='/' className={classes.title}> {title} </Link>
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer anchor='left' open={state.isDrawerOpen} onClose={toggleDrawer(false)} >
        <div onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)} >
            <LayoutDrawer items={navItems} />
        </div>
      </Drawer>

      <div className={classes.main} >
        <main>{children}</main>
      </div>

      <footer>
        
      </footer>
    </>
  )
}

LayoutDesktop.propTypes = {
  children: PropTypes.node.isRequired,
}

export default LayoutDesktop
