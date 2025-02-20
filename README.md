# BloodLink - Environment Setup Guide

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


