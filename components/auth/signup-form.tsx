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
      render: (element: HTMLElement | string, options: { sitekey: string; theme: string; callback: (response: string) => void; 'expired-callback': () => void; 'error-callback': () => void; }) => number;
      getResponse: (widgetId: number) => string;
      reset: (widgetId: number) => void;
    };
    onRecaptchaLoad?: () => void;
  }
}


export default function SignupForm() {
  const [error, setError] = useState<string | null>(null);
  const [captchaWidget, setCaptchaWidget] = useState<number | null>(null);
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const recaptchaRef = useRef<HTMLDivElement>(null);
  const isRecaptchaLoaded = useRef(false);

  useEffect(() => {
    // Only load reCAPTCHA if it hasn't been loaded yet
    if (isRecaptchaLoaded.current) return;

    const loadRecaptcha = () => {
      // Remove any existing reCAPTCHA script first
      const existingScript = document.querySelector('script[src*="recaptcha"]');
      if (existingScript) {
        existingScript.remove();
      }

      const script = document.createElement('script');
      script.src = `https://www.google.com/recaptcha/api.js?render=explicit&onload=onRecaptchaLoad`;
      script.async = true;
      script.defer = true;

      script.onerror = () => {
        console.error('Failed to load reCAPTCHA script');
        setError('Failed to load captcha. Please refresh the page.');
        isRecaptchaLoaded.current = false;
      };

      document.head.appendChild(script);
    };

    // Define the callback function
    window.onRecaptchaLoad = () => {
      if (!recaptchaRef.current || !window.grecaptcha || isRecaptchaLoaded.current) return;

      try {
        const widgetId = window.grecaptcha.render(recaptchaRef.current, {
          sitekey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '',
          theme: 'dark',
          callback: async (response: string) => {
            console.log('Captcha response received');
            const res=response;
            console.log(res);
            setIsCaptchaVerified(true);
            setError(null);
          },
          'expired-callback': () => {
            console.log('Captcha expired');
            setIsCaptchaVerified(false);
            setError('Captcha expired. Please verify again.');
          },
          'error-callback': () => {
            console.log('Captcha error');
            setIsCaptchaVerified(false);
            setError('Error loading captcha. Please refresh the page.');
          }
        });

        setCaptchaWidget(widgetId);
        isRecaptchaLoaded.current = true;
      } catch (error) {
        console.error('Error rendering captcha:', error);
        setError('Error loading captcha. Please refresh the page.');
        isRecaptchaLoaded.current = false;
      }
    };

    loadRecaptcha();

    return () => {
      // Clean up the script and callback
      const script = document.querySelector('script[src*="recaptcha"]');
      if (script) {
        script.remove();
      }
      if (window.onRecaptchaLoad) {
        window.onRecaptchaLoad = undefined;
      }
      isRecaptchaLoaded.current = false;
    };
  }, []); // Empty dependency array since we only want to load once

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);

      if (formData.get("password") !== formData.get("confirmPassword")) {
        setError("Passwords do not match");
        setIsSubmitting(false);
        return;
      }

      if (!isCaptchaVerified || !captchaWidget) {
        setError("Please complete the captcha verification");
        setIsSubmitting(false);
        return;
      }

      const captchaResponse = window.grecaptcha.getResponse(captchaWidget);

      if (!captchaResponse) {
        setError("Please complete the captcha verification");
        setIsSubmitting(false);
        return;
      }

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

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create account");
      }

      router.push("/login");
    } catch (error) {
      console.error("Error submitting form:", error);
      setError((error as Error).message);
      setIsCaptchaVerified(false);
      if (captchaWidget) {
        window.grecaptcha.reset(captchaWidget);
      }
    } finally {
      setIsSubmitting(false);
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
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-red-500 to-orange-500 text-white mt-6"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating Account...' : 'Sign Up'}
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