import React from 'react';

export default function Index() {
    return (
        <div className="bg-gradient-to-r from-lime-100 to-cyan-100">
            <div className="isolate">
                <div className="px-6 pt-6 lg:px-8">
                    <nav className="flex items-center justify-between" aria-label="Global">
                        <div className="flex lg:flex-1">
                            <a href="/#" className="-m-1.5 p-1.5">
                                <span className="text-sm font-semibold leading-6 text-gray-900">Health Hub</span>
                            </a>
                        </div>
                        <div className="flex lg:hidden">
                            <button type="button" className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700">
                                <span className="sr-only">Open main menu</span>
                                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                </svg>
                            </button>
                        </div>
                        <div className="hidden lg:flex lg:gap-x-12">
                            <a href="/#" className="text-sm font-semibold leading-6 text-gray-900">Home</a>

                            <a href="/#" className="text-sm font-semibold leading-6 text-gray-900">About Us</a>

                            <a href="/#" className="text-sm font-semibold leading-6 text-gray-900">Company</a>
                        </div>
                        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                            <a href="/doctor/login" className="text-sm font-semibold leading-6 text-gray-900">
                                Doctor Login
                                <span aria-hidden="true">
                                    &rarr;
                                </span>
                            </a>
                        </div>
                    </nav>
                </div>
                <main>
                    <div className="relative px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
                            <div className="hidden sm:mb-8 sm:flex sm:justify-center">
                            </div>
                            <div className="text-center">
                                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Welcome to the Health Hub</h1>
                                <p className="mt-6 text-lg leading-8 text-gray-600">
                                    A self service platform that bridges the gap between doctors and patients predominantly in remote region
                                </p>
                                <div className="mt-10 flex items-center justify-center gap-x-6">
                                    <a href="/patient/signup"
                                        className="rounded-md bg-sky-400 px-3.5 py-1.5 text-base font-semibold leading-7 text-white shadow-sm hover:bg-sky-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400">
                                        Get started
                                    </a>
                                    <a href="/#" className="text-base font-semibold leading-7 text-gray-900">Learn more <span aria-hidden="true">→</span></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            <hr></hr>

            <div className="py-16" id='about-us-section'>
                <div className="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
                    <div className="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
                        <div className="md:5/12 lg:w-5/12">
                            <img 
                                src="https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                                alt="Black woman smiling"
                                className='rounded-lg'
                            />
                        </div>
                        <div className="md:7/12 lg:w-6/12">
                            <h2 className="text-2xl text-gray-900 font-bold md:text-4xl">
                                About Us
                            </h2>
                            <p className="mt-4 text-gray-600">
                                Welcome to our online health service! We are dedicated to providing the highest quality healthcare to our patients through the convenience of the internet.
                                Whether you're looking for a primary care physician, a specialist, or just need some quick advice, our online health service has you covered. We offer a wide range of services, including virtual consultations, online prescriptions, and more.
                            </p>

                            <p className="mt-4 text-gray-600">
                                We understand that navigating the healthcare system can be overwhelming and confusing. That's why we've made it our mission to make healthcare accessible and convenient for everyone. With our online health service, you can easily schedule appointments,
                                access your medical records, and communicate with your healthcare provider, all from the comfort of your own home.
                                We are committed to protecting your personal information and providing the highest level of privacy and security. Our platform is fully compliant with all relevant laws and regulations.
                            </p>

                            <p className="mt-4 text-gray-600 pb-8">
                                Thank you for choosing our online health service. We look forward to providing you with the care and support you need to stay healthy and happy.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <hr></hr>

            <footer className="footer p-10 text-base-content">
                <div>
                    <svg width="50" height="50" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd" className="fill-current"><path d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path></svg>
                    <p>Ashesi University.<br />Providing reliable tech since 2022</p>
                </div>
                <div>
                    <span className="footer-title">Services</span>
                    <p>Branding</p>
                    <p>Design</p>
                    <p>Marketing</p>
                    <p>Advertisement</p>
                </div>
                <div>
                    <span className="footer-title">Company</span>
                    <a href='/#' className="link link-hover">About us</a>
                    <a href='/#' className="link link-hover">Contact</a>
                    <a href='/doctor/signup' className="link link-hover">Doctor Sign Up</a>
                </div>
                <div>
                    <span className="footer-title">Legal</span>
                    <a href='/#' className="link link-hover">Terms of use</a>
                    <a href='/#' className="link link-hover">Privacy policy</a>
                    <a href='/#' className="link link-hover">Cookie policy</a>
                </div>
            </footer>
        </div>
    )
}
