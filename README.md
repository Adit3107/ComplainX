# ComplainX - Customer Complaint Management System  

A full-stack web application built with **Next.js, TypeScript, and MongoDB** for managing customer complaints with real-time email notifications and an intuitive admin dashboard.  

## 🚀 Features  

### User  
- Submit complaints with title, description, category, and priority  
- Predefined categories: Product, Service, Support, Billing, Technical, Other  
- Priority levels: Low, Medium, High  
- Optional email for updates  
- Responsive design (mobile + desktop)  

### Admin  
- Dashboard with stats & filters (status, priority, category)  
- Update status in real-time (Pending, In Progress, Resolved)  
- Bulk operations & complaint deletion  
- Automatic email notifications for new complaints & updates  

### Technical  
- RESTful API with CRUD operations  
- MongoDB + Mongoose ODM  
- Nodemailer for email service  
- TypeScript + Zod validation  
- Tailwind CSS + shadcn/ui components  

## 🛠️ Tech Stack  
- **Frontend**: Next.js, React, TypeScript  
- **Backend**: Next.js API Routes, Node.js  
- **Database**: MongoDB (Atlas or local)  
- **Email**: Nodemailer (SMTP support)  
- **UI**: shadcn/ui, Tailwind CSS, Lucide Icons  

## 📋 Setup  

### 1. Clone & Install  
```bash
git clone https://github.com/yourusername/complainx.git
cd complainx
npm install

```bash
## .env.local
# MongoDB Configuration
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<database_name>

# JWT Configuration
JWT_SECRET=your-jwt-secret-key
JWT_EXPIRES_IN=7d

# Email Configuration (SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@example.com
SMTP_PASS=your-app-password-here
SMTP_FROM="ComplaintHub <your-email@example.com>"

# Admin Configuration
ADMIN_EMAIL=your-email@example.com

# Next.js Configuration
NEXTAUTH_SECRET=your-nextauth-secret
NEXTAUTH_URL=http://localhost:3000

## Run the Application
```bash
npm run dev     # Development
npm run build && npm start   # Production
Visit http://localhost:3000
