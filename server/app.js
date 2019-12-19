const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const checkJwt = require('express-jwt'); // Check for access tokens automatically

/**** Configuration ****/
const PORT = process.env.PORT || 8080;
const app = express();
app.use(cors());
app.use(bodyParser.json()); // Parse JSON from the request body
app.use(morgan('combined')); // Log all requests to the console
app.use(express.static(path.resolve('..', 'client', 'build')));

/**** Test data ****/
const data = [
        {
                id: 1,
                categoryName: "Programming",
                books: [
                        {
                                id: 1,
                                title: "sams teach yourself sql in 10 minutes",
                                author: "Ben Forta",
                                price: 299,
                                nameOfSeller: "Randi Bierbaum",
                                emailOfSeller: "randibierbaum@gmail.com"
                        },
                        {
                                id: 1,
                                title: "Baby Loves Coding!",
                                author: "Ruth Spiro",
                                price: 90,
                                nameOfSeller: "Rasmus Bierbaum",
                                emailOfSeller: "rasmus@gmail.com"
                        }
                ]
        },
        {
                id: 2,
                categoryName: "Interface Design",
                books: [
                        {
                                id: 1,
                                title: "About Face",
                                author: "Alan Cooper",
                                price: 265,
                                nameOfSeller: "Olivia Lüttge",
                                emailOfSeller: "Olivia@gmail.com"
                        },
                        {
                                id: 2,
                                title: "Don't Make Me Think",
                                author: "Steve Krug",
                                price: 180,
                                nameOfSeller: "John Doe",
                                emailOfSeller: "john@gmail.com"
                        },
                        {
                                id: 3,
                                title: "The Design of Everyday Things",
                                author: "Donald A. Norman",
                                price: 146,
                                nameOfSeller: "Jane Doe",
                                emailOfSeller: "jane@gmail.com"
                        }
                ]
        },
        {
                id: 3,
                categoryName: "Front-end",
                books: [
                        {
                                id: 1,
                                title: "The Non-Designer's Design Book",
                                author: "Robin Williams",
                                price: 249,
                                nameOfSeller: "Olivia Lüttge",
                                emailOfSeller: "Olivia@gmail.com"
                        },
                        {
                                id: 2,
                                title: "Atomic design",
                                author: "Brad Frost",
                                price: 180,
                                nameOfSeller: "John Doe",
                                emailOfSeller: "john@gmail.com"
                        }
                ]
        }
];

//**** Login validation ****/
// Open paths that does not need login. Any route not included here is protected!
let openPaths = [
        /^(?!\/api).*/gim, // Open everything that doesn't begin with '/api'
        '/api/users/authenticate',
        '/api/users/create',
        { url: '/api/categories', methods: ['GET']} // Open GET questions, but not POST.
];

// Validate the user using authentication. checkJwt checks for auth token.
const secret = process.env.SECRET || "the cake is a lie";
if (!process.env.SECRET) console.error("Warning: SECRET is undefined.");
app.use(checkJwt({ secret: secret }).unless({ path : openPaths }));

// This middleware checks the result of checkJwt
app.use((err, req, res, next) => {
        if (err.name === 'UnauthorizedError') { // If the user didn't authorize correctly
                res.status(401).json({ error: err.message }); // Return 401 with error message.
        } else {
                next(); // If no errors, send request to next middleware or route handler
        }
});

/**** Database access layers *****/
const categoryDAL = require('./dal/category_dal')(mongoose);
const userDAL = require('./dal/user_dal')(mongoose);

/**** Start ****/
const dburl = process.env.MONGO_URL || 'mongodb+srv://randi:Sommerfugl89@cluster0-retun.mongodb.net/test?retryWrites=true&w=majority';
//const dburl = process.env.MONGO_URL || 'mongodb://localhost/secondhand-book-store';
mongoose.connect(dburl, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(async () => {
        console.log("Database connected");
        await categoryDAL.bootstrap();
        await userDAL.bootstrapTestusers();

        /**** Routes ****/
        app.get('/api/categories', (request, response) => {
                categoryDAL.getCategories().then(categories => response.json(categories));
        });


        const usersRouter = require('./routers/user_router')(userDAL, secret);
        app.use('/api/users', usersRouter);

        const bookRouter = require('./routers/book_router')(categoryDAL);
        app.use('/api/categories', bookRouter);

        const categoryRouter = require('./routers/category_router')(categoryDAL);
        app.use('/api/categories', categoryRouter);

        // "Redirect" all get requests (except for the routes specified above) to React's entry point (index.html)
        // It's important to specify this route as the very last one to prevent overriding all of the other routes
        app.get('*', (req, res) =>
            res.sendFile(path.resolve('..', 'client', 'build', 'index.html'))
        );

        // When DB connection is ready, let's open the API
        await app.listen(PORT); //Start the API
        console.log(`QA API running on port ${PORT}!`)
    })
    .catch(error => { console.error(error) });
