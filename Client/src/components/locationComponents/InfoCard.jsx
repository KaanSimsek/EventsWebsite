import { Paper, Box, Card, CardContent, Typography } from '@mui/material';
import React, { useState } from 'react';
import moment from 'moment'

const Event = (props) => {
    const event = props.event
    return(
        <Card>
            <CardContent>
                <Typography gutterBottom variant='h4' component="div">
                    {event.title}
                </Typography>
                <Typography gutterBottom variant='h5'>
                    {moment(event.dateTime).format("YYYY-MMM-DD, hh:mm a")}
                    </Typography>
                <Typography gutterBottom variant='h5'>
                        {event.presenter}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {event.description}
                    </Typography>
                    <Typography gutterBottom variant='h5'>
                        ${event.price}
                    </Typography>

                </CardContent>

        </Card>
)
};

export default Event;