const Facilities = () => {
  return (
    <div className="bg-gray-900  pb-10">
      <div className="mx-auto max-w-md px-4 text-center sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl">
        <h2 className="text-base font-semibold tracking-wider text-indigo-600 dark:text-indigo-400 uppercase">
          Election made easy
        </h2>
        <p className="mt-2 text-3xl font-extrabold text-indigo-200/70 dark:text-white/90 tracking-tight sm:text-4xl">
          Simple election with powerful configuration
        </p>
        <p className="mt-5 max-w-2xl mx-auto text-xl text-indigo-200/70">
          While we make our election as simple and beautiful as possible, we also
          offer powerful customization options to enable on-demand adjustments
          for many different purposes.
        </p>
        <div className="mt-12">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="pt-6">
              <div className="flow-root bg-blue-200/5 border-2  border-gray-100/20 dark:bg-gray-800 rounded-lg px-6 pb-8">
                <div className="-mt-6">
                  <div>
                    <span className="inline-flex items-center justify-center p-3 bg-indigo-500 dark:bg-indigo-400 rounded-md shadow-lg">
                      <svg
                        className="h-6 w-6 text-white/90"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M9 12.7498L11.25 14.9998L15 9.74985M12 2.71411C9.8495 4.75073 6.94563 5.99986 3.75 5.99986C3.69922 5.99986 3.64852 5.99955 3.59789 5.99892C3.2099 7.17903 3 8.43995 3 9.74991C3 15.3414 6.82432 20.0397 12 21.3719C17.1757 20.0397 21 15.3414 21 9.74991C21 8.43995 20.7901 7.17903 20.4021 5.99892C20.3515 5.99955 20.3008 5.99986 20.25 5.99986C17.0544 5.99986 14.1505 4.75073 12 2.71411Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                    </span>
                  </div>
                  <h3 className="mt-8 text-lg font-medium text-white/90 dark:text-white/90 tracking-tight">
                    Fake Detection
                  </h3>
                  <p className="mt-5 text-base text-indigo-200/70">
                    By default, Unverified users are blocked from voting on
                    straw election.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6"
            >
              <div className="flow-root  bg-blue-200/5 border-2  border-gray-100/20 dark:bg-gray-800 rounded-lg px-6 pb-8">
                <div className="-mt-6">
                  <div>
                    <span className="inline-flex items-center justify-center p-3 bg-indigo-500 dark:bg-indigo-400 rounded-md shadow-lg">
                      <svg
                        className="h-6 w-6 text-white/90"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M12 6V12H16.5M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                    </span>
                  </div>
                  <h3 className="mt-8 text-lg font-medium text-white/90 dark:text-white/90 tracking-tight">
                    Deadlines
                  </h3>
                  <p className="mt-5 text-base text-indigo-200/70">
                    Our Election run indefinitely. You can change that by setting a
                    deadline.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <div className="flow-root  bg-blue-200/5 border-2  border-gray-100/20 dark:bg-gray-800 rounded-lg px-6 pb-8">
                <div className="-mt-6">
                  <div>
                    <span className="inline-flex items-center justify-center p-3 bg-indigo-500 dark:bg-indigo-400 rounded-md shadow-lg">
                      <svg
                        className="h-6 w-6 text-white/90"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M15.182 15.182C13.4246 16.9393 10.5754 16.9393 8.81802 15.182M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12ZM9.75 9.75C9.75 10.1642 9.58211 10.5 9.375 10.5C9.16789 10.5 9 10.1642 9 9.75C9 9.33579 9.16789 9 9.375 9C9.58211 9 9.75 9.33579 9.75 9.75ZM9.375 9.75H9.3825V9.765H9.375V9.75ZM15 9.75C15 10.1642 14.8321 10.5 14.625 10.5C14.4179 10.5 14.25 10.1642 14.25 9.75C14.25 9.33579 14.4179 9 14.625 9C14.8321 9 15 9.33579 15 9.75ZM14.625 9.75H14.6325V9.765H14.625V9.75Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                    </span>
                  </div>
                  <h3 className="mt-8 text-lg font-medium text-white/90 dark:text-white/90 tracking-tight">
                    Emoji Support
                  </h3>
                  <p className="mt-5 text-base text-indigo-200/70">
                    We don't support Emojis natively. We working on it.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <div className="flow-root  bg-blue-200/5 border-2  border-gray-100/20 dark:bg-gray-800 rounded-lg px-6 pb-8">
                <div className="-mt-6">
                  <div>
                    <span className="inline-flex items-center justify-center p-3 bg-indigo-500 dark:bg-indigo-400 rounded-md shadow-lg">
                      <svg
                        className="h-6 w-6 text-white/90"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M9.34835 14.6514C7.88388 13.1869 7.88388 10.8126 9.34835 9.34811M14.6517 9.34811C16.1161 10.8126 16.1161 13.1869 14.6517 14.6514M7.22703 16.7727C4.59099 14.1367 4.59099 9.86283 7.22703 7.22679M16.773 7.22679C19.409 9.86283 19.409 14.1367 16.773 16.7727M5.10571 18.8941C1.2981 15.0864 1.2981 8.91308 5.10571 5.10547M18.8943 5.10547C22.7019 8.91308 22.7019 15.0864 18.8943 18.8941M12 11.9998H12.0075V12.0073H12V11.9998ZM12.375 11.9998C12.375 12.2069 12.2071 12.3748 12 12.3748C11.7929 12.3748 11.625 12.2069 11.625 11.9998C11.625 11.7927 11.7929 11.6248 12 11.6248C12.2071 11.6248 12.375 11.7927 12.375 11.9998Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                    </span>
                  </div>
                  <h3 className="mt-8 text-lg font-medium text-white/90 dark:text-white/90 tracking-tight">
                    Live Results
                  </h3>
                  <p className="mt-5 text-base text-indigo-200/70">
                    Evaluate your poll and elections results in a pie chart or bar graph in
                    real-time.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <div className="flow-root  bg-blue-200/5 border-2  border-gray-100/20 dark:bg-gray-800 rounded-lg px-6 pb-8">
                <div className="-mt-6">
                  <div>
                    <span className="inline-flex items-center justify-center p-3 bg-indigo-500 dark:bg-indigo-400 rounded-md shadow-lg">
                      <svg
                        className="h-6 w-6 text-white/90"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M6.75 7.5L9.75 9.75L6.75 12M11.25 12H14.25M5.25 20.25H18.75C19.9926 20.25 21 19.2426 21 18V6C21 4.75736 19.9926 3.75 18.75 3.75H5.25C4.00736 3.75 3 4.75736 3 6V18C3 19.2426 4.00736 20.25 5.25 20.25Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                    </span>
                  </div>
                  <h3 className="mt-8 text-lg font-medium text-white/90 dark:text-white/90 tracking-tight">
                    Poll and Election API
                  </h3>
                  <p className="mt-5 text-base text-indigo-200/70">
                    We provide an easy to use API for poll and election creation and for shear others.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <div className="flow-root  bg-blue-200/5 border-2  border-gray-100/20 dark:bg-gray-800 rounded-lg px-6 pb-8">
                <div className="-mt-6">
                  <div>
                    <span className="inline-flex items-center justify-center p-3 bg-indigo-500 dark:bg-indigo-400 rounded-md shadow-lg">
                      <svg
                        className="h-6 w-6 text-white/90"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M9.75001 3.10408V8.81802C9.75001 9.41476 9.51295 9.98705 9.091 10.409L5.00001 14.5M9.75001 3.10408C9.49886 3.12743 9.24884 3.15465 9.00001 3.18568M9.75001 3.10408C10.4908 3.03521 11.2413 3 12 3C12.7587 3 13.5093 3.03521 14.25 3.10408M14.25 3.10408V8.81802C14.25 9.41476 14.4871 9.98705 14.909 10.409L19.8 15.3M14.25 3.10408C14.5011 3.12743 14.7512 3.15465 15 3.18568M19.8 15.3L18.2299 15.6925C16.1457 16.2136 13.9216 15.9608 12 15C10.0784 14.0392 7.85435 13.7864 5.7701 14.3075L5.00001 14.5M19.8 15.3L21.2022 16.7022C22.4341 17.9341 21.8527 20.0202 20.1354 20.3134C17.4911 20.7649 14.773 21 12 21C9.227 21 6.50891 20.7649 3.86459 20.3134C2.14728 20.0202 1.56591 17.9341 2.7978 16.7022L5.00001 14.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                    </span>
                  </div>
                  <h3 className="mt-8 text-lg font-medium text-white/90 dark:text-white/90 tracking-tight">
                    Active Development
                  </h3>
                  <p className="mt-5 text-base text-indigo-200/70">
                    We are continuously working on additional features and QoL
                    updates.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Facilities;
