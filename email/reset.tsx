import {
    Html,
    Head,
    Preview,
    Body,
    Container,
    Heading,
    Text,
    Img,
    Hr,
    Section,
    Link,
    Button,
  } from "@react-email/components"
  import type * as React from "react"
  
  interface OtpEmailProps {
    otp: string
    userName?: string
  }
  
  export const OtpEmail: React.FC<OtpEmailProps> = ({ otp, userName = "" }) => {
    return (
      <Html>
        <Head />
        <Preview>Your BloodLink Verification Code: {otp}</Preview>
        <Body style={main}>
          <Container style={container}>
            <Section style={headerSection}>
              <Img src="https://c.tenor.com/cA9BDrIIuswAAAAC/tenor.gif" width="300" height="250" alt="BloodLink Logo" style={logo} />
            </Section>
  
            <Section style={heroSection}>
              <Heading style={mainHeading}>Reset Your Password</Heading>
              <Text style={heroText}>Email verification for password reset</Text>
            </Section>
  
            <Container style={contentContainer}>
              <Text style={paragraph}>Hello {userName ? <strong>{userName}</strong> : "there"},</Text>
              <Text style={paragraph}>
                Here is your <strong>BloodLink</strong>, password reset verification code, If you didn't do this please as soon as possible, please use the verification code below:
              </Text>
  
              <Section style={otpSection}>
                <Text style={otpCode}>{otp}</Text>
                <Text style={otpExpiry}>Code expires in 5 minutes</Text>
              </Section>
            </Container>
  
            <Hr style={hr} />
  
            <Section style={footerSection}>
              <Text style={footer}>
                If you have any questions, please contact us at{" "}
                <Link href="https://github.com/abin-karukappallil" style={link}>
                  abin@abinthomas.dev
                </Link>
              </Text>
              <Text style={footerLinks}>
                <Link href="https://blood-link-manage.vercel.app/" style={smallLink}>
                  Privacy Policy
                </Link>{" "}
                •
                <Link href="https://blood-link-manage.vercel.app/" style={smallLink}>
                  Terms of Service
                </Link>{" "}
                •
                <Link href="https://blood-link-manage.vercel.app/" style={smallLink}>
                  Contact Us
                </Link>
              </Text>
              <Text style={copyright}>© {new Date().getFullYear()} Abin. All rights reserved.</Text>
            </Section>
          </Container>
        </Body>
      </Html>
    )
  }
  
  // Styles
  const main = {
    backgroundColor: "#f5f5f5",
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    padding: "20px 0",
  }
  
  const container = {
    margin: "0 auto",
    width: "100%",
    maxWidth: "600px",
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    overflow: "hidden",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
  }
  
  const headerSection = {
    backgroundColor: "#ffffff",
    padding: "24px 0",
    textAlign: "center" as const,
    borderBottom: "1px solid #f0f0f0",
  }
  
  const logo = {
    margin: "0 auto",
    display: "block",
  }
  
  const heroSection = {
    backgroundColor: "#e53e3e",
    color: "#ffffff",
    padding: "40px 24px",
    textAlign: "center" as const,
  }
  
  const mainHeading = {
    fontSize: "30px",
    lineHeight: "1.3",
    fontWeight: "700",
    color: "#ffffff",
    margin: "0 0 12px 0",
  }
  
  const heroText = {
    fontSize: "16px",
    color: "#ffffff",
    margin: "0",
    opacity: "0.9",
  }
  
  const contentContainer = {
    padding: "0 24px",
  }
  
  const paragraph = {
    fontSize: "16px",
    lineHeight: "26px",
    color: "#484848",
    margin: "24px 0",
  }
  
  const otpSection = {
    padding: "24px",
    backgroundColor: "#fff5f5",
    borderRadius: "8px",
    margin: "32px 0",
    textAlign: "center" as const,
    border: "1px solid #fed7d7",
  }
  
  const otpCode = {
    fontSize: "36px",
    fontWeight: "700",
    color: "#e53e3e",
    margin: "0 0 12px 0",
    letterSpacing: "8px",
  }
  
  const otpExpiry = {
    fontSize: "14px",
    color: "#718096",
    margin: "0",
  }

  
  const hr = {
    borderColor: "#edf2f7",
    margin: "32px 0 24px",
  }
  
  const footerSection = {
    padding: "0 24px 32px",
    textAlign: "center" as const,
  }
  
  const footer = {
    color: "#718096",
    fontSize: "14px",
    margin: "0 0 16px 0",
  }
  
  const link = {
    color: "#e53e3e",
    textDecoration: "underline",
  }
  
  const footerLinks = {
    color: "#718096",
    fontSize: "13px",
    margin: "0 0 16px 0",
  }
  
  const smallLink = {
    color: "#718096",
    textDecoration: "none",
    margin: "0 8px",
  }
  
  const copyright = {
    color: "#a0aec0",
    fontSize: "12px",
    margin: "0",
  }
  
  