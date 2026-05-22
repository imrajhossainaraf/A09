Assignment Category: CAT_10
Requirement Video: Pet Adoption Requirement.mp4
Pet Adoption Platform
Project Overview and Discussion
You are going to build a full-stack Pet Adoption Platform using the MERN Stack along with authentication and secure backend APIs.
The system allows users to explore pets available for adoption (dogs, cats, birds, rabbits, etc.), view detailed pet profiles, and submit adoption requests.
This project reflects a real-world pet adoption portal where users can browse pets, request adoption, and manage their requests, while pet owners or shelters can manage listings and handle adoption requests.
How the System Works

Users can browse all available pets
Users can view detailed information about each pet
Authenticated users can submit adoption requests
Users can manage their own requests
Pet owners can add, update, and delete pet listings
Pet owners can approve or reject adoption requests
All data will be stored and managed in MongoDB
Ensure the Following Things to Get 100% Mark

GitHub Commits
Minimum 15 meaningful commits (client side)
Minimum 8 meaningful commits (server side)

Readme.md
Include:
Project Name
Purpose
Live URL
Features (at least 5 bullet points)
NPM Packages Used

Other Rules
No Lorem Ipsum text
No default alert() for messages
Use toast/UI-based notifications
Deploy using Vercel / Render
No error on route reload
Logged-in user should not redirect on private route reload
Responsive design (mobile/tablet/desktop)
Secure MongoDB credentials using environment variables
Design should be clean and recruiter-friendly
Do not copy any assignment/module project

Deployment Guideline
Ensure server does not throw CORS / 404 / 504 issues
Live site should work perfectly
Reloading any route should not throw error
Logged-in users must not redirect to login on private route reload
Main Requirements

Layout Structure
Navbar / Header
Include: Logo + Website Name, Home, All Pets, My Requests (Private), Add Pet (Private)
If user logged in: Profile Dropdown (Dashboard, Logout)
If not logged in: Show Login button

Footer
Include: Contact Information, Social Links, Copyright

Dashboard Layout
My Requests, Add Pet, My Listings

Home Page
Banner Section
Eye-catching hero section, Title + short description, “Adopt Now” button

Dynamic Section (Required)
Featured Pets Section: Minimum 6 pets, Card info with “View Details” button

Extra Static Sections
Why Adopt Pets, Success Stories, Pet Care Tips
Add any 2 additional static sections of your choice. You can decide the section names and content based on your creativity.
Authentication

User Login
Email
Password
Login button
If success → redirect to desired route/home
If error → show toast
Also include:
Register link
Google Login

User Registration
Name
Email
Photo URL
Password
Confirm Password
Login Link
Password Validation
At least 6 characters
One uppercase letter
One lowercase letter
Password & Confirm Password must be same
If success → redirect to login/home
If error → show message

Do NOT implement email verification or forget password!!!
CRUD Operations

All Pets (Main Layout) (Public Route)
Display all pets in cards with a “View Details” button (Navigates to the Pet’s details page)
!!! If user clicks “Adopt Now” without login → redirect to login
Add Pet (Dashboard Layout) (Private Route)
Fields:
Pet Name
Species (Dog/Cat/Bird/etc.)
Breed
Age
Gender
Image URL (imgbb/postimage)
Health Status
Vaccination Status
Location
Adoption Fee
Description
Owner Email (auto-filled read only)
If success → Show success toast message and redirect to (My Listings page)
If error → show relevant message
Store in: MongoDB pets collection
Pet Details + Adoption (Main Layout) (Private Route)
Display full pet details along with an Adoption Form.
Implement the form in a side panel, right section, or a modal:
Pet Name (Read Only)
User Name (Read Only)
User Email (Read Only)
Pickup Date
Message
Adopt Button
Default status: "pending"

My Listings (Dashboard Layout) (Private Route)
Display:
Title
Stats (Total Listings, Available, Adopted)
Show Pet’s card:
Image
Name
Price
Requests Button (Open Requests Modal)
Edit Button (Open Update Pet Modal/Navigate Update Pet Page)
View Button (Navigate to Pet details page)
Delete Button
Requests Modal:
Display:
Title
Requested User Name, Email
Pickup Date
Approve Button
Reject Button
If already approved or rejected →don’t show Approve Reject Button.

Update (Modal/Page) / Delete Pet (Modal) (Private Route)
Only pet owner can:
Update pet form (Same as Add Pet Form)
Delete pet (with confirmation)
My Requests (Private Route)
Display:
Pet Name
Request Date
Pickup Date
Status (Pending/Approved/Rejected)
View Button (Navigate to Pet Details Page)
Cancel Button (Delete the Request)

Other Requirements

Loading Page
Show spinner while fetching data

Not Found Page
Custom 404 page
Friendly message
Back to Home button
Challenges

Search, Filter & Sorting In All Pets Page
Implement advanced pet browsing features in the All Pets Page:
Search pets by name
Filter pets by species
Use MongoDB operators:
$regex
$in
Follow this documentation: $regex-Documentation, $in-Documentation

Adoption Control
Pet owners are not allowed to submit adoption requests.
If multiple adoption requests exist, only one can be accepted from the Requests Modal
When a request is approved:
Mark the pet as adopted
Prevent further requests

JWT Authentication
Generate token
Store in HTTPOnly cookies
Verify in middleware
Protect private routes

Optional Requirements (Choose Any 2)

Dark/Light Theme Toggle
Framer Motion Animation
Wishlist Feature
What to Submit
Client-side GitHub Repository
Server-side GitHub Repository
Live Website Link
