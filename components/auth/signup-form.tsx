"use client";
import { useState, useEffect, useRef } from "react"; 
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import Dropdown from "@/components/ui/dropdown"; // Import the new component
import {Loader2} from "lucide-react";
import {motion } from "motion/react";
declare global {
  interface Window {
    grecaptcha: {
      render: (id: string, options: { sitekey: string; callback: () => void; theme: string }) => void;
      getResponse: () => string;
      ready: (cb: () => void) => void;
    };
  }
}
export default function SignupForm() {
  const [error, setError] = useState<string | null>(null);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [selectedCity, setSelectedCity] = useState<string>("");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const recaptchaRendered = useRef(false);
  const keralaCities = [
    "Adoor", "Alappuzha", "Aluva", "Angamaly", "Anthoor", "Attingal",  
    "Chalakudy", "Changanassery", "Chavakkad", "Chengannur", "Cherpulassery",  
    "Cherthala", "Chittur-Thathamangalam", "Erattupetta", "Eloor", "Ettumanoor",  
    "Feroke", "Guruvayur", "Haripad", "Idukki", "Irinjalakuda", "Iritty",  
    "Kalpetta", "Kalamassery", "Kanhangad", "Kannur", "Karunagappalli",  
    "Kasaragod", "Kayamkulam", "Kizhakkekallada", "Kodungallur", "Koduvally",  
    "Kollam", "Kondotty", "Koothattukulam", "Kothamangalam", "Kottakkal",  
    "Kottarakara", "Kottayam", "Kozhikode", "Koyilandy", "Kunnamkulam",  
    "Kuthuparamba", "Malappuram", "Mananthavady", "Manjeri", "Mannarkkad",  
    "Maradu", "Mattannur", "Mavelikkara", "Mattanur", "Mukkam",  
    "Muvattupuzha", "Nedumangad", "Neyyattinkara", "Nilambur", "Nileshwaram",  
    "North Paravur", "Ottappalam", "Palakkad", "Pala", "Pandalam",  
    "Panoor", "Parappanangadi", "Paravur", "Pathanamthitta", "Pattambi",  
    "Payyanur", "Payyoli", "Perinthalmanna", "Perumbavoor", "Piravom",  
    "Ponnani", "Punalur", "Ramanattukara", "Shornur", "Sreekandapuram",  
    "Sultan Bathery", "Taliparamba", "Tanur", "Thalassery", "Thiruvalla",  
    "Thiruvananthapuram", "Thodupuzha", "Thrikkakkara", "Thrissur", "Tirur",  
    "Tirurangadi", "Vadakara", "Vaikom", "Valanchery", "Varkala",  
    "Wadakkancherry"
  ];
  useEffect(() => {
    if (typeof window !== "undefined" && window.grecaptcha && !recaptchaRendered.current) {
      window.grecaptcha.ready(() => {
        if (!recaptchaRendered.current) {
          window.grecaptcha.render("recaptcha-container", {
            sitekey: "6LdCHt8qAAAAAMnt_fFhEhg4aZVDPh5njHFhtV1W",
            theme: "dark",
            callback: handleCaptchaSuccess,
          });
          recaptchaRendered.current = true;
          recaptchaRendered.current = true; 
        }
      });
    }
  }, []);

  const handleCaptchaSuccess = () => {
    const captchaResponse = window.grecaptcha.getResponse();
    if (captchaResponse) {
      setCaptchaVerified(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (!captchaVerified) {
      setError("Please complete the CAPTCHA.");
      return;
    }
    if (!selectedCity) {
      setError("Please select a city.");
      return;
    }
    
    try {
      console.log(selectedCity);
      const formData = new FormData(e.currentTarget);
      const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          phoneNumber: formData.get("phone"),
          city: selectedCity,
          email: formData.get("email"),
          password: formData.get("password"),
          captchaResponse: window.grecaptcha.getResponse(),
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.error || "Failed to create account");
      } else {
        router.push("/login");
      }
    } catch (error) {
      console.error("Error adding user:", error);
      setError("Something went wrong. Please try again.");
    }finally{
      setIsLoading(false);
    }
  };

  // const selectCity = (city: string) => {
  //   setSelectedCity(city);
  //   console.log(city);
  //   setDropdownOpen(false);
  // };

  // const toggleDropdown = () => {
  //   setDropdownOpen(!dropdownOpen);
  // };

  return (
    <Card className="bg-gray-800/20 border-gray-700/30 backdrop-blur-sm shadow-lg">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-red-500 text-transparent bg-clip-text">
          Create Account
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <p className="text-red-500">{error}</p>}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-gray-100">Full Name</Label>
            <Input id="name" name="name" placeholder="Enter your full name" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-100">Email</Label>
            <Input id="email" name="email" type="email" placeholder="Enter your email" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-gray-100">Phone Number</Label>
            <Input id="phone" name="phone" type="tel" placeholder="Enter your phone number" required />
          </div>
          
          <Dropdown
            label="City"
            options={keralaCities}
            value={selectedCity}
            onChange={setSelectedCity}
            placeholder="Select a city"
            required={true}
            name="city"
          />
          
          <div className="space-y-2">
            <Label htmlFor="password" className="text-gray-100">Password</Label>
            <Input id="password" name="password" type="password" placeholder="Create a password" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-gray-100">Confirm Password</Label>
            <Input id="confirmPassword" name="confirmPassword" type="password" placeholder="Confirm your password" required />
          </div>

          <div id="recaptcha-container" className="flex justify-center"></div>

          <Button type="submit" className="w-full bg-gradient-to-r from-red-500 to-orange-500 text-white mt-6">
          {
              isLoading ? (
                <motion.div
                className="flex items-center justify-center"
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing up...
              </motion.div>
              ): (
                "Sign up"
              )
            }
          </Button>
        </form>
        <div className="mt-6 text-center text-gray-400">
          Already have an account?{" "}
          <Link href="/login" className="text-red-400 hover:text-red-300">Login</Link>
        </div>
      </CardContent>
    </Card>
  );
}