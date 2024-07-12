# Social Media API Project

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
The project is developed untill production and been worked on continously. 
<br> More functionalities coming veeeery soon! :)

## Deploy 🚀

<div align="center">
    <a href="https://tattoo-studio.zeabur.app/"><strong> Click here! </strong></a>🚀🚀🚀
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

## ER Diagram from SQL

<img src="./img/Screenshot 2024-07-03 at 20.05.06.png">

- We have 4 entities in our Database created here. The strong among them is Roles (it can exist by itself), then we have Users which has many to one relation
  with roles. After this, we have Services which has One to many relation with our last entitiy (Appointments). Speaking of it - Appointments is the weekest of all
  entities, because it depends strongly on Users (because of the user_id) and Services(because of the service_id). More or less our database can be easily understood just by looking at the DDL schema posted here.

## Local installation option

1. Clone the repository from the url
2. `$ npm install`
3. Connect the cloned repo with our Database
4. `$ Execute the migrations`
5. `$ Execute the seeders`
6. `$ npm run dev` to elevate our server
7. ...

## Endpoints

<details>
<summary>Authentication</summary>

- AUTH

  - REGISTER

          POST http://localhost:4000/api/auth/register

    body:

    ```js
        {
            "user": "Name",
            "email": "yourmail@mail.com",
            "password": "123456789"
        }
    ```

  - LOGIN

          POST http://localhost:4000/api/auth/login

    body:

    ```js
        {
            "user": "Name",
            "email": "yourmail@mail.com",
            "password": "123456789"
        }
    ```

      </details>
      <details>

<summary>Users</summary>

- USERS

      - GET ALL USERS (ONLY FOR ADMINS)

              GET http://localhost:4000/api/users

          auth:
          ```
          your token

          ```

       - SHOW USER PROFILE

              GET http://localhost:4000/api/users/profile

          auth:
          ```
          your token

          ```

      - CHANGE PROFILE INFO

              PUT http://localhost:4000/api/users/profile/change

          auth:
          ```
          your token

          ```
          body:
          ``` js
              {
                  info you want to change goes here
              }
          ```

      - PROFILE FILTERED BY EMAIL

              GET http://localhost:4000/api/users/:email

          auth:
          ```
          your token
          ```
          body:
          ``` js
               {
                  "email": "the users email goes here"
               }
          ```

      - DELETE USER BY ID

              GET http://localhost:4000/api/users/:id

          auth:
          ```
          your token
          ```
          body:
          ``` js
               {
                  "id": "the ID of the user goes here"
               }
          ```

</details>

<details>

<summary>Appointments</summary>

- APPOINTMENTS

      - CREATE APPOINTMENT

              POST http://localhost:4000/api/appointments/create

          auth:
          ```
          your token
          ```
          body:
          ``` js
              {
                  "appointment_date": "2024/01/01",
                  "service_id": 2
              }
          ```

      - CHANGE APPOINTMENT

              PUT http://localhost:4000/api/appointments/change

          auth:
          ```
          your token
          ```
          body:
          ``` js
              {
                  "id": your appointment id,
                  "infotochange": value
              }
          ```

          - FIND APPOINTMENT BY ID

              GET http://localhost:4000/api/appointments/:id

          auth:
          ```
          your token
          ```
          body:
          ``` js
              {
                  "id": 1
              }
          ```

          - SHOW USER APPOINTMENTS

              GET http://localhost:4000/api/appointments/scheduled

          auth:
          ```
          your token
          ```

          - DELETE APPOINTMENT

              DELETE http://localhost:4000/api/appointments/delete

          auth:
          ```
          your token
          ```
          body:
          ``` js
              {
                  "id": 1
              }
          ```

  </details>

<details>

<summary> Services </summary>

- SERVICES 

    - CREATE SERVICE (only for admins)
        POST http://localhost:4000/api/services

          auth:
          ```
          your token
          ```
          body:
          ``` js
              {
                  "service_name": "Name",
                  "description": "blablabla.com"
              }
          ```

      - SEE ALL SERVICES

              GET http://localhost:4000/api/services

          auth:
          ```
          your token
          ```


      - UPDATE SERVICE (only for admins)

              PUT http://localhost:4000/api/services/:id

          auth:
          ```
          your token
          ```
          body:
          ``` js
              {
                  "id": 2,
                  "description": "blablabla.com"
              }
          ```
       - DELETE SERVICE BY ID

              GET http://localhost:4000/api/services/:id

          auth:
          ```
          your token
          ```
          body:
          ``` js
              {
                  "id": 1
              }
          ```

  </details>


<details>

<summary> Roles </summary>

- ROLES 

    - SEE ALL ROLES (only for admins!)

              GET http://localhost:4000/api/roles

          auth:
          ```
          your token
          ```

    - CREATE ROLE (only for admins)
        POST http://localhost:4000/api/roles/create

          auth:
          ```
          your token
          ```
          body:
          ``` js
              {
                  "id": 1,
                  "name": "hokage"
              }
          ```

      - UPDATE ROLE (only for admins)

              PUT http://localhost:4000/api/roles/update/:id

          auth:
          ```
          your token
          ```
          body:
          ``` js
              {
                  "id": 2,
                  "infotoupdate": "blablabla"
              }
          ```
       - DELETE ROLE

              DELETE http://localhost:4000/api/roles/delete

          auth:
          ```
          your token
          ```
          body:
          ``` js
              {
                  "name": superAdmin
              }
          ```

  </details>

## Future functionalities

✅ Add artists and relate them with appointments (still in progress) 
⬜ Add user biometrics
⬜ Email and password validations
⬜ ...  

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