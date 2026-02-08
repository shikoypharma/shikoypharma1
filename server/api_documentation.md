# Shikoy Pharma API Documentation

Base URL: `http://localhost:5001/api`

## Content-Type
All POST and PUT requests should have the header:
`Content-Type: application/json`

---

## 1. Global Data
**Resource**: `/global`

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/global` | Get global site data (navbar, footer) |
| `POST` | `/global` | Create global data (initial setup) |
| `PUT` | `/global` | Update global data |

### Example Body (POST/PUT)
```json
{
  "navbar": {
    "contact": {
      "phone": "+91 1234567890",
      "email": "info@shikoypharma.com"
    }
  },
  "footer": {
    "description": "Leading pharma company...",
    "contactInfo": {
      "address": "123 Business Park, Mumbai",
      "phones": ["+91 9876543210"],
      "emails": ["support@shikoypharma.com"],
      "website": "www.shikoypharma.com"
    }
  }
}
```

---

## 2. Home Page
**Resource**: `/home`

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/home` | Get home page content |
| `POST` | `/home` | Create home page content |
| `PUT` | `/home` | Update home page content |

### Example Body (POST/PUT)
```json
{
  "hero": {
    "slides": [
      {
        "id": 1,
        "image": "/images/hero1.jpg",
        "heading": "Welcome to Shikoy Pharma",
        "subheading": "Excellence in Healthcare"
      }
    ]
  },
  "about": {
    "title": "About Us",
    "description": "We are committed to quality..."
  }
}
```

---

## 3. Products
**Resource**: `/products`

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/products` | Get all products |
| `POST` | `/products` | Create a new product |
| `GET` | `/products/slug/:slug` | Get product by slug |
| `GET` | `/products/id/:id` | Get product by ID |
| `GET` | `/products/category/:category` | Get products by category name |
| `PUT` | `/products/:id` | Update product |
| `DELETE` | `/products/:id` | Delete product |

### Example Body (Product)
```json
{
  "name": "Paracetamol 500",
  "slug": "paracetamol-500",
  "category": "General",
  "description": "Effective pain reliever",
  "composition": "Paracetamol 500mg",
  "packing": "10x10 Blister",
  "images": ["/images/products/para500.jpg"]
}
```

---

## 4. About Sections
**Resource**: `/about`

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/about` | Get all about sections |
| `POST` | `/about` | Create an about section |
| `GET` | `/about/:id` | Get section by ID |
| `PUT` | `/about/:id` | Update section |
| `DELETE` | `/about/:id` | Delete section |

### Example Body (Corporate Profile)
```json
{
  "type": "corporate",
  "title": "Corporate Profile",
  "content": {
    "description": ["Shikoy Pharma was established in..."]
  },
  "heroImage": "/images/about-hero.jpg"
}
```

---

## 5. Doctors & HCPs Resources
**Resource**: `/doctor-resources`

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/doctor-resources` | Get all resource lists |
| `POST` | `/doctor-resources` | Create a resource list |
| `GET` | `/doctor-resources/:id` | Get by ID |
| `PUT` | `/doctor-resources/:id` | Update by ID |
| `DELETE` | `/doctor-resources/:id` | Delete by ID |

### Example Body
```json
{
  "category": "Antipsychotics",
  "rows": [
    {
      "genericName": "Amisulpride 50mg",
      "brandName": "Apropride 50"
    },
    {
      "genericName": "Olanzapine 5mg",
      "brandName": "Olancare 5"
    }
  ]
}
```

---

## 6. Product Categories (Segments)
**Resource**: `/product-categories`

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/product-categories` | Get all categories |
| `POST` | `/product-categories` | Create category |
| `GET` | `/product-categories/slug/:slug` | Get category by slug |
| `PUT` | `/product-categories/:id` | Update category |
| `DELETE` | `/product-categories/:id` | Delete category |

### Example Body
```json
{
  "name": "Neuro",
  "slug": "neuro",
  "description": "Specialized neuro products...",
  "image": "/images/neuro-cat.jpg",
  "howItWorks": "Neuro products work by...",
  "benefits": ["Relief from seizures", "Better mental health"]
}
```

---

## 7. Events
**Resource**: `/events`

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/events` | Get all events |
| `POST` | `/events` | Create event |
| `GET` | `/events/:id` | Get event by ID |
| `PUT` | `/events/:id` | Update event |
| `DELETE` | `/events/:id` | Delete event |

### Example Body
```json
{
  "title": "Annual Medical Conference 2024",
  "date": "2024-11-15",
  "location": "New Delhi",
  "description": "Join us for the annual conference...",
  "images": ["/images/events/conf2024.jpg"]
}
```

---

## 8. Other Resources

### Career (`/career`)
- **GET** `/career`: List all job postings/career info
- **POST** `/career`: Create career entry
- **PUT** `/career/:id`: Update
- **DELETE** `/career/:id`: Delete

### Expertise (`/expertise`)
- **GET** `/expertise`: List expertise items (PCD, Third Party, etc.)
- **POST** `/expertise`: Create expertise item
- **PUT** `/expertise/:id`: Update
- **DELETE** `/expertise/:id`: Delete

### Gallery (`/gallery`)
- **GET** `/gallery`: List gallery items
- **POST** `/gallery`: Create gallery item
- **PUT** `/gallery/:id`: Update
- **DELETE** `/gallery/:id`: Delete

### Infrastructure (`/infrastructure`)
- **GET** `/infrastructure`: List infrastructure items
- **POST** `/infrastructure`: Create infrastructure item
- **PUT** `/infrastructure/:id`: Update
- **DELETE** `/infrastructure/:id`: Delete

### Inquiry (`/inquiry`) - *Contact Forms*
- **POST** `/inquiry`: Submit new inquiry (Public)
- **GET** `/inquiry`: List all inquiries (Admin)
- **PUT** `/inquiry/:id/status`: Update status (e.g. `read`, `responded`)

### Contact Page (`/contact-page`)
- **GET** `/contact-page`: Get contact page details (offices, map)
- **POST** `/contact-page`: Create details (Singleton)
- **PUT** `/contact-page`: Update details
