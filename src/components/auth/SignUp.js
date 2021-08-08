import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useFormValue } from "../../hooks";
import { signup } from "../../thunks/auth";
import { resetSignUpEmailError, resetSignUpPasswordError } from "../../slices/auth";
import {
    NotesTextField,
    NotesButton,
    Copyright
} from "../common";
import { NotesLink } from "../router";
import { getAuth } from "../../selectors";
import {
    Avatar,
    Grid,
    Box,
    Container,
    Typography,
    CssBaseline
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

function SignUp() {
    const classes = useStyles();

    const [email, handleOnEmailChange] = useFormValue('');
    const [password, handleOnPasswordChange] = useFormValue('');

    const auth = useSelector(getAuth);

    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        if(auth.signUpError.email.isError) {
            dispatch(resetSignUpEmailError());
        } else if(auth.signUpError.password.isError) {
            dispatch(resetSignUpPasswordError());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    const clearState = () => {
        handleOnEmailChange('');
        handleOnPasswordChange('');
    };

    const handleOnSignUpClick = event => {
        event.preventDefault();
        event.stopPropagation();
        dispatch(signup({
            email,
            password,
            onSuccess: handleOnSignUpSuccess,
        }));
    };

    const handleOnSignUpSuccess = () => {
        clearState();
        history.push('/login');
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <form className={classes.form} noValidate>
                    <NotesTextField
                        value={email}
                        onValueChange={handleOnEmailChange}
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        error={auth.signUpError.email.isError}
                        helperText={auth.signUpError.email.message}
                    />
                    <NotesTextField
                        value={password}
                        onValueChange={handleOnPasswordChange}
                        label="Password"
                        name="password"
                        autoComplete="current-password"
                        type="password"
                        error={auth.signUpError.password.isError}
                        helperText={auth.signUpError.password.message}
                    />
                    <NotesButton
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        loading={auth.loading}
                        onClick={handleOnSignUpClick}
                    >
                        Sign Up
                    </NotesButton>
                    <Grid container>
                        <Grid item xs>
                            <NotesLink to="/login">
                                {"Already have an account? Sign in"}
                            </NotesLink>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
}

export { SignUp }
