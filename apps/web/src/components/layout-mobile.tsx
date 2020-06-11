import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { navigate } from 'gatsby'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { Drawer, BottomNavigation, BottomNavigationAction } from '@material-ui/core'
import HomeIcon from '@material-ui/icons/Home'
import FavoriteIcon from '@material-ui/icons/Favorite'
import LocationOnIcon from '@material-ui/icons/LocationOn'
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
  { label: 'Quarternary', icon: <LocationOnIcon />, route: '/quarternary' }
]

const LayoutMobile = ({ children, title } : { children : any, title: string}) => {
  const classes = useStyles()
  const [selectedNavItem, setSelectedNavItem] = React.useState({label: ''})
  useEffect(() => {
    var currentNavItem = navItems.find((item) => item.route === location.pathname)
    if(currentNavItem != null) {
      setSelectedNavItem(currentNavItem)
    }
  });

  const [state, setState] = useState({
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
      <Drawer anchor='bottom' open={state.isDrawerOpen} onClose={toggleDrawer(false)} >
        <div onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)} >
            <LayoutDrawer items={navItems} />
        </div>
      </Drawer>

      <div className={classes.main} >
        <main>{children}</main>
      </div>

      <footer>
        <BottomNavigation
          value={selectedNavItem}
          onChange={(event, newValue: NavItem) => {
              navigate(newValue.route)
            }
          }
          className={classes.bottomNavStyle}
        >
          {navItems.map(item => {
            return <BottomNavigationAction key={item.label} value={item} label={item.label} icon={item.icon} />
          })}
        </BottomNavigation>
      </footer>
    </>
  )
}

LayoutMobile.propTypes = {
  children: PropTypes.node.isRequired,
}

export default LayoutMobile
