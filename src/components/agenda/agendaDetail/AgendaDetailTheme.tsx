/** library */
import React, { FC } from 'react';
import { useLocation } from 'react-router-dom';

/** model */
import { Agenda } from '../../../store/agenda/set/types';

/** util */
import convertFormat from '../../../utils/convertFormat';

/** Material UI Components */
import { makeStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import { TwitterShareButton, TwitterIcon } from 'react-share';

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
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    avatar: {
        backgroundColor: red[500],
    },
}));

interface AgendaDetailThemeProps {
    agendaDetail: Agenda
}

const AgendaDetailTheme: FC<AgendaDetailThemeProps> = ({ agendaDetail }) => {
    const classes = useStyles();

    const location = useLocation();

    if (agendaDetail.id === '') { return null; }

    // render avatar
    const renderAvatar = () => {
        if (agendaDetail.createUserPhotoURL === null || agendaDetail.createUserPhotoURL === '') {
            return <Avatar alt="Avatar" className={classes.avatar}>A</Avatar>;
        }
        return <Avatar alt="Avatar" src={agendaDetail.createUserPhotoURL} className={classes.avatar} />;
    };

    const cnvFmt = new convertFormat();

    return (
        <div className={classes.root}>
            <Card className={classes.card}>
                <CardHeader
                    avatar={renderAvatar()}
                    title={agendaDetail.subject.replace(/\\n/g, '\n')}
                    subheader={`${cnvFmt.convertYMD(agendaDetail.createdAt)} 作成者: ${agendaDetail.createUserName}`}
                    style={{ whiteSpace: 'pre-line' }}
                />
                <CardContent>
                    <Typography variant="body2" color="textPrimary" component="p" style={{ whiteSpace: 'pre-line' }}>
                        {agendaDetail.overview.replace(/\\n/g, '\n')}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <TwitterShareButton url={`https://confrence-1568633251505.firebaseapp.com${location.pathname}`} title={agendaDetail.subject} hashtags={['confrences']}>
                        <TwitterIcon size={35} round />
                    </TwitterShareButton>
                </CardActions>
            </Card>
        </div >
    );

};

export default AgendaDetailTheme;