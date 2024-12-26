# Pet Care System Web Application 🐾

A comprehensive web application that connects pet owners with service providers, enabling seamless access to essential pet care services and products. The platform facilitates booking services, purchasing products, posting reviews, and managing orders through a user-friendly interface.

---

## 🚀 Features

### For Users:
- **Authentication**: Secure user registration and login with two-factor authentication.
- **Profile Management**: Manage personal profiles with profile images (via Gravatar or upload).
- **Service Booking**: Browse and book services like daycare, veterinary care, and adoption.
- **Product Shopping**: Purchase pet food, accessories, and more.
- **Reviews and Ratings**: Share feedback on services and products.
- **Order Tracking**: View order history and track delivery status.
- **Real-Time Messaging**: Chat with service providers or sellers.

### For Service Providers:
- **Profile Verification**: Manage profiles with approval status (Pending, Approved, Rejected).
- **Service Listings**: Add and update services with descriptions, pricing, locations, and images.
- **Product Management**: Manage products with stock tracking, tags, and detailed descriptions.
- **Post Management**: Share posts to connect with users and promote services or products.
- **Order Management**: View and manage customer orders with detailed insights.

---

## 🛠️ Tech Stack

### Backend:
- **[Prisma ORM](https://www.prisma.io/)**: Database modeling and querying.
- **PostgreSQL**: Robust relational database for secure data storage.
- **Node.js**: Backend server with RESTful API implementation.

### Frontend:
- **[Next.js](https://nextjs.org/)**: Fast and SEO-friendly frontend framework.
- **Tailwind CSS**: Modern utility-first CSS framework for responsive designs.
- **MUI Library**

### Other Tools:
- **Vercel**: Hosting the frontend for high performance and scalability.
---

## 📦 Database Models

### Key Models:
1. **User**: Handles user authentication, roles, and personal information.
2. **Provider**: Tracks service provider details and approval status.
3. **Service**: Stores service details, including type, pricing, and availability.
4. **Product**: Manages product listings with tags, stock, and pricing.
5. **Order**: Facilitates order details, including type, quantity, and status.
6. **Conversation**: Tracks user-to-user and user-to-provider messaging.
7. **Review**: Manages user feedback for services and products.

---

## 📖 Installation

### Prerequisites:
- **Node.js** (v16 or later)
- **PostgreSQL**
- **NPM** or **Yarn** or **PNPM**

### Steps: Clone the repository:
   ```git clone https://github.com/alaminXpro/petcare.git```
  ```cd pet-care-system```
