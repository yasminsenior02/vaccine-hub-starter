require("dotenv").config()
require("colors")

const PORT =  process.env.PORT ? Number(process.env.PORT) : 3001

function getDatabaseUri(){
   const dbUser = process.env.DATABSE_USER || "postgres"
   const dbPass = process.env.DATABSE_PASS ? encodeURI(process.env.DATABSE_PASS) : "postgres"
   const dbHost = process.env.DATABSE_HOST || "localhost"
   const dbPort = process.env.DATABSE_PORT || 5432
   const dbName = process.env.DATABSE_NAME || "vaccine_hub"

   return process.env.DATABSE_URI || 
}