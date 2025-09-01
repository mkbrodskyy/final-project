# Final Project

This project is based on the se_project_react template. It provides a weather-based clothing recommendation app.

---

About the project
The idea of the application is pretty simple - we make a call to an API, which then responds with the daily weather forecast. We collect the weather data, process it, and then based on the forecast, we recommend suitable clothing to the user.

Links
https://www.figma.com/file/DTojSwldenF9UPKQZd6RRb/Sprint-10%3A-WTWR

## Backend Repository

This project uses a custom Express and MongoDB backend.  
You can find the backend code and setup instructions here:  
[se_project_express (Project 13 Backend Repo)](https://github.com/mkbrodskyy/se_project_express)

## Features Implemented

- **User Registration & Authorization**

  - Users can register and log in via modal forms.
  - JWT token is stored in localStorage and validated on app load.
  - Protected routes (e.g., `/profile`) redirect unauthorized users.

- **Current User Context**

  - User data is managed globally with React Context.
  - Header and other components update based on authentication state.

- **Profile Management**

  - Profile page displays only the current user's clothing items.
  - Users can edit their profile (name and avatar) via a modal.

- **Clothing Items**

  - Users can add new clothing items.
  - Only the owner of an item can see and use the delete button.
  - All users can view items, but only logged-in users can like/unlike items.

- **Likes/Dislikes**

  - Logged-in users can like or unlike clothing items.
  - Like button is hidden for unauthorized users.
  - Like state is visually indicated.

- **UI/UX**

  - Modals for registration, login, adding items, editing profile, and confirming deletion.
  - Responsive and accessible navigation.
  - Placeholder avatar/initials shown if no avatar is set.

- **API Integration**
  - All relevant API calls include JWT in the Authorization header.
  - Only GET /items is public; all other actions require authentication.
