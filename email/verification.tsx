import { Html, Head, Preview, Body, Container, Heading, Text, Img, Hr, Section } from "@react-email/components"
import type * as React from "react"

interface OtpEmailProps {
  otp: string
  userName?: string
}

export const OtpEmail: React.FC<OtpEmailProps> = ({ otp, userName}) => {
  return (
    <Html>
      <Head />
      <Preview>Your BloodLink Verification Code</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>BLOODLINK</Heading>
          <Heading style={heading}>Verify Your Email</Heading>
          <Text style={paragraph}>Hello {userName || ""},</Text>
          <Text style={paragraph}>
            Thank you for joining BloodLink. To complete your registration, please use the following verification code:
          </Text>
          <Section style={otpSection}>
            <Text style={otpCode}>{otp}</Text>
          </Section>
          <Text style={paragraph}>
            This code will expire in 5 minutes. If you didn't request this code, please ignore this email.
          </Text>
          <Hr style={hr} />
          <Text style={footer}>
            If you have any questions, please don't hesitate to contact us at{" "}
            <a href="mailto:support@bloodlink.com" style={link}>
              support@bloodlink.com
            </a>
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

// Styles
const main = {
  backgroundColor: "#f6f6f6",
  fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif',
}

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  width: "580px",
  backgroundColor: "#ffffff",
  borderRadius: "5px",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
}

const logo = {
  margin: "0 auto",
  display: "block",
}

const heading = {
  fontSize: "32px",
  lineHeight: "1.3",
  fontWeight: "700",
  color: "#484848",
  textAlign: "center" as const,
  marginBottom: "20px",
}

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
  color: "#484848",
}

const otpSection = {
  padding: "24px",
  backgroundColor: "#fff0f0",
  borderRadius: "5px",
  margin: "24px 0",
  textAlign: "center" as const,
}

const otpCode = {
  fontSize: "36px",
  fontWeight: "700",
  color: "#e53e3e",
  margin: "0",
  letterSpacing: "5px",
}

const hr = {
  borderColor: "#e6ebf1",
  margin: "20px 0",
}

const footer = {
  color: "#9ca299",
  fontSize: "14px",
  marginTop: "20px",
}

const link = {
  color: "#e53e3e",
  textDecoration: "underline",
}

export default OtpEmail

