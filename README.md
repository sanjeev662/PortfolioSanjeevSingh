# 🚀 Portfolio - Sanjeev Kumar Singh

[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-06b6d4.svg)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## 📋 Overview

This is my **personal portfolio website** built with React.js, showcasing my professional journey as a **Full Stack Developer** specializing in **JavaScript** and **Java**. The portfolio serves as a comprehensive digital resume reflecting my accomplishments and expertise in software development.

**🔗 [View My Resume](https://drive.google.com/file/d/1owTJHwvsvIn8PpVRFsKLpSqQIarMIKe9/view)** | **🌐 [Live Portfolio](https://portfolio-sanjeev-singh.vercel.app/)** | **🌐 [Live Portfolio-Stage](https://portfolio-sanjeev-singh-stage.vercel.app/)**

## 👨‍💻 About Me - The Heart of This Portfolio ⭐

**This portfolio is designed around my personal and professional story.** I'm **Sanjeev Kumar Singh**, a passionate Full Stack Developer based in **Noida, India**, with expertise in modern web technologies and a strong foundation in competitive programming.

- 🎓 **Education**: B.Tech in Information Technology 
- 💼 **Role**: Software Development Engineer (SDE)
- 🌟 **Specialization**: Full Stack Development with JavaScript, Java, React.js, and Spring Boot
- 🏆 **Achievements**: Competitive Programming & Professional Certifications
- 💡 **Passion**: Problem-Solving & Building Innovative Solutions

## 🏗️ Portfolio Architecture

This portfolio follows a **strategic two-tier information structure**:

### 🏠 Home Page - Quick Overviews
- **Professional introduction** with animated typing effects
- **Interactive preview cards** for each major section
- **Key highlights** of achievements and skills
- **Call-to-action buttons** directing to detailed sections

### 📄 Dedicated Pages - Comprehensive Details
- **About**: Complete professional journey and personal story
- **Projects**: Featured full-stack applications and technical showcases
- **Certificates**: Professional certifications and competitive programming achievements
- **Domain Expertise**: Technical skills and areas of specialization
- **Contact**: Professional contact form and social media links

## ✨ Key Features

- **🏠 Home Section**: Professional introduction with animated typing effects
- **👨‍💻 About Me**: Detailed background, education, and career journey ⭐ *FEATURED*
- **💼 Projects**: Showcase of full-stack applications with live demos
- **🏆 Certificates**: Professional certifications and competitive programming achievements
- **🎯 Domain Expertise**: Technical skills and areas of specialization
- **📞 Contact**: Professional contact form and social media links
- **🤖 AI Assistant**: A chat that answers visitors' questions about Sanjeev from the portfolio's own data (Google Gemini)
- **📱 Responsive Design**: Optimized for all device sizes
- **🎨 Modern UI/UX**: Clean design with smooth animations

## 🛠️ Tech Stack

**Frontend:** React.js (18.3.1) • React Router DOM • Tailwind CSS • Framer Motion • Lucide React • React Type Animation

**AI Assistant:** Google Gemini API • Vercel Serverless Function (`api/chat.js`)

**Development:** Create React App • Web Vitals • Testing Library

## 📁 Project Structure

```
PortfolioSanjeevSingh/
├── api/chat.js             # Serverless function behind the AI assistant
├── docs/                   # Design docs
├── src/data/               # All page content (also feeds the AI assistant)
├── src/Components/
│   ├── HomeComponents/     # Home page overview components
│   │   ├── HomeAbout/      # Professional introduction preview
│   │   ├── HomeProjects/   # Featured projects preview
│   │   └── HomeCertificates/ # Achievements preview
│   ├── Maincontaint/       # Detailed page components
│   │   ├── About/          # Complete professional story ⭐
│   │   ├── Projects/       # Detailed project showcases
│   │   ├── Certificates/   # Full achievements gallery
│   │   └── Contacts/       # Professional contact form
│   ├── Chatbot/            # The floating "Ask about Sanjeev" chat
│   └── Assets/             # Project screenshots, certificates
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14+) and npm

### Installation
```bash
git clone https://github.com/sanjeev662/PortfolioSanjeevSingh.git
cd PortfolioSanjeevSingh
npm install
npm start
```

Navigate to `http://localhost:3000` to view the portfolio.

### AI Assistant (optional)
The chat calls `/api/chat`, a Vercel serverless function that holds the Gemini API key. `npm start` serves only the React app, so the chat shows a connection error there. To run the site and the function together:

1. Get a key from [Google AI Studio](https://aistudio.google.com/) (a project without billing keeps abuse from ever costing money).
2. In Vercel → Project → Settings → Environment Variables, add `GEMINI_API_KEY` for Development, Preview and Production. `GEMINI_MODEL` is optional (default `gemini-3.5-flash-lite`).
3. Run it locally with the Vercel CLI, which uses the Development variables:

```bash
npm i -g vercel
vercel link   # once, to connect this folder to the Vercel project
vercel dev
```

Never prefix the key with `REACT_APP_`: Create React App copies those variables into the public bundle. Design, API contract and test plan: [docs/ai-chatbot-design.md](docs/ai-chatbot-design.md).

### Available Scripts
- `npm start` - Development mode
- `npm build` - Production build
- `npm test` - Run tests

## 🎯 Design Philosophy

- **Professional Showcase**: Highlighting technical expertise and professional journey
- **User-Centric Navigation**: Easy transition from overviews to detailed information
- **Performance Optimized**: Fast loading with smooth animations using Framer Motion
- **Responsive Design**: Optimized for all devices and screen sizes

## 📞 Contact Information

**Let's connect for collaboration opportunities!**

- **📧 Email**: [sanjeevsinghkaushik662@gmail.com](mailto:sanjeevsinghkaushik662@gmail.com)
- **📱 Phone**: +91-9506009121
- **💼 LinkedIn**: [linkedin.com/in/sanjeev662](https://www.linkedin.com/in/sanjeev662/)
- **🐙 GitHub**: [github.com/sanjeev662](https://github.com/sanjeev662)
- **🌐 Portfolio**: [portfolio-sanjeev-singh.vercel.app](https://portfolio-sanjeev-singh.vercel.app/)
- **📍 Location**: Noida, India

## 📄 License

This project is licensed under the MIT License.

---

**⭐ If you found this portfolio helpful or inspiring, please consider giving it a star!**

*This portfolio represents my journey as a full-stack developer, showcasing technical skills and professional growth through an intuitive user experience.*

*Last updated: August 2025*