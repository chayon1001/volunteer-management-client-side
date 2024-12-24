import React from 'react';
import Banner from '../components/Banner/Banner';
import VolunteerNeedsNow from '../components/volunteerNeedsNow/VolunteerNeedsNow';

const Home = () => {
    return (
        <div>
           <Banner></Banner>
           <VolunteerNeedsNow></VolunteerNeedsNow>
        </div>
    );
};

export default Home;