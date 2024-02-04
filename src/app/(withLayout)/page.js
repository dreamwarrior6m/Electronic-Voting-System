import Toggle from "@/Component/Bot/toggle/Toggle";
import Facilities from "@/Component/HomeComponents/Facilities/Facilities";
import Features from "@/Component/HomeComponents/Features/Features";
import Hero from "@/Component/HomeComponents/Hero/Hero";
import Statistics from "@/Component/HomeComponents/Statistics/Statistics";


export default function Home() {
  return (
    <div className="">
      <div className="fixed bottom-0 right-0 pr-5 pb-5 z-10 max-w-7xl">
        <Toggle />
      </div>
      <div>
        <Hero />
        <Statistics />
        <Features />
        <Facilities />
      </div>
    </div>
  );
}
