import { app } from "./app.js";
import { connectDB, getDbStatus } from "./src/config/db.js";
import { env } from "./src/config/env.js";


const startServer = () =>{
  //connect to MongoDB
  try{
    
    connectDB();

    //start the server
    const PORT = env.PORT;
    app.listen(PORT, () => {
      console.log("Server is running at port ", PORT);
    });
  }
  catch(err){
    console.log(err);
    process.exit(1);
  }
};

startServer();



