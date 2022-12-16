import { Card, CardContent, Typography, Paper, Grid, Divider, Avatar } from '@mui/material';
import React, { useState } from 'react';

const Comment = (props) => {
    const comment = props.comment

    return(
        <article>
            {/* <div style={{ padding: 14, display: "flex", justifyContent: "center" }}>

                <Paper style={{ padding: "20px 10px 20px 100px", width: "450px"}}>
                    <Grid container wrap="nowrap" spacing={2} xs={10}>
                    <Grid item >
                    <Avatar alt="Remy Sharp"  />
                    </Grid>
                    <Grid justifyContent="center" item xs={12} zeroMinWidth >
                        <h4 style={{ margin: 0, textAlign: "left" }}>{comment.username}</h4>
                            <h6 style={{ textAlign: "left" }}>
                                {comment.comment}.{" "}
                            </h6>
                    </Grid>
                    </Grid>
                </Paper>
            </div> */}
            <Card position='flex' border='6px' margin='6px' >
                <CardContent>
                    <Typography gutterBottom variant='h4' component="div">
                        {comment.username}
                    </Typography>
                    <Typography gutterBottom variant='h5'>
                        {comment.comment}
                    </Typography>
                </CardContent>
            </Card>
        </article>
    )
};

export default Comment;