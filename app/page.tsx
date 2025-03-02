import SelectionTab from "@/components/custom/tabs";
import Hero from "@/components/custom/hero";
export default function BloodDonorSystem() {
  return (
        <>
         <div className="md:h-[100vh] lg:h-[120vh] h-[140vh] bg-gradient-to-br from-gray-950 via-gray-900 to-red-950  text-gray-100">
        <Hero/>
        <SelectionTab />
        </div>
    </>
  );
}