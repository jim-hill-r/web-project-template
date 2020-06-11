import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';
import React from "react"
import { NavItem } from "../types/nav-item";

const useStyles = makeStyles({
  item: {
    paddingRight: '50px'
  }
});

const LayoutDrawer = ({ items } : { items : NavItem[]}) => {
    const classes = useStyles()
    return (
        <>
            <List>
                {items.map((item) => (
                <ListItem className={classes.item} button key={item.label}>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.label} />
                </ListItem>
                ))}
            </List>
            © {new Date().getFullYear()}
        </>
    )
}

export default LayoutDrawer