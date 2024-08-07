# Task Management System Project Frontend (Vite + React + Redux)

## Overview

This project is a Task Management System frontend built using React + Vite. 

The project leverages:
  - Redux for global state management,
  - Tailwind CSS for styling,
  - Shadcn-ui for UI components, and react-icons for IconoGraphy.

## Features

- **User Authentication:**
  - Register a new user
  - Login with existing user email
  - Logout function

- **Task Management:**
  - Create a new task
  - Update an existing task
  - Delete a task
  - Retrieve tasks 
  - Search tasks by title

## Setup Instructions

### Prerequisites

Before you begin, ensure you have met the following requirements:

- Install Node.js and npm. You can download from [nodejs.org](https://nodejs.org/).

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/Mg-Oo/TMS_Frontend.git
   cd TMS_Frontend

2. Install the dependencies:

    ```sh
    npm install

3. Run the developmenat server:

    ```sh
    npm run start

## Deployment Instructions

1. Building for Production before deploy:

    ```sh
    npm run build

2. Preview the Production Build:

    ```sh
    npm run preview

3. Install Vercel Cli:
      
     ```sh
     npm install -g vercel

4. Create a Vercel Project:
      
      ```sh
      vercel
      Login in to Vercel: Continue with Email
      Enter your email address: your-email@gmail.com   ( email which login to Vercel)
      Set up and deploy ?: yes
      Which scope do you want to deploy ?: enter
      Link to existing project: yes
      What's the name of your existing project: task-management-project

5. Deploy Vercel:

   ```sh
   vercel --prod
      

## Project Structure

```plaintext
.
├── public
│   ├── vite.svg
├── src
│   ├── components
│   │   │   ├── ui
│   │   ├── App.jsx
│   ├── containers
│   ├── modules
│   ├── main.jsx
│   ├── utils.js
├── .gitignore
├── index.html
├── package.json
├── README.md
├── tailwind.config.js
├── vite.config.js
```

  -    components: Contains reusable React components.
  -    containers: Contains container components that are connected to the Redux store.
  -    modules: Contains the Redux reducers and the combined root reducer.
