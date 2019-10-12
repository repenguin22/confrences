import React, { FC } from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';

interface menuIF {
    handleEvents: () => void;
    key: string;
    value: string;
}

interface ShowMoreMenuProps {
    menuAry: menuIF[];
}

const ShowMoreMenu: FC<ShowMoreMenuProps> = ({ menuAry }) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const renderMenuItem = () => {
        return menuAry.map((menu: menuIF) => {
            return (
                <MenuItem onClick={menu.handleEvents} key={menu.key}>{menu.value}</MenuItem>
            );
        });
    };

    return (
        <div>
            <IconButton onClick={event => handleClick(event)}>
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="settings"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {renderMenuItem()}
            </Menu>
        </div>
    );
};

export default ShowMoreMenu;