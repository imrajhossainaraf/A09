import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

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

const locations = ["New York, NY", "Los Angeles, CA", "Chicago, IL", "Houston, TX", "Phoenix, AZ", "Philadelphia, PA", "San Antonio, TX", "San Diego, CA", "Dallas, TX", "San Jose, CA"];
const healthStatuses = ["Healthy", "Excellent", "Good", "Under Treatment", "Recovering"];
const vaccinationStatuses = ["Fully Vaccinated", "Up to date", "Partially Vaccinated", "Not required"];
const colors = ["Black", "White", "Brown", "Golden", "Grey", "Tabby", "Calico", "Orange", "Mixed"];

const petTemplates = [
  // Dogs
  { species: "Dog", breed: "Golden Retriever", name: "Bella", img: "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=800" },
  { species: "Dog", breed: "German Shepherd", name: "Max", img: "https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?auto=format&fit=crop&q=80&w=800" },
  { species: "Dog", breed: "Beagle", name: "Charlie", img: "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&q=80&w=800" },
  { species: "Dog", breed: "Poodle", name: "Cooper", img: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=800" },
  { species: "Dog", breed: "Bulldog", name: "Rocky", img: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=800" },
  { species: "Dog", breed: "Husky", name: "Sky", img: "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&q=80&w=800" },
  { species: "Dog", breed: "Dachshund", name: "Oscar", img: "https://images.unsplash.com/photo-1518349619113-03114f06ac3a?auto=format&fit=crop&q=80&w=800" },
  { species: "Dog", breed: "Labrador", name: "Buddy", img: "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=800" },
  { species: "Dog", breed: "Boxer", name: "Duke", img: "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?auto=format&fit=crop&q=80&w=800" },
  { species: "Dog", breed: "Shih Tzu", name: "Coco", img: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=800" },

  // Cats
  { species: "Cat", breed: "Siamese", name: "Luna", img: "https://images.unsplash.com/photo-1513245543132-31f507417b26?auto=format&fit=crop&q=80&w=800" },
  { species: "Cat", breed: "Tabby", name: "Milo", img: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=800" },
  { species: "Cat", breed: "Persian", name: "Oliver", img: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=800" },
  { species: "Cat", breed: "Maine Coon", name: "Leo", img: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&q=80&w=800" },
  { species: "Cat", breed: "Bengal", name: "Simba", img: "https://images.unsplash.com/photo-1513245543132-31f507417b26?auto=format&fit=crop&q=80&w=800" },
  { species: "Cat", breed: "Ragdoll", name: "Misty", img: "https://images.unsplash.com/photo-1511275539165-cc46b1ee89bf?auto=format&fit=crop&q=80&w=800" },
  { species: "Cat", breed: "British Shorthair", name: "Shadow", img: "https://images.unsplash.com/photo-1548546738-8509cb246ed3?auto=format&fit=crop&q=80&w=800" },
  { species: "Cat", breed: "Sphynx", name: "Cleo", img: "https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?auto=format&fit=crop&q=80&w=800" },

  // Birds
  { species: "Bird", breed: "Parrot", name: "Kimbi", img: "https://images.unsplash.com/photo-1484557918186-73442918a611?auto=format&fit=crop&q=80&w=800" },
  { species: "Bird", breed: "Cockatiel", name: "Sunny", img: "https://images.unsplash.com/photo-1522858547137-f1dcec554f55?auto=format&fit=crop&q=80&w=800" },
  { species: "Bird", breed: "Macaw", name: "Rio", img: "https://images.unsplash.com/photo-1452570053594-1b985d6ea890?auto=format&fit=crop&q=80&w=800" },
  { species: "Bird", breed: "Canary", name: "Goldie", img: "https://images.unsplash.com/photo-1606567595334-d39972c85dbe?auto=format&fit=crop&q=80&w=800" },

  // Rabbits
  { species: "Rabbit", breed: "Holland Lop", name: "Daisy", img: "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?auto=format&fit=crop&q=80&w=800" },
  { species: "Rabbit", breed: "Netherland Dwarf", name: "Bun Bun", img: "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?auto=format&fit=crop&q=80&w=800" },
  { species: "Rabbit", breed: "Lionhead", name: "Cotton", img: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&q=80&w=800" },

  // Other (Reptiles & Small Mammals)
  { species: "Other", breed: "Bearded Dragon", name: "Spike", img: "https://images.unsplash.com/photo-1504198266287-1659872e6590?auto=format&fit=crop&q=80&w=800" },
  { species: "Other", breed: "Guinea Pig", name: "Gismo", img: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=800" },
  { species: "Other", breed: "Hamster", name: "Nibbles", img: "https://images.unsplash.com/photo-1425082661705-1834bfd09dca?auto=format&fit=crop&q=80&w=800" },
  { species: "Other", breed: "Gecko", name: "Ziggy", img: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&q=80&w=800" },
  { species: "Other", breed: "Turtle", name: "Shelly", img: "https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?auto=format&fit=crop&q=80&w=800" },
];

// Double the data by creating variations
const finalPets = [];

for (let i = 0; i < 45; i++) {
  const template = petTemplates[i % petTemplates.length];
  const age = Math.floor(Math.random() * 8) + 1;
  const gender = Math.random() > 0.5 ? "Male" : "Female";
  const location = locations[Math.floor(Math.random() * locations.length)];
  const healthStatus = healthStatuses[Math.floor(Math.random() * healthStatuses.length)];
  const vaccinationStatus = vaccinationStatuses[Math.floor(Math.random() * vaccinationStatuses.length)];
  const color = colors[Math.floor(Math.random() * colors.length)];
  const adoptionFee = Math.floor(Math.random() * 200) + 50;
  
  // Slightly vary the name for duplicates
  const suffix = i >= petTemplates.length ? ` II` : "";
  
  finalPets.push({
    petName: template.name + suffix,
    species: template.species,
    breed: template.breed,
    age: age,
    gender: gender,
    color: color,
    imageURL: template.img,
    healthStatus: healthStatus,
    vaccinationStatus: vaccinationStatus,
    location: location,
    adoptionFee: adoptionFee,
    description: `${template.name} is a wonderful ${template.breed} looking for a loving home in ${location.split(',')[0]}. This ${template.species.toLowerCase()} is ${healthStatus.toLowerCase()} and ${vaccinationStatus.toLowerCase()}. They have a great personality and would make a perfect companion for anyone who loves animals.`,
    ownerEmail: "admin@example.com",
    ownerPhone: "+1 (555) 123-4567",
    ownerAddress: `123 Pet Lane, ${location}`,
    status: "Available"
  });
}

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB for production-ready seeding...");

    // Clear existing pets
    await Pet.deleteMany({});
    console.log("Cleared existing pets.");

    // Insert sample pets
    await Pet.insertMany(finalPets);
    console.log(`Successfully seeded ${finalPets.length} pets across multiple species!`);

    mongoose.connection.close();
    console.log("Database connection closed.");
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDB();
