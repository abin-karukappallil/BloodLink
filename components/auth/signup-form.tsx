"use client";
import { useState, useEffect, useRef } from "react"; 
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Link from "next/link";
import Dropdown from "@/components/ui/dropdown"; // Import the new component
import { Loader2, User, Mail, Phone, MapPin, Lock, KeyRound } from "lucide-react";
import { motion } from "framer-motion";

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
  const formRef = useRef<HTMLFormElement>(null);
  
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
      setIsLoading(false);
      return;
    }
    if (!selectedCity) {
      setError("Please select a city.");
      setIsLoading(false);
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
    } finally {
      setIsLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-gray-800/30 border-gray-700/30 backdrop-blur-lg shadow-xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-lg z-0"></div>
        
        <CardHeader className="relative z-10 text-center pb-2">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-red-500 text-transparent bg-clip-text">
              Create Account
            </CardTitle>
            <CardDescription className="text-gray-400 mt-2">
              Join our community today
            </CardDescription>
          </motion.div>
        </CardHeader>
        
        <CardContent className="relative z-10">
          <motion.form 
            ref={formRef}
            onSubmit={handleSubmit} 
            className="space-y-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {error && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="p-3 rounded-md bg-red-500/20 border border-red-500/30"
              >
                <p className="text-red-400 text-sm">{error}</p>
              </motion.div>
            )}
            
            <motion.div className="space-y-2" variants={itemVariants}>
              <Label htmlFor="name" className="text-gray-100 flex items-center gap-2">
                <User size={16} className="text-orange-400" />
                Full Name
              </Label>
              <div className="relative">
                <Input 
                  id="name" 
                  name="name" 
                  placeholder="Enter your full name" 
                  required 
                  className="bg-gray-800/50 text-gray-100 border-gray-700 focus:border-orange-500 focus:ring-orange-500/20 pl-3 transition-all duration-300"
                />
              </div>
            </motion.div>
            
            <motion.div className="space-y-2" variants={itemVariants}>
              <Label htmlFor="email" className="text-gray-100 flex items-center gap-2">
                <Mail size={16} className="text-orange-400" />
                Email
              </Label>
              <div className="relative">
                <Input 
                  id="email" 
                  name="email" 
                  type="email" 
                  placeholder="Enter your email" 
                  required 
                  className="bg-gray-800/50 text-gray-100 border-gray-700 focus:border-orange-500 focus:ring-orange-500/20 pl-3 transition-all duration-300"
                />
              </div>
            </motion.div>
            
            <motion.div className="space-y-2" variants={itemVariants}>
              <Label htmlFor="phone" className="text-gray-100 flex items-center gap-2">
                <Phone size={16} className="text-orange-400" />
                Phone Number
              </Label>
              <div className="relative">
                <Input 
                  id="phone" 
                  name="phone" 
                  type="tel" 
                  placeholder="Enter your phone number" 
                  required 
                  className="bg-gray-800/50 text-gray-100 border-gray-700 focus:border-orange-500 focus:ring-orange-500/20 pl-3 transition-all duration-300"
                />
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <Label htmlFor="city" className="text-gray-100 flex items-center gap-2 mb-2">
                <MapPin size={16} className="text-orange-400" />
                City
              </Label>
              <Dropdown
                label=""
                options={keralaCities}
                value={selectedCity}
                onChange={setSelectedCity}
                placeholder="Select a city"
                required={true}
                name="city"
                />
            </motion.div>
            
            <motion.div className="space-y-2" variants={itemVariants}>
              <Label htmlFor="password" className="text-gray-100 flex items-center gap-2">
                <Lock size={16} className="text-orange-400" />
                Password
              </Label>
              <div className="relative">
                <Input 
                  id="password" 
                  name="password" 
                  type="password" 
                  placeholder="Create a password" 
                  required 
                  className="bg-gray-800/50 text-gray-100 border-gray-700 focus:border-orange-500 focus:ring-orange-500/20 pl-3 transition-all duration-300"
                />
              </div>
            </motion.div>
            
            <motion.div className="space-y-2" variants={itemVariants}>
              <Label htmlFor="confirmPassword" className="text-gray-100 flex items-center gap-2">
                <KeyRound size={16} className="text-orange-400" />
                Confirm Password
              </Label>
              <div className="relative">
                <Input 
                  id="confirmPassword" 
                  name="confirmPassword" 
                  type="password" 
                  placeholder="Confirm your password" 
                  required 
                  className="bg-gray-800/50 text-gray-100 border-gray-700 focus:border-orange-500 focus:ring-orange-500/20 pl-3 transition-all duration-300"
                />
              </div>
            </motion.div>

            <motion.div 
              id="recaptcha-container" 
              className="flex justify-center mt-4"
              variants={itemVariants}
            ></motion.div>

            <motion.div variants={itemVariants}>
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white mt-6 h-12 transition-all duration-300 shadow-lg shadow-orange-500/20"
              >
                {isLoading ? (
                  <motion.div
                    className="flex items-center justify-center"
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating account...
                  </motion.div>
                ) : (
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Sign up
                  </motion.span>
                )}
              </Button>
            </motion.div>
          </motion.form>
          
          <motion.div 
            className="mt-6 text-center text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            Already have an account?{" "}
            <Link 
              href="/login" 
              className="text-red-400 hover:text-red-300 transition-colors duration-300 relative group"
            >
              Login
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-400 group-hover:w-full transition-all duration-300"></span>
            </Link>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}