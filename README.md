# MyanTech E-Commerce Management System

A comprehensive React-based e-commerce management system for MyanTech that handles the complete lifecycle of retail operations, from customer orders through delivery management.

## 🚀 Features

### Customer Portal

- Product browsing and shopping cart
- Order history tracking
- Real-time chat with sales representatives
- Customer complaint submission
- User profile management

### Sales Management

- View products and order metrics
- Order processing and management
- Customer communication interface
- Complaint resolution system
- Real-time delivery tracking
- View driver escalations
- Track returns

### Warehouse Operations

- View stocks and trucks metrics
- Order management
  - Assign to trucks or service center
- Inventory management
- Product management
- Service center operations
- Location/City management
- Trucks management

### Driver Portal

- Delivery management
- Route tracking
- Escalation handling

## 🛠 Tech Stack

- **Frontend Framework:** React 19
- **State Management:** Redux Toolkit
- **Routing:** React Router v7
- **Real-time Features:** Laravel Echo & Pusher
- **UI Components:**
  - Radix UI
  - Shadcn Components
  - Tailwind CSS
- **Form Handling:**
  - React Hook Form
  - Zod Validation
- **Data Visualization:** Recharts
- **Authentication:** JWT
- **Build Tool:** Vite
- **Type Checking:** TypeScript

## 📦 Installation

1. Clone the repository:

```bash
git clone
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory and add necessary environment variables:

```env
VITE_API_URL=your_api_url
VITE_PUSHER_APP_KEY=your_pusher_key
VITE_PUSHER_APP_CLUSTER=your_pusher_cluster
```

4. Start the development server:

```bash
npm run dev
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 📁 Project Structure

```
src/
├── components/        # Reusable UI components
├── features/         # Feature-based modules
├── hooks/           # Custom React hooks
├── layouts/         # Layout components
├── lib/             # Utility functions
├── pages/           # Route pages
├── services/        # API services
├── store/           # Redux store configuration
├── styles/          # Global styles
└── types/           # TypeScript type definitions
```

## 🔐 Environment Variables

| Variable                | Description            |
| ----------------------- | ---------------------- |
| VITE_API_URL            | Backend API URL        |
| VITE_PUSHER_APP_KEY     | Pusher application key |
| VITE_PUSHER_APP_CLUSTER | Pusher cluster region  |

## 🔑 Authentication

The system uses role-based authentication with the following user types:

- Customer
- Sales Representative
- Warehouse Manager
- Driver

## 🌐 API Integration

The frontend communicates with a RESTful API backend. API documentation is available at:
`[API_DOCUMENTATION_URL]`

## 📱 Responsive Design

The application is fully responsive and optimized for:

- Desktop (1024px and above)
- Tablet (768px to 1023px)
- Mobile (below 768px)

## 🎨 Theme Support

- Light Mode
- Dark Mode
- System preference detection

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support, email [support@email.com] or join our Slack channel.
