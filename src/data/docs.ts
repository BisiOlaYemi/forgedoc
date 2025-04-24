import { DocSection } from "../types";

export const docsData: DocSection[] = [
  {
    id: "getting-started",
    title: "Getting Started",
    items: [
      {
        id: "introduction",
        title: "Introduction",
        slug: "introduction",
        content: `
# Forge Framework

Forge is a powerful, modern Go framework designed to simplify and accelerate backend development.

## Why Forge?

Forge provides a robust foundation for building scalable web applications with Go. It combines the best practices from popular frameworks while maintaining the performance and simplicity that Go is known for.

### Key Features

- Intuitive Routing: Simple yet powerful routing system
- Middleware Support: Easily add middleware to your application
- Database Integration: Seamless integration with popular databases
- CLI Tools: Powerful command-line tools for scaffolding and development
- Testing Utilities: Comprehensive testing utilities

Get started with Forge today and experience the power of modern Go development!
        `
      },
      {
        id: "installation",
        title: "Installation",
        slug: "installation",
        content: `
## Installation

Installing Forge is straightforward using Go's package management:

\`\`\`bash
go get github.com/forgeframework/forge
\`\`\`

### Requirements

- Go 1.18 or higher
- Git

### Verifying Installation

After installation, verify that Forge is installed correctly:

\`\`\`bash
forge version
\`\`\`

You should see the current version of Forge displayed.
        `
      },
      {
        id: "quick-start",
        title: "Quick Start",
        slug: "quick-start",
        content: `
## Quick Start Guide

Let's create a simple Forge application to get you started:

### Create a New Project

\`\`\`bash
forge new myapp
cd myapp
\`\`\`

### Project Structure

Your new project will have the following structure:

\`\`\`
myapp/
  ├── cmd/
  │   └── server/
  │       └── main.go
  ├── config/
  │   └── config.yaml
  ├── internal/
  │   ├── handlers/
  │   ├── middleware/
  │   └── models/
  ├── go.mod
  └── go.sum
\`\`\`

### Run Your Application

\`\`\`bash
go run cmd/server/main.go
\`\`\`

Your application will be available at http://localhost:8080.
        `
      }
    ]
  },
  {
    id: "core-concepts",
    title: "Core Concepts",
    items: [
      {
        id: "routing",
        title: "Routing",
        slug: "routing",
        content: `
## Routing in Forge

Forge provides a simple yet powerful routing system:

\`\`\`go
package main

import (
  "github.com/forgeframework/forge"
  "github.com/forgeframework/forge/router"
)

func main() {
  app := forge.New()
  
  // Basic routes
  app.Get("/", HomeHandler)
  app.Post("/users", CreateUserHandler)
  
  // Route groups
  api := app.Group("/api")
  {
    v1 := api.Group("/v1")
    {
      v1.Get("/users", ListUsersHandler)
      v1.Get("/users/:id", GetUserHandler)
      v1.Put("/users/:id", UpdateUserHandler)
      v1.Delete("/users/:id", DeleteUserHandler)
    }
  }
  
  app.Run(":8080")
}
\`\`\`

### Route Parameters

You can access route parameters using the \`ctx.Param()\` method:

\`\`\`go
func GetUserHandler(ctx *forge.Context) {
  userID := ctx.Param("id")
  // Use userID to fetch user from database
  ctx.JSON(200, user)
}
\`\`\`
        `
      },
      {
        id: "middleware",
        title: "Middleware",
        slug: "middleware",
        content: `
## Middleware

Middleware functions in Forge allow you to process requests before they reach your handlers:

\`\`\`go
package main

import (
  "github.com/forgeframework/forge"
  "github.com/forgeframework/forge/middleware"
)

func main() {
  app := forge.New()
  
  // Global middleware
  app.Use(middleware.Logger())
  app.Use(middleware.Recovery())
  
  // Route-specific middleware
  app.Get("/admin", AuthMiddleware(), AdminHandler)
  
  app.Run(":8080")
}

func AuthMiddleware() forge.HandlerFunc {
  return func(ctx *forge.Context) {
    // Check if user is authenticated
    if !isAuthenticated(ctx) {
      ctx.AbortWithStatus(401)
      return
    }
    ctx.Next()
  }
}
\`\`\`
        `
      }
    ]
  },
  {
    id: "cli",
    title: "CLI",
    items: [
      {
        id: "cli-overview",
        title: "CLI Overview",
        slug: "cli-overview",
        content: `
## Forge CLI

Forge comes with a powerful command-line interface to help you develop applications quickly:

### Available Commands

- \`forge new [project]\`: Create a new Forge project
- \`forge generate [resource]\`: Generate boilerplate code for various resources
- \`forge migrate\`: Run database migrations
- \`forge serve\`: Run the development server

### Examples

Create a new project:

\`\`\`bash
forge new myapp
\`\`\`

Generate a new model:

\`\`\`bash
forge generate model User name:string email:string
\`\`\`
        `
      },
      {
        id: "scaffolding",
        title: "Scaffolding",
        slug: "scaffolding",
        content: `
## Scaffolding

Forge's scaffolding tools help you quickly generate the code you need:

### Generating Controllers

\`\`\`bash
forge generate controller Users index show create update delete
\`\`\`

This will generate a \`UsersController\` with CRUD methods.

### Generating Models

\`\`\`bash
forge generate model User name:string email:string password:string
\`\`\`

This will generate:
- A \`User\` model with the specified fields
- Database migration for the users table
- Basic validation rules
        `
      }
    ]
  },
  {
    id: "database",
    title: "Database",
    items: [
      {
        id: "database-setup",
        title: "Database Setup",
        slug: "database-setup",
        content: `
## Database Setup

Forge supports multiple databases out of the box:

### Configuration

Configure your database in \`config/config.yaml\`:

\`\`\`yaml
database:
  driver: postgres
  host: localhost
  port: 5432
  name: forge_db
  user: postgres
  password: secret
\`\`\`

### Initializing Your Database

\`\`\`go
package main

import (
  "github.com/forgeframework/forge"
  "github.com/forgeframework/forge/db"
)

func main() {
  app := forge.New()
  
  // Initialize database
  database, err := db.Connect()
  if err != nil {
    panic(err)
  }
  
  // Make database available to handlers
  app.SetDatabase(database)
  
  app.Run(":8080")
}
\`\`\`
        `
      },
      {
        id: "models",
        title: "Models",
        slug: "models",
        content: `
## Working with Models

Models in Forge represent your database tables:

\`\`\`go
package models

import (
  "time"
  
  "github.com/forgeframework/forge/db"
)

type User struct {
  ID        uint      \`json:"id" db:"id"\`
  Name      string    \`json:"name" db:"name"\`
  Email     string    \`json:"email" db:"email"\`
  CreatedAt time.Time \`json:"created_at" db:"created_at"\`
  UpdatedAt time.Time \`json:"updated_at" db:"updated_at"\`
}

func FindUser(id uint) (*User, error) {
  var user User
  err := db.Get(&user, "SELECT * FROM users WHERE id = ?", id)
  return &user, err
}

func (u *User) Save() error {
  u.UpdatedAt = time.Now()
  
  if u.ID == 0 {
    u.CreatedAt = time.Now()
    return db.Insert("users", u)
  }
  
  return db.Update("users", u)
}
\`\`\`
        `
      },
      {
        id: "migrations",
        title: "Migrations",
        slug: "migrations",
        content: `
## Database Migrations

Forge includes a migration system to manage your database schema:

### Creating a Migration

\`\`\`bash
forge generate migration create_users_table
\`\`\`

This will create a new migration file:

\`\`\`go
package migrations

import (
  "github.com/forgeframework/forge/db/migration"
)

func init() {
  migration.Register("20220101120000_create_users_table", Up, Down)
}

func Up(m *migration.Migration) {
  m.SQL(\`
    CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      created_at TIMESTAMP NOT NULL,
      updated_at TIMESTAMP NOT NULL
    )
  \`)
}

func Down(m *migration.Migration) {
  m.SQL("DROP TABLE users")
}
\`\`\`

### Running Migrations

\`\`\`bash
forge migrate
\`\`\`

### Rolling Back Migrations

\`\`\`bash
forge migrate rollback
\`\`\`
        `
      }
    ]
  }
];