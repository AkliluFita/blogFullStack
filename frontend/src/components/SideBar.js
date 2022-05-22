import React from "react";
import { makeStyles } from "@mui/styles";
import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
// import { Container } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  sidebar: {
    flex: "20%",
    // border: "1px solid beige",
    background: "#E2ACA7",
    display: "flex",
    flexDirection: "column",
    padding: "5px",
    textAlign: "center",
    // [theme.breakpoints.down("sm")]: {
    //   display: "none",
    // },
  },
  card: {
    background: "#dadaa4",
  },
}));
export default function SideBar() {
  const PF = process.env.REACT_APP_PUBLIC_URL;
  const classes = useStyles();
  return (
    <React.Fragment>
      <div className={classes.sidebar}>
        <Typography variant="h4">About Me</Typography>
        <Card sx={{ maxWidth: 345 }} className={classes.card}>
          <CardMedia
            component="img"
            height="230"
            image={`https://res.cloudinary.com/dc9ezs55x/image/upload/v1649592160/myP1_sbywvg.jpg`}
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              REACT DEVELOPER
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Master Computer Engineer. Being a web designer and developer is my
              passionate
            </Typography>
          </CardContent>
        </Card>
      </div>
    </React.Fragment>
  );
}
