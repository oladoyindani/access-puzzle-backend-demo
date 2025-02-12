// server/seedStaff.js
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User'); // Adjust the path if needed

// Connect to MongoDB using your connection string from .env
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
    seedStaff();
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

async function seedStaff() {
  try {
    // Optional: Clear existing staff records
    await User.deleteMany({ role: 'staff' });

    // Sample staff data
    const staffUsers = [
      {
        name: 'Oladoyin Daniel',
        email: 'oladoyindan@gmail.com',
        staffId: 'STAFF001',
        role: 'staff',
      },
      {
        name: 'Oluwademilade Esther',
        email: 'bob.smith@company.com',
        staffId: 'STAFF002',
        role: 'staff',
      },
      {
        name: 'John Doe',
        email: 'johndoe@gmail.com',
        staffId: 'STAFF003',
        role: 'staff',
      },
    ];

    // Insert the sample staff data into the database
    const inserted = await User.insertMany(staffUsers);
    console.log('Staff users seeded:', inserted);
    process.exit(0);
  } catch (err) {
    console.error('Error seeding staff:', err);
    process.exit(1);
  }
}
