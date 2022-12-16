import { Card, CardContent, Typography, Button } from '@mui/material';
import React, { useState } from 'react';
import moment from 'moment'

const Event = ({id, dateTime, description, presenter, price, title}) => {
    const [readmore, setReadmore] = useState(false)

  return <article className='single-location'>
            <Card position='flex' border='6px' margin='6px' >
                <CardContent>
                    <Typography gutterBottom variant='h4' component="div">
                        {title}
                    </Typography>
                <Typography gutterBottom variant='h5'>
                        {presenter}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {readmore?description: ""}
                        <Button onClick={()=>setReadmore(!readmore)}>Read Description</Button>
                    </Typography>
                    <Typography gutterBottom variant='h5'>
                        ${price}
                    </Typography>

                </CardContent>
            </Card>

  </article>;
};

export default Event;