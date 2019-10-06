/** library */
import React, { FC } from 'react';
import { useSelector } from 'react-redux';

/** action */
import { AuthState } from '../../store/auth/types';

/** Material UI Components */
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';

const Notification: FC = () => {

    const loginedUserId: string | null = useSelector((state: AuthState) => state.auth.uid);

    const renderNotifications = () => {
        if (!loginedUserId) {
            return null;
        }
        return (
            <React.Fragment>
                <IconButton aria-label="show 17 new notifications" color="inherit">
                    <Badge badgeContent={17} color="secondary">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
            </React.Fragment>
        );
    };

    return renderNotifications();

};

export default Notification;