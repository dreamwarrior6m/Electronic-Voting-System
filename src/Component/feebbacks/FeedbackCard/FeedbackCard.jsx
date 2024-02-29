import React from 'react';
import './FeedbackCard.css'
import Image from 'next/image';


const FeedbackCard = ({ details }) => {
    return (
        <div className='project-card'>
            <div className="avatar flex justify-center items-center">
                <div className="w-36  border-2  border-gray-200 rounded-full">
                    <Image className='' src={details.feedback.img} alt='img' height={200} width={200}></Image>
                </div>
            </div>
            <div className='text-center mt-2 mb-1 text-gray-400'>{details.feedback.email}</div>
            <p className='mb-3 font-medium text-2xl text-gray-200 text-center'>{details.feedback.name}</p>
            <p className=' text-gray-300'>{details.feedback.message}</p>
        </div>
    );
};

export default FeedbackCard;