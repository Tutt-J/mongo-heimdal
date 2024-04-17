const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI,{ ssl : false })
.then(() => console.log('MongoDB connected !'))
.catch(() => console.log('Erreur with MongoDB connection'));