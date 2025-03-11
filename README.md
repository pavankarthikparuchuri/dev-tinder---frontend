# DevTinder

- Created a vite + react application
- remove unnessary code and create a hello world app
- Install tailwind (css framework)
- Install Daisy UI (design library)
- Add Navbar component to App.jsx
- Create a NavBar seperate Component File
- Install react router dom
- Create Browser Router > Routes > Route/Body > RouteChildren
- Create an Outlet in Body Component
- Install axios
- Install cors middleware in the backend and add the middleware with config with origin and credential properties
- whenever an api call is made pass {withCredentials:true} in the axios call to send the cookie to backend
- Install Redux toolkit + @reduxjs/toolkit => configureStore => Provider => createSlice => addReducer to store
- Add redux devtools in chrome
- Login and see if your data is coming properly in the store
- Navbar should update as soon as user logs in
- Refactor code to add constants file + create a components folder
- You should not be able to accessr routes without login
- if token is not present, redirect user to login page
- Logout
- Profile
- Get the feed and add the feed in the store
- Build the user card on feed
- Edit profile feature
- show toast message on save of the profile
- New Page - See all my connections
- New Page - See all the requests recieved
- Feature - Accept/Reject Connection Request

Remaining

- Send/Receive the user card from feed
- Signup New User
- E2E Testing

  Body
  NavBar
  Route=/ => Feed page
  Route=/login => Login
  Route=/connections => Connections
  Route=/profile => Profile
