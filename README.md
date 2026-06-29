# Remindr API

RESTful backend for the Remindr mobile application — a personal task, bill, shopping, and savings management platform.

## Features

- **Authentication** — register, login, refresh tokens, logout (JWT + refresh token rotation)
- **Tasks** — create, list, and delete personal tasks with categories
- **Bills** — track bills with due dates, categories, and paid/unpaid status; includes total count
- **Shopping** — create shopping lists and manage individual items within each list
- **Savings Goals** — set target amounts and track progress with editable current amounts

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Runtime | Node.js |
| Framework | Express 5 |
| Language | TypeScript 6 |
| Database | PostgreSQL |
| Migrations | node-pg-migrate |
| Auth | JWT + bcrypt + refresh tokens |
| Validation | Zod |
| Docs | Swagger (swagger-jsdoc + swagger-ui-express) |
| Package Manager | pnpm |

## Prerequisites

- [Node.js](https://nodejs.org/) >= 20
- [pnpm](https://pnpm.io/) >= 8
- PostgreSQL >= 14

## Getting Started

```bash
# Clone the repository
git clone https://github.com/<your-org>/remindr-be.git
cd remindr-be

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env
```

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgres://localhost:5432/remindr` |
| `JWT_SECRET` | Secret key for signing JWT tokens | — |
| `PORT` | Server port | `4000` |

### Database

```bash
# Run migrations
pnpm migrate:up

# Create a new migration
pnpm migrate:create <migration-name>

# Roll back migrations
pnpm migrate:down
```

### Development

```bash
pnpm dev
```

Server starts at `http://localhost:4000`.

## API Documentation

Interactive Swagger UI is available at [`/api/v1/docs`](http://localhost:4000/api/v1/docs) when the server is running.

### Base URL

All endpoints are prefixed with `/api/v1`.

| Prefix | Module |
|--------|--------|
| `/api/v1/auth` | Authentication |
| `/api/v1/users` | User profiles |
| `/api/v1/tasks` | Tasks |
| `/api/v1/bills` | Bills |
| `/api/v1/shopping-lists` | Shopping lists |
| `/api/v1/shopping-lists/:listId/items` | Shopping items |
| `/api/v1/savings-goals` | Savings goals |

### Authentication

Most endpoints require a Bearer JWT token obtained from `POST /api/v1/auth/login` or `POST /api/v1/auth/register`.

```
Authorization: Bearer <access_token>
```

## Project Structure

```
src/
├── config/           Database connection
├── docs/             Swagger/OpenAPI configuration
├── middleware/        Auth middleware
├── migrations/       Database migrations (node-pg-migrate)
├── modules/          Feature modules
│   ├── auth/         Authentication (login, register, refresh, logout)
│   ├── bill/         Bill management
│   ├── task/         Task management
│   ├── user/         User profiles
│   ├── shopping-list/   Shopping list CRUD
│   ├── shopping-item/   Shopping item CRUD
│   └── savings-goal/    Savings goal CRUD
├── types/            TypeScript type augmentations
├── types.ts          Shared database row types
├── app.ts            Express app setup and route mounting
└── index.ts          Server entry point
```

Each feature module follows a consistent layered architecture:

- **`*.routes.ts`** — route definitions with JSDoc OpenAPI annotations
- **`*.controller.ts`** — request handling and validation
- **`*.service.ts`** — business logic
- **`*.repository.ts`** — database queries

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server with hot reload |
| `pnpm migrate:create <name>` | Create a new migration file |
| `pnpm migrate:up` | Apply pending migrations |
| `pnpm migrate:down` | Roll back the last migration |
| `pnpm tsc --noEmit` | Type-check the project |

## License

MIT
