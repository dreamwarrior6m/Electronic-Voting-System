"use client";
import React from "react";
import { Navigation, Autoplay, Pagination, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <div classNameName="px-4">
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
        modules={[Navigation, Autoplay, Pagination, A11y]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
      >
        <SwiperSlide>
          <div className="relative max-w-7xl mx-auto rounded-b-md shadow-xl overflow-hidden bg-indigo-50 dark:bg-gray-900">
            <div className="dark:hidden dark:sm:block absolute inset-0">
              <Image
                className="h-full w-full object-cover"
                src="https://i.postimg.cc/sxgtjJGh/voting1.jpg"
                alt="banner Image"
                width={500}
                height={500}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-800 to-indigo-700 dark:from-gray-400 dark:to-gray-400 mix-blend-multiply"></div>
            </div>
            <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:pt-28  lg:px-8 lg:pb-28">
              <h1 className="text-center sm:text-left text-5xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl sm:ml-12">
                <span className="block text-white">
                  Democracy is a design
                </span>
                <span className="block text-indigo-300">problem.</span>
              </h1>
              <p className="mt-6 max-w-sm mx-auto sm:ml-12 text-center sm:text-left text-lg sm:text-xl text-indigo-200 sm:max-w-2xl">
                Elections should work for everyone. We are here to make that
                happen. Create a poll - and get answers in no time.
              </p>
              <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-begin">
                <div className="sm:ml-12 grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <Link
                    href="/create"
                    className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-indigo-700 shadow-sm hover:bg-indigo-50 sm:px-8"
                  >
                    Organize voteing
                  </Link>
                  <Link
                    href="/demo"
                    className="flex items-center justify-center rounded-md border border-transparent bg-indigo-500 bg-opacity-60 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-opacity-70 sm:px-8"
                  >
                    View examples
                  </Link>
                </div>
              </div>
              <div className="hidden sm:block ml-12 text-sm mt-4 text-indigo-200">
                Signup Required
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Hero;
