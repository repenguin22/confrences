/** library */
import React, { FC, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/** Custom Components */
import Header from '../../header/Header';
import { CustomSnackBar, SnackBarTypeVariation } from '../../common/CustomSnackBar';

/** useAgendaGet */
import { useAgendaGet } from './useAgendaGet';

/** model */
import { CreateVoteForm } from '../../../store/agenda/put/types';

/** util */
import validation from '../../../utils/validation';

/** Material UI Components */
import { makeStyles, Theme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles((theme: Theme) => ({
    floaButtonWrapper: {
        position: 'relative',
        height: 380,
    },
    formControl: {
        margin: theme.spacing(0),
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '100%',
    },
    fab: {
        margin: theme.spacing(1),
        position: 'fixed',
        right: theme.spacing(1),
        bottom: theme.spacing(1),
        zIndex: 1,
    }
}));

/** Form limit boundary value */
// Maximum number of characters
const REASON_CHAR_MAX = 90;
// Maximum number of line breaks
const REASON_NEWLINE_MAX = 8;

const AgendaDetail: FC = () => {

    const classes = useStyles();

    // State that manages the opening and closing of the voting form dialog
    const [voteDialogOpen, setVoteDialogOpen] = React.useState(false);

    // State that manages the voting form
    const [localFormParams, setLocalFormParams] = React.useState<CreateVoteForm>({
        formContents: ['choice', 'reason'],
        choice: {
            error: false,
            errorMsg: '',
            value: ''
        },
        reason: {
            error: false,
            errorMsg: '',
            value: ''
        }
    });

    const currentLocation = useLocation();
    const agendaId = currentLocation.pathname.split('/')[2];

    const [agendaDetail, getAgendaDetail, getAgendaLoading, getAgendaError] = useAgendaGet();

    useEffect(() => {
        if (typeof getAgendaDetail == 'function') {
            getAgendaDetail(agendaId);
        }
    }, []);

    if (typeof agendaDetail !== 'object' || typeof getAgendaLoading !== 'boolean' || typeof getAgendaError !== 'string') {
        return null;
    }


    // Function to initialize form data before opening dialog
    const localFormParamsInit = () => {
        let paramObj = {
            error: false,
            errorMsg: '',
            value: ''
        };
        let fc = localFormParams.formContents;
        for (let i = 0; i < fc.length; i++) {
            setLocalFormParams({ ...localFormParams, [fc[i]]: paramObj });
        }
    };

    // Voting button press function
    const floatButtonClick = () => {
        localFormParamsInit();
        setVoteDialogOpen(true);
    };

    // Function to close the voting form dialog
    const voteDialogClose = () => {
        setVoteDialogOpen(false);
    };

    // A function that draws a radio button of choices
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
        for (let i = 0; i < choices.length; i++) {
            let choice = choices[i];
            if (choice !== '') {
                ret.push(<FormControlLabel key={i} value={choice} control={<Radio />} label={choice} />);
            }
        }
        return ret;
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
            case 'reason':
                paramObj = valid.requiredCheck(paramObj);
                if (paramObj.errorMsg !== '') { setLocalFormParams({ ...localFormParams, [name]: paramObj }); break; }
                paramObj = valid.validMaxLength(REASON_CHAR_MAX, paramObj);
                if (paramObj.errorMsg !== '') { setLocalFormParams({ ...localFormParams, [name]: paramObj }); break; }
                paramObj = valid.validNewLine(REASON_NEWLINE_MAX, paramObj);
                if (paramObj.errorMsg !== '') { setLocalFormParams({ ...localFormParams, [name]: paramObj }); break; }
                break;
            case 'choice':
                paramObj = valid.requiredCheck(paramObj);
                if (paramObj.errorMsg !== '') { setLocalFormParams({ ...localFormParams, [name]: paramObj }); break; }
                break;
            default:
                break;
        }
    };

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
        //putVoteCretae(localFormParams);
    };

    // A function that displays a progress bar when reading
    const renderSubmitProgressBar = () => {
        /*if (loading) {
            return <LinearProgress />;
        }*/
        return null;
    };

    // A function that displays a progress bar when reading
    const renderLoadProgressBar = () => {
        if (getAgendaLoading) {
            return <LinearProgress />;
        }
        return null;
    };

    const renderLoadErrorSnackBar = () => {
        if (!getAgendaLoading && getAgendaError !== '') {
            return <CustomSnackBar type={SnackBarTypeVariation.error} message={getAgendaError} vertical="top" horizontal="center" />;
        }
        return null;
    };

    // Function to draw the voting form dialog
    const renderVoteDialog = (
        <div>
            <Dialog open={voteDialogOpen} onClose={voteDialogClose} aria-labelledby="form-dialog-title" fullWidth>
                <DialogTitle id="form-dialog-title">投稿</DialogTitle>
                <DialogContent>
                    <FormLabel component="legend">選択肢</FormLabel>
                    <RadioGroup aria-label="choice" name="choice" value={localFormParams.choice.value} onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChangeFormField(event, 'choice')} style={{ width: '100%' }}>
                        {renderChoiceRadioGroup()}
                    </RadioGroup>
                    <FormHelperText error={localFormParams.choice.error}>{localFormParams.choice.errorMsg}</FormHelperText>
                    <FormControl error={localFormParams.reason.error} style={{ width: '100%' }}>
                        <TextField
                            id="reason"
                            label="理由"
                            multiline
                            rowsMax="10"
                            rows="6"
                            value={localFormParams.reason.value}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChangeFormField(event, 'reason')}
                            className={classes.textField}
                            margin="normal"
                            error={localFormParams.reason.error}
                        />
                        <FormHelperText error={localFormParams.reason.error}>{localFormParams.reason.errorMsg}</FormHelperText>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={voteDialogClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={submitButtonClick} color="primary">
                        Subscribe
                    </Button>
                </DialogActions>
                {renderSubmitProgressBar()}
            </Dialog>
        </div>
    );

    // Function to draw voting button
    const renderFloatButton = (
        <Fab color="primary" aria-label="add" className={classes.fab} onClick={() => floatButtonClick()}>
            <AddIcon />
        </Fab>
    );

    return (
        <React.Fragment>
            {renderFloatButton}
            {renderVoteDialog}
            <Header />
            {renderLoadProgressBar()}
            {renderLoadErrorSnackBar()}
            <Container maxWidth="xl">
                <Button>aa</Button>
            </Container>
        </React.Fragment>
    );
};

export default AgendaDetail;