import express from 'express';
import userRoute from './routes/user.js';
const app = express();
const port = 4000;
//using routes
app.use("/api/v1/user", userRoute);
app.listen(port, () => {
    console.log(`Express is working on http://localhost:${port}`);
});
