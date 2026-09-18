
# Chatify

A modern interactive web application with a chat-inspired interface, interactive components, tutorials, search, support, and a dedicated backend.

## 🔗 Live Demo

**Frontend:**  
https://forntend-gold.vercel.app/

---

## 📌 About

Chatify is a modern full-stack web application designed with an interactive and user-friendly interface.

The project is divided into two main parts:

- **Frontend** — React-based interactive user interface
- **Backend** — Server-side application with database and Prisma integration

The frontend includes reusable components for hero sections, interactive experiences, tutorials, search, support, and application layout.

---

## ✨ Features

- 💬 Modern chat-inspired interface
- 🎨 Clean and responsive UI
- ⚡ Fast Vite-powered frontend
- 🧩 Reusable React components
- 🔎 Search functionality
- 🛠️ Interactive tools and components
- 📚 Tutorial and learning sections
- 💡 Support and troubleshooting sections
- 🗄️ Backend with Prisma integration
- 📱 Responsive design
- 🌐 Vercel deployment

---

## 🛠️ Tech Stack

### Frontend

- React
- Vite
- JavaScript / JSX
- CSS
- React Components

### Backend

- Node.js
- JavaScript
- Prisma
- Database

### Deployment

- Vercel

### Version Control

- Git
- GitHub

---

## 📂 Project Structure

```text
Chatify/
│
├── Backend/
│   ├── data/
│   ├── prisma/
│   ├── src/
│   ├── .gitignore
│   ├── package.json
│   ├── prisma.config.ts
│   ├── server.js
│   └── skills-lock.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── hero/
│   │   │   ├── interactive/
│   │   │   ├── layout/
│   │   │   ├── search/
│   │   │   ├── support/
│   │   │   └── tutorial/
│   │   │
│   │   ├── config/
│   │   ├── context/
│   │   ├── data/
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
│
└── README.md
````

---

## 🚀 Getting Started

### Clone the Repository

```bash
git clone https://github.com/anshulgusain/Chatify.git
```

### Navigate to the Project

```bash
cd Chatify
```

---

# 🎨 Frontend Setup

Move into the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:5173
```

---

# ⚙️ Backend Setup

Open another terminal and navigate to the backend:

```bash
cd Chatify/Backend
```

Install dependencies:

```bash
npm install
```

Start the backend server:

```bash
npm start
```

> The exact backend command depends on the scripts defined in `Backend/package.json`.

---

## 🧩 Frontend Components

The frontend contains several reusable component groups:

### Hero

Contains the main landing/hero experience.

### Interactive

Contains interactive application components and simulations.

### Layout

Contains the main application layout components.

### Search

Contains search-related UI and functionality.

### Support

Contains troubleshooting and support-related components.

### Tutorial

Contains tutorial, callout, code block, and step-by-step learning components.

---

## 🗄️ Backend

The backend contains:

* Server configuration
* API/server-side logic
* Prisma configuration
* Database-related files
* Backend source code
* Application data

---

## 🌐 Deployment

The frontend is deployed using Vercel.

### Live Application

[https://forntend-gold.vercel.app/](https://forntend-gold.vercel.app/)

---

## 📸 Screenshots

Add application screenshots here.

Example:

```markdown
![Chatify Home](./screenshots/home.png)
```

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome.

To contribute:

1. Fork the repository
2. Create a new branch

```bash
git checkout -b feature/your-feature
```

3. Make your changes
4. Commit your changes

```bash
git add .
git commit -m "Add new feature"
```

5. Push your branch

```bash
git push origin feature/your-feature
```

6. Create a Pull Request

---

## 📄 License

This project currently does not have a specified license.

---

## 🔗 Links

**Live Demo:**
[https://forntend-gold.vercel.app/](https://forntend-gold.vercel.app/)

**GitHub Repository:**
[https://github.com/anshulgusain/Chatify](https://github.com/anshulgusain/Chatify)

---

## 👨‍💻 Project

Built with ❤️ using React, Vite, Node.js, and Prisma.

````

### ⚠️ Ek important cheez

Tumhare screenshot me **`Chatify/Chatify/` jaisa nested folder** dikh raha hai:

```text
new
└── Chatify
    └── Chatify
        ├── Backend
        └── frontend
````

Agar ye accidental hai, to GitHub push karne se pehle ise check kar lena. Terminal me:

```bash
pwd
```

phir:

```bash
ls
```

aur:

```bash
git status
```

