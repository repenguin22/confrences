/** library */
import React, { FC } from 'react';
//import { useSelector } from 'react-redux';

/** model */
import { Vote } from '../../../store/agenda/set/types';

//import { AllAgendaState } from '../../../store/agenda/set/types';

/** use */
//import { useThumbUp, ResultedCodeVariation } from './useThumbUp';

/** util */
import convertFormat from '../../../utils/convertFormat';

/** Material UI Components */
import { makeStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
//import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
//import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';

/** css */
import './AgendaDetailThemeByList.css';


const useStyles = makeStyles((theme: Theme) => ({
    card: {
        maxWidth: '100%',
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
}));

interface AgendaDetailThemeByListProps {
    agendaId: string
    voteDetial: Vote
}

const AgendaDetailThemeByList: FC<AgendaDetailThemeByListProps> = ({ agendaId, voteDetial }) => {
    const classes = useStyles();

    //let agendaDetailFavo = useSelector((state: AllAgendaState) => state.agenda.favo);
    //const [thumbUpId, selectedThumbUpId] = React.useState(0);
    //const [up, changeUp] = React.useState(0);
    //const [userFavList, setUserFavList] = React.useState(agendaDetailFavo.voteList);
    //const [putVoteGood, loading, resulted] = useThumbUp();


    /*useEffect(() => {
        changeUp(voteDetial.goodCount);
    }, [voteDetial]);

    useEffect(() => {
        if (typeof resulted !== 'object') {
            return;
        }
        if (resulted.code === ResultedCodeVariation.success && resulted.isGood) {
            selectedThumbUpId(1);
            changeUp(up + 1);
            setUserFavList(userFavList.concat(resulted.value));
        } else if (resulted.code === ResultedCodeVariation.success && !resulted.isGood) {
            selectedThumbUpId(0);
            changeUp(up - 1);
            setUserFavList(userFavList.filter((id) => id !== resulted.value));
        }
    }, [resulted]);*/


    /*if (typeof putVoteGood !== 'function' || typeof loading !== 'boolean' || typeof resulted !== 'object') {
        return null;
    }*/

    /*const thunbUpDownOnClick = (event: React.MouseEvent<HTMLButtonElement>, voteId: string, isGood: boolean) => {
        if (!thumbUpId) {
            putVoteGood(agendaId, voteId, isGood);
        }

    };*/


    /*const renderThumbUpIcon = () => {
        let className = 'material-icons';
        if (userFavList.includes(voteDetial.id)) {
            className += ' blue';
        }
        return (
            <React.Fragment>
                <i className={className}>thumb_up</i>
                <span>{up}</span>
            </React.Fragment>
        );
    };*/

    /*const renderThumbUp = () => {
        return (
            <IconButton aria-label="thumb_up" size="small" onClick={event => thunbUpDownOnClick(event, voteDetial.id, userFavList.includes(voteDetial.id))}>
                {renderThumbUpIcon()}
            </IconButton>
        );
    };*/

    const renderAvatar = () => {
        if (voteDetial.createUserPhotoURL === null || voteDetial.createUserPhotoURL === '') {
            return <Avatar aria-label="recipe" className={classes.avatar}>A</Avatar>;
        }
        return <Avatar aria-label="recipe" src={voteDetial.createUserPhotoURL} className={classes.avatar} />;
    };

    const cnvFmt = new convertFormat();

    return (
        <div className={classes.root}>
            <Card className={classes.card}>
                <CardHeader
                    avatar={renderAvatar()}
                    title={voteDetial.choice}
                    subheader={`${cnvFmt.convertYMD(voteDetial.createdAt)} author: ${voteDetial.createUserName}`}
                />
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p" style={{ whiteSpace: 'pre-line' }}>
                        {voteDetial.reason.replace(/\\n/g, '\n')}
                    </Typography>
                </CardContent>
            </Card>
        </div >
    );
};

export default AgendaDetailThemeByList;