import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
// import { Context } from "../contex/context";
// import { loginCall } from "../apiCall";
import { useNavigate } from "react-router-dom";
import { Alert } from "@mui/material";
// import { Link } from "react-router-dom";
import http from "../httpCommon";
import jwt_decode from "jwt-decode";

const theme = createTheme();

export default function SignUp() {
  // initiate methods
  const navigate = useNavigate();

  // login initial form item
  const initialFormData = Object.freeze({
    email: "",
    password: "",
  });

  const [formData, setFormData] = React.useState(initialFormData);
  // const { user, error, isFetching, dispatch } = React.useContext(Context);
  const [isError, setIsError] = React.useState(false);

  // handle change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  //handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await http.post("token/obtain/", formData);
      try {
        localStorage.setItem("access_token", res.data.access);
        localStorage.setItem("refresh_token", res.data.refresh);
        http.defaults.headers["Authorization"] =
          "JWT " + localStorage.getItem("access_token");

        console.log(res.data);
        console.log(jwt_decode(res.data.access));
      } catch (error) {
        console.log(error);
      }

      setTimeout(() => {
        navigate("/"); //go to the homepage
        window.location.reload();
      }, 3000);
    } catch (err) {
      console.log(err);
      setIsError(true);
      setTimeout(() => {
        setIsError(false);
      }, 3000);
    }
  };
  //////////////////////

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {isError && (
          <Alert severity="error">
            something is error, user correct credential!
          </Alert>
        )}
      </Container>
    </ThemeProvider>
  );
}
