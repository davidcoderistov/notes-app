import React from 'react';
import { useFormValue } from "../../hooks";
import { useDispatch } from "react-redux";
import { login } from "../../thunks/auth";
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

    const dispatch = useDispatch();

    function handleOnSignInClick(event) {
        event.preventDefault();
        event.stopPropagation();
        dispatch(login({email, password}));
    }

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
                        autoComplete="email"
                    />
                    <NotesTextField
                        value={password}
                        onValueChange={handleOnPasswordChange}
                        label="Password"
                        name="password"
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