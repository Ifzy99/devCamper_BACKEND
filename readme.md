# DevCamper API

>DevCamper is a comprehensive backend API for managing bootcamps, courses, reviews, users, and authentication. It’s designed to serve as the backend for a bootcamp directory application. The API is built with Node.js and Express, utilizing MongoDB for data storage, and includes full CRUD operations, user authentication, and role-based access control.

#Usage

Rename "config/config.env.env" to "config/config.env"  and update the  values/settings to your own

#Features
+ Bootcamps: Create, update, and delete bootcamps, with location search and photo upload capabilities.
+ Courses: Manage courses associated with bootcamps, including details such as tuition cost and duration.
+ Reviews: Users can leave reviews and ratings for bootcamps.
+ User Management: Full authentication system, with role-based access (admin, publisher, user).
+ API Security: JWT authentication, password reset functionality, and request rate limiting.
+ Advanced Filtering: Pagination, sorting, and filtering options for bootcamps and courses.

#Technologies Used
+ Backend: Node.js, Express.js
+ Database: MongoDB with Mongoose ODM
+ Authentication: JWT (JSON Web Tokens) with bcrypt for password hashing
+ Security: Helmet, CORS, Rate Limiting, XSS Protection, etc.
+ Documentation: API documented using Postman and available as a collection.


## Install Dependencies
```
npm install
```
## Run App
```
# Run in dev mode
npm run dev

# Run in prod mode 
npm start
```

- Version: 1.0.0
- License: MIT
