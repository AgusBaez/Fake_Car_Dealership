# Fake Store Sequelize - API REST(using PostgreSQL)

**_This project is to learn basic concepts about creating APIs with ORM Sequelize, connecting to PostgreSQL to execute queries (creating, reading, updating, deleting and getting data from the database), using an MVC architecture. The Fake_Store database has product tables that have relationships to the category table_**

## Starting 🚀

_install the project and continue reading._

### Pre-requirements 📋

_You need install [PostgreSQL](https://www.postgresql.org/download/) - object-oriented relational database management system - \_or any other object-oriented relational database management system_

```
> npm i
```

```
> npm start
```

```
//load migrations
> npx sequelize-cli db:migrate
```

## Built with 🛠️

- [NodeJS](https://nodejs.org/es/) - Asynchronous event driven JavaScript runtime environment.
- [Express](http://expressjs.com/es//) - The framework used.
- [PostgreSQL](https://www.postgresql.org/download/) - Object-oriented relational database management system.
- [Sequelize](https://sequelize.org/docs/v6/getting-started/) - ORM.
- [Visual Studio Code](https://code.visualstudio.com/) - Code Editor Developed.
- [Post-Man](https://www.postman.com/) - API platform for developers to design, build, test, and iterate on their APIs.
- [JsonWebToken](https://www.npmjs.com/package/jsonwebtoken) - Packague for Authorization.
- [Bcrypt](https://www.npmjs.com/package/bcrypt) - Packague for Password Hashing Function

## Some Questions and Answers 📖

#### **What are the differences between non-relational and relational databases?**

- _A relational database is structured, meaning the data is organized in tables. Many times, the data within these tables have relationships with one another, or dependencies. A non relational database is document-oriented, meaning, all information gets stored in more of a laundry list order_.
  [(Source of) Blog: David Pablo](https://aloa.co/blog/relational-vs-non-relational-database-pros-cons#:~:text=So%2C%20what's%20the%20difference%3F,of%20a%20laundry%20list%20order.).

#### **What are the differences between JWT and cookies?**

![jtwVSCookies](https://res.cloudinary.com/pym/image/upload/c_scale,f_auto,q_auto,w_837/articles/2021/cookie-token/cookie-token-auth)

##### **Cookie-based authentication presents a state (it is stateful).**

> At login, after a user submits their credentials (and they are validated), the server logs data (to remember that the user has successfully logged in). This data that is recorded in the backend, in correspondence with the session identifier, is what is known as status. On the client side, a cookie is created to store the session identifier, while the data is stored on the server (and is called session variables).

**The flow that follows this traditional authentication system is as follows:**

- A user enters her credentials (data that allows her to log in)
- The server verifies that the credentials are correct and creates a session (this may correspond to creating a file, a new record in a database, or some other server-side solution)
- A cookie with the session ID is placed in the user's web browser.
- On subsequent requests, the session ID is compared to sessions created by the server
- Once the user logs out, the session is destroyed on both sides (both client and server)

##### **Token-based authentication is stateless.**

> The server no longer keeps track of which users are connected or which tokens have been issued. This is because every request made to the server is accompanied by a token, and the server verifies the authenticity of the request based solely on the token. As we discussed before, JWT defines a format for tokens. But JWT doesn't tie us to any client-side data persistence mechanism or any rules about how the token should be transported. Tokens are usually sent as an Authorization header, with the value Bearer {JWT}; but they can also be sent in the body of a POST request or even as a query parameter.

**Let's see how it works:**

- A user enters her credentials (data that allows her to log in)
- The server verifies that the credentials are correct and returns a signed token
- The token is stored on the client side, usually in local storage (but can also be stored in session storage or even as a cookie)
- Subsequent requests to the server include this token (via an authorization header or one of the other methods mentioned above)
- The server decodes the JWT and if the token is valid processes the request
- Once the user logs out, the token is destroyed on the client side (no server interaction required).
  [(Source of) Blog: programacionymas](https://programacionymas.com/blog/jwt-vs-cookies-y-sesiones)

#### **What is the authentication standard?**

> Open Authorization is an open standard that enables simple authorization flows for web sites or computer applications. It is a protocol proposed by Blaine Cook and Chris Messina, which allows the secure authorization of an API in a standard and simple way for desktop, mobile and web applications.

##### **What is it for?**

> OAuth allows a user from site A to share their information on site A (service provider) with site B (called consumer) without sharing their full identity
> ![oAuth](https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Oauth_logo.svg/180px-Oauth_logo.svg.png) > [(Source of) Wikipedia](https://es.wikipedia.org/wiki/OAuth)

## Authors ✒️

- **Agustin Baez** - _Initial Work_ - [AgusBaez](https://github.com/AgusBaez).
- **Alexis Nicolás Moragues** - _Mentor_ - [amoragues95](https://github.com/amoragues95).
- **Agustin Baez** - _Documentation_ - [fulanitodetal](https://github.com/AgusBaez).

## Thanks 🎁

- Thanks to my mentor(Alexis Moragues) who proposed the creation of this practice and to Avalith Skill Factory for giving this opportunity to grow as a person and as a programmer 🛣️.
- help me with the youtube video Fatz Code [FatzCode_youtube](https://www.youtube.com/watch?v=3xiIOgYdbiE)📢
- Thanks to the community you can continue learning self-taught 🤓.

---

⌨️ con ❤️ por [Agustin Baez](https://www.linkedin.com/in/agus-baez/) 😊.
