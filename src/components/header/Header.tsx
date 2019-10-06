/** library */
import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

/** firebase lib */
import * as firebase from 'firebase/app';
import 'firebase/auth';

/** Custom Components */
import MyDrawer from './MyDrawer';
import GoogleAuth from '../Auth/GoogleAuth';
import Notification from './Notification';
import AccountIcon from './AccountIcon';

/** action */
import { signOut } from '../../store/auth/action';

/** Material UI Components */
import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

/** css */
import './Header.css';


const useStyles = makeStyles((theme: Theme) => ({
    grow: {
        flexGrow: 1,
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
}));


const Header: FC = () => {

    const dispatch = useDispatch();

    const classes = useStyles();

    /**
     *  Profile Menu
     */
    // State that manages the opening and closing of the profile menu
    const [profileMenuOpen, setProfileMenuOpen] = React.useState<null | HTMLElement>(null);

    // Function to open profile menu
    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setProfileMenuOpen(event.currentTarget);
    };

    // Function to close profile menu
    const handleProfileMenuClose = () => {
        setProfileMenuOpen(null);
    };

    /**
     * Logout Dialog
     */
    // State that manages the opening and closing of the logout dialog
    const [logoutDialogOpen, setLogoutDialogOpen] = React.useState(false);

    // Function to open logout dialog
    const handleLogoutDialogClickOpen = () => {
        setLogoutDialogOpen(true);
    };

    // Function to close logout dialog
    const handleLogoutDialogClose = () => {
        setLogoutDialogOpen(false);
        // Close the top menu
        handleProfileMenuClose();
    };

    // Function to close logout dialog And Logout process
    const handleLogoutDialogCloseAndLogout = () => {
        handleLogoutDialogClose();
        // Close the top menu
        handleProfileMenuClose();
        // firebase auth logout
        firebase.auth().signOut().then(() => {
            dispatch(signOut());
        }).catch(error => {
            console.log(`ログアウト時にエラーが発生しました (${error})`);
        });
    };

    /**
     * render Menu
     * Display logout dialog when logout is clicked
     */
    const renderMenu = (
        <Menu
            anchorEl={profileMenuOpen}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id='primary-search-account-menu'
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={Boolean(profileMenuOpen)}
            onClose={handleProfileMenuClose}
        >
            <Link to={'/'} className="myAccountLink">
                <MenuItem onClick={handleProfileMenuClose}>My account</MenuItem>
            </Link>
            <MenuItem onClick={handleLogoutDialogClickOpen}>Logout</MenuItem>
        </Menu >
    );

    /**
     * render Logout Dialog
     * Logout dialog is displayed when logout is clicked
     */
    const renderLogoutDiaglog = (
        <div>
            <Dialog
                open={logoutDialogOpen}
                onClose={handleLogoutDialogClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">ログアウトしますか？</DialogTitle>
                <DialogActions>
                    <Button onClick={handleLogoutDialogClose} color="primary">キャンセル</Button>
                    <Button onClick={handleLogoutDialogCloseAndLogout} color="primary" autoFocus>はい</Button>
                </DialogActions>
            </Dialog>
        </div>
    );


    return (
        <div className={classes.grow} style={{ 'marginBottom': '75px' }}>
            <AppBar position="fixed">
                <Toolbar>
                    <MyDrawer />
                    <Link to={'/'} className="iconLink">
                        <Typography className={classes.title} variant="h6" noWrap>
                            Confrences
                        </Typography>
                    </Link>
                    <div className={classes.grow} />
                    <Notification />
                    <AccountIcon handleProfileMenuOpen={handleProfileMenuOpen} />
                    <GoogleAuth />
                </Toolbar>
            </AppBar>
            {renderMenu}
            {renderLogoutDiaglog}
        </div>
    );
};

export default Header;