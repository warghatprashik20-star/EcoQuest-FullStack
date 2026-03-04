// =============================
// ECOQUEST BACKEND SERVER
// =============================

const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const multer = require("multer");
require("dotenv").config();

console.log("Server file loaded");
console.log("MONGO URI:", process.env.MONGO_URI);

const app = express();

// =============================
// MIDDLEWARE
// =============================
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

// =============================
// DATABASE CONNECTION
// =============================
mongoose.connect("mongodb://127.0.0.1:27017/ecoquest")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log("MongoDB Error:", err));

// =============================
// MODELS
// =============================

// User Model
const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    ecoPoints: { type: Number, default: 0 },
    school: String,
    co2Reduced: { type: Number, default: 0 }
});
const User = mongoose.model("User", userSchema);

// Mission Model
const missionSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    image: String,
    verified: { type: Boolean, default: false }
});
const Mission = mongoose.model("Mission", missionSchema);

// =============================
// AUTH MIDDLEWARE
// =============================
const auth = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ msg: "No token" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch {
        res.status(401).json({ msg: "Invalid token" });
    }
};

// =============================
// AUTH ROUTES
// =============================

// REGISTER
app.post("/api/register", async (req, res) => {
    const { username, email, password, school } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
        username,
        email,
        password: hashedPassword,
        school
    });

    await user.save();
    res.json({ msg: "User Registered Successfully" });
});

// LOGIN
async function login(){
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  try{
    const res = await fetch("http://localhost:5000/api/login",{
      method:"POST",
      headers:{ "Content-Type":"application/json" },
      body: JSON.stringify({
        email: username,
        password: password
      })
    });

    const data = await res.json();

    if(data.token){
      localStorage.setItem("token",data.token);

      // hide login
      document.getElementById("loginSection").style.display="none";

      // show main app
      document.getElementById("mainApp").style.display="block";

      loadLeaderboard();

    }else{
      alert(data.msg);
    }

  }catch(err){
    console.log(err);
  }
}

// =============================
// ECO POINTS ROUTE
// =============================
async function addPoints(val){
  const token = localStorage.getItem("token");
  if(!token){
    alert("Login First");
    return;
  }

  const res = await fetch("http://localhost:5000/api/add-points",{
    method:"POST",
    headers:{
      "Content-Type":"application/json",
      "Authorization":token
    },
    body:JSON.stringify({points:val})
  });

  const data = await res.json();

  document.getElementById("points").innerText=data.ecoPoints;
  document.getElementById("progressFill").style.width=data.ecoPoints+"%";

  loadLeaderboard();
  confetti();
}



// =============================
// LEADERBOARD
// =============================
async function loadLeaderboard(){
  const res = await fetch("http://localhost:5000/api/leaderboard");
  const users = await res.json();

  let board=document.getElementById("leaderboard");
  board.innerHTML="";

  users.forEach((u,i)=>{
    let div=document.createElement("div");
    div.className="leader-item";

    if(i==0)div.classList.add("top1");
    if(i==1)div.classList.add("top2");
    if(i==2)div.classList.add("top3");

    div.innerHTML=`${i+1}. ${u.username} <span>${u.ecoPoints}</span>`;
    board.appendChild(div);
  });
}

// =============================
// SCHOOL LEADERBOARD
// =============================
app.get("/api/school-leaderboard", async (req, res) => {
    const schools = await User.aggregate([
        {
            $group: {
                _id: "$school",
                totalPoints: { $sum: "$ecoPoints" }
            }
        },
        { $sort: { totalPoints: -1 } }
    ]);

    res.json(schools);
});

// =============================
// CARBON FOOTPRINT CALCULATOR
// =============================
app.post("/api/carbon", auth, async (req, res) => {
    const { electricity, vehicle } = req.body;

    const co2 = (electricity * 0.82) + (vehicle * 0.21);

    const user = await User.findById(req.user.id);
    user.co2Reduced += co2;
    await user.save();

    res.json({ totalCO2: co2.toFixed(2) });
});

// =============================
// QUIZ SUBMISSION
// =============================
app.post("/api/quiz", auth, async (req, res) => {
    const { score } = req.body;

    const user = await User.findById(req.user.id);
    user.ecoPoints += score * 10;
    await user.save();

    res.json({ ecoPoints: user.ecoPoints });
});

// =============================
// MISSION IMAGE UPLOAD
// =============================
const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});
const upload = multer({ storage });

app.post("/api/mission", auth, upload.single("image"), async (req, res) => {

    const mission = new Mission({
        userId: req.user.id,
        image: req.file.path,
        verified: true // Simulated AI Verification
    });

    await mission.save();

    const user = await User.findById(req.user.id);
    user.ecoPoints += 30;
    await user.save();

    res.json({ msg: "Mission Verified", ecoPoints: user.ecoPoints });
});

// =============================
// ADMIN ANALYTICS
// =============================
app.get("/api/admin", async (req, res) => {
    const totalStudents = await User.countDocuments();
    const totalPoints = await User.aggregate([
        { $group: { _id: null, sum: { $sum: "$ecoPoints" } } }
    ]);
    const totalCO2 = await User.aggregate([
        { $group: { _id: null, sum: { $sum: "$co2Reduced" } } }
    ]);

    res.json({
        totalStudents,
        totalEcoPoints: totalPoints[0]?.sum || 0,
        totalCO2Reduced: totalCO2[0]?.sum || 0
    });
});

app.get("/", (req, res) => {
    res.send("EcoQuest Backend Running 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));