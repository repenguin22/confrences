/** library */
import React, { FC, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Pagination from 'material-ui-flat-pagination';
import ReactGA from 'react-ga';

/** Custom Components */
import Header from '../../../header/Header';

/** action */
import { useAgendaListSearch } from './useAgendaListSearch';

/** util */
import convertFormat from '../../../../utils/convertFormat';

/** Material UI Components */
import { makeStyles, Theme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Input from '@material-ui/core/Input';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    input: {
        margin: theme.spacing(1),
        width: '100%',
    },
    button: {
        margin: theme.spacing(1),
        width: '100%',
    },
    box: {
        width: '300px'
    },
}));

const AgendaListNew: FC = () => {

    const classes = useStyles();

    const history = useHistory();

    const [searchWord, setSearchWord] = React.useState('');
    const [selectedId, setselectedId] = React.useState('');
    const [offset, setOffset] = React.useState(0);
    const limit = 50;

    const [agendaList, getAgendaListNew, loading, error] = useAgendaListSearch();

    useEffect(() => {
        let searchWord = null;
        if (window.location.search !== '') {
            const cnvFmt = new convertFormat();
            searchWord = cnvFmt.convertURLParams(window.location.search, 1);
            if (searchWord === null) {
                return;
            }
            if (typeof getAgendaListNew == 'function') {
                //getAgendaListSearch(searchWord);
            }
            document.title = `${window.location.search.slice(1)} - Votter検索`;
            ReactGA.pageview(window.location.pathname + window.location.search);
        } else {
            document.title = 'Top - Votter検索';
            ReactGA.pageview(window.location.pathname + window.location.search);
        }
    }, []);

    if (!Array.isArray(agendaList) || typeof loading !== 'boolean' || typeof error !== 'string') {
        return null;
    }

    const searchWordChnageEvent = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        console.log(event.target.value);
        setSearchWord(event.target.value);
    };

    const searchButtonSubmit = () => {
        history.push(`/search?q=${searchWord}`);
    };

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
                    <Input
                        defaultValue=""
                        className={classes.input}
                        inputProps={{
                            'aria-label': 'search word',
                        }}
                        onChange={(event) => searchWordChnageEvent(event)}
                    />
                    <IconButton color="primary" className={classes.button} aria-label="search" onClick={searchButtonSubmit}>
                        <SearchIcon />
                    </IconButton>
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



