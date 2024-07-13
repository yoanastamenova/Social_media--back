import userSeeder from "./userSeeder";

(async () => { 
    console.log("Starting seeders...")
    await userSeeder();
})();