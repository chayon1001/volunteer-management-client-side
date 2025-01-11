import React from 'react';
import Banner from '../components/Banner/Banner';
import VolunteerNeedsNow from '../components/volunteerNeedsNow/VolunteerNeedsNow';
import BlogSection from './blogSection/BlogSection';
import ContactUs from './contacUs/ContactUs';
import { Helmet } from 'react-helmet-async';
import ManageMyPosts from '../components/manageMyPosts/ManageMyPosts';

const Home = () => {
    return (
        <div>
            <div>
                <Helmet>
                    <title>Home - Volunteer-management</title>
                </Helmet>
            </div>

            <Banner></Banner>
            <VolunteerNeedsNow></VolunteerNeedsNow>
            <BlogSection></BlogSection>
            <ManageMyPosts></ManageMyPosts>
            <ContactUs></ContactUs>
        </div>
    );
};

export default Home;