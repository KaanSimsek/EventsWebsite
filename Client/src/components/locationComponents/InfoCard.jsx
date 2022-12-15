import { Box, Card, CardContent, Typography } from '@mui/material';
import React, { useState } from 'react';

const Event = ({id, dateTime, description, eventID, presenter, price, title}) => {

  return <article>
        <Box width='500px' padding='6px' border='dotted'>
            <Card position='flex' justifyContent="center">
                <CardContent>
                    <Typography gutterBottom variant='h4' component="div">
                        {title}
                    </Typography>
                    <Typography gutterBottom variant='h5'>
                        {dateTime}
                    </Typography>
                    <Typography gutterBottom variant='h5'>
                        {presenter}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {description}
                    </Typography>
                    <Typography gutterBottom variant='h5'>
                        ${price}
                    </Typography>

                </CardContent>

            </Card>
        </Box>


  </article>;
};

export default Event;