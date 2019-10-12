/** library */
import React, { FC } from 'react';

/** model */
import { Agenda } from '../../../store/agenda/set/types';

/** Material UI Components */
import { lighten, makeStyles, withStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme: Theme) => ({
    card: {
        maxWidth: '100%',
    },
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        marginTop: '10px',
    },
    margin: {
        margin: theme.spacing(1),
    },
}));

const BorderLinearProgress = withStyles({
    root: { height: 10, },
    bar: { borderRadius: 20, },
})(LinearProgress);

const BorderLinearProgressOrange = withStyles({
    root: { backgroundColor: lighten('#f8f8ff', 0.5), },
    bar: { backgroundColor: '#ff6c5c', },
})(BorderLinearProgress);

const BorderLinearProgressBlue = withStyles({
    root: { backgroundColor: lighten('#f8f8ff', 0.5), },
    bar: { backgroundColor: '#0000ff', },
})(BorderLinearProgress);

const BorderLinearProgressGreen = withStyles({
    root: { backgroundColor: lighten('#f8f8ff', 0.5), },
    bar: { backgroundColor: '#008000', },
})(BorderLinearProgress);

const BorderLinearProgressMagenta = withStyles({
    root: { backgroundColor: lighten('#f8f8ff', 0.5), },
    bar: { backgroundColor: '#ff00ff', },
})(BorderLinearProgress);

interface AgendaDetailResultProps {
    agendaDetail: Agenda
}

const AgendaDetailResult: FC<AgendaDetailResultProps> = ({ agendaDetail }) => {
    const classes = useStyles();

    if (agendaDetail.id === '') { return null; }

    const choices = [
        { value: agendaDetail.choice1, count: agendaDetail.choice1Count },
        { value: agendaDetail.choice2, count: agendaDetail.choice2Count },
        { value: agendaDetail.choice3, count: agendaDetail.choice3Count },
        { value: agendaDetail.choice4, count: agendaDetail.choice4Count }
    ];

    // sorted
    let sortedChoices = choices.slice();
    sortedChoices.sort((a, b) => {
        return a.count < b.count ? 1 : -1;
    });

    // Calculate total
    let sum = 0;
    for (let i = 0; i < sortedChoices.length; i++) {
        sum += sortedChoices[i].count;
    }

    const getBorderLinearProgressColor = (index: number, percentage: number) => {
        if (index === 0) {
            return <BorderLinearProgressOrange className={classes.margin} variant="determinate" value={percentage} />;
        } else if (index === 1) {
            return <BorderLinearProgressBlue className={classes.margin} variant="determinate" value={percentage} />;
        } else if (index === 2) {
            return <BorderLinearProgressGreen className={classes.margin} variant="determinate" value={percentage} />;
        } else if (index === 3) {
            return <BorderLinearProgressMagenta className={classes.margin} variant="determinate" value={percentage} />;
        }

    };

    const renderVoteResult = () => {
        return sortedChoices.map((choice, index) => {
            if (choice.value === '') {
                return null;
            }
            let percentage = 0;
            if (sum !== 0) {
                percentage = Math.round((choice.count / sum) * 100);
            }
            return (
                <React.Fragment key={index}>
                    <Typography variant="h6" color="textPrimary" component="p">
                        {choice.value}
                    </Typography>
                    <Typography variant="caption" color="textSecondary" component="p">
                        {`割合：${percentage}% 投票数：${choice.count}`}
                    </Typography>
                    {getBorderLinearProgressColor(index, percentage)}
                </React.Fragment>
            );
        });
    };

    return (
        <div className={classes.root}>
            <Card className={classes.card}>
                <CardHeader
                    title="投票結果"
                    subheader={`全体投票数 : ${sum}`}
                />
                <CardContent>
                    {renderVoteResult()}
                </CardContent>
            </Card>
        </div>
    );

};

export default AgendaDetailResult;