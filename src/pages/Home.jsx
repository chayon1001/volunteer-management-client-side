import React from 'react';
import Banner from '../components/Banner/Banner';
import VolunteerNeedsNow from '../components/volunteerNeedsNow/VolunteerNeedsNow';
import BlogSection from './blogSection/BlogSection';

const Home = () => {
    return (
        <div>
           <Banner></Banner>
           <VolunteerNeedsNow></VolunteerNeedsNow>
           <BlogSection></BlogSection>
        </div>
    );
};

export default Home;