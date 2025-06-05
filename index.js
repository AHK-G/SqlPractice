const { MongoClient, ObjectId } = require("mongodb");

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const database = client.db("myDatabase");

    const collection = database.collection("myCollection");
    const userCommentsCollection = database.collection("user_comments");


    // const deleteResult = await collection.deleteOne({ name: "Alice" });
    // console.log(`Deleted ${deleteResult.deletedCount} document(s) from myCollection`);


    //    const insertResult = await userCommentsCollection.insertOne({
    //     user_id: "123456",
    //      comment: "dirty hotel",
    //     timestamp: new Date(),
    //     rating: 1,
    //      location: "london",
    //    });

    //  console.log(`New comment inserted with id: ${insertResult.insertedId}`);


    // const commentDelete = await userCommentsCollection.deleteOne({
    //    user_id: "12345",
    //    comment: "dirty hotel"
    //  });
    //  console.log(`Deleted ${commentDelete.deletedCount} comment(s)`);


    const users = await collection.find({}).toArray();
    console.log("Users:", users);

    const comments = await userCommentsCollection.find({}).toArray();
    console.log("User Comments:", comments);

  } finally {
    await client.close();
  }
}

run().catch(console.error);



// to run mongodb Servers : sudo systemctl start mongod
// log into PostgresQL: sudo -i -u postgres the psql
// log into database: psql -U arash -d traveldb
// then use any sql commands like: SELECT * FROM flight;

// INSERT INTO "user" ("first_name", "family_name", "birthday")
// VALUES ('Carl', 'Johnson', '1968-08-11')
// RETURNING id;
// SELECT * FROM "user";


// INSERT INTO "hotel" ("name", "address", "phone_number")
// VALUES ('Hilton', 'Karlsplatz 1', '111-222-333')
// RETURNING id;
//SELECT * FROM "hotel";

// DELETE FROM "hotel" WHERE "id" = 2;

// INSERT INTO "flight" ("flight_number", "start_time", "end_time", "destination")
// VALUES ('607080', '2025-06-01 10:00:00+00', '2025-06-01 12:00:00+00', 'Vienna')
// RETURNING id;

// SELECT * FROM "flight";

// INSERT INTO "flight_user" ("flight_id", "user_id")
// VALUES (1, 1);

// SELECT * FROM "flight_user" WHERE "user_id" = 1;

// INSERT INTO "hotel_user" ("hotel_id", "user_id")
// VALUES (1, 1);

// SELECT * FROM "hotel_user" WHERE "user_id" = 1;


// SELECT 
//     "user"."first_name", 
//     "user"."family_name", 
//     "user"."birthday", 
//     "flight"."flight_number", 
//     "flight"."destination", 
//     "hotel"."name" AS "hotel_name"
// FROM 
//     "user"                              
// LEFT JOIN 
//     "flight_user" ON "user"."id" = "flight_user"."user_id"                        
// LEFT JOIN 
//     "flight" ON "flight_user"."flight_id" = "flight"."id"                       
// LEFT JOIN 
//     "hotel_user" ON "user"."id" = "hotel_user"."user_id"                       
// LEFT JOIN 
//     "hotel" ON "hotel_user"."hotel_id" = "hotel"."id";

//     WHERE 
//     "user"."id" = 1;  


// WHERE can be removed so it can show all users details but pay attention to the semiclon
// wherever code ends, semicolon should be there







// SELECT
//     u.id AS user_id,
//     u.first_name,
//     u.family_name,
//     u.birthday,
//     c.comment,
//     c.created_at
// FROM
//     "user" u
// JOIN
//     hotel_user hu ON u.id = hu.user_id
// LEFT JOIN
//     comments c ON hu.id = c.hotel_user_id
// WHERE
//     u.id = 1  -- Replace with any user ID you want to inspect
// ORDER BY
//     c.created_at;

//SELECT * FROM comments ORDER BY created_at DESC;


//ALTER TABLE hotel_user
// DROP COLUMN comment;

//DELETE FROM comments
// WHERE hotel_user_id = 1
// AND comment = 'Room was clean and cozy.'
// AND created_at = '2025-04-11 16:27:23.059526';
