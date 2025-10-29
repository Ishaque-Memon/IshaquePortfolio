# Ishaque's Portfolio Website

## Project Description
This project is a comprehensive and dynamic personal portfolio website designed to showcase the professional profile, skills, projects, and achievements of Ishaque. It features a public-facing interface for visitors to explore the portfolio and a secure administrative panel for Ishaque to manage and update content effortlessly. The website aims to provide a professional online presence, facilitate communication through a contact form, and offer insights into website engagement via analytics.

## Features

### Public-Facing Portfolio
*   **Home Section:** Engaging introduction to Ishaque.
*   **About Me:** Detailed professional biography and background.
*   **Education:** Chronological display of academic qualifications.
*   **Skills:** Categorized presentation of technical and soft skills.
*   **Projects:** Showcase of past projects with descriptions, technologies used, and links (if applicable).
*   **Certificates:** Display of professional certifications and achievements.
*   **Contact Form:** Allows visitors to send messages directly to Ishaque.
*   **Responsive Design:** Optimized for various devices and screen sizes.

### Administrative Panel
*   **Secure Authentication:** Admin login with JWT-based authentication.
*   **Dashboard:** Overview of website activity and key metrics.
*   **Content Management:**
    *   **Personal Info:** Update "About Me" section details.
    *   **Education Management:** Add, edit, and delete educational entries.
    *   **Skills Management:** Add, edit, and delete skills.
    *   **Project Management:** Create, update, and remove project entries, including image uploads.
    *   **Certificate Management:** Add, edit, and delete certificates, including image uploads.
*   **Messages:** View and manage contact messages received from visitors.
*   **Analytics:** Track website visits and other engagement metrics.
*   **File Uploads:** Integrated Cloudinary for efficient media storage and delivery.

## Technologies Used

### Frontend
*   **React.js:** A JavaScript library for building user interfaces.
*   **Vite:** A fast build tool for modern web projects.
*   **Tailwind CSS:** A utility-first CSS framework for rapid UI development.
*   **Redux Toolkit:** For predictable state management.
*   **React Router:** For declarative routing in React applications.
*   **Shadcn UI:** (Likely) A collection of reusable components built with Radix UI and Tailwind CSS.

### Backend
*   **Node.js:** A JavaScript runtime built on Chrome's V8 JavaScript engine.
*   **Express.js:** A fast, unopinionated, minimalist web framework for Node.js.
*   **MongoDB:** A NoSQL document database.
*   **Mongoose:** An elegant MongoDB object modeling for Node.js.
*   **JWT (JSON Web Tokens):** For secure authentication.
*   **Cloudinary:** Cloud-based image and video management service.
*   **Socket.IO:** (Potentially) For real-time, bidirectional event-based communication.

## Installation Instructions

To set up and run this project locally, follow these steps:

### Prerequisites
*   Node.js (v14 or higher)
*   npm (Node Package Manager)
*   MongoDB instance (local or cloud-hosted, e.g., MongoDB Atlas)
*   Cloudinary account

### Backend Setup

1.  **Clone the repository:**
    ```bash
    git clone git@github.com:Ishaque-Memon/IshaquePortfolio.git
    cd IshaquePortfolio/backend
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  
4.  **Run the backend server:**
    ```bash
    npm start
    ```
    The backend server will run on `http://localhost:5000` (or your specified PORT).

### Frontend Setup

1.  **Navigate to the frontend directory:**
    ```bash
    cd ../frontend
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Create a `.env` file** in the `frontend` directory and add the following environment variables:
    ```
    VITE_API_BASE_URL=http://localhost:5000/api
    ```
    *Adjust the URL if your backend is running on a different port or domain.*

4.  **Run the frontend development server:**
    ```bash
    npm run dev
    ```
    The frontend application will open in your browser, usually at `http://localhost:3000`.

## Usage

### Public Portfolio
Navigate to the deployed URL or `http://localhost:3000` (if running locally) to view Ishaque's portfolio. Explore the different sections: Home, About, Education, Skills, Projects, Certificates, and Contact. Use the contact form to send a message.

### Admin Panel
To access the administrative panel, navigate to `/admin` (e.g., `http://localhost:5173/admin`). Log in using the `ADMIN_EMAIL` and `ADMIN_PASSWORD` configured in your backend `.env` file. From the dashboard, you can manage all aspects of the portfolio content.

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please follow these steps:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/your-feature-name`).
3.  Make your changes and commit them (`git commit -m 'Add new feature'`).
4.  Push to the branch (`git push origin feature/your-feature-name`).
5.  Open a Pull Request.

Please ensure your code adheres to the project's coding standards and includes appropriate tests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any inquiries or feedback, please reach out to Ishaque:

*   **Email:** haseebmeymon123@gmail.com (Replace with actual email)
*   **LinkedIn:** https://www.linkedin.com/in/muhammad-ishaque-574492249/ (Replace with actual LinkedIn URL)
*   **GitHub:** https://github.com/Ishaque-Memon