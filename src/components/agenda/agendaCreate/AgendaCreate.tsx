/** library */
import React, { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import ReactGA from 'react-ga';

/** Custom Components */
import Header from '../../header/Header';
import { CustomSnackBar } from '../../common/CustomSnackBar';
import { NoticeState } from '../../../store/notice/types';

/** model */
import { CreateAgendaForm } from '../../../store/agenda/put/types';

/** util */
import validation from '../../../utils/validation';

/** useAgendaCreate */
import { useAgendaCreate, ResultedCodeVariation } from './useAgendaCreate';

/** Material UI Components */
import { makeStyles, Theme } from '@material-ui/core/styles';

import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    card: {
        maxWidth: '100%',
        marginTop: theme.spacing(2),
    },
    box: {
        width: '100px',
    }
}));

// value of the number of options displayed
const INITIAL_CHOICE_DISPLAY_NUM = 2;
const MIN_CHOICE_DISPLAY_NUM = 2;
const MAX_CHOICE_DISPLAY_NUM = 4;

/** Form limit boundary value */
// Maximum number of characters
const SUBJECT_CHAR_MAX = 50;
const OVERVIEW_CHAR_MAX = 240;
const CHOICE_CHAR_MAX = 25;
// Maximum number of line breaks
const SUBJECT_NEWLINE_MAX = 1;
const OVERVIEW_NEWLINE_MAX = 25;
const CHOICE_NEWLINE_MAX = 0;

