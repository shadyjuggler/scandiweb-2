# 🛒 Scandiweb eCommerce SPA

This is a full-stack eCommerce web application developed as part of the **Scandiweb Junior Full Stack Developer test assignment**

## 🌐 Live Demo

📦 (React SPA): scandiweb-2.vercel.app

🔧 (GraphQL API): api.shadyjuggler.com

---

## 📁 Features Overview

### ✅ Required Features (100% Complete)

- Product listing by categories
- Product detail page with image carousel, selectable attributes
- “Quick shop” functionality from product cards
- Cart overlay with full item control
- GraphQL API:
  - Query products, categories, and attributes
  - Mutation to place orders

### 🔥 Bonus features overview

📦 FE
- Built with **TypeScript** for safer, maintainable code
- Modular, reusable framework components ( at `components/Framework/...`, `Modal`, `Slide`, `Slider`)
- Multiple react-context layers for operating state data
- Custom hooks (`hooks`)
- Reusable utility functions (`utils`)
- GraphQL client and scalable service system (`graphql/client.ts`, `graphql/services`)
- In-memory queries caching (`utils/QueryCache `)

🔧 BE
- PSR-4 compliant backend folder structure
- OOP structure with abstract base models and type-specific implementations
- Table Migrations support
- Database Seeder
- CLI commands (`composer migrate`, `composer migrate seed`, `composer migrate wipe`)
- Flexible and scalable CORS configuration
- GraphQL API decomposition to (`GraphQLEngine`, `ErrorFormatter` `SchemaFactory`)
- Building the Graphql Schema is easy scalable and maintanable due to separation of `Types` and `Fields`
  
## 🛠 Technologies Used

### Frontend

- React + TypeScript
- Vite (dev server + build)
- Tailwind CSS
- Node v22.14.0

### Backend

- PHP 8.4.0
- MySQL 5.6+
- GraphQL via [`webonyx/graphql-php`](https://github.com/webonyx/graphql-php)
- Custom database seeders, migrations, and models
- Clean PSR-1/4/12 compliant OOP structure
- MySQL Databse and phpMyAdmin using Docker, (`scandiweb-backend/docker-compose.yml`)

## 📬 Notes

- Frontend hosted on **Vercel**, Backend using VPS hosting.
- Backend Api (`https://api.shadyjuggler.com/`), isn't protected, no auth, no rate limiting etc... (in plans to add security layer)
- Backend designed for deployment on any shared PHP host (e.g., [000webhost](https://www.000webhost.com/)) or custom VPS.
