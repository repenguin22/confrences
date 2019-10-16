/** library */
import React, { FC } from 'react';
import { useSelector } from 'react-redux';

/** action */
import { AuthState, Auth } from '../../store/auth/types';

/** Material UI Components */
import { makeStyles, Theme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
//import AccountCircle from '@material-ui/icons/AccountCircle';
import Avatar from '@material-ui/core/Avatar';
import { red } from '@material-ui/core/colors';

const useStyles = makeStyles((theme: Theme) => ({
    avatar: {
        backgroundColor: red[500],
    },
}));

interface AccountIconProps {
    // Function to open account menu
    handleProfileMenuOpen: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const AccountIcon: FC<AccountIconProps> = ({ handleProfileMenuOpen }) => {

    const classes = useStyles();

    const auth: Auth = useSelector((state: AuthState) => state.auth);

    if (!auth.uid) {
        return null;
    }

    // render avatar
    const renderAvatar = () => {
        if (auth.photoURL === null || auth.photoURL === '') {
            return <Avatar alt="Avatar" className={classes.avatar}>A</Avatar>;
        }
        return <Avatar alt="Avatar" src={auth.photoURL} className={classes.avatar} />;
    };

    return (
        <IconButton
            edge="end"
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
            onClick={handleProfileMenuOpen}
        >
            {renderAvatar()}
        </IconButton>
    );

};

export default AccountIcon;