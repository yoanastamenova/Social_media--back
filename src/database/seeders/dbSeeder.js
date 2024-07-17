import userSeeder from "./userSeeder.js";
import postSeeder from "./postSeeder.js"

(async () => { 
    console.log("Starting seeders...")
    await userSeeder();
    await postSeeder();
})();