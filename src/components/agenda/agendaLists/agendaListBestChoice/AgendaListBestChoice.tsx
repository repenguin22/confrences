/** library */
import React, { FC, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Pagination from 'material-ui-flat-pagination';
import ReactGA from 'react-ga';

/** Custom Components */
import Header from '../../../header/Header';
import { CustomSnackBar } from '../../../common/CustomSnackBar';
import { NoticeState } from '../../../../store/notice/types';

/** action */
import { useAgendaListBestChoice } from './useAgendaListBestChoice';

/** Material UI Components */
import { makeStyles, Theme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import LinearProgress from '@material-ui/core/LinearProgress';

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
        width: '300px'
    },
}));

const AgendaListNew: FC = () => {

    const classes = useStyles();

    const history = useHistory();

    const location = useLocation();

    const notice = useSelector((state: NoticeState) => state.notice);

    const [selectedId, setselectedId] = React.useState('');
    const [offset, setOffset] = React.useState(0);
    const limit = 50;

    const [agendaList, getAgendaListBestChoice, loading, error] = useAgendaListBestChoice();

    useEffect(() => {
        if (typeof getAgendaListBestChoice == 'function') {
            getAgendaListBestChoice();
        }
        document.title = 'Votter';
        ReactGA.pageview(window.location.pathname + window.location.search);
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

    const renderGetProgressBar = () => {
        if (loading) {
            return <LinearProgress />;
        }
        return null;
    };

    const renderCustomSnackBar = () => {
        if (notice.target === location.pathname || notice.target === 'all') {
            return <CustomSnackBar />;
        }
        return null;
    };

    const renderPagination = () => {
        if (agendaList.length === 0) {
            return null;
        }
        return (
            <Box mx="auto" mt={2} className={classes.box}>
                <Pagination
                    limit={limit}
                    offset={offset}
                    total={agendaList.length}
                    onClick={(event, offset) => handleClick(offset)}
                />
            </Box>
        );
    };

    return (
        <React.Fragment>
            <Header />
            <Container maxWidth="xl">
                {renderGetProgressBar()}
                {renderCustomSnackBar()}
                <div className={classes.root}>
                    <List component="nav" aria-label="agendaList">
                        {ListItemById()}
                    </List>
                    {renderPagination()}
                </div>
            </Container>
        </React.Fragment>
    );
};

export default AgendaListNew;



