const express = require("express");
const app = express()
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const authRoute = require("./routes/auth")
const userRoute = require("./routes/users")
const postRoute = require("./routes/posts")
const categoryRoute = require("./routes/categories")
const multer = require("multer");
const path = require("path");
const crypto = require("crypto");

dotenv.config();
app.use(express.json())
app.use("/images", express.static(path.join(__dirname, '/images')))

mongoose.connect(process.env.MONGO_URL, {
   /* userNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,*/
})
.then(console.log("connecte to mongo"))
.catch(err => console.log(err))

const storage = multer.diskStorage({
    destination:(req,file,cb) => {
        cb(null, "images")
    },filename:(req, file, cb) => {
        // Generate a secure random filename to prevent path traversal attacks
        // Extract the file extension from the original uploaded file
        const originalName = path.basename(file.originalname);
        const ext = path.extname(originalName);
        // Generate cryptographically secure random filename
        const randomName = crypto.randomBytes(16).toString('hex');
        const safeFilename = randomName + ext;
        cb(null, safeFilename)
    }
})

const upload = multer({storage:storage})
app.post("/api/upload", upload.single("file"),(req,res)=>{
    // Return the server-generated filename to the client
    res.status(200).json({
        message: "File has been uploaded",
        filename: req.file.filename
    })
})

app.use("/api/auth", authRoute)
app.use("/api/users", userRoute)
app.use("/api/posts", postRoute)
app.use("/api/categories", categoryRoute)




app.listen("3000", ()=>{
    console.log("Backend is running")
})