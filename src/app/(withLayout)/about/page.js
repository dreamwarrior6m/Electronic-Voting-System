/* eslint-disable react/jsx-no-undef */
import Image from "next/image";
import Link from "next/link";
import { MdHome } from "react-icons/md";
import dreamWarrior from "../../../../public/images/EVS.jpg";

const About = () => {
  return (
    <div className="my-10 max-w-7xl mx-auto md:pt-20 mt-14">
      <div className="text-white">
        <div href="/" className="flex">
          <Link href="/" className="hover:opacity-80">
            <MdHome className="text-2xl" />
          </Link>
          <Link href="/about">
            <span className="px-7">/</span>
            <button className="hover:opacity-75">About Us</button>
          </Link>
        </div>
      </div>

      <div className="max-w-[780px] my-6 bg-[#1F2937] text-white mx-auto py-9 px-7  rounded-lg">
        <h1 className="text-2xl font-semibold">About Us</h1>
        <div className="my-8">
          <p className="opacity-75">
            StrawPoll is a platform where anyone can create their own poll for
            free. We help our users to find out the majority opinion of a group
            as easily and reliably as possible, no matter how large the number
            of participants is.
          </p>
          <br />
          <br />
          <p className="">
            <span className="opacity-75">StrawPoll is operated by</span>
            <strong className="underline px-1">
              Gregor Krambs Internet GmbH & Co. KG.
            </strong>
            <span className="opacity-75">
              We are currently a small team in Hamburg, Germany but reach the
              whole world with our software products. Our mission is to make
              interaction in larger groups as easy as possible. To achieve this,
              we build free voting tools that everyone can easily participate
              in. We value reliability, precision and fast work and dont need
              complicated structures in the company. This allows us to work in a
              very agile way and implement new ideas quickly and easily.
            </span>
          </p>
        </div>
        <div className="my-8">
          <h1 className="text-2xl font-semibold">Our Team</h1>
          <div className="avatar my-8">
            <div className="w-48 rounded-full">
              <Image
                width={100}
                height={100}
                alt="Team CEO"
                src={dreamWarrior}
              />
            </div>
          </div>
          <h1 className="text-xl font-semibold opacity-85">Dream Warrior</h1>
          <h1 className="text-base opacity-50 py-0.5">Founder & CEO</h1>
        </div>
        <div className="my-8">
          <h1 className="text-2xl font-semibold">General Information</h1>
          <div className="my-6">
            <p className="">
              <span className="opacity-75">
                StrawPoll offers its users a free platform where they can create
                different types of polls. The most popular type is Straw Poll,
                which can be used to easily find the majority in a group with
                different opinions. A simple question with a selection of
                predefined answer options can be shared with the group in no
                time. Already in the days of Usenet (since 1979) the name Straw
                Poll was coined as a synonym for this kind of voting. We do our
                best to live up to this and at the same time fight any kind of
                manipulation in voting with different methods
              </span>
              <strong className="underline px-1">(more on this below)</strong>.
              <span className="opacity-75">
                However, we cannot guarantee that we will fully succeed in doing
                so.
              </span>
            </p>
          </div>
        </div>
        <div className="my-8">
          <h1 className="text-2xl font-semibold">
            Online Polls for More Than Ten Years
          </h1>
          <div className="my-6">
            <p className="opacity-75">
              It all began with "strawpollnow.com", a website that started a
              Twitter poll-app in 2007. Ahead of its time, it was still not a
              major breakthrough in online polls. In 2014, we launched
              "strawpoll.de" with a fresh redesign in our home country, Germany.
              It quickly conquered the world with aeasy-to-use and ad-free,
              multi-langual site. Many people even outside of Germany used the
              German-language website, so we thought about strengthening our
              international presence. It took some time to negotiate, but
              finally in early 2017, we acquired "strawpoll.com" to give our
              international, years-old business the web address it deserves.
            </p>
          </div>
        </div>
        <div className="my-8">
          <h1 className="text-2xl font-semibold">User Experience Matters</h1>
          <div className="my-6">
            <p className="opacity-75">
              There is no need to hide the fact that there are already many
              other poll-apps available. In order to be better than the others,
              we at StrawPoll try to provide the best user experience, easy
              navigation and fast sharing possibilities. Just to make sure that
              you and your participants enjoy using our service again and again.
              At every step of the way, from creating and sharing to evaluating
              your poll, we optimize the process from the ground up. If you
              think something could be done even better, we are always open to
              hearing from you!
            </p>
          </div>
        </div>
        <div className="my-8">
          <h1 className="text-2xl font-semibold">
            Reliable Results Are Even More Important
          </h1>
          <div className="my-6">
            <p className="opacity-75">
              The most important part of a successful poll-app is the
              reliability of the results. After we already had bots and scripts
              under control, the next big task was to prevent manipulation by
              multiple votes using changing IP addresses via VPN or proxies. We
              are happy to announce that we implemented a VPN detection system
              in our backend to block (almost) all unauthorized votes. However,
              it is important to make sure that the correct duplication check
              setting is selected when creating a poll.
            </p>
          </div>
        </div>
        <div className="my-8">
          <h1 className="text-2xl font-semibold">Interested in Tech?</h1>
          <div className="my-6">
            <p className="opacity-75">
              Our tech stack is quite simple. We are Perl fans and always
              interested in the latest web standards and technologies.
            </p>
            <ul className="my-6">
              <li>Languages: Perl, JavaScrip</li>
              <li>Web Framework: Mojolicious</li>
              <li>Frontend: Alpine.js, Tailwind CSS</li>
              <li>Database: PostgreSQLp</li>
              <li>Charts: Chart.js</li>
              <li>Date Formatting: Day.js</li>
            </ul>
          </div>
        </div>
        <div className="mt-8">
          <h1 className="text-2xl font-semibold">Interested in Tech?</h1>
          <ul className="my-6">
            <li>The icons we're currently using are coming from heroicons.</li>
            <li>
              The stock photos on various landing pages are licenced via Adobe
              Stock.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
