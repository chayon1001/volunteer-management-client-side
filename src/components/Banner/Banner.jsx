import React from 'react';

import firstImage from '../../assets/first.jpg';
import secondImage from '../../assets/second.jpg';
import thirdImage from '../../assets/third.jpg';
import fourthImage from '../../assets/fourth.jpg';

const Banner = () => {
    const slides = [
        {
            id: 1,
            image: thirdImage,
            heading: 'Empower Communities',
            description: 'Join us in making a difference by contributing your time and skills to help those in need.',
        },
        {
            id: 2,
            image: secondImage,
            heading: 'Be a Change Maker',
            description: 'Your efforts can bring hope and positive change to countless lives.',
        },
        {
            id: 3,
            image: firstImage,
            heading: 'Volunteer with Purpose',
            description: 'Collaborate with others to create meaningful impact in our community.',
        },
        {
            id: 4,
            image: fourthImage,
            heading: 'Shape the Future',
            description: 'Together, we can create a better tomorrow for everyone.',
        },
    ];

    return (
        <div className="carousel w-full h-[450px] md:h-[500px] relative">
            {slides.map((slide, index) => (
                <div
                    key={slide.id}
                    id={`slide${slide.id}`}
                    className="carousel-item relative w-full" >
                    <img
                        src={slide.image}
                        alt={`Slide ${slide.id}`}
                        className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-center text-white px-4">
                        <h2 className="text-xl md:text-3xl lg:text-4xl font-bold mb-2">
                            {slide.heading}
                        </h2>
                        <p className="text-sm md:text-lg lg:text-xl max-w-2xl">
                            {slide.description}
                        </p>
                    </div>
                    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                        <a
                            href={`#slide${index === 0 ? slides.length : index}`}
                            className="btn btn-circle"
                        >
                            ❮
                        </a>
                        <a
                            href={`#slide${(index + 1) % slides.length + 1}`}
                            className="btn btn-circle"
                        >
                            ❯
                        </a>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Banner;
