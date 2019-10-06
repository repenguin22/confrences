/** library */
import React, { FC } from 'react';
import { useSelector } from 'react-redux';

/** action */
import { AuthState } from '../../store/auth/types';

/** Material UI Components */
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';

interface AccountIconProps {
    // Function to open account menu
    handleProfileMenuOpen: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const AccountIcon: FC<AccountIconProps> = ({ handleProfileMenuOpen }) => {

    const loginedUserId: string | null = useSelector((state: AuthState) => state.auth.uid);

    if (!loginedUserId) {
        return null;
    }
    return (
        <IconButton
            edge="end"
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
            onClick={handleProfileMenuOpen}
        >
            <AccountCircle />
        </IconButton>
    );

};

export default AccountIcon;