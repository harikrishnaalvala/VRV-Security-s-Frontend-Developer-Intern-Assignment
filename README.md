# Role-Based Access Control (RBAC)

This project implements a Role-Based Access Control (RBAC) system. It allows you to manage users, their roles, and the permissions associated with those roles.

Features
--------

1.  **User Management**: Add, edit, and view user accounts with the following details:
    -   User ID
    -   Name
    -   Creation Date
    -   Role (Admin or User)
    -   Permissions (Read, Write, Delete)
    -   Status (Active or Inactive)
2.  **Add User**: Users can be added to the system by providing the required information, such as ID, name, role, permissions, and status. The application performs input validation to ensure that:
    -   The ID field only accepts numeric values.
    -   The name field only accepts alphabetic characters and spaces.
    -   All required fields are filled out.
3.  **Unique ID Validation**: The application checks for duplicate user IDs when adding a new user or editing an existing one. If a duplicate ID is detected, an error toast notification is displayed, and the user is not allowed to proceed until a unique ID is provided.
4.  **Edit User**: Existing user information can be edited, including their ID, name, role, permissions, and status. Similar to the add feature, the application ensures that the new ID is unique.
5.  **Sorting**: Sort the user table by any column in ascending or descending order.
6.  **Bulk Actions**: Select multiple users and perform actions like deleting them in bulk.
7.  **Pagination**: The user table is paginated, displaying a configurable number of rows per page. Users can navigate through the pages using the pagination controls.
8.  **Persistence**: User data is stored in the browser's localStorage, ensuring data persistence across sessions.
9.  **Notifications**: Success and error notifications are displayed using a toast library.
10. **Responsive Design**: The application is designed to be responsive and accessible on various devices.

Technologies Used
-----------------

-   React.js
-   Material-UI
-   Tailwind CSS (for styling)
-   localStorage (for data persistence)
-   Toastify (for notifications)

Getting Started
---------------

To run the application locally, follow these steps:

1.  Clone the repository: ```https://github.com/harikrishnaalvala/VRV-Security-s-Frontend-Developer-Intern-Assignment.git```
2. Navigate to the project directory:```cd VRV-Security-s-Frontend-Developer-Intern-Assignment```
3. Install the dependencies: ```npm install```
4. Start the development server: ```npm start```
