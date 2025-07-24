const express = require('express');
const bodyParser = require("body-parser");
const db = require('./models/index.js');
const { City, Airport } = db;

require('dotenv').config();

const { PORT } = require('./config/serverConfig.js');
const ApiRoutes = require('./routes/index.js');

const setupAndStartServer = async () => {
  const app = express();

  // ✅ Register middlewares first
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  // ✅ Register routes before app.listen
  app.use('/api', ApiRoutes);

  // ✅ Optional test route
  app.get('/', (req, res) => {
    res.send("✅ Server is running");
  });

  // ✅ Start server
  app.listen(PORT, async () => {
    console.log(`🚀 Server started on PORT = ${PORT}`);

    // ✅ Optional: sync DB only if needed
    if (process.env.SYNC_DB) {
      await db.sequelize.sync({ force: true });
      console.log("🗄️ Database synced!");
    }

    // ✅ Example test query
    // const city = await City.findOne({ where: { id: 2 } });
    // if (city) {
    //   const airports = await city.getAirports();
    //   console.log(airports.map(a => a.toJSON()));
    // }
  });
};

setupAndStartServer();
