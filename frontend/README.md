# Step by step to create initial react app

 1. run the following command and choose your techstack (javascript -> reactjs)
```sh
npm create vite@latest frontend 
```

 2. next, run the command
```sh
cd frontend
```

 3. install library (redux-toolkit, redux, router-dom, ...)
```sh
npm install @reduxjs/toolkit react-redux react-router-dom styled-components react-icon
```

 4. run project in localhost (default port: http://localhost:5174)
```sh
npm run dev
```

# How to push project to git

 1. create a repository in git (ignore README.md while create app) and copy url (default branch: master)

 2. open the command line, go to the created project folder, and run the following command to create git in local
```sh
git init
```

 3. add all file into git (git ignores empty directories by default)
```sh
git add .
```

 4. link between local and repository
```sh
git remote add origin https://github.com/Nguyentanengr/initial-react-app.git
```

 5. commit and push project to branch master in repository
```sh
git commit -m 'initial react app;
git push origin master
```

# How to clone project and run

 1. copy url of project ('https://github.com/.../initial-react-app.git') and run command
```sh
git clone https://github.com/Nguyentanengr/initial-react-app.git
```

2. Open cmd and move to project
```
cd frontend
```

 3. install library packages defined inside the project
```sh
npm install 
```

 4. run project 
```sh
npm run dev
```

