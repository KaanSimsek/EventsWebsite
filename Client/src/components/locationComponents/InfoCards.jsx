import React from 'react';
import Event from './InfoCard';

const EventInfo = ({events, comment}) => {
    
  return (
    <section>
        <div className='title'>
            <h1>Event Information</h1>
            <div className='underline'></div>
        </div>
        <div>
            {events.map((event) => {
                return <Event key={event._id} {...event} />
            })}
        </div>
        <div className='title'>
            <h1>Comments</h1>
            <div className='underline'></div>
        <div>
            {comment.map(
                <h3>c.username</h3>
            )}
        </div>

        </div>
    </section>
  );
};

export default EventInfo;