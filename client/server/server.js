import express from "express";
import { rateLimit } from "express-rate-limit";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import cors from "cors";
import helmet from "helmet";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { OAuth2Client } from "google-auth-library";

dotenv.config({});
const app = express();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.log("MongoDB connection failed");
    process.exit(1);
  }
};

connectDB();

// --- Schemas ---
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    photoURL: { type: String },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

const petSchema = new mongoose.Schema(
  {
    petName: { type: String, required: true },
    species: { type: String, required: true },
    breed: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    color: { type: String, required: true },
    imageURL: { type: String, required: true },
    healthStatus: { type: String, required: true },
    vaccinationStatus: { type: String, required: true },
    location: { type: String, required: true },
    adoptionFee: { type: Number, required: true },
    description: { type: String, required: true },
    ownerEmail: { type: String, required: true },
    ownerPhone: { type: String, required: true },
    ownerAddress: { type: String, required: true },
    status: { type: String, default: "Available" },
  },
  { timestamps: true }
);

const Pet = mongoose.model("Pet", petSchema);

const requestSchema = new mongoose.Schema(
  {
    petId: { type: mongoose.Schema.Types.ObjectId, ref: "Pet", required: true },
    petName: { type: String, required: true },
    requesterName: { type: String, required: true },
    requesterEmail: { type: String, required: true },
    ownerEmail: { type: String, required: true },
    pickupDate: { type: Date, required: true },
    message: { type: String, required: true },
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

const AdoptionRequest = mongoose.model("AdoptionRequest", requestSchema);

// --- Middlewares ---
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  skipSuccessfulRequests: true,
  message: {
    message: "Too many login attempts, please try again after 15 minutes",
  },
});

app.use(helmet());
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Access Denied" });

  try {
    const verified = jwt.verify(token, process.env.SESSION_SECRET || "fallback_secret");
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid Token" });
  }
};

// --- Routes ---
app.get("/", (req, res) => {
  res.json({ message: "Pet Adoption Server is running" });
});

// Auth Routes
app.post("/api/auth/register", authLimiter, async (req, res) => {
  try {
    const { name, email, photoURL, password } = req.body;
    
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    // Validate password
    const regex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!regex.test(password)) {
      return res.status(400).json({ message: "Password must be at least 6 characters, with 1 uppercase and 1 lowercase letter." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, photoURL, password: hashedPassword });
    await user.save();

    res.status(201).json({ confirmation: true, message: "Registration successful" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

app.post("/api/auth/login", authLimiter, async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, email: user.email, name: user.name, photoURL: user.photoURL },
      process.env.SESSION_SECRET || "fallback_secret",
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      confirmation: true,
      user: { id: user._id, email: user.email, name: user.name, photoURL: user.photoURL },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/api/auth/logout", (req, res) => {
  res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
  });
  res.status(200).json({ message: "Logged out" });
});

app.post("/api/auth/google", async (req, res) => {
  try {
    const { token } = req.body;
    
    if (!token) {
      return res.status(400).json({ message: "No token provided" });
    }

    const client = new OAuth2Client(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID);
    
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name, picture } = payload;

    // Check if user exists
    let user = await User.findOne({ email });

    if (!user) {
      // Create new user from Google data
      const googleUser = new User({
        name: name || email.split("@")[0],
        email,
        photoURL: picture || "",
        password: await bcrypt.hash(Math.random().toString(36), 10), // Random password for OAuth users
      });
      user = await googleUser.save();
    }

    // Generate JWT token
    const jwtToken = jwt.sign(
      { id: user._id, email: user.email, name: user.name, photoURL: user.photoURL },
      process.env.SESSION_SECRET || "fallback_secret",
      { expiresIn: "1d" }
    );

    res.cookie("token", jwtToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      confirmation: true,
      user: { id: user._id, email: user.email, name: user.name, photoURL: user.photoURL },
    });
  } catch (error) {
    console.error("Google auth error:", error);
    res.status(500).json({ message: "Google authentication failed", error: error.message });
  }
});

app.get("/api/auth/check", verifyToken, (req, res) => {
  res.status(200).json({ authenticated: true, user: req.user });
});

// Pet Routes
app.post("/api/pets", verifyToken, async (req, res) => {
  try {
    const petData = { ...req.body, ownerEmail: req.user.email };
    const pet = new Pet(petData);
    await pet.save();
    res.status(201).json({ confirmation: true, pet });
  } catch (error) {
    res.status(500).json({ message: "Failed to add pet", error: error.message });
  }
});

