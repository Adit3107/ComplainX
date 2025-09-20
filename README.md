# ComplaintHub - Customer Complaint Management System

A comprehensive full-stack web application built with Next.js, TypeScript, and MongoDB for managing customer complaints with real-time email notifications and an intuitive admin dashboard.

## 🚀 Features

### User Features
- **Easy Complaint Submission**: Intuitive form with validation for title, description, category, and priority
- **Category Selection**: Predefined categories (Product, Service, Support, Billing, Technical, Other)
- **Priority Levels**: Low, Medium, and High priority selection
- **Email Integration**: Optional email field for follow-up communications
- **Responsive Design**: Mobile-first approach with seamless desktop experience

### Admin Features
- **Comprehensive Dashboard**: Complete overview with statistics and metrics
- **Advanced Filtering**: Filter by status, priority, and category
- **Real-time Updates**: Live status updates with PATCH operations
- **Bulk Operations**: Efficient management of multiple complaints
- **Email Notifications**: Automatic notifications for new complaints and status updates
- **Data Export**: Easy complaint management and deletion capabilities

### Technical Features
- **RESTful API**: Complete CRUD operations with proper error handling
- **MongoDB Integration**: Robust database with Mongoose ODM
- **Email Service**: Nodemailer integration for automated notifications
- **TypeScript**: Full type safety across the application
- **Responsive UI**: shadcn/ui components with Tailwind CSS
- **Performance Optimized**: Efficient database queries and caching

## 🛠️ Tech Stack

- **Frontend**: Next.js 13+, React 18, TypeScript
- **Backend**: Next.js API Routes, Node.js
- **Database**: MongoDB with Mongoose ODM
- **Email Service**: Nodemailer (SMTP support)
- **UI Components**: shadcn/ui, Tailwind CSS
- **Icons**: Lucide React
- **Validation**: Zod schema validation
- **Notifications**: Sonner toast notifications

## 📋 Prerequisites

Before running this application, make sure you have:

- Node.js 18+ installed
- MongoDB Atlas account or local MongoDB installation
- SMTP email service (Gmail, Outlook, etc.) or email service provider

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/complaint-management-system.git
cd complaint-management-system
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory:

```env
# MongoDB Configuration
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/complaint-management

# Email Configuration (Gmail example)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=noreply@yourcompany.com

# Admin Configuration
ADMIN_EMAIL=admin@yourcompany.com
```

### 4. Database Setup

The application will automatically create the necessary MongoDB collections and indexes when you first run it. The complaint schema includes:

- **title**: String (required, max 100 chars)
- **description**: String (required, max 1000 chars)
- **category**: Enum (Product, Service, Support, Billing, Technical, Other)
- **priority**: Enum (Low, Medium, High)
- **status**: Enum (Pending, In Progress, Resolved)
- **dateSubmitted**: Date (auto-generated)
- **userEmail**: String (optional)

### 5. Email Service Configuration

#### Gmail Setup:
1. Enable 2-Factor Authentication
2. Generate an App Password
3. Use the app password in `SMTP_PASS`

#### Other Providers:
- **Outlook**: smtp-mail.outlook.com:587
- **Yahoo**: smtp.mail.yahoo.com:587
- **Custom SMTP**: Configure your provider's settings

### 6. Run the Application

```bash
# Development mode
npm run dev

# Production build
npm run build
npm start
```

Visit `http://localhost:3000` to see the application.

## 📚 API Documentation

### Endpoints

#### GET /api/complaints
Retrieve all complaints with optional filtering.

**Query Parameters:**
- `status`: Filter by status (Pending, In Progress, Resolved)
- `priority`: Filter by priority (Low, Medium, High)
- `category`: Filter by category

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "complaint_id",
      "title": "Product Issue",
      "description": "Detailed description",
      "category": "Product",
      "priority": "High",
      "status": "Pending",
      "dateSubmitted": "2024-01-15T10:30:00.000Z",
      "userEmail": "user@example.com"
    }
  ]
}
```

#### POST /api/complaints
Create a new complaint.

**Request Body:**
```json
{
  "title": "Issue Title",
  "description": "Detailed description",
  "category": "Product",
  "priority": "High",
  "userEmail": "user@example.com"
}
```

#### PATCH /api/complaints/[id]
Update complaint status.

**Request Body:**
```json
{
  "status": "In Progress"
}
```

#### DELETE /api/complaints/[id]
Delete a complaint.

## 🎨 UI Components

The application uses a comprehensive design system with:

- **Color Palette**: Professional blue, gray, and accent colors
- **Typography**: Inter font with consistent hierarchy
- **Spacing**: 8px grid system
- **Components**: Reusable shadcn/ui components
- **Animations**: Smooth transitions and micro-interactions
- **Accessibility**: WCAG compliant with proper ARIA labels

## 📧 Email Notifications

### New Complaint Notification
Sent to admin when a new complaint is submitted:
- Complaint details
- Priority and category information
- User contact information
- Professional HTML template

### Status Update Notification
Sent when complaint status changes:
- Status change summary
- Complaint details
- Update timestamp
- Visual status indicators

## 🔧 Configuration Options

### Database Configuration
```javascript
// Custom MongoDB connection options
const mongoOptions = {
  bufferCommands: false,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
};
```

### Email Templates
Customize email templates in `lib/email.ts`:
- HTML formatting
- Brand styling
- Notification content

### UI Customization
Modify the theme in `tailwind.config.ts`:
- Color schemes
- Typography scales
- Spacing system
- Component variants

## 🚀 Deployment

### Vercel Deployment (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Environment Variables for Production:
- `MONGODB_URI`: Your MongoDB connection string
- `SMTP_*`: Email service configuration
- `ADMIN_EMAIL`: Admin notification email

### Other Platforms:
- **Netlify**: Configure build settings and environment variables
- **Railway**: Direct MongoDB and SMTP integration
- **Heroku**: Add MongoDB Atlas and SendGrid add-ons

## 🧪 Testing

```bash
# Run type checking
npm run type-check

# Run linting
npm run lint

# Build test
npm run build
```

## 📊 Performance Optimization

- **Database Indexing**: Optimized queries with compound indexes
- **Image Optimization**: Next.js automatic image optimization
- **Bundle Optimization**: Tree shaking and code splitting
- **Caching**: API response caching and static generation

## 🔒 Security Features

- **Input Validation**: Comprehensive validation with Zod schemas
- **SQL Injection Protection**: Mongoose ODM protection
- **XSS Prevention**: Sanitized inputs and outputs
- **CSRF Protection**: Built-in Next.js protection
- **Environment Security**: Secure environment variable handling

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/yourusername/complaint-management-system/issues) page
2. Create a new issue with detailed information
3. Contact support at support@complaintHub.com

## 🎯 Roadmap

- [ ] JWT Authentication system
- [ ] Advanced analytics and reporting
- [ ] File upload capabilities
- [ ] Multi-language support
- [ ] Mobile app development
- [ ] API rate limiting
- [ ] Advanced notification system

---

**Built with ❤️ by [Your Name]**

For more information, visit our [documentation](https://docs.complaintHub.com) or [live demo](https://complaint-management-demo.vercel.app).