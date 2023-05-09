
# About the project
The **Social Media App** is a web application that allows users to create posts about events, including details such as the date, 
venue, city, a description etc. Users can share these posts with their followers, providing a platform for event announcements and updates. Apart from the event feature it also provides a stories feature similar to Instagram posts. It allows users to post images that followers can interact with.
<br><br>
The application is built using the ASP.NET framework for the backend, leveraging the clean architecture design philosophy to achieve separation of concerns and maintainability. The frontend is developed using React.js, providing a dynamic and responsive user interface.

> The app is still under development, new features are waiting to be added, will be completely done by June 2023

## Features

- User Registration and Authentication: Users can create an account and log in securely to access the application.
- Post Creation: Users can create posts by selecting a date, venue, city, and adding a description of the event.
- Story Creation: Users can create stories by selecting an image and adding a caption.
- Post Sharing: Users can share their posts with their followers.
- User Interaction: Users can follow other users, comment on posts, fostering engagement within the community.


## Technologies Used

- ASP.NET: A powerful web framework for building the backend of the application.
- React.js: A JavaScript library for building the frontend user interface.
- Clean Architecture: A design philosophy that promotes separation of concerns and maintainability.
- CQRS (Command Query Responsibility Segregation): A pattern that separates commands (write operations) from queries (read operations) for better scalability and performance.
- Mediator Pattern: A behavioral design pattern that decouples components by using a mediator object to handle communication between them.
- Axios: A promise-based HTTP client for making API requests from the frontend to the backend.
- MobX: A state management library for managing application state in a reactive and efficient manner.
- Cloudinary: A cloud-based service for storing and managing images, providing features like image upload, transformation, and optimization.

## Prerequisites

1. Node.js and npm: Ensure that you have Node.js and npm installed on your development environment. We are using Node version 18.13.0.
2. Visual Studio Code: Install Visual Studio Code or any compatible code editor for working with ASP.NET projects.
3. Postman: Install Postman or any other API testing tool for testing the API endpoints.

## Installation and Setup

1. Clone the repository: git clone https://github.com/enis-n/social-app.git
2. Navigate to the API folder: 'cd API'
3. Restore dependencies if needed with: 'dotnet restore'
4. Launch the server: 'dotnet run'
5. Open a new terminal and navigate to the client-app folder: 'cd client-app'
6. Install frontend dependencies: 'npm install'
7. Start the frontend development server: 'npm start'

The application should now be up and running at http://localhost:3000/.
