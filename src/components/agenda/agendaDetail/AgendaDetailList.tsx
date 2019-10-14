/** library */
import React, { FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Pagination from 'material-ui-flat-pagination';

/** Custom Components */
import AgendaDetailThemeByList from './AgendaDetailThemeByList';

/** action */
import { AllAgendaState } from '../../../store/agenda/set/types';
import { AuthState } from '../../../store/auth/types';
import { setReload } from '../../../store/agenda/set/action';
import { useVoteGet } from './useVoteGet';

/** model */
import { Agenda } from '../../../store/agenda/set/types';

/** Material UI Components */
import { makeStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import ReplayIcon from '@material-ui/icons/Replay';
import FilterListIcon from '@material-ui/icons/FilterList';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const useStyles = makeStyles((theme: Theme) => ({
    card: {
        maxWidth: '100%',
    },
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        marginTop: '10px',
    },
    button: {
        margin: theme.spacing(1),
    },
    box: {
        width: '200px'
    },
}));


interface AgendaDetailListProps {
    agendaDetail: Agenda
}

const AgendaDetailList: FC<AgendaDetailListProps> = ({ agendaDetail }) => {
    const classes = useStyles();

    const dispatch = useDispatch();

    const reloadCount = useSelector((state: AllAgendaState) => state.agenda.reloadCount);
    const loginedUserId = useSelector((state: AuthState) => state.auth.uid);

    const currentLocation = useLocation();
    const agendaId = currentLocation.pathname.split('/')[2];

    const [dialogOpen, setDialogOpen] = React.useState(false);

    const [filter, setFilter] = React.useState('');


    const [offset, setOffset] = React.useState(0);
    const limit = 20;

    const [voteList, getVoteList, loading, error] = useVoteGet();

    useEffect(() => {
        if (typeof getVoteList === 'function') {
            getVoteList(agendaId);
        }
    }, [reloadCount]);

    if (!Array.isArray(voteList) || typeof loading !== 'boolean' || typeof error !== 'string') {
        return null;
    }

    /** filter Handler */
    const filterDialogHandleOpen = () => {
        setDialogOpen(true);
    };

    const filterDialogHandleClose = () => {
        setDialogOpen(false);
    };

    const filterHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilter(event.target.value);
        setOffset(0);
        filterDialogHandleClose();
    };

    /** reload button handler */
    const reloadHandleClick = () => {
        dispatch(setReload());
        setOffset(0);
    };

    /** paging GHandler */
    const pagingHandleClick = (offset: number) => {
        setOffset(offset);
    };

    const renderChoiceRadioGroup = () => {
        if (agendaDetail.id === '') {
            return null;
        }
        let choices = [];
        choices.push(agendaDetail.choice1);
        choices.push(agendaDetail.choice2);
        choices.push(agendaDetail.choice3);
        choices.push(agendaDetail.choice4);
        let ret = [];
        ret.push(<FormControlLabel key='dialogNone' value='' control={< Radio />} label='無し' />);
        for (let i = 0; i < choices.length; i++) {
            let choice = choices[i];
            if (choice !== '') {
                ret.push(<FormControlLabel key={`dialog${i}`} value={choice} control={<Radio />} label={choice} />);
            }
        }
        return ret;
    };

    const renderAgendaDiaglog = (
        <div>
            <Dialog open={dialogOpen} onClose={filterDialogHandleClose} aria-labelledby="form-dialog-title" fullWidth>
                <DialogTitle id="form-dialog-title">フィルター</DialogTitle>
                <DialogContent>
                    <RadioGroup aria-label="filter" name="filter" value={filter} onChange={event => filterHandleChange(event)} style={{ width: '100%' }}>
                        {renderChoiceRadioGroup()}
                    </RadioGroup>
                </DialogContent>
                <DialogActions>
                    <Button onClick={filterDialogHandleClose} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );

    const renderAgendaDetailTheme = () => {
        let tmpVoteList = voteList.slice();
        tmpVoteList = tmpVoteList.filter((vote) => { return vote.createUserId === loginedUserId; }).concat(tmpVoteList.filter((vote) => { return vote.createUserId !== loginedUserId; }));
        if (filter !== '') {
            tmpVoteList = tmpVoteList.filter((vote) => { return vote.choice === filter; });
        }
        return tmpVoteList.slice(offset, offset + limit).map((voteDetail, index, array) => {
            return (
                <React.Fragment key={index}>
                    <AgendaDetailThemeByList agendaId={agendaDetail.id} voteDetial={voteDetail} />
                    <Box mt={1} />
                </React.Fragment>
            );
        });
    };

    return (
        <div className={classes.root}>
            <Card className={classes.card}>
                <CardHeader
                    action={
                        <React.Fragment>
                            <IconButton onClick={reloadHandleClick}>
                                <ReplayIcon />
                            </IconButton>
                            <IconButton onClick={filterDialogHandleOpen}>
                                <FilterListIcon />
                            </IconButton>
                        </React.Fragment>
                    }
                />
                <CardContent>
                    {renderAgendaDiaglog}
                    {renderAgendaDetailTheme()}
                    <Box mx="auto" mt={2} className={classes.box}>
                        <Pagination
                            limit={limit}
                            offset={offset}
                            total={voteList.length}
                            onClick={(event, offset: number) => pagingHandleClick(offset)}
                        />
                    </Box>
                </CardContent>
            </Card>
        </div>
    );

};

export default AgendaDetailList;