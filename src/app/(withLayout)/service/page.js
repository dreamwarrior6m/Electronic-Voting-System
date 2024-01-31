import Image from "next/image";

const Service = () => {
  const serviceList = [
    "Open ballot",
    "Secret ballot",
    "Custom vote weights (according to shares)",
    "Majority types",
    "Privileged votes",
    "Quorum verification",
    "Voting reports",
    "Online voting results signed with a qualified company seal",
    "Voting reports for participants",
    "Verification of participants",
    "Regulations and documents approval",
    "Sending documents",
  ];
  return (
    <div className="pt-10 text-white max-w-7xl mx-auto">
      <div className=" text-center">
        <h2 className="text-5xl py-2 font-bold">Services</h2>
        <h3 className="text-xl  font-semibold pb-12">
          Everything you need for online voting
        </h3>
      </div>

      <div className="bg-neutral-800 rounded-lg p-4">
        <h2 className="font-semibold">HOW WE CAN HELP</h2>
        <h2 className="text-2xl font-semibold pb-2">
          Advanced features and a modern distribution model
        </h2>
        <p className="">
          The DVS system is available in the service model (SaaS). You
          don&apos;t need to install any software or invest in IT
          infrastructure. Our service is accessible through any web browser, on
          any operating system (Windows, macOS, Android, iOS). Due to the
          adaptive pricing model, the cost of accessing the system depends on
          the degree and extent of usage.
        </p>
      </div>

      <div className="md:flex items-center justify-center px-4 space-y-8 md:space-y-0 pt-16">
        <div className="flex-1 ">
          <div className="flex items-center justify-center">
          <Image className=""
            src="https://i.ibb.co/287vdd2/pngegg.png"
            alt="valot"
            width={400}
            height={400}
          />
          </div>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-semibold">Online voting - services</h1>
          <ul className="pt-6">
            {serviceList.map((item, ind) => (
              <li key={ind} className="">
                {ind + 1}. {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

     
     <div className="md:flex text-center items-center justify-center md:gap-6 space-y-12 md:space-y-0 pt-24 pb-10 px-4">
     <div className="">
        <div className="items-center flex flex-col">
          <Image className=" "
            src="https://i.ibb.co/YfX3dbW/Picsart-24-01-18-09-37-43-780.png"
            alt="alt"
            width={163}
            height={141}
          />
          <div className="">
            <h2 className="text-2xl font-bold py-4">Setup Excellence</h2>
            <p className="">We guide you and answer questions about ballot design, scheduling and notice details to meet your bylaws, help you reach quorum and ensure your voters rave about the experience.</p>
          </div>
        </div>
      </div>
      <div className="">

        <div className="items-center flex flex-col">
          <Image
            src="https://i.ibb.co/X3f3J7b/Picsart-24-01-18-09-38-11-007.png"
            alt="alt"
            width={163}
            height={141}
          />
          <div className="">
            <h2 className="text-2xl font-bold py-4">Broad Experience</h2>
            <p className="">We advise you on voting best practices so that your vote complies with standards for your location, your industry and the specifics of the election or meeting you are running.</p>
          </div>
        </div>
      </div>

      
        <div className="items-center flex flex-col">
          <Image
            src="https://i.ibb.co/nfhqwxk/Picsart-24-01-18-09-38-33-127.png"
            alt="alt"
            width={163}
            height={141}
          />
          <div className="">
            <h2 className="text-2xl font-bold py-4">Expert Review</h2>
            <p className="">You only get one chance to have a great vote the first time, so after you complete setup and testing, an Expert reviews your settings so you are prepared to host a perfect, flawless vote.</p>
          </div>
        </div>
      </div>
      

    </div>
  );
};

export default Service;
