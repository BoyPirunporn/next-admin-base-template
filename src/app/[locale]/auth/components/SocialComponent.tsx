import React from 'react';

const SocialComponent = () => {
    return (
        <div className="flex justify-center w-full flex-col">
            <span className='text-center'>or</span>
            <div className="social-icons flex justify-center">
                <a className="group p-2 border hover:border-rose-400 transition-all duration-200">
                    <i className="fa-brands fa-google-plus-g text-gray-500 group-hover:text-rose-400 transition-all duration-200"></i>
                </a>

                <a className="group p-2 border hover:border-blue-400 transition-all duration-200">
                    <i className="fa-brands fa-facebook-f text-gray-500 group-hover:text-blue-400 transition-all duration-200"></i>
                </a>

                <a className="group p-2 border hover:border-gray-600 transition-all duration-200">
                    <i className="fa-brands fa-github text-gray-500 group-hover:text-gray-600 transition-all duration-200"></i>
                </a>

                <a className="group p-2 border hover:border-sky-600 transition-all duration-200">
                    <i className="fa-brands fa-linkedin-in text-gray-500 group-hover:text-sky-600 transition-all duration-200"></i>
                </a>
            </div>
        </div>
    );
};

export default SocialComponent;