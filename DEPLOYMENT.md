# Project Deployment with Laragon

**Deployment Guide for a New Environment**
*Generated on: 2025-07-17*

---

## 1. Overview

This document provides a step-by-step guide for deploying the MedScribe AI project on a new Windows machine using Laragon. The project consists of a Python Flask backend and a JavaScript/TypeScript frontend. Laragon provides a convenient, isolated development environment for running web applications.

### Prerequisites

- A Windows operating system (10 or 11).
- Administrative privileges on the machine.
- Basic familiarity with the command line (CMD or PowerShell).

---

## 2. Laragon Installation

If you don't have Laragon installed, follow these steps:

1.  **Download Laragon:** Visit the official Laragon website and download the latest "Full" version: [https://laragon.org/download/](https://laragon.org/download/)
2.  **Install Laragon:** Run the installer. It is highly recommended to install Laragon in the default directory (`C:\laragon`).
3.  **Initial Setup:**
    *   Once installed, launch Laragon.
    *   Click the **"Start All"** button to initialize Apache and MySQL.
    *   You may be prompted by Windows Firewall to grant access. Allow it.

---

## 3. Project Setup

### 3.1. Place Project Files

1.  Navigate to your Laragon installation's web root directory, which is typically `C:\laragon\www`.
2.  Copy the entire project folder (`medscribe-ai-9`) into this directory.

### 3.2. Configure Laragon

1.  **Create a Virtual Host (Pretty URL):**
    *   Right-click the Laragon icon in the system tray.
    *   Go to `Menu > Apache > Sites`. Laragon automatically detects projects in the `www` folder. Your project should be listed.
    *   Alternatively, you can use `Menu > www > your-project-folder` to access it, but a "pretty" URL is better. To create one, right-click the tray icon, go to `www > Create a new project`, and select the "blank" option. Name it `medscribe.test`. Then, copy the project files into the newly created `C:\laragon\www\medscribe.test` directory. For this guide, we'll assume the project is accessed at `http://medscribe-ai-9.test/`.
    *   Laragon will automatically update your `hosts` file.

2.  **Enable Required Services:**
    *   Ensure **Apache** and **MySQL** are running. You can start them from the main Laragon window.

---

## 4. Backend Setup (Python)

1.  **Install Python:** If Python is not installed, download it from the [official Python website](https://www.python.org/downloads/) and install it. Make sure to check the box **"Add Python to PATH"** during installation.
2.  **Open a Terminal:** Right-click the Laragon tray icon and select **"Terminal"**. This opens a CMD prompt with access to all of Laragon's tools.
3.  **Navigate to Project Directory:**
    ```bash
    cd C:\laragon\www\medscribe-ai-9
    ```
4.  **Create and Activate Virtual Environment:**
    ```bash
    python -m venv venv
    venv\Scripts\activate
    ```
5.  **Install Python Dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

---

## 5. Frontend Setup (JavaScript)

1.  **Install Node.js:** If Node.js is not installed, download and install the LTS version from the [official Node.js website](https://nodejs.org/).
2.  **Install Dependencies:** In the same terminal (already in the project directory), run the following command to install the required npm packages:
    ```bash
    npm install
    ```

---

## 6. Environment Configuration (`.env`)

The `.env` file is used to store sensitive information and environment-specific settings.

1.  In the project root (`C:\laragon\www\medscribe-ai-9`), create a new file named `.env`.
2.  Add the following content to the file. You may need to adjust the values based on your setup, but these are the typical defaults for Laragon.

    ```env
    # Flask Backend Configuration
    FLASK_APP=app.py
    FLASK_ENV=development
    FLASK_DEBUG=1

    # Database Configuration (if applicable)
    # Replace with your actual database credentials if the app uses one.
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=
    DB_NAME=medscribe_db

    # API Keys (if applicable)
    GEMINI_API_KEY=your_api_key_here
    ```

---

## 7. Database Setup

If the application requires a database:

1.  **Open HeidiSQL:** From the Laragon main window, click the **"Database"** button. This will open HeidiSQL.
2.  **Create the Database:**
    *   In HeidiSQL, right-click on the server connection in the left panel (e.g., "localhost").
    *   Select `Create new > Database`.
    *   Enter the database name specified in your `.env` file (e.g., `medscribe_db`).
    *   Click **"OK"**.

---

## 8. Running the Application

The project includes a convenient script to start both the backend and frontend servers simultaneously.

1.  **Ensure you are in the project directory** in your terminal and the Python virtual environment is active.
2.  **Run the Server Script:**
    ```bash
    run_servers.bat
    ```
    This will start the Flask backend server and the Vite frontend development server.

3.  **Access the Application:**
    *   Open your web browser and navigate to the "pretty URL" you configured: **http://medscribe-ai-9.test/** or the address provided by the Vite server (usually `http://localhost:5173`).

---

## 9. Troubleshooting

-   **Port Conflicts:** If a service fails to start, it might be due to a port conflict. Check the Laragon settings (`Menu > Tools > Netstat`) to see which applications are using the required ports (e.g., 80, 3306, 5000, 5173).
-   **Firewall Issues:** Ensure that Windows Firewall is not blocking Apache, MySQL, Python, or Node.js.
-   **`command not found`:** If you see errors like `pip` or `npm` is not recognized, ensure Python and Node.js were correctly installed and their paths were added to the system's PATH environment variable.
-   **Dependency Installation Errors:** If `pip install` or `npm install` fails, check your internet connection. Some packages may require build tools; check the error messages for specific requirements.

---

## 10. Automation & Improvements

-   **Create a Master Setup Script:** A single `setup.bat` script could be created to perform all installation steps: creating the venv, `pip install`, and `npm install`.
-   **Use Docker:** For greater consistency across different environments, consider containerizing the application using Docker and Docker Compose. This would replace the need for a local Laragon setup and ensure the environment is identical for all developers.
