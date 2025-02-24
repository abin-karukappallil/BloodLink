"use client";
import { useState, useEffect, useRef } from "react"; 
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

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
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const recaptchaRendered = useRef(false); 

  // List of major cities in Kerala
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

  // Custom styles for all form inputs
  const inputStyles = "h-10 w-full rounded-md border border-gray-700 bg-gray-800/20 px-3 py-2 text-sm text-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2";

  useEffect(() => {
    if (typeof window !== "undefined" && window.grecaptcha && !recaptchaRendered.current) {
      window.grecaptcha.ready(() => {
        if (!recaptchaRendered.current) {
          window.grecaptcha.render("recaptcha-container", {
            sitekey: "6LdCHt8qAAAAAMnt_fFhEhg4aZVDPh5njHFhtV1W",
            theme: "dark",
            callback: handleCaptchaSuccess,
          });
          recaptchaRendered.current = true; // Prevent multiple renders
        }
      });
    }

    // Close dropdown when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCaptchaSuccess = () => {
    const captchaResponse = window.grecaptcha.getResponse();
    if (captchaResponse) {
      setCaptchaVerified(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
      const formData = new FormData(e.currentTarget);
      const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          phoneNumber: formData.get("phone"),
          address: formData.get("streetAddress") + ", " + selectedCity,
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
    }
  };

  const selectCity = (city: string) => {
    setSelectedCity(city);
    setDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

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
            <input 
              id="name" 
              name="name" 
              className={inputStyles}
              placeholder="Enter your full name" 
              required 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-100">Email</Label>
            <input 
              id="email" 
              name="email" 
              type="email" 
              className={inputStyles}
              placeholder="Enter your email" 
              required 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-gray-100">Phone Number</Label>
            <input 
              id="phone" 
              name="phone" 
              type="tel" 
              className={inputStyles}
              placeholder="Enter your phone number" 
              required 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="streetAddress" className="text-gray-100">Street Address</Label>
            <input 
              id="streetAddress" 
              name="streetAddress" 
              className={inputStyles}
              placeholder="Enter your street address" 
              required 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="city" className="text-gray-100">City</Label>
            <div className="relative" ref={dropdownRef}>
              <div
                onClick={toggleDropdown}
                className={`flex ${inputStyles} cursor-pointer`}
              >
                {selectedCity || "Select a city"}
                <div className="ml-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`h-4 w-4 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </div>
              </div>
              
              {dropdownOpen && (
                <div className="absolute z-10 mt-1 w-full rounded-md border border-gray-700 bg-gray-800/90 backdrop-blur-sm shadow-lg max-h-60 overflow-auto">
                  <div className="py-1">
                    {keralaCities.map((city) => (
                      <div
                        key={city}
                        className="px-3 py-2 text-sm text-gray-100 hover:bg-gray-700/50 cursor-pointer"
                        onClick={() => selectCity(city)}
                      >
                        {city}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <input
                type="hidden"
                name="city"
                value={selectedCity}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-gray-100">Password</Label>
            <input 
              id="password" 
              name="password" 
              type="password" 
              className={inputStyles}
              placeholder="Create a password" 
              required 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-gray-100">Confirm Password</Label>
            <input 
              id="confirmPassword" 
              name="confirmPassword" 
              type="password" 
              className={inputStyles}
              placeholder="Confirm your password" 
              required 
            />
          </div>

          <div id="recaptcha-container" className="flex justify-center"></div>

          <Button type="submit" className="w-full bg-gradient-to-r from-red-500 to-orange-500 text-white mt-6">
            Sign Up
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