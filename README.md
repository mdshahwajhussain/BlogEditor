# BlogEditor  

## Overview  
**BlogEditor** is a full-stack blogging application that allows users to **write, edit, save, and publish blogs** with an **auto-save draft feature**. This project demonstrates expertise in **frontend development, backend API design, database integration, and system thinking**.

🔗 **Live Demo:** [BlogEditor on Netlify](https://vermillion-piroshki-2aa96a.netlify.app/)  

## Features  
✅ **Create & Edit Blogs** (Title, Content, Tags)  
✅ **Save as Draft & Publish Blogs**  
✅ **Auto-Save Draft** (every 30 seconds or after 5 sec of inactivity)  
✅ **List all Blogs (Published & Drafts separately)**  
✅ **Edit & Update Existing Drafts or Posts**  
✅ **Real-time Notification on Auto-Save (Toast Message)**  
✅ **Authentication using JWT (Bonus)**  

## Tech Stack  
🚀 **Frontend:** React.js with Next.js  
⚡ **Backend:** Node.js & Express.js  
🛢️ **Database:** MongoDB  
🔑 **Authentication:** JWT (JSON Web Token)  
🔄 **State Management:** React Hooks  
📡 **API:** RESTful APIs  

## Installation & Setup  

### 1️⃣ Clone the Repository  
```bash
git clone https://github.com/mdshahwajhussain/BlogEditor.git
```

### 2️⃣ Navigate to the Project Directory  
```bash
cd BlogEditor
```

### 3️⃣ Install Dependencies  
#### Frontend  
```bash
cd client
npm install
```
#### Backend  
```bash
cd server
npm install
```

### 4️⃣ Set up Environment Variables  
Create a `.env` file in the `server` directory and add:  
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### 5️⃣ Run the Application  
#### Start the Backend Server  
```bash
cd server
npm run dev
```
#### Start the Frontend  
```bash
cd client
npm run dev
```

## API Endpoints  
| Method | Endpoint | Description |  
|--------|---------|------------|  
| **POST** | `/api/blogs/save-draft` | Save or update a draft |  
| **POST** | `/api/blogs/publish` | Save and publish an article |  
| **GET** | `/api/blogs` | Retrieve all blogs |  
| **GET** | `/api/blogs/:id` | Retrieve a blog by ID |  

## Bonus Features  
✨ **Auto-save after 5 seconds of inactivity (Debounce Optimization)**  
✨ **Visual Toast Notification when Draft is Auto-Saved**  
✨ **JWT Authentication for Protected APIs**  

## Folder Structure  
```
BlogEditor/
│── client/        # Frontend Code (React.js, Next.js)
│── server/        # Backend Code (Node.js, Express.js)
│── .env           # Environment Variables
│── README.md      # Project Documentation
│── package.json   # Dependencies and Scripts
```

## Contributing  
Feel free to fork this repository, make improvements, and submit a pull request!  

## License  
This project is licensed under the **MIT License**.  

---

This **README** includes everything from **project overview to setup instructions** and highlights **bonus features** like **auto-save optimizations and JWT authentication**. 🚀  

