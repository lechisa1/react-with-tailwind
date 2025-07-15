const express= require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT || 3001;
const app=express();
const departmentRoutes = require('./routes/DepartmentRoute');
const userRoutes = require('./routes/user/UserRoute');
const AuthRoute=require('./routes/user/AuthRoute')
const MaintenancesRoute = require('./routes/request/MaintenancesRoute');
app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
    res.send("Hello World!");
});
 app.use("/department/api", departmentRoutes);
 app.use("/users/api", userRoutes);
 app.use('/auth',AuthRoute);
 app.use("/maintenances/api", MaintenancesRoute);
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));