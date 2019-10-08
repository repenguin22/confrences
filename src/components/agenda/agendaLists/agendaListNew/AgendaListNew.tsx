/** library */
import React, { FC, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Pagination from 'material-ui-flat-pagination';

/** Custom Components */
import Header from '../../../header/Header';

/** action */
import { useAgendaListNew } from './useAgendaListNew';

/** Material UI Components */
import { makeStyles, Theme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '100%',
    },
    button: {
        margin: theme.spacing(1),
    },
    box: {
        width: '200px'
    },
}));

const AgendaListNew: FC = () => {

    const classes = useStyles();

    const history = useHistory();

    const [selectedId, setselectedId] = React.useState('');
    const [offset, setOffset] = React.useState(0);
    const limit = 20;

    const [agendaList, getAgendaListNew, loading, error] = useAgendaListNew();

    useEffect(() => {
        if (typeof getAgendaListNew == 'function') {
            getAgendaListNew();
        }
    }, []);

    if (!Array.isArray(agendaList) || typeof loading !== 'boolean' || typeof error !== 'string') {
        return null;
    }

    const handleListItemClick = (event: React.MouseEvent<HTMLDivElement>, id: string) => {
        setselectedId(id);
        history.push(`/agenda/${id}`);
    };

    const handleClick = (offset: number) => {
        setOffset(offset);
    };

    const ListItemById = () => {
        if (agendaList instanceof Array) {
            return agendaList.slice(offset, offset + limit).map((agenda) => {
                return (
                    <ListItem
                        button
                        selected={selectedId === agenda.id}
                        onClick={(event: React.MouseEvent<HTMLDivElement>) => handleListItemClick(event, agenda.id)}
                        key={agenda.id}
                    >
                        <ListItemText primary={agenda.subject} />
                    </ListItem>
                );
            });
        } else {
            return null;
        }

    };

    return (
        <React.Fragment>
            <Header />
            <Container maxWidth="xl">
                <div className={classes.root}>
                    <List component="nav" aria-label="agendaList">
                        {ListItemById()}
                    </List>
                    <Box mx="auto" mt={2} className={classes.box}>
                        <Pagination
                            limit={limit}
                            offset={offset}
                            total={agendaList.length}
                            onClick={(event, offset) => handleClick(offset)}
                        />
                    </Box>
                </div>
            </Container>
        </React.Fragment>
    );
};

export default AgendaListNew;



