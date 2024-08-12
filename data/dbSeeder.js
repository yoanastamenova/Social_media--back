import usersSeeder from "./usersSeeder.js";
import postsSeeder from "./postsSeeder.js";

(async () => { 
    console.log("Starting seeders...")
    await usersSeeder();
    await postsSeeder();
})();
