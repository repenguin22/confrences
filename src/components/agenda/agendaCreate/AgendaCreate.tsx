/** library */
import React, { FC } from 'react';

/** Custom Components */
import Header from '../../header/Header';

/** Material UI Components */
import { makeStyles, Theme } from '@material-ui/core/styles';

import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    card: {
        maxWidth: '100%',
        marginTop: theme.spacing(2),
    },
    box: {
        width: '100px',
    }
}));

const AgendaCreate: FC = () => {

    const classes = useStyles();

    return (
        <React.Fragment>
            <Header />

        </React.Fragment >
    );
};

export default AgendaCreate;