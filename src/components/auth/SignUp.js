import React from 'react';
import { useFormValue } from "../../hooks";
import {
    NotesTextField,
    NotesButton,
    Copyright
} from "../common";
import {
    Avatar,
    Grid,
    Link,
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

    function handleOnSignUpClick(event) {
        event.preventDefault();
        event.stopPropagation();
    }

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
                        onClick={handleOnSignUpClick}
                    >
                        Sign Up
                    </NotesButton>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                {"Already have an account? Sign in"}
                            </Link>
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
