/** library */
import React, { FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import Pagination from 'material-ui-flat-pagination';
import ReactGA from 'react-ga';

/** Custom Components */
import Header from '../../../header/Header';
import { CustomSnackBar } from '../../../common/CustomSnackBar';
import { NoticeState } from '../../../../store/notice/types';

/** action */
import { useAgendaListSearch } from './useAgendaListSearch';
import { setAgendaList } from '../../../../store/agenda/set/action';

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
import LinearProgress from '@material-ui/core/LinearProgress';

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

    const dispatch = useDispatch();

    const history = useHistory();

    const location = useLocation();

    const notice = useSelector((state: NoticeState) => state.notice);

    const [searchWord, setSearchWord] = React.useState('');
    const [selectedId, setselectedId] = React.useState('');
    const [offset, setOffset] = React.useState(0);
    const limit = 50;

    const [agendaList, getAgendaListSearch, loading, error] = useAgendaListSearch();

    useEffect(() => {
        const cnvFmt = new convertFormat();
        const urlMap = cnvFmt.convertURLParams(window.location.search, 2);
        let q = '';
        let isPageNumCorrect = false;
        let pageNum = 0;
        if (urlMap && Array.isArray(agendaList)) {
            q = cnvFmt.convertSearchWord(urlMap);
            setSearchWord(decodeURI(q));
            isPageNumCorrect = cnvFmt.isPageParamsCorrect(urlMap, agendaList, limit);
            if (isPageNumCorrect) {
                pageNum = cnvFmt.convertPageParseInt(urlMap);
                setOffset(pageNum);
            }
        }
        if (!isPageNumCorrect) {
            search(q, pageNum);
        }
    }, []);

    useEffect(() => {
        if (!Array.isArray(agendaList) || typeof loading !== 'boolean' || typeof error !== 'string') {
            return;
        }
        const cnvFmt = new convertFormat();
        const urlMap = cnvFmt.convertURLParams(window.location.search, 2);
        if (!urlMap) {
            dispatch(setAgendaList([]));
            return;
        }
        let q = cnvFmt.convertSearchWord(urlMap);
        if (q === null || q === '') {
            dispatch(setAgendaList([]));
            return;
        }
        if (!loading && error === '' && searchWord !== null && searchWord !== '') {
            document.title = `${searchWord} - Votter検索`;
            ReactGA.pageview(window.location.pathname + window.location.search);
        }
    }, [loading, error]);

    if (!Array.isArray(agendaList) || typeof loading !== 'boolean' || typeof error !== 'string') {
        return null;
    }

    const search = (q: string, pageNum: number) => {
        if (q === null || q === '') {
            return;
        }
        history.push(`/search?q=${q}&page=${pageNum}`);
        if (typeof getAgendaListSearch == 'function') {
            getAgendaListSearch(q);
        }
    }

    const searchButtonSubmitHandle = () => {
        search(searchWord, offset);
    }

    const searchWordChnageEvent = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setSearchWord(event.target.value);
    };

    const handleListItemClick = (event: React.MouseEvent<HTMLDivElement>, id: string) => {
        setselectedId(id);
        history.push(`/agenda/${id}`);
    };

    const handleClick = (offset: number) => {
        setOffset(offset);
        history.push(`/search?q=${searchWord}&page=${offset}`);
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

    const renderSearchProgressBar = () => {
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
                {renderCustomSnackBar()}
                <div className={classes.root}>
                    <Input
                        value={searchWord}
                        className={classes.input}
                        inputProps={{
                            'aria-label': 'search word',
                        }}
                        onChange={(event) => searchWordChnageEvent(event)}
                    />
                    <IconButton color="primary" className={classes.button} aria-label="search" onClick={searchButtonSubmitHandle}>
                        <SearchIcon />
                    </IconButton>
                    <List component="nav" aria-label="agendaList">
                        {renderSearchProgressBar()}
                        {ListItemById()}
                    </List>
                    {renderPagination()}
                </div>
            </Container>
        </React.Fragment>
    );
};

export default AgendaListNew;



