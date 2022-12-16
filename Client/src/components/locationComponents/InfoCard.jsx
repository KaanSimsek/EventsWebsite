import { Card, CardContent, Typography, Button } from '@mui/material';
import React, { useState } from 'react';
import moment from 'moment'

const Event = (props) => {
    const [readmore, setReadmore] = useState(false)
    const event = props.event

  return <article className='single-location'>
            <Card position='flex' border='6px' margin='6px' >
                <CardContent>
                    <Typography gutterBottom variant='h4' component="div">
                        {event.title}
                    </Typography>
                    <Typography gutterBottom variant='h5'>
                        {event.presenter}
                    </Typography>
                    <Typography gutterBottom variant='h5'>
                        {moment(event.dateTime).format("YYYY-MM-DD, hh:mm a")}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {readmore?(event.description): ""}
                        <Button onClick={()=>setReadmore(!readmore)}>Read Description</Button>
                    </Typography>
                    <Typography gutterBottom variant='h5'>
                        ${event.price}
                    </Typography>

                </CardContent>
            </Card>

  </article>;
};

export default Event;