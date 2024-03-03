import React from "react";

const Statistics = () => {
  return (
    <div className="max-w-7xl mx-auto pt-12 pb-12 px-4 sm:px-6 lg:px-8">
      <p className="text-center text-sm font-semibold uppercase text-indigo-200/70 tracking-wide">
        Trusted by over 1,500,000 users worldwide
      </p>
      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 h-1/2"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <dl className="rounded-lg sm:grid sm:grid-cols-3 sm:divide-x divide-gray-300 dark:divide-gray-700">
                <div className="flex flex-col p-5 text-center">
                  <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">
                    Users
                  </dt>
                  <dd className="order-1 text-4xl font-extrabold text-indigo-200/70 dark:text-indigo-200/70">
                    1.5M+
                  </dd>
                </div>
                <div className="flex flex-col p-5 text-center">
                  <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">
                    Polls
                  </dt>
                  <dd className="order-1 text-4xl font-extrabold text-indigo-200/70 dark:text-indigo-200/70">
                    11M+
                  </dd>
                </div>
                <div className="flex flex-col p-5 text-center">
                  <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">
                    Votes
                  </dt>
                  <dd className="order-1 text-4xl font-extrabold text-indigo-200/70 dark:text-indigo-200/70">
                    260M+
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
