const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Screen = require('./models/Screen');
const Slide = require('./models/Slide');

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected for seeding...'))
  .catch(err => {
    console.error('Connection error:', err);
    process.exit(1);
  });

const seed = async () => {
  const screenId = 'U2ZBeEViNlI0cTFmdHdyUE1ncU5sUT09';

  try {
    // Clear existing data
    await Screen.deleteMany({});
    await Slide.deleteMany({});

    // Create screen
    const screen = await Screen.create({
      screenId,
      location: 'Victoria',
    });

    // Create slides
    const slides = [
      {
        screenId,
        imageUrl: '/images/image2.jpg',
        caption: 'Welcome to Cardbey',
      },
      {
        screenId,
        imageUrl: '/images/image1.jpg',
        caption: 'Today’s Specials!',
      },
    ];

    await Slide.insertMany(slides);
    console.log('✅ Test screen and slides inserted successfully.');
  } catch (err) {
    console.error('❌ Seeding error:', err);
  } finally {
    mongoose.connection.close();
  }
};

seed();
