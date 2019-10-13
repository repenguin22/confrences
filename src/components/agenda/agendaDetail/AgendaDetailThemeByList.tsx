/** library */
import React, { useEffect, FC } from 'react';

/** model */
import { Vote } from '../../../store/agenda/set/types';

/** util */
import convertFormat from '../../../utils/convertFormat';

/** Material UI Components */
import { makeStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';


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
    voteDetial: Vote
}

const AgendaDetailThemeByList: FC<AgendaDetailThemeByListProps> = ({ voteDetial }) => {
    const classes = useStyles();
    const [thumbUpId, selectedThumbUpId] = React.useState(0);
    const [up, changeUp] = React.useState(0);

    useEffect(() => {
        changeUp(voteDetial.goodCount);
    }, [voteDetial]);

    const thunbUpDownOnClick = (event: React.MouseEvent<HTMLButtonElement>, id: string) => {
        if (!thumbUpId) {
            selectedThumbUpId(1);
            changeUp(up + 1);
        }
        console.log(' id: ' + id);
    };


    const renderThumbUpIcon = () => {
        return (
            <React.Fragment>
                <i className="material-icons">thumb_up</i>
                <span>{up}</span>
            </React.Fragment>
        );
    };

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
                <CardActions disableSpacing>
                    <IconButton aria-label="thumb_up" size="small" onClick={event => thunbUpDownOnClick(event, voteDetial.id)}>
                        {renderThumbUpIcon()}
                    </IconButton>
                </CardActions>
            </Card>
        </div >
    );
};

export default AgendaDetailThemeByList;