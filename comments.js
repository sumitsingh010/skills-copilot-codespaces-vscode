// Create web server

const express = require('express');
const bodyParser = require('body-parser');  
const app = express();
const port = 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// In-memory database
let comments = [];
// Get all comments     
app.get('/comments', (req, res) => {
    res.json(comments);
});
// Add a new comment    
app.post('/comments', (req, res) => {
    const comment = req.body;
    if (!comment || !comment.text) {
        return res.status(400).json({ error: 'Comment text is required' });
    }
    comment.id = comments.length + 1; // Simple ID generation
    comments.push(comment);
    res.status(201).json(comment);
});
// Get a comment by ID
app.get('/comments/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const comment = comments.find(c => c.id === id);
    if (!comment) {
        return res.status(404).json({ error: 'Comment not found' });
    }
    res.json(comment);
});
// Update a comment by ID
app.put('/comments/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const index = comments.findIndex(c => c.id === id);
    if (index === -1) {
        return res.status(404).json({ error: 'Comment not found' });
    }
    const updatedComment = req.body;
    if (!updatedComment || !updatedComment.text) {
        return res.status(400).json({ error: 'Comment text is required' });
    }
    comments[index] = { ...comments[index], ...updatedComment };
    res.json(comments[index]);
});
// Delete a comment by ID
app.delete('/comments/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const index = comments.findIndex(c => c.id === id);
    if (index === -1) {
        return res.status(404).json({ error: 'Comment not found' });
    }
    comments.splice(index, 1);
    res.status(204).send();
});
// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
// Export the app for testing
module.exports = app;
// This code sets up a simple Express.js server with CRUD operations for comments.
// It includes endpoints to get all comments, add a new comment, get a comment by ID,
// update a comment by ID, and delete a comment by ID. The comments are stored in an in-memory array.
// The server listens on port 3000, and the app is exported for testing purposes.
// The code uses body-parser middleware to parse JSON and URL-encoded request bodies.
// The comments are expected to have a 'text' property, and each comment is assigned a simple ID based on its position in the array.
// The server responds with appropriate status codes and error messages when necessary.
// The code is structured to handle errors gracefully, ensuring that the client receives meaningful feedback when operations fail.
// The server can be tested using tools like Postman or curl to verify the functionality of each endpoint.  
// The code is modular and can be easily extended to include more features or integrate with a database in the future.
// The comments array is initialized as an empty array, and each comment is expected to have a 'text' property.
// The server uses JSON format for request and response bodies, making it suitable for modern web applications.
// The server can be run using Node.js, and it will listen for incoming requests on port 3000.
// The code is designed to be simple and easy to understand, making it a good starting point for learning about RESTful APIs with Express.js.
// The server can be tested locally by sending HTTP requests to the defined endpoints.
// The code is structured to follow best practices for RESTful API design, ensuring that it is easy to maintain and extend. 
// The server can be integrated with a front-end application to provide a complete commenting system.
// The code can be further enhanced by adding features like user authentication, comment moderation, or pagination for large comment lists.
// The server can be deployed to a cloud platform like Heroku or AWS for production use.