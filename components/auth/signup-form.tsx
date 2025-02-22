"use client";
import { useState, useEffect, useRef } from "react"; 
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";



export default function SignupForm() {
  const [error, setError] = useState<string | null>(null);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const router = useRouter();
  const recaptchaRendered = useRef(false); 
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

    try {
      const formData = new FormData(e.currentTarget);
      const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          phoneNumber: formData.get("phone"),
          address: formData.get("address"),
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
          <div className="space-y-2">
            <Label htmlFor="address" className="text-gray-100">Address</Label>
            <Input id="address" name="address" placeholder="Enter your address" required />
          </div>
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