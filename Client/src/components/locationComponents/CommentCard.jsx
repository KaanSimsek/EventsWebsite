import { Card, CardContent, Typography } from '@mui/material';
import React, { useState } from 'react';

const Comment = (props) => {
    const comment = props.comment

    return(
        <article>
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