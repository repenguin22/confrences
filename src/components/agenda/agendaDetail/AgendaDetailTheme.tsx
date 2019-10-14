/** library */
import React, { FC } from 'react';

/** Custom Components */
//import ShowMoreMenu from '../../common/ShowMoreMenu';

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
//import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
//import FavoriteIcon from '@material-ui/icons/Favorite';
//import ShareIcon from '@material-ui/icons/Share';

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

    if (agendaDetail.id === '') { return null; }

    // report menu Event
    /*const reportMenuHandleEvent = () => {
        console.log('report');
    };*/

    // report menu setting ary
    /*const reportMenuAry = [
        { key: '1', value: 'report', handleEvents: reportMenuHandleEvent }
    ];*/

    // render avatar
    const renderAvatar = () => {
        if (agendaDetail.createUserPhotoURL === null || agendaDetail.createUserPhotoURL === '') {
            return <Avatar aria-label="recipe" className={classes.avatar}>A</Avatar>;
        }
        return <Avatar aria-label="recipe" src={agendaDetail.createUserPhotoURL} className={classes.avatar} />;
    };

    const cnvFmt = new convertFormat();

    return (
        <div className={classes.root}>
            <Card className={classes.card}>
                <CardHeader
                    avatar={renderAvatar()}
                    title={agendaDetail.subject.replace(/\\n/g, '\n')}
                    subheader={`${cnvFmt.convertYMD(agendaDetail.createdAt)} author: ${agendaDetail.createUserName}`}
                    style={{ whiteSpace: 'pre-line' }}
                />
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p" style={{ whiteSpace: 'pre-line' }}>
                        {agendaDetail.overview.replace(/\\n/g, '\n')}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    {/*<IconButton aria-label="add to favorites" disabled disableFocusRipple disableRipple>
                        <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="share" disabled disableFocusRipple disableRipple>
                        <ShareIcon />
    </IconButton>*/}
                </CardActions>
            </Card>
        </div>
    );

};

export default AgendaDetailTheme;