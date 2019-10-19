/** library */
import React, { FC } from 'react';
import { Link } from 'react-router-dom';

/** Material UI Components */
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CreateIcon from '@material-ui/icons/Create';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import NewReleasesIcon from '@material-ui/icons/NewReleases';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import HomeIcon from '@material-ui/icons/Home';

/** css */
import './MyDrawer.css';

const useStyles = makeStyles({
    list: {
        width: 250,
    },
});

const MyDrawer: FC = () => {
    const classes = useStyles();

    // State that manages the opening and closing of the drawer
    const [state, setState] = React.useState({
        left: false
    });

    // Function to open / close drawer
    type DrawerSide = 'left';
    const toggleDrawer = (side: DrawerSide, open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
            return;
        }
        setState({ ...state, [side]: open });
    };

    // sideList
    const sideList = (side: DrawerSide) => (
        <div
            className={classes.list}
            role="presentation"
            onClick={toggleDrawer(side, false)}
            onKeyDown={toggleDrawer(side, false)}
        >
            <List>
                <Link to="/" className="drawerLink">
                    <ListItem button key="Populer" disabled>
                        <ListItemIcon><WbSunnyIcon /></ListItemIcon>
                        <ListItemText primary="Populer" />
                    </ListItem>
                </Link>
                <Link to="/" className="drawerLink">
                    <ListItem button key="HOME">
                        <ListItemIcon><HomeIcon /></ListItemIcon>
                        <ListItemText primary="HOME" />
                    </ListItem>
                </Link>
                <Link to="/new" className="drawerLink">
                    <ListItem button key="New">
                        <ListItemIcon><NewReleasesIcon /></ListItemIcon>
                        <ListItemText primary="New" />
                    </ListItem>
                </Link>
                <Divider />
                <Link to="/agenda/create" className="drawerLink">
                    <ListItem button key="お題作成">
                        <ListItemIcon><CreateIcon /></ListItemIcon>
                        <ListItemText primary="お題作成" />
                    </ListItem>
                </Link>
            </List>
        </div >
    );

    return (
        <div>
            <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawer('left', true)}
            >
                <MenuIcon />
            </IconButton>
            <Drawer open={state.left} onClose={toggleDrawer('left', false)}>
                {sideList('left')}
            </Drawer>
        </div>
    );
};

export default MyDrawer;