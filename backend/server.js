import { app } from "./app.js";
import { connectDB } from "./src/config/db.js";
import { env } from "./src/config/env.js";


const startServer = async () =>{
  //connect to MongoDB
  try{
    
    await connectDB();

    //start the server
    const PORT = env.PORT;
    app.listen(PORT, () => {
      console.log("Server is running at port ", PORT);
    });
  }
  catch(err){
    process.exit(1);
  }
};

startServer();



