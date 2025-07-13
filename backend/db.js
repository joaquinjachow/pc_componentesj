const mongoose = require('mongoose');

const MONGO_URI = 'mongodb+srv://joacojachow:89lLI7pCTYUj4BAp@pccomponentes.z4idkps.mongodb.net/?retryWrites=true&w=majority&appName=pcComponentes';

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', (err) => console.error('❌ Error de conexión a MongoDB:', err));
db.once('open', () => console.log('✅ Conectado a MongoDB'));

module.exports = mongoose;