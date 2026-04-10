# FruitShop Admin

A full-stack fruit inventory management system with a Spring Boot REST API backend and a Next.js admin dashboard frontend.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | Java 17, Spring Boot 3, Spring Security, JWT |
| Database | H2 (in-memory) |
| Frontend | Next.js 16, React 19, Tailwind CSS v4 |
| Auth | JWT (Bearer token) |

---

## Features

- JWT-based authentication (register & login)
- Full fruit inventory CRUD (create, read, update, delete)
- Admin dashboard with inventory stats
- Search & filter fruits
- Clean white/pink grocery-inspired UI

---

## Project Structure

```
fruitshop-ram/
├── src/                        # Spring Boot backend
│   └── main/java/com/ram/fruitshop/
│       ├── controller/         # AuthController, FruitController
│       ├── model/              # Fruit, User entities
│       ├── repository/         # JPA repositories
│       ├── security/           # JWT filter & utility
│       ├── service/            # FruitService
│       └── config/             # SecurityConfig (CORS + JWT)
└── frontend/                   # Next.js admin panel
    ├── app/
    │   ├── login/              # Login page
    │   └── dashboard/          # Dashboard + Fruits management
    ├── components/             # Sidebar, cards, modals
    └── lib/                    # API client, fruit emoji helper
```

---

## Getting Started

### Backend

```bash
./mvnw spring-boot:run
```

Runs on `http://localhost:8080`.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Runs on `http://localhost:3000`.

---

## API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login and receive JWT token |

### Fruits (requires Bearer token)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/fruits` | Get all fruits |
| GET | `/api/fruits/{id}` | Get fruit by ID |
| POST | `/api/fruits` | Add a new fruit |
| PUT | `/api/fruits/{id}` | Update a fruit |
| DELETE | `/api/fruits/{id}` | Delete a fruit |

### Example — Login

```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"ram","password":"ramram123"}'
```

### Example — Add a fruit

```bash
curl -X POST http://localhost:8080/api/fruits \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{"name":"Mango","weight":1.5,"price":3.99}'
```

---

## Environment

The frontend points to `http://localhost:8080` by default. Override with:

```bash
NEXT_PUBLIC_API_URL=http://your-backend-url npm run dev
```
