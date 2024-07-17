# Social Media API Project ❤️

Welcome to my second backend project using various technologies and libraries!

<img src="./img/logo.jpg">

<br>

  <summary> Table of contents 📝</summary>
  <ol>
    <li><a href="#about-the-project">About the project</a></li>
    <li><a href="#deploy-🚀">Deploy</a></li>
    <li><a href="#stack">Stack</a></li>
    <li><a href="#er-diagram-from-sql">Database Diagram</a></li>
    <li><a href="#clond">Clone</a></li>
    <li><a href="#endpoints">Endpoints</a></li>
    <li><a href="#future-functionalities">Future functionalities</a></li>
    <li><a href="#contributions">Contributions</a></li>
    <li><a href="#development">Development</a></li>
    <li><a href="#appreciations">Appreciations</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>

## About the project

The main idea of this project is to create a new social media which has users, posts, comments, follows and likes. It uses non-relational database (in our case MongoDB + mongoose library) for data storage. 

The web app has various functionalities for users such as register, login, check profile, amend profile, create posts , update posts, delete post, find a specific post, see all my posts as well as other users posts, like other posts or dislike them and follow/unfollow other users. There are few more functionalities implemented only for admins and super admins of the page. We also have seeders(used to insert data faster in our database in case of refresh) and middlewares(used for authentication methods such as tokens).

The project is developed and now it was deployed to production.
<br> More functionalities coming veeeery soon! :)

## Deploy 🚀

<div align="center">
    <a href="https://tattoo-studio.zeabur.app/"><strong> Coming soon! </strong></a>🚀🚀🚀
</div>

## Stack

Used technologies for the project:

<div align="center">
<a href="https://www.expressjs.com/">
    <img src= "https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB"/>
</a>
<a href="https://nodejs.org/es/">
    <img src= "https://img.shields.io/badge/node.js-026E00?style=for-the-badge&logo=node.js&logoColor=white"/>
</a>
<a href="https://developer.mozilla.org/es/docs/Web/JavaScript">
    <img src= "https://img.shields.io/badge/javascipt-EFD81D?style=for-the-badge&logo=javascript&logoColor=black"/>
</a>
<a href="">
    <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white"/>
</a>
<a href="">
<img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" />
</a>
<a href="">
    <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" alt="JWT" />
</a>
<a href="">
    <img src="https://img.shields.io/badge/bcrypt-3178C6?style=for-the-badge&" alt="TypeScript" />
</a>
 </div>

## Schema from Mongo

<img src="./img/Schema.png">

- 1 Strong entitiy - Users (can exist by itself without depending on another entitiy).
- 1 Weak entitiy - Posts (depends on users, it must be written/posted by a user).
<br>

Even that we have a non relational database project, there is a relation between
the posts and users as a post cannot exist by itself. A post can have likes such as user can have users that he/she follows and on the contrary users that are following.

## Local installation guide

1. Clone the repository from the url:
`git clone https://github.com/yoanastamenova/Social_media.git `
2. Connect the cloned repo with MongoDB 
-  If you dont have Mongo we can use already existing Mongo container from Docker with the following command:
` docker run -d -p 27017:27017 --name mongo -v mongo_data:/data/db -e MONGO_INITDB_ROOT_USERNAME=root -e MONGO_INITDB_ROOT_PASSWORD=root mongo:latest `
3. `npm install`  (to get all the npm needed packages)
4. `npm run dev` to run our server
5. ` npm run seed ` to fill our documents


## Endpoints

<h3> Authentication 🔑</h3>

| Method | URL                    | Action           | Auth           | Body                                              |
|:------:|:----------------------:|:----------------:|:--------------:|:---------------------------------------------------:|
| POST   | /api/auth/register     | Register user    | <center>N/A (public)</center>   | `{ "email": "youremail@email.com",`<br>`"password_hash": "yourPassword" }` |
| POST   | /api/auth/login        | Login user       | <center>N/A (public)</center>   | `{ "email": "youremail@email.com",`<br>`"password_hash": "yourPasswordHashed" }` |

<h3>👥 Users</h3>

| Method | URI                        | Action              | Auth               | Body                                              |
|:------:|:--------------------------:|:-------------------:|:------------------:|:---------------------------------------------------:|
| GET    | /api/users                 | View all users      | Token (superadmin) | <center>N/A</center>                                               |
| GET    | /api/users/profile         | View user profile   | Token (user)       | <center>N/A</center>                                               |
| PUT    | /api/users/profile         | Update user profile | Token (user)       | `{ "first_name": "newFirstName",`<br>`"last_name": "newLastName", "email": "newEmail",`<br>`"password_hash": "newPassword" }` |
| DELETE | /api/users/:id             | Delete user         | Token (superadmin) | <center>N/A</center>                                               |


## Future functionalities

✅ Add timeline option <br>
⬜ Add user biometrics <br>
⬜ Include profile privacy options <br>

## Contribute to the project

Feel free to suggest an improvment or functionality to my project.

There are two ways of doing this:

1. Opening an issue
2. Creating a fork of the repository
   - Creating a new branch
     ```
     $ git checkout -b feature/yourUsername -feat
     ```
   - Make a commit with your changes
     ```
     $ git commit -m 'feat: this X thing'
     ```
   - Make a push to the branch
     ```
     $ git push origin feature/yourUsername -feat
     ```
   - Opening a Pull Request

## Development:

```js
const developer = "yoanastamenova";

console.log("Developed by: " + developer);
```

## Appreciations:

Forever gratefull to GeeksHubs Academy for the oportunety to learn and grow on my career path. <3

## Contact

<a href = "mailto:micorreoelectronico@gmail.com"><img src="https://img.shields.io/badge/Gmail-C6362C?style=for-the-badge&logo=gmail&logoColor=white" target="_blank"></a>
<a href="https://www.linkedin.com/in/linkedinUser/" target="_blank"><img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank"></a>

</p>