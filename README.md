# 📊 Daily Inventory Dashboard - SupplySight

A clean, minimalistic inventory management dashboard built with React, Tailwind CSS, and GraphQL. This application provides essential supply chain visibility with intuitive design, real-time data, and streamlined user experience.

![SupplySight Dashboard](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![React](https://img.shields.io/badge/React-18+-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-4+-blue)
![GraphQL](https://img.shields.io/badge/GraphQL-Apollo-purple)
![Vite](https://img.shields.io/badge/Vite-5+-orange)

## ✨ Features

### Core Functionality
- 📊 **Clean KPI Cards** - Total Stock, Demand, and Fill Rate with trend indicators
- 📈 **Simple Line Chart** - Stock vs Demand trend visualization (7/14/30 days)
- 🔍 **Intuitive Filtering** - Search by name/SKU, warehouse, and status filters
- 📋 **Product Table** - Sortable columns, pagination, and clear status indicators
- 🎯 **Product Details** - Slide-out drawer for viewing and editing product information
- 🚦 **Status System** - Healthy/Low/Critical status with color-coded indicators

### User Experience
- 🎨 **Minimalistic Design** - Clean off-white background with subtle shadows
- 📱 **Responsive Layout** - Mobile-first design that works on all devices
- 🔔 **Toast Notifications** - Clear feedback for user actions
- ⚡ **Performance Optimized** - Debounced search and efficient data loading
- 🧭 **Intuitive Navigation** - Simple header with essential controls only

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18 or higher
- **npm** (comes with Node.js)

### Option 1: Run Complete Project (Recommended)

1. **Clone and Install**
   ```bash
   git clone <repository-url>
   cd daily-inventory-dashboard
   npm install
   ```

2. **Start Both Frontend and Backend**
   ```bash
   npm start
   ```
   This command runs both the GraphQL server and React frontend concurrently.

3. **Access the Application**
   - **Frontend Dashboard**: http://localhost:5173 (or next available port)
   - **GraphQL Playground**: http://localhost:4000/graphql

### Option 2: Frontend Only

If you want to run just the frontend (useful for development or if you have a separate backend):

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Frontend Only**
   ```bash
   npm run dev
   ```
   The React app will be available at http://localhost:5173

   **Note**: Running frontend-only will show loading states since there's no backend data.

### Option 3: Backend Only

To run just the GraphQL server:

```bash
npm run server
```
The GraphQL server will be available at http://localhost:4000

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Run both frontend and backend |
| `npm run dev` | Run frontend only (Vite dev server) |
| `npm run server` | Run GraphQL server only |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |

## 🏗️ Architecture

### Tech Stack
- **Frontend**: React 18, Tailwind CSS, Framer Motion
- **State Management**: Apollo Client + React Hooks
- **Backend**: Apollo Server with GraphQL
- **Charts**: Recharts
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom components

### Project Structure
```
daily-inventory-dashboard/
├── public/
│   ├── logo.png         # SupplySight logo
│   └── vite.svg         # Vite icon
├── src/
│   ├── components/      # React components
│   │   ├── Dashboard.jsx           # Main dashboard container
│   │   ├── SimpleHeader.jsx        # Clean header with navigation
│   │   ├── SimpleKPICards.jsx      # Minimalistic KPI cards
│   │   ├── SimpleChart.jsx         # Clean line chart
│   │   ├── SimpleProductTable.jsx  # Product table with filters
│   │   ├── ProductDrawer.jsx       # Product details sidebar
│   │   ├── LoadingSpinner.jsx      # Loading state component
│   │   └── ErrorMessage.jsx        # Error handling component
│   ├── lib/             # Utilities and configurations
│   │   ├── apollo-client.js        # GraphQL client setup
│   │   └── utils.js                # Helper functions
│   ├── server/          # GraphQL backend
│   │   ├── server.js               # Apollo Server setup
│   │   └── schema.js               # GraphQL schema and mock data
│   ├── App.jsx          # Root component
│   ├── main.jsx         # Application entry point
│   └── index.css        # Global styles and Tailwind
├── package.json         # Dependencies and scripts
├── vite.config.js       # Vite configuration
├── tailwind.config.js   # Tailwind CSS configuration
└── README.md           # This file
```

## 📊 GraphQL Schema

### Queries
- `products(search, status, warehouse)` - Get filtered products
- `warehouses` - Get all warehouse locations
- `kpis(range)` - Get KPI data for time range

### Mutations
- `updateDemand(id, demand)` - Update product demand
- `transferStock(id, from, to, qty)` - Transfer stock between warehouses

## 🎨 Design System

### Design Philosophy
- **Minimalistic**: Clean, uncluttered interface with focus on functionality
- **Intuitive**: Self-explanatory UI elements that require no learning curve
- **Professional**: Off-white background with subtle shadows and clean typography
- **Accessible**: High contrast ratios and clear visual hierarchy

### Status Indicators
- 🟢 **Healthy**: Stock > Demand (Green badge)
- 🟡 **Low Stock**: Stock = Demand (Yellow badge)
- 🔴 **Critical**: Stock < Demand (Red badge)

### Color Palette
- **Background**: Off-white (`bg-gray-50`) for main areas
- **Cards**: Pure white (`bg-white`) with subtle borders
- **Primary**: Blue (`blue-600`) for actions and links
- **Success**: Green (`green-100/800`) for healthy status
- **Warning**: Yellow (`yellow-100/800`) for low stock
- **Danger**: Red (`red-100/800`) for critical status
- **Text**: Gray scale (`gray-900/500`) for optimal readability

## 🔧 Configuration

### Environment Variables (Optional)
Create a `.env` file in the root directory if you need to customize the GraphQL endpoint:
```env
VITE_GRAPHQL_URL=http://localhost:4000/graphql
```

### Tailwind Configuration
The project uses Tailwind CSS v4 with:
- System fonts for optimal performance
- Minimal custom components
- Clean utility classes
- Responsive design utilities

### Port Configuration
If ports 4000 or 5173 are in use, the application will automatically find the next available port:
- **Backend**: Starts at port 4000
- **Frontend**: Starts at port 5173

### Mock Data
The application includes comprehensive mock data:
- **40+ sample products** across multiple warehouses
- **3 warehouse locations** (WH-NYC, WH-LA, WH-CHI)
- **30 days of KPI data** for trend analysis

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🧪 Testing

### Manual Testing Checklist
- ✅ **Search Functionality**: Search by product name or SKU
- ✅ **Filtering**: Filter by warehouse and status
- ✅ **Sorting**: Click column headers to sort
- ✅ **Pagination**: Navigate through product pages
- ✅ **Product Details**: Click products to view details
- ✅ **Responsive Design**: Test on mobile, tablet, desktop
- ✅ **Date Range**: Switch between 7/14/30 day views
- ✅ **Loading States**: Verify loading indicators
- ✅ **Error Handling**: Test with network issues

### Key Features to Test
1. **KPI Cards**: Verify calculations for stock, demand, fill rate
2. **Chart**: Ensure data updates when changing date ranges
3. **Table**: Test search, filter, sort, and pagination
4. **Product Drawer**: Open/close and form interactions
5. **Refresh**: Use refresh button to reload data

### Recommended Testing Setup
```bash
# Unit tests (optional)
npm install --save-dev @testing-library/react @testing-library/jest-dom vitest

# E2E tests (optional)
npm install --save-dev playwright
```

## 🚀 Deployment

### Build for Production
```bash
# Create optimized production build
npm run build

# Preview the production build locally
npm run preview
```

### Frontend-Only Deployment
For deploying just the frontend (most common scenario):

**Netlify**
1. Connect your GitHub repository
2. Build command: `npm run build`
3. Publish directory: `dist`

**Vercel**
1. Import your GitHub repository
2. Framework preset: Vite
3. Build command: `npm run build`
4. Output directory: `dist`

**Static Hosting (AWS S3, GitHub Pages, etc.)**
1. Run `npm run build`
2. Upload the `dist` folder contents
3. Configure for SPA routing

### Full-Stack Deployment
For deploying both frontend and backend:

**Railway/Render**
1. Connect repository
2. Start command: `npm start`
3. Environment: Node.js

**Docker**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 4000 5173
CMD ["npm", "start"]
```

## 🔮 Future Enhancements

### Potential Improvements
- **Database Integration**: Replace mock data with PostgreSQL/MongoDB
- **User Authentication**: Add login/logout and role-based access
- **Real-time Updates**: WebSocket integration for live data
- **Export Functionality**: CSV/Excel export for reports
- **Advanced Filtering**: Date ranges, custom queries
- **Notifications**: Email/SMS alerts for critical stock levels
- **Mobile App**: React Native version for on-the-go access
- **Analytics**: Advanced reporting and forecasting

### Performance Optimizations
- **Virtualization**: For large product lists
- **Caching**: Redis for frequently accessed data
- **CDN**: Asset optimization and delivery
- **PWA**: Offline functionality and app-like experience

## 🛠️ Troubleshooting

### Common Issues

**Port Already in Use**
```bash
# If you see "EADDRINUSE" error
# The app will automatically try the next available port
# Or manually specify ports:
PORT=3000 npm run dev  # For frontend
SERVER_PORT=5000 npm run server  # For backend
```

**Dependencies Issues**
```bash
# Clear npm cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

**Build Errors**
```bash
# Ensure you're using Node.js 18+
node --version

# Update npm to latest version
npm install -g npm@latest
```

**GraphQL Connection Issues**
- Ensure the backend server is running on port 4000
- Check the browser console for network errors
- Verify the GraphQL endpoint in `src/lib/apollo-client.js`

### Getting Help
- Check the browser console for error messages
- Verify all dependencies are installed correctly
- Ensure ports 4000 and 5173 are available
- Try running `npm run dev` and `npm run server` separately

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Make your changes following the existing code style
4. Test your changes thoroughly
5. Commit your changes (`git commit -m 'Add new feature'`)
6. Push to the branch (`git push origin feature/new-feature`)
7. Open a Pull Request with a clear description

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- React team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Apollo team for GraphQL tooling
- Framer Motion for smooth animations
- Recharts for beautiful charts

---

## 📞 Support

If you encounter any issues or have questions:
1. Check the troubleshooting section above
2. Review the project structure and configuration
3. Ensure all prerequisites are met
4. Try the different running options (full project vs frontend-only)

---

**Built with ❤️ for SupplySight - Simple, Effective Inventory Management**
