import React, { SyntheticEvent } from 'react';
import clsx from 'clsx';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import { amber, green } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import { makeStyles, Theme } from '@material-ui/core/styles';

const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
};

const useStyles1 = makeStyles((theme: Theme) => ({
    success: {
        backgroundColor: green[600],
    },
    error: {
        backgroundColor: theme.palette.error.dark,
    },
    info: {
        backgroundColor: theme.palette.primary.main,
    },
    warning: {
        backgroundColor: amber[700],
    },
    icon: {
        fontSize: 20,
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing(1),
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    },
}));

interface Props {
    className?: string;
    message?: string;
    onClose?: () => void;
    variant: keyof typeof variantIcon;
}

const MySnackbarContentWrapper = (props: Props) => {
    const classes = useStyles1();
    const { className, message, onClose, variant, ...other } = props;
    const Icon = variantIcon[variant];

    return (
        <SnackbarContent
            className={clsx(classes[variant], className)}
            aria-describedby="client-snackbar"
            message={
                <span id="client-snackbar" className={classes.message}>
                    <Icon className={clsx(classes.icon, classes.iconVariant)} />
                    {message}
                </span>
            }
            action={[
                <IconButton key="close" aria-label="close" color="inherit" onClick={onClose}>
                    <CloseIcon className={classes.icon} />
                </IconButton>,
            ]}
            {...other}
        />
    );
};

export enum SnackBarTypeVariation {
    success = 'success',
    info = 'info',
    warning = 'warning',
    error = 'error',
}

interface CustomSnackBarProps {
    message: string;
    type: SnackBarTypeVariation;
    vertical: string;
    horizontal: string
}

export const CustomSnackBar = ({ message, type, vertical, horizontal }: CustomSnackBarProps) => {
    const [open, setOpen] = React.useState(true);

    const handleClose = (event?: SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const renderMySnackBar = () => {
        switch (type) {
            case SnackBarTypeVariation.success:
                return (
                    <MySnackbarContentWrapper
                        onClose={handleClose}
                        variant={SnackBarTypeVariation.success}
                        message={message}
                    />
                );
            case SnackBarTypeVariation.info:
                return (
                    <MySnackbarContentWrapper
                        onClose={handleClose}
                        variant={SnackBarTypeVariation.info}
                        message={message}
                    />
                );
            case SnackBarTypeVariation.warning:
                return (
                    <MySnackbarContentWrapper
                        onClose={handleClose}
                        variant={SnackBarTypeVariation.warning}
                        message={message}
                    />
                );
            case SnackBarTypeVariation.error:
                return (
                    <MySnackbarContentWrapper
                        onClose={handleClose}
                        variant={SnackBarTypeVariation.error}
                        message={message}
                    />
                );
            default:
                return (
                    <MySnackbarContentWrapper
                        onClose={handleClose}
                        variant={SnackBarTypeVariation.success}
                        message={message}
                    />
                );
        }
    };

    const renderSnackBar = () => {
        if (vertical === 'bottom' && horizontal === 'center') {
            return (
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                >
                    {renderMySnackBar()}
                </Snackbar>
            );
        } else if (vertical === 'top' && horizontal === 'right') {
            return (
                <Snackbar
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                >
                    {renderMySnackBar()}
                </Snackbar>
            );
        }
    };

    return (
        <React.Fragment>
            {renderSnackBar()}
        </React.Fragment>
    );
};