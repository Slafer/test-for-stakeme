import { Statistics } from "../components/statistics";
import { RpcBlock } from "../components/rpc-block";
import worldMap from "../imgs/worldMap.jpg";
export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-black px-10">
      <div className="hidden md:block">
        <div className="flex flex-row bg-black">
          <Statistics />
          <img src={worldMap.src} alt="World Map" className="flex w-full" />
        </div>
      </div>
      <div className="block md:hidden">
        <div className="flex flex-col bg-black">
          <img src={worldMap.src} alt="World Map" className="flex w-full" />
          <Statistics />
        </div>
      </div>
      <div className="flex-grow">
        <RpcBlock />
      </div>
    </div>
  );
}
