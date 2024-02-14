const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3001;

// Endpoint to serve JSON files
app.get('/data/:number', (req, res) => {
    const { number } = req.params;
    const filePath = path.join(__dirname, 'data', `${number}.json`);

    // Check if the number is within the expected range
    if (isNaN(number) || number < 1 || number > 404) {
        return res.status(400).send({ error: "Number must be between 1 and 404." });
    }

    // Check if the file exists
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            return res.status(404).send({ error: "File not found." });
        }

        // Send the JSON file
        res.sendFile(filePath);
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
