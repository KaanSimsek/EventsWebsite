import React from 'react';
import Event from './InfoCard';

const EventInfo = ({events}) => {
    
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
    </section>
  );
};

export default EventInfo;