app.get("/api/pets", async (req, res) => {
  try {
    const { search, species } = req.query;
    let query = {};
    if (search) {
      query.petName = { $regex: search, $options: "i" };
    }
    if (species) {
      query.species = { $in: species.split(",") };
    }
    const pets = await Pet.find(query).sort({ createdAt: -1 });
    res.status(200).json(pets);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch pets" });
  }
});

app.get("/api/pets/:id", async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (!pet) return res.status(404).json({ message: "Pet not found" });
    res.status(200).json(pet);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch pet" });
  }
});

app.get("/api/owner/pets", verifyToken, async (req, res) => {
  try {
    const pets = await Pet.find({ ownerEmail: req.user.email }).sort({ createdAt: -1 });
    res.status(200).json(pets);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch owner's pets" });
  }
});

app.put("/api/pets/:id", verifyToken, async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (!pet) return res.status(404).json({ message: "Pet not found" });
    if (pet.ownerEmail !== req.user.email) return res.status(403).json({ message: "Unauthorized" });

    const updatedPet = await Pet.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedPet);
  } catch (error) {
    res.status(500).json({ message: "Failed to update pet" });
  }
});

app.delete("/api/pets/:id", verifyToken, async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (!pet) return res.status(404).json({ message: "Pet not found" });
    if (pet.ownerEmail !== req.user.email) return res.status(403).json({ message: "Unauthorized" });

    await Pet.findByIdAndDelete(req.params.id);
    await AdoptionRequest.deleteMany({ petId: req.params.id });
    res.status(200).json({ message: "Pet deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete pet" });
  }
});

// Request Routes
app.post("/api/requests", verifyToken, async (req, res) => {
  try {
    const { petId, petName, ownerEmail, pickupDate, message } = req.body;
    
    if (req.user.email === ownerEmail) {
      return res.status(400).json({ message: "You cannot request your own pet" });
    }

    const existingRequest = await AdoptionRequest.findOne({ petId, requesterEmail: req.user.email });
    if (existingRequest) {
      return res.status(400).json({ message: "You have already requested this pet" });
    }

    const request = new AdoptionRequest({
      petId,
      petName,
      requesterName: req.user.name,
      requesterEmail: req.user.email,
      ownerEmail,
      pickupDate,
      message,
    });
    await request.save();
    res.status(201).json({ confirmation: true, request });
  } catch (error) {
    res.status(500).json({ message: "Failed to submit request", error: error.message });
  }
});

app.get("/api/requests/user", verifyToken, async (req, res) => {
  try {
    const requests = await AdoptionRequest.find({ requesterEmail: req.user.email }).sort({ createdAt: -1 });
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user requests" });
  }
});

app.get("/api/requests/owner", verifyToken, async (req, res) => {
  try {
    const requests = await AdoptionRequest.find({ ownerEmail: req.user.email }).sort({ createdAt: -1 });
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch owner requests" });
  }
});

app.put("/api/requests/:id/status", verifyToken, async (req, res) => {
  try {
    const { status } = req.body;
    const request = await AdoptionRequest.findById(req.params.id);
    if (!request) return res.status(404).json({ message: "Request not found" });
    if (request.ownerEmail !== req.user.email) return res.status(403).json({ message: "Unauthorized" });

    request.status = status;
    await request.save();

    if (status === "approved") {
      await Pet.findByIdAndUpdate(request.petId, { status: "Adopted" });
      await AdoptionRequest.updateMany(
        { petId: request.petId, _id: { $ne: request._id } },
        { status: "rejected" }
      );
    }

    res.status(200).json(request);
  } catch (error) {
    res.status(500).json({ message: "Failed to update request status" });
  }
});

app.delete("/api/requests/:id", verifyToken, async (req, res) => {
  try {
    const request = await AdoptionRequest.findById(req.params.id);
    if (!request) return res.status(404).json({ message: "Request not found" });
    if (request.requesterEmail !== req.user.email) return res.status(403).json({ message: "Unauthorized" });

    await AdoptionRequest.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Request cancelled" });
  } catch (error) {
    res.status(500).json({ message: "Failed to cancel request" });
  }
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server started on port ${process.env.PORT || 5000}`);
});
