# Habit Tracker

<h2>Description</h2>
<p>This project is a fullstack app built within the MERN stack. The purpose of this application was to gain experience in the MERN stack while building a functional habit tracking application.</p>

<h2>Features</h2>
<p>Below are a list of the basic features this app provides:</p>
<ul>
    <li>Login/Signup</li>
    <li>Login Persistence</li>
    <li>Habit Creation</li>
    <li>Habit Completion, Modification, and Deletion</li>
    <li>Graphs showing habit completion from the last 365 days</li>
</ul>

<h2>Stack Specifics</h2>
<ul>
    <li>MongoDB using Mongoose</li>
    <li>React frontend using Axios queries</li>
    <li>Express backend</li>
    <li>Node.js for middleware</li>
</ul>

<h2>How to use this project</h2>
<p>To use this project yourself, you will need a MongoDB account, since I am not actively hosting this project. Then you will need to do the following steps.</p>

<ol>
    <li>Clone the repository</li>
    <li>Enter the environment variables needed (see [Here](#.env))</li>
    <li>Change to the server directory and run node app.js or node --watch app.js if you are making changes.</li>
    <li>Change to the client directory and run npm start, and it will run the built in script to start the client.</li>
    <li>Finally, you should be able to use the application!</li>
</ol>

<p>If you encounter issues, feel free to reach out to me at trisstonprogramming@gmail.com</p>

# .env

<p>Here are the environment variables you will need in order to run this project</p>

<ul>
    <li>PORT: this is the serverside port</li>
    <li>DB_URI: this is a link that MongoDB generates that will allow you to connect to the database from this application. (See <a href="https://www.mongodb.com/docs/cloud-manager/tutorial/connect-to-mongodb/#connect-to-a-deployment-using-a-mongodb-driver">This Link</a> for more info)</li>
    <li>SECRET: this is a secret key that is used in session management. The way you generate it is up to you.</li>
</ul>
