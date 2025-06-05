const { MongoClient } = require('mongodb');
const { Client } = require('pg');

const pgClient = new Client({
  user: 'arash',
  host: 'localhost',
  database: 'traveldb',
  password: '1234',
  port: 5432,
});

pgClient.connect().catch(console.error);

const mongoURI = 'mongodb://localhost:27017';
const mongoClient = new MongoClient(mongoURI);

mongoClient.connect()
  .then(async () => {
    console.log('Connected to MongoDB');
    const db = mongoClient.db('myDatabase');
    const commentsCollection = db.collection('comments');


    const hotelUserId = 2; 
    const newComments = [
      { userId: 1, comment: "not clean" },

    ];

    for (const c of newComments) {
      const result = await commentsCollection.insertOne({
        userId: c.userId,
        comment: c.comment,
        createdAt: new Date()
      });
      console.log('Inserted to MongoDB:', result.insertedId);

      const query = 'INSERT INTO comments (hotel_user_id, comment) VALUES ($1, $2)';
      await pgClient.query(query, [hotelUserId, c.comment]);
      console.log('Inserted to PostgreSQL');
    }

    mongoClient.close();
    pgClient.end();
  })
  .catch(console.error);
