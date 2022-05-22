import React from "react";

import { makeStyles } from "@mui/styles";
import { Typography } from "@mui/material";
import { Context } from "../contex/context";

const useStyles = makeStyles((theme) => ({
  container: {
    height: "400px",
    backgroundImage: `url(${"images/comp4.jpg"})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    position: "relative",
  },
  blogTitle: {
    marginTop: 70,
    background: "black",
    opacity: 0.5,
    padding: "10px",
    borderRadius: "5px",
  },
  TitleText: {
    color: "black",
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: "999",
    background: "white",
    padding: "5px",
  },
}));

export default function Header() {
  const classes = useStyles();
  const { queryTitle } = React.useContext(Context);

  return (
    <React.Fragment>
      <div className={classes.container} maxWidth="xl">
        <Typography variant="h4" className={classes.TitleText}>
          {queryTitle}
        </Typography>
        <Typography variant="h1" component="h2" className={classes.blogTitle}>
          Blog React App
        </Typography>
      </div>
    </React.Fragment>
  );
}
