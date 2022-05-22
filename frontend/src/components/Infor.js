import { Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { Context } from "../contex/context";

// style function
const useStyles = makeStyles((theme) => ({
  infoContainer: {
    display: "flex",
    background: "#E2ACA7",
    padding: "10px",
  },
  infor: {
    // background: "#e9e9db",
  },
  title: {
    background: "white",
    marginLeft: "15px",
  },
}));

export default function Infor() {
  const classes = useStyles();
  const { queryTitle, posts } = React.useContext(Context);
  return (
    <div className={classes.infoContainer}>
      <Typography
        gutterBottom
        variant="h5"
        component="div"
        className={classes.infor}
      >
        total posts: {posts.length}
      </Typography>
      <Typography
        gutterBottom
        variant="h5"
        component="div"
        className={classes.title}
      >
        query title: {queryTitle}
      </Typography>
    </div>
  );
}