const AgendaCreate: FC = () => {

    const classes = useStyles();

    const notice = useSelector((state: NoticeState) => state.notice);

    const location = useLocation();

    const history = useHistory();

    // State to manage how many choices are displayed
    const [displayChoice, setDisplayChoice] = React.useState(INITIAL_CHOICE_DISPLAY_NUM);

    // State that manages form values
    const [localFormParams, setLocalFormParams] = React.useState<CreateAgendaForm>({
        formContents: ['subject', 'overview', 'choice1', 'choice2'],
        subject: {
            error: false,
            errorMsg: '',
            value: ''
        },
        overview: {
            error: false,
            errorMsg: '',
            value: ''
        },
        choice1: {
            error: false,
            errorMsg: '',
            value: ''
        },
        choice2: {
            error: false,
            errorMsg: '',
            value: ''
        },
        choice3: {
            error: false,
            errorMsg: '',
            value: ''
        },
        choice4: {
            error: false,
            errorMsg: '',
            value: ''
        }
    });

    const [putAgendaCretae, loading, resulted] = useAgendaCreate();

    useEffect(() => {
        // type check
        if (typeof loading !== 'boolean' || typeof resulted !== 'object') {
            return;
        }
        // If successful, skip to the corresponding page after a while.
        if (resulted.code === ResultedCodeVariation.success) {
            // If creation is successful
            setTimeout(() => {
                history.push(`/agenda/${resulted.value}`);
            }, 2500);
        }
    }, [resulted]);

    useEffect(() => {
        document.title = 'お題作成';
        ReactGA.pageview(window.location.pathname + window.location.search);
    }, []);

    if (typeof putAgendaCretae !== 'function' || typeof loading !== 'boolean' || typeof resulted !== 'object') {
        return null;
    }

    // Function to increase the choice input field
    const addChoiceClick = () => {
        // If the number of display options is 4 or more, it cannot be increased any more
        if (displayChoice >= MAX_CHOICE_DISPLAY_NUM) {
            return;
        }
        // Update display selection state
        setDisplayChoice(displayChoice + 1);
        // Add an entry field that currently exists in the form
        let tempFormContents = localFormParams.formContents;
        tempFormContents.push(`choice${displayChoice + 1}`);
        setLocalFormParams({ ...localFormParams, formContents: tempFormContents });
    };

    // Function to remove the choice entry field
    const removeChoiceClick = () => {
        // Return if there are 2 or fewer display options
        if (displayChoice <= MIN_CHOICE_DISPLAY_NUM) {
            return;
        }
        // Update display selection state
        setDisplayChoice(displayChoice - 1);
        // Remove an entry field that currently exists in the form
        let tempFormContents = localFormParams.formContents;
        tempFormContents = tempFormContents.filter((content: string) => content !== `choice${displayChoice}`);
        // Initialize local form state
        const initialChoiceObj = {
            error: false,
            errorMsg: '',
            value: ''
        };
        setLocalFormParams({ ...localFormParams, formContents: tempFormContents, [`choice${displayChoice}`]: initialChoiceObj });
    };

    // A function that updates the state when the form value changes
    const onChangeFormField = (event: React.ChangeEvent<HTMLInputElement>, name: string) => {
        let paramObj = localFormParams[name];
        if (Array.isArray(paramObj)) {
            return;
        }
        paramObj.error = false;
        paramObj.errorMsg = '';
        paramObj.value = event.target.value;
        setLocalFormParams({ ...localFormParams, [name]: paramObj });
        validate(name);

    };

    // Function to check input value
    const validate = (name: string) => {
        let paramObj = localFormParams[name];
        if (Array.isArray(paramObj)) {
            return;
        }
        let valid = new validation();
        switch (name) {
            case 'subject':
                paramObj = valid.requiredCheck(paramObj);
                if (paramObj.errorMsg !== '') { setLocalFormParams({ ...localFormParams, [name]: paramObj }); break; }
                paramObj = valid.validMaxLength(SUBJECT_CHAR_MAX, paramObj);
                if (paramObj.errorMsg !== '') { setLocalFormParams({ ...localFormParams, [name]: paramObj }); break; }
                paramObj = valid.validNewLine(SUBJECT_NEWLINE_MAX, paramObj);
                if (paramObj.errorMsg !== '') { setLocalFormParams({ ...localFormParams, [name]: paramObj }); break; }
                break;
            case 'overview':
                paramObj = valid.requiredCheck(paramObj);
                if (paramObj.errorMsg !== '') { setLocalFormParams({ ...localFormParams, [name]: paramObj }); break; }
                paramObj = valid.validMaxLength(OVERVIEW_CHAR_MAX, paramObj);
                if (paramObj.errorMsg !== '') { setLocalFormParams({ ...localFormParams, [name]: paramObj }); break; }
                paramObj = valid.validNewLine(OVERVIEW_NEWLINE_MAX, paramObj);
                if (paramObj.errorMsg !== '') { setLocalFormParams({ ...localFormParams, [name]: paramObj }); break; }
                break;
            case 'choice1':
                paramObj = valid.requiredCheck(paramObj);
                if (paramObj.errorMsg !== '') { setLocalFormParams({ ...localFormParams, [name]: paramObj }); break; }
                paramObj = valid.validMaxLength(CHOICE_CHAR_MAX, paramObj);
                if (paramObj.errorMsg !== '') { setLocalFormParams({ ...localFormParams, [name]: paramObj }); break; }
                paramObj = valid.validNewLine(CHOICE_NEWLINE_MAX, paramObj);
                if (paramObj.errorMsg !== '') { setLocalFormParams({ ...localFormParams, [name]: paramObj }); break; }
                break;
            case 'choice2':
                paramObj = valid.requiredCheck(paramObj);
                if (paramObj.errorMsg !== '') { setLocalFormParams({ ...localFormParams, [name]: paramObj }); break; }
                paramObj = valid.validMaxLength(CHOICE_CHAR_MAX, paramObj);
                if (paramObj.errorMsg !== '') { setLocalFormParams({ ...localFormParams, [name]: paramObj }); break; }
                paramObj = valid.validNewLine(CHOICE_NEWLINE_MAX, paramObj);
                if (paramObj.errorMsg !== '') { setLocalFormParams({ ...localFormParams, [name]: paramObj }); break; }
                break;
            case 'choice3':
                paramObj = valid.requiredCheck(paramObj);
                if (paramObj.errorMsg !== '') { setLocalFormParams({ ...localFormParams, [name]: paramObj }); break; }
                paramObj = valid.validMaxLength(CHOICE_CHAR_MAX, paramObj);
                if (paramObj.errorMsg !== '') { setLocalFormParams({ ...localFormParams, [name]: paramObj }); break; }
                paramObj = valid.validNewLine(CHOICE_NEWLINE_MAX, paramObj);
                if (paramObj.errorMsg !== '') { setLocalFormParams({ ...localFormParams, [name]: paramObj }); break; }
                break;
            case 'choice4':
                paramObj = valid.requiredCheck(paramObj);
                if (paramObj.errorMsg !== '') { setLocalFormParams({ ...localFormParams, [name]: paramObj }); break; }
                paramObj = valid.validMaxLength(CHOICE_CHAR_MAX, paramObj);
                if (paramObj.errorMsg !== '') { setLocalFormParams({ ...localFormParams, [name]: paramObj }); break; }
                paramObj = valid.validNewLine(CHOICE_NEWLINE_MAX, paramObj);
                if (paramObj.errorMsg !== '') { setLocalFormParams({ ...localFormParams, [name]: paramObj }); break; }
                break;
            default:
                break;
        }
    };

    /** The function whose form is submitted */
    const submitButtonClick = () => {
        let formcontent = localFormParams.formContents;
        let errorCount = 0;
        for (let i = 0; i < formcontent.length; i++) {
            // validate
            validate(formcontent[i]);
            // If there is even one error, add the error count
            const paramObj = localFormParams[formcontent[i]];
            if (Array.isArray(paramObj)) {
                return;
            }
            if (paramObj.error) {
                errorCount += 1;
            }
        }
        if (errorCount > 0) {
            return;
        }
        putAgendaCretae(localFormParams);
    };

    // A function that dynamically draws choices
    const renderChoice = () => {
        let ret = [];
        for (let i = 1; i <= displayChoice; i++) {
            const paramObj = localFormParams[`choice${i}`];
            if (Array.isArray(paramObj)) {
                return;
            }
            ret.push(
                <FormControl error={paramObj.error} className={classes.root} key={`choice${i}`}>
                    <InputLabel htmlFor={`choice${i}`}>{`選択肢${i}`}</InputLabel>
                    <Input autoCapitalize="off"
                        id={`choice${i}`}
                        value={paramObj.value}
                        aria-describedby={`choice${i}-helper-text`}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChangeFormField(event, `choice${i}`)}
                        error={paramObj.error} />
                    <FormHelperText error={paramObj.error}>{paramObj.errorMsg}</FormHelperText>
                </FormControl>
            );
        }
        return ret;
    };

    // A function that displays a progress bar when reading
    const renderSubmitProgressBar = () => {
        if (loading) {
            return <LinearProgress />;
        }
        return null;
    };

    const renderCustomSnackBar = () => {
        if (notice.target === location.pathname) {
            return <CustomSnackBar />;
        }
        return null;
    };

    return (
        <React.Fragment>
            <Header />
            <Container maxWidth="xl" >
                <Card className={classes.card}>
                    <CardHeader
                        title="お題"
                    />
                    <CardContent>
                        <FormControl className={classes.root}>
                            <TextField
                                id="subject"
                                label="お題"
                                multiline
                                rows="2"
                                rowsMax="3"
                                className=""
                                margin="normal"
                                value={localFormParams.subject.value}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChangeFormField(event, 'subject')}
                                error={localFormParams.subject.error}
                                required
                            />
                            <FormHelperText id="subject-helper-text" error={localFormParams.subject.error}>{localFormParams.subject.errorMsg}</FormHelperText>
                        </FormControl>
                        <FormControl className={classes.root}>
                            <TextField
                                id="overview"
                                label="概要"
                                multiline
                                rows="20"
                                rowsMax="20"
                                className=""
                                margin="normal"
                                value={localFormParams.overview.value}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChangeFormField(event, 'overview')}
                                error={localFormParams.overview.error}
                                required
                            />
                            <FormHelperText id="overview-helper-text" error={localFormParams.overview.error}>{localFormParams.overview.errorMsg}</FormHelperText>
                        </FormControl>
                    </CardContent>
                </Card>
                <Card className={classes.card}>
                    <CardHeader
                        title="選択肢"
                        action={
                            <React.Fragment>
                                <IconButton onClick={addChoiceClick}>
                                    <AddIcon />
                                </IconButton>
                                <IconButton onClick={removeChoiceClick}>
                                    <RemoveIcon />
                                </IconButton>
                            </React.Fragment>
                        }
                    />
                    <CardContent>
                        {renderChoice()}
                    </CardContent>
                </Card>
                {renderSubmitProgressBar()}
                <Box mx="auto" mt={2} className={classes.box}>
                    <Button onClick={submitButtonClick} variant="contained" color="primary" disabled={loading}>
                        投稿
                    </Button>
                </Box>
                {renderCustomSnackBar()}
            </Container >
        </React.Fragment >
    );
};

export default AgendaCreate;