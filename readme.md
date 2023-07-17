# I.S.E.E.A backend - Node.js, Express, and MongoDB

This is the backend project for I.S.E.E.A built with Node.js, Express, and MongoDB. The application provides authentication, CRUD functionality for projects, impacts, Impact Numbers, Annual-reports and team members, as well as a payment module integrated with Paystack.

## Features

- User Registration: Allows users to register with their email and password.
- User Login: Users can log in using their registered credentials.
- Forgot Password: Provides a password recovery feature using Nodemailer to send password reset emails.
- User Logout: Allows users to log out of the application.
- Project CRUD: Provides Create, Read, Update, and Delete operations for projects.
- Impacts CRUD: Supports managing ISEEA impacts.
- Interventions CRUD: Supports managing ISEEA interventions.
- Impact numbers CRUD: Enables update of the impact numbers as projects arises.
- Annual Reports CRUD: Supports managing ISEEA Annual reports.
- Team Member CRUD: Allows management of team members associated with projects.
- Paystack Integration: Provides a payment module integrated with Paystack for processing payments.

## Prerequisites

To run this application, you need to have the following installed:

- Node.js (v12 or above)
- MongoDB (running instance)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/tosibinaronmuro/iseeaBackEnd.git
   ```

2. Navigate to the project directory:

   ```bash
   cd backend-project
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Configure environment variables:

   - Create a `.env` file in the project root directory.
   - Set the following environment variables:

     ```plaintext
     MONGODB_URI=<your-mongodb-uri>
     PAYSTACK_SECRET_KEY=<your-paystack-secret-key>
     ```

5. Start the application:

   ```bash
   npm start
   ```

   The application will be running on `http://localhost:5000`.

## API Endpoints

- **User Registration**
  - POST `/api/v1/auth/register`
- **User Login**
  - POST `/api/v1/auth/login`
- **Forgot Password**
  - POST `/api/v1/auth/forgot-password`
- **Password Reset**
  - POST `/api/v1/auth/reset-password`
- **User Logout**
  - POST `/api/v1/auth/logout`
- **Project CRUD**
  - POST `/api/v1/projects`
  - GET `/api/v1/projects`
  - PATCH `/api/v1/projects/:id`
  - DELETE `/api/v1/projects/:id`
- **Impact CRUD**
  - POST `/api/v1/projects/:projectId/impacts`
  - GET `/api/v1/projects/:projectId/impacts`
  - PATCH `/api/v1/projects/:projectId/impacts/:id`
  - DELETE `/api/v1/projects/:projectId/impacts/:id`
- **Interventions CRUD**
  - POST `/api/v1/projects/:projectId/interventions`
  - GET `/api/v1/projects/:projectId/interventions`
  - PATCH `/api/v1/projects/:projectId/interventions/:id`
  - DELETE `/api/v1/projects/:projectId/interventions/:id`
- **Annual Reports CRUD**
  - POST `/api/v1/projects/:projectId/reports`
  - GET `/api/v1/projects/:projectId/reports`
  - PATCH `/api/v1/projects/:projectId/reports/:id`
  - DELETE `/api/v1/projects/:projectId/reports/:id`
- **Impact Numbers CRUD**
  - POST `/api/v1/projects/:projectId/numbers`
  - GET `/api/v1/projects/:projectId/numbers`
  - PATCH `/api/v1/projects/:projectId/numbers/:id`

- **Team Member CRUD**
  - POST `/api/v1/projects/:projectId/team`
  - GET `/api/v1/projects/:projectId/team`
  - PATCH `/api/v1/projects/:projectId/team/:id`
  - DELETE `/api/v1/projects/:projectId/team/:id`
- **Payment**
  - POST `/api/v1/payment/process`

<!-- ## Documentation

For detailed API documentation, refer to the [API Documentation](./docs/api-docs.md) file.

## License

This project is licensed under the [MIT License](./LICENSE). -->

## Contributing

Contributions are welcome! Especially on unit tests !!! Before making any major changes, please open an issue to discuss the proposed changes.

## Contact

For any inquiries or questions, feel free to contact [tosironj@gmail.com](mailto:tosironj@gmail.com).

---