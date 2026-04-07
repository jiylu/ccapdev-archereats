
# ArcherEats

A restaurant review web application for CCAPDEV focusing on restaurants around the vicinity of De La Salle University Manila.
https://archereats-mjw8.onrender.com/

## Tech Stack

**Client:** React, ShadcnUI, Framer Motion, TailwindCSS

**Server:** Node, Express

**Database:** MongoDB


## Installation
Before installing ArcherEats, make sure you have the following installed:

- **Node.js (v16 or higher recommended)**
- **Git**
- **MongoDB** 

Follow these steps to set up ArcherEats on your local machine:
#### 1. Clone the Repository
```bash
git clone https://github.com/jiylu/ccapdev-archereats.git
cd ccapdev-archereats
```
#### 2. Install the dependencies 
For the **root** folder
```bash
npm i
```
    
For the **client** folder (starting at the root folder)
```bash
cd client
npm i
```

For the **server** folder (starting at the root folder)
```bash
cd server
npm i
```


#### 3. Set Up Environment Variables
Make an .env at the root of the client folder
```
VITE_DEVELOPMENT_URL="http://localhost:8080/api"
```

Make an .env at the root of the server folder
```
DB_URL=(YOUR MONGODB URI)
PORT=8080
JWT_SECRET=(YOUR JWT SECRET)
CLOUDINARY_CLOUD_NAME=(YOUR CLOUDINARY CLOUD NAME)
CLOUDINARY_API_KEY=(YOUR CLOUDINARY API KEY)
CLOUDINARY_API_SECRET=(YOUR CLOUDINARY API SECRET)
NODE_ENV="dev"
CLIENT_URL="http://localhost:5173"
```

#### 4. Run the application
Make sure you are in the project root and run the following command:
```bash
npm run dev
```

#### 5. Open in Browser
```
http://localhost:5173/
```

## Disclaimer

This project **requires** a Cloudinary account for image upload and storage functionality.

ArcherEats uses Cloudinary to handle restaurant images, user uploads, and media assets. Without proper Cloudinary credentials, features involving image uploads will not work correctly.

#### What You Need

You must create a Cloudinary account and obtain the following:

```
CLOUDINARY_CLOUD_NAME
CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET
```

You can get these from your Cloudinary dashboard after signing up.

#### Note

The application may still run without Cloudinary, but image-related features will be disabled or may cause errors.
Make sure your .env file is properly configured before running the app.
