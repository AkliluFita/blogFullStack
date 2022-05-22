import React, { useEffect, useState } from "react";
// import { posts } from "../dummyData";
import { makeStyles } from "@mui/styles";
import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
// import styled from "@emotion/styled";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import http from "../httpCommon";
import * as timeago from "timeago.js";
import axios from "axios";
import { Context } from "../contex/context";
import { fetchPost } from "../contex/action";

// style function
const useStyles = makeStyles((theme) => ({
  posts: {
    flex: "85%",
    padding: "25px",
    border: "solid 1px #E2ACA7",
    overflow: "scroll",
    height: "700px",
  },

  carItem: {
    backgroundColor: "#F5E0EF",
    padding: "14px",
    textAlign: "center",
    color: "black",
    borderRadius: "10px",
  },
  image: {
    objectFit: "cover",

    height: "70%",
    width: "100%",
  },

  cardContent: {
    position: "relative",
    textDecoration: "none",
  },
  date: {
    position: "absolute",
    marginTop: "10px",
  },
}));

// main post function
export default function Posts() {
  const PF = process.env.REACT_APP_PUBLIC_URL;
  const { queryTitle, posts, dispatch } = React.useContext(Context);
  const classes = useStyles();
  // const [posts, setPosts] = useState([]);

  // fetch posts
  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await http.get("posts/");
        console.log(res.data);
        dispatch(fetchPost(res.data));
      } catch (error) {
        console.log(error);
      }
    };

    getPosts();
  }, [dispatch]);

  // search method(filter)
  function search(items) {
    return items.filter((item) => item.title.includes(queryTitle));
  }

  return (
    <React.Fragment>
      <div className={classes.posts}>
        <Box sx={{ width: "100%" }}>
          <Grid
            container
            rowSpacing={2}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            {search(posts).map((post) => (
              <Grid item key={post.id}>
                <div className={classes.carItem}>
                  <Link to={`/post/${post.id}`}>
                    <Card sx={{ maxWidth: 250 }}>
                      <CardMedia
                        component="img"
                        height="150"
                        image={post.image}
                        className={
                          classes.image ||
                          "https://res.cloudinary.com/dc9ezs55x/image/upload/v1649592604/noCover_tquy0g.png"
                        }
                      />
                      <CardContent className={classes.cardContent}>
                        <Typography gutterBottom variant="h5" component="div">
                          {post.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {post.content}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          className={classes.date}
                        >
                          {timeago.format(post.published)}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Link>
                </div>
              </Grid>
            ))}
          </Grid>
        </Box>
      </div>
      ;
    </React.Fragment>
  );
}
