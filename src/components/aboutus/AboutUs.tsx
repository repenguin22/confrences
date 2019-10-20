/** library */
import React, { FC, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import ReactGA from 'react-ga';

/** Custom Components */
import Header from '../header/Header';

/** Material UI Components */
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    card: {
        maxWidth: '100%',
        marginTop: theme.spacing(2),
    },
    link: {
        margin: theme.spacing(1),
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
}));

const AboutUs: FC = () => {
    const classes = useStyles();

    const history = useHistory();

    useEffect(() => {
        document.title = '概要';
        ReactGA.pageview(window.location.pathname + window.location.search);
    }, []);

    const twitterLinkOnClick = () => {
        window.open('https://twitter.com/Votter_net', '_blank');
    };

    const googleFormOnClick = () => {
        window.open('https://forms.gle/8E3oLtJpi7xZi3Rg7', '_blank');
    }

    const developerTwitterLinkOnClick = () => {
        window.open('https://twitter.com/repenguin22', '_blank');
    }

    return (
        <React.Fragment>
            <Header />
            <Container maxWidth="xl">
                <div className={classes.root}>
                    <Card className={classes.card}>
                        <CardHeader
                            title="私たちの使命"
                        />
                        <CardContent>
                            <Box textAlign="center" m={1} fontSize={20}>
                                私たちの使命は誰もが平等に意見を述べることのできるプラットフォームを提供し、未来を創造する手助けをすることです
                            </Box>
                        </CardContent>
                    </Card>
                    <Card className={classes.card}>
                        <CardHeader
                            title="問い合わせ"
                        />
                        <CardContent>
                            <Box textAlign="center" m={1} fontSize={16}>
                                公式TwitterまたはGoogle Formよりお問い合わせください
                            </Box>
                            <Box textAlign="center" m={1} fontSize={16}>
                                公式Twitter :
                                <Link onClick={twitterLinkOnClick} className={classes.link}>
                                    Votter.net 公式
                                </Link>
                            </Box>
                            <Box textAlign="center" m={1} fontSize={16}>
                                GoogleForm :
                                <Link onClick={googleFormOnClick} className={classes.link}>
                                    問い合わせフォーム
                                </Link>
                            </Box>
                        </CardContent>
                    </Card>
                    <Card className={classes.card}>
                        <CardHeader
                            title="ロードマップ"
                        />
                        <CardContent>
                            <div className={classes.root}>
                                <ExpansionPanel>
                                    <ExpansionPanelSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <Typography className={classes.heading}>人気順表示機能実装</Typography>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                        <Typography>
                                            人気順表示機能を実装します
                                        </Typography>
                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                                <ExpansionPanel>
                                    <ExpansionPanelSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel2a-content"
                                        id="panel2a-header"
                                    >
                                        <Typography className={classes.heading}>画像投稿機能</Typography>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                        <Typography>
                                            画像投稿機能を実装します。不適切な画像を上げられないようにAIを使用し、自動判定・消去機能を実装します
                                        </Typography>
                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                                <ExpansionPanel>
                                    <ExpansionPanelSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel3a-content"
                                        id="panel3a-header"
                                    >
                                        <Typography className={classes.heading}>補足情報の追加機能</Typography>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                        <Typography>
                                            お題に対して補足情報を三個まで追加できるようにします
                                        </Typography>
                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                                <ExpansionPanel>
                                    <ExpansionPanelSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel4a-content"
                                        id="panel4a-header"
                                    >
                                        <Typography className={classes.heading}>補足情報が三個以上になった場合やお題の前提条件が大きく崩れた場合、お題を引用し作り直せるフォーク機能を実装します</Typography>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                        <Typography>
                                            参考としてはGithubのフォーク機能です
                                        </Typography>
                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                                <ExpansionPanel>
                                    <ExpansionPanelSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel5a-content"
                                        id="panel5a-header"
                                    >
                                        <Typography className={classes.heading}>投票開始とクローズ日の設定</Typography>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                        <Typography>
                                            投票開始日と投票終了日を設定できるようにします
                                        </Typography>
                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                                <ExpansionPanel>
                                    <ExpansionPanelSummary
                                        aria-controls="panel6a-content"
                                        id="panel6a-header"
                                        disabled
                                    >
                                        <Typography className={classes.heading}>まだまだやりたいことはありますが、時間もお金もないのでのんびりやっていきます</Typography>
                                    </ExpansionPanelSummary>
                                </ExpansionPanel>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className={classes.card}>
                        <CardHeader
                            title="開発者"
                        />
                        <CardContent>
                            <Box textAlign="center" m={1} fontSize={16}>
                                開発者Twitter :
                                <Link onClick={developerTwitterLinkOnClick} className={classes.link}>
                                    Re Penguin
                                </Link>
                            </Box>
                        </CardContent>
                    </Card>
                    <Card className={classes.card}>
                        <CardHeader
                            title="プライバシーポリシー及びサービス利用規約"
                        />
                        <CardContent>
                            <Box textAlign="center" m={1} fontSize={16}>
                                <Link onClick={() => history.push('/privacypolicy')} className={classes.link}>
                                    プライバシーポリシー及びサービス利用規約
                                </Link>
                            </Box>
                        </CardContent>
                    </Card>
                </div>
            </Container>
        </React.Fragment >
    );
}

export default AboutUs;