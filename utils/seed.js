const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { getRandomUser, getRandomThoughts } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  // Drop existing courses
  await User.deleteMany({});

  // Drop existing students
  await Thought.deleteMany({});

  // Create empty array to hold the students
  const user = [];

  // Loop 20 times -- add students to the students array
  for (let i = 0; i < 10; i++) {
    // Get some random assignment objects using a helper function that we imported from ./data
    const thoughts = getRandomThoughts(10);

    const username = getRandomUser(10);

    user.push({
      username,
      email,
      thoughts,
      friends,
    });
  }

  // Add students to the collection and await the results
  await User.collection.insertMany(user);

  // Add courses to the collection and await the results
  await Thought.collection.insertOne({
    thoughtText: 'Today is a good day!',
    createdAt: Date.now,
    username: [...user],
  });

  // Log out the seed data to indicate what should appear in the database
  console.table(user);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});