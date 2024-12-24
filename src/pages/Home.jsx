import React from 'react';
import Banner from '../components/Banner/Banner';
import VolunteerNeedsNow from '../components/volunteerNeedsNow/VolunteerNeedsNow';
import BlogSection from './blogSection/BlogSection';
import ContactUs from './contacUs/ContactUs';

const Home = () => {
    return (
        <div>
           <Banner></Banner>
           <VolunteerNeedsNow></VolunteerNeedsNow>
           <BlogSection></BlogSection>
           <ContactUs></ContactUs>
        </div>
    );
};

export default Home;