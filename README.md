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

- Signup New User
- E2E Testing

  Body
  NavBar
  Route=/ => Feed page
  Route=/login => Login
  Route=/connections => Connections
  Route=/profile => Profile

# Deployment

- Singup on AWS
- Launch instance
- Modify permissions (chmod 400 <secret>.pem)
- connected to the machine using ssh command (ssh -i "devTinder-Secret.pem" ubuntu@ec2-54-206-21-107.ap-southeast-2.compute.amazonaws.com)
- install node version 22.13.1
- Git clone
- Frontend:-
  - npm i
  - npm run build to create the production ready build
  - we need nginx as that provides us an http web server where we can deploy our frontend application
  - sudo apt update
  - sudo apt install nginx
  - sudo systemctl start nginx
  - sudo systemctl enable nginx
  - copy code from dist(build files) to /var/www/html/
  - sudo scp -r dist/\* /var/www
  - all ports are initially blocked in aws, our nginx server runs in port 80
  - enable port 80 in the instance
- Backend
  - npm i
  - allowed public ip of the ec2 instance to connect to the database on mongodb server
  - npm start, if we are doing we need keep our terminal on forever for the server to be available
  - installed pm2 which is a process manager(daemon process that manages the application 24 \* 7), npm install pm2 -g
  - using pm2 we can start our backend server pm2 start npm -- start
  - pm2 logs
  - pm2 flush <name>, pm2 list, pm2 stop <name>,pm2 delete <name>
  - pm2 start npm --name "devtinder-backend" -- start
  - we will be using domainname/api for the backendserver, we should make the mapping in nginx config so that it will route to domainname:7777
  - config nginx - /etc/nginx/sites-available/default
  - restart nginx - sudo systemctl restart nginx

frontend = http://3.27.162.47/
backend = http://3.27.162.47:7777

Domain name = devTinder.com => 3.27.162.47

frontend = devTinder.com
backend = devTinder.com:7777 => devTinder.com/api (proxy pass)

# NGINX config:

server_name 3.27.162.47
location /api/ {
proxy_pass http://localhost:7777/;
proxy_http_version 1.1;
proxy_set_header Upgrade $http_upgrade;
proxy_set_header Connection 'upgrade';
proxy_set_header Host $host;
proxy_cache_bypass $http_upgrade;
}
