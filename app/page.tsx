import SelectionTab from "@/components/custom/tabs";
import Hero from "@/components/custom/hero";
import { ChatBot } from "@/components/custom/chat-bot";
export default function BloodDonorSystem() {
  return (
        <>
         <div className="md:h-[140vh] lg:h-[160vh] h-[250vh] sm:h-[230vh] bg-gradient-to-br from-gray-950 via-gray-900 to-red-950  text-gray-100">
        <Hero/>
        <SelectionTab />
        <ChatBot />
        </div>
    </>
  );
}