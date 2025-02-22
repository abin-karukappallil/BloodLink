/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FormEvent, useState, useEffect, useRef } from "react"
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import Link from "next/link"
import { useRouter } from "next/navigation"

declare global {
  interface Window {
    grecaptcha: {
      render: (element: HTMLElement | string, options: any) => number;
      getResponse: (widgetId: number) => string;
      reset: (widgetId: number) => void;
    };
    onRecaptchaLoad?: () => void;
  }
}

export default function SignupForm() {
  const [error, setError] = useState<string | null>(null);
  const [captchaWidget, setCaptchaWidget] = useState<number | null>(null);
  const router = useRouter();
  const recaptchaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load the reCAPTCHA script
    const loadRecaptcha = () => {
      const script = document.createElement('script');
      script.src = `https://www.google.com/recaptcha/api.js?render=explicit&onload=onRecaptchaLoad`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    };

    // Define the callback function
    window.onRecaptchaLoad = () => {
      if (recaptchaRef.current && window.grecaptcha) {
        const widgetId = window.grecaptcha.render(recaptchaRef.current, {
          sitekey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
          theme: 'dark',
          callback: (response: string) => {
            console.log('Captcha completed');
          }
        });
        setCaptchaWidget(widgetId);
      }
    };

    loadRecaptcha();

    // Cleanup
    return () => {
      delete window.onRecaptchaLoad;
      // Remove the script tag
      const scripts = document.getElementsByTagName('script');
      for (let i = 0; i < scripts.length; i++) {
        if (scripts[i].src.includes('recaptcha')) {
          scripts[i].remove();
          break;
        }
      }
    };
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setError(null);
    e.preventDefault();
    
    const formData = new FormData(e.currentTarget);
    
    if (formData.get("password") !== formData.get("confirmPassword")) {
      setError("Passwords do not match");
      return;
    }

    if (!captchaWidget) {
      setError("Please wait for captcha to load");
      return;
    }
    
    const captchaResponse = window.grecaptcha.getResponse(captchaWidget);
    
    if (!captchaResponse) {
      setError("Please complete the captcha");
      return;
    }

    try {
      const api = "/api/users";
      const response = await fetch(api, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: formData.get("name"),
          phoneNumber: formData.get("phone"),
          address: formData.get("address"),
          email: formData.get("email"),
          password: formData.get("password"),
          captchaResponse: captchaResponse,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.error || "Failed to create account");
        if (captchaWidget) {
          window.grecaptcha.reset(captchaWidget);
        }
      } else {
        router.push("/login");
      }
    } catch (error) {
      console.error("Error adding user:", error);
      setError((error as Error).message);
      if (captchaWidget) {
        window.grecaptcha.reset(captchaWidget);
      }
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
          <div className="flex justify-center my-4">
            <div ref={recaptchaRef}></div>
          </div>
          <Button type="submit" className="w-full bg-gradient-to-r from-red-500 to-orange-500 text-white mt-6">
            Sign Up
          </Button>
        </form>
        <div className="mt-6 text-center text-gray-400">
          Already have an account?{" "}
          <Link href="/login" className="text-red-400 hover:text-red-300">
            Login
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}