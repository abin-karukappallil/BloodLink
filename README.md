# BloodLink - Environment Setup Guide

Take a look at the `.env.example` file

## Step 1: Creating a NeonDB Database
1. Visit [NeonDB Console](https://console.neon.tech/app/welcome) and log in.
2. Click **Create a Database** and provide the following details:
   - **Name:** (Choose any suitable name)
   - **PostgreSQL Version:** `17`
   - **Region:** `AWS Singapore`
3. Click **Create** to initialize your database.

## Step 2: Obtaining Connection String
1. After creating the database, click the **Connect** button.
2. Select **Connection String** and choose **Next.js** as the platform.
3. Copy the generated `.env` snippet.

## Step 3: Configuring the Project
1. Navigate to your project root directory.
2. Create a new **.env.local** file if it doesn’t exist.
3. Open `.env.local` and paste the copied connection string.
4. Save the file.

## Step 4: Running the Project
After setting up the database, start your Next.js project:
```sh
npm run dev
```


# Google reCAPTCHA v2 Setup

This guide will help you set up Google reCAPTCHA v2 (Challenge-based) in your Next.js project.

## Step 1: Get reCAPTCHA v2 Site and Secret Keys
1. Go to [Google reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin/create).
2. Choose **reCAPTCHA v2** and select **"I'm not a robot" Checkbox**.
3. Enter your domain(like localhost,testdomian.com etc..) and accept the terms.
4. Click **Submit**, and you will get a **Site Key** and a **Secret Key**.

## Step 2: Add Keys to Your `.env.local` File
Create or edit `.env.local` file in the root of your project and add:

```
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_site_key_here
RECAPTCHA_SECRET_KEY=your_secret_key_here
```

# JWT Token setup

Edit `.env.local` or `.env ` file in the root directory
and place your jwt token(any random string)

```
SECRET_KEY=your_secret_key_here
```