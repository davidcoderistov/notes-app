import React, { useEffect } from 'react';
import { useFormValue } from "../../hooks";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { resetSignInEmailError, resetSignInPasswordError } from "../../slices/auth";
import { login } from "../../thunks/auth";
import { getAuth } from "../../selectors";
import {
    NotesTextField,
    NotesButton,
    Copyright
} from "../common";
import { NotesLink } from "../router";
import {
    Avatar,
    Container,
    Grid,
    Box,
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
        backgroundColor: theme.palette.primary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

function Login() {
    const classes = useStyles();

    const [email, handleOnEmailChange] = useFormValue('');
    const [password, handleOnPasswordChange] = useFormValue('');

    const auth = useSelector(getAuth);
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();

    const { from } = location.state || { from: { pathname: '/' }};

    function handleOnSignInClick(event) {
        event.preventDefault();
        event.stopPropagation();
        dispatch(login({email, password}));
    }

    useEffect(() => {
        if(auth.signInError.email.isError) {
            dispatch(resetSignInEmailError());
        } else if(auth.signInError.password.isError) {
            dispatch(resetSignInPasswordError());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    useEffect(() => {
        if(auth.isAuthenticated) {
            history.replace(from);
        }
    }, [history, from, auth.isAuthenticated]);

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form} noValidate>
                    <NotesTextField
                        value={email}
                        onValueChange={handleOnEmailChange}
                        label="Email Address"
                        name="email"
                        error={auth.signInError.email.isError}
                        helperText={auth.signInError.email.message}
                        autoComplete="email"
                        autoFocus
                    />
                    <NotesTextField
                        value={password}
                        onValueChange={handleOnPasswordChange}
                        label="Password"
                        name="password"
                        error={auth.signInError.password.isError}
                        helperText={auth.signInError.password.message}
                        autoComplete="current-password"
                        type="password"
                    />
                    <NotesButton
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleOnSignInClick}
                        loading={auth.loading}
                    >
                        Sign In
                    </NotesButton>
                    <Grid container>
                        <Grid item xs>
                            <NotesLink to="/">
                                {"Forgot password?"}
                            </NotesLink>
                        </Grid>
                        <Grid item>
                            <NotesLink to="/signup">
                                {"Don't have an account? Sign Up"}
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

export { Login }
