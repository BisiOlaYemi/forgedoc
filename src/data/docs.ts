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
# Flux! the GoPowerhouse

Flux is a modern, web framework for Go — designed to combine developer happiness, performance, and structure. Choose Convention over configuration that may take you hours

## Why Flux?

Flux is built on top of the Fiber web framework, leveraging its high-performance foundation while adding our own unique approaches and abstractions. We've built Flux to provide a more structured, convention-over-configuration approach compared to the minimalist design of Fiber.

While using Fiber's exceptional performance characteristics, we've implemented several unique approaches including:

1. Controller-based routing system with automatic route generation
2. Powerful validation and request binding system 
3. Advanced middleware system inspired by Express.js
4. Comprehensive scaffolding tools for rapid development
5. Built-in support for databases, authentication, and other common web application needs.

### Key Features

- Type-Safe Request Handling: Struct-based binding & validation (like FastAPI)
- Auto-generated Swagger Docs: OpenAPI docs from your handlers
- Modular MVC Architecture: Controllers, Services, Models (like NestJS)
- Microservices Support: First-class tools for building distributed systems
- CLI Scaffolding: Code generation for rapid development
- Go-Level Performance: Fiber/Gin speed under the hood
- Built-in Auth: JWT authentication and authorization
- Extensible Plugins: File uploads, RBAC, jobs, and more
- Full-Stack Ready: With template support or HTMX/SPA integration

Get started with Flux today and experience the power of modern Go development with the perfect balance of structure and performance!
        `
      },
      {
        id: "installation",
        title: "Installation",
        slug: "installation",
        content: `
# Installation

## Prerequisites

Before installing Flux, ensure you have the following:

- Go 1.20 or later installed
- Basic familiarity with Go programming


## Installing Flux CLI

The simplest way to install Flux is via the Go package manager:

\`\`\`bash
go install github.com/Fluxgo/flux/cmd/flux@latest
\`\`\`

Verify the installation with:

\`\`\`bash
flux
\`\`\`

\`\`\`bash
flux --version
\`\`\`

## Tidy the Installation:


\`\`\`bash
go mod tidy
\`\`\`

Now that you have Flux installed, you're ready to create your first project!
        `
      },
      {
        id: "quick-start",
        title: "Quick Start",
        slug: "quick-start",
        content: `
# Quick Start

## Creating a New Project

Create a new Flux application:

\`\`\`bash
flux new my-app
cd my-app
\`\`\`

## Project Structure

A new Flux project will have the following structure:

\`\`\`
my-app/
├── app/
│   ├── controllers/      # Route handlers
│   ├── models/           # Database models
│   ├── services/         # Business logic
│   └── middleware/       # Custom middleware
├── config/               # Configuration files
├── database/             
│   ├── migrations/       # Database migrations
│   └── seeders/          # Data seeders
├── public/               # Static assets
├── routes/               # Generated route files
├── templates/            # View templates (optional)
├── flux.yaml            # Main configuration
├── go.mod                # Go module definition
└── main.go               # Application entry point
\`\`\`

## Running the Application

Start the development server with hot-reloading:

\`\`\`bash
flux serve
\`\`\`

Or run it directly with Go:

\`\`\`bash
go run main.go
\`\`\`

## Creating Your First Controller

Generate a new controller with the Flux CLI:

\`\`\`bash
flux make:controller User
\`\`\`

This will create a new controller at \`app/controllers/user_controller.go\` with basic CRUD operations.

## Next Steps

Now that you have a running application, explore the following sections to learn more about:

- Routing and Controllers
- Middleware
- Database Integration
- Authentication
- Testing your application

Flux makes it easy to build robust web applications while maintaining the performance and simplicity of Go!
        `
      }
    ]
  },
  {
    id: "core-concepts",
    title: "Core Concepts",
    items: [
      {
        id: "architecture",
        title: "Architecture",
        slug: "architecture",
        content: `
# Architecture Options

Flux supports two primary architectural patterns, giving you the flexibility to choose the best approach for your project.

## 1. Monolithic Architecture

Best for:
- Smaller teams and projects
- Rapid prototyping
- Applications with simpler domains

### Structure:
\`\`\`
myapp/
├── app/
│   ├── controllers/      # Route handlers
│   ├── services/         # Business logic
│   ├── models/           # DB schemas
├── config/               # App/env config
├── database/             # Migrations/seeders
├── routes/               # Route groups
├── templates/            # Optional views
├── flux.yaml            # Project config
└── main.go
\`\`\`

### Benefits of Monolithic Architecture:
- Easier development and debugging
- Simpler deployment process
- Lower complexity for smaller applications
- Faster initial development velocity

## 2. Microservice Architecture

Best for:
- Larger teams and projects
- Complex domain boundaries
- Scalable, distributed systems

### Structure:
\`\`\`
service-name/
├── api/              # API layer
│   ├── handlers/     # HTTP request handlers
│   └── middleware/   # HTTP middleware
├── cmd/              # Application entry points
│   └── service-name/ # Main service executable
├── config/           # Configuration files
├── internal/         # Private application code
│   ├── models/       # Data models
│   ├── services/     # Business logic
│   └── repositories/ # Data access layer
└── pkg/              # Public libraries
    └── logger/       # Logging utilities
\`\`\`

### Benefits of Microservice Architecture:
- Independent scaling of services
- Technology diversity (use different databases per service)
- Isolation of failures
- Independent deployment of services
- Clear domain boundaries

## Choosing the Right Architecture

The right architecture depends on your specific needs:

- Team size and expertise: Microservices require more DevOps knowledge
- Project scope: Larger projects benefit more from microservices
- Scale requirements: If different components need different scaling characteristics
- Development speed: Monoliths are often faster to develop initially

Flux supports both approaches, and you can even start with a monolith and migrate to microservices as your application grows.
        `
      },
      {
        id: "routing",
        title: "Routing",
        slug: "routing",
        content: `
# Routing and Controllers

Flux implements a convention-based routing system that automatically maps controller methods to HTTP routes.

## Controller-Based Routing

Controllers in Flux are Go structs that embed the \`flux.Controller\` type. Methods on these controllers are automatically mapped to HTTP routes based on naming conventions.

Here's a basic example of controller-based routing:

\`\`\`go
package controllers

import (
    "github.com/Fluxgo/flux/pkg/flux"
)

// UserController handles user-related requests
// Routes will be prefixed with "/user"
type UserController struct {
    flux.Controller
}

// HandleGetUsers handles GET /user
func (c *UserController) HandleGetUsers(ctx *flux.Context) error {
    return ctx.JSON(flux.H{
        "users": []string{"John", "Jane", "Bob"},
    })
}

// HandleGetUserById handles GET /user/:id
func (c *UserController) HandleGetUserById(ctx *flux.Context) error {
    id := ctx.Param("id")
    return ctx.JSON(flux.H{
        "id": id,
        "name": "John Doe",
    })
}

// HandlePostUser handles POST /user
func (c *UserController) HandlePostUser(ctx *flux.Context) error {
    var user struct {
        Name  string \`json:"name" validate:"required"\`
        Email string \`json:"email" validate:"required,email"\`
    }
    
    if err := ctx.Bind(&user); err != nil {
        return ctx.Status(400).JSON(flux.H{
            "error": "Invalid request body",
        })
    }
    
    return ctx.Status(201).JSON(flux.H{
        "message": "User created",
        "user": user,
    })
}
\`\`\`

## Route Naming Conventions

Flux uses the following naming conventions for controller methods:

- Methods must be prefixed with \`Handle\` followed by the HTTP method (\`Get\`, \`Post\`, \`Put\`, \`Delete\`, etc.)
- The rest of the method name becomes the route path, with camel case converted to kebab case
- Special naming patterns like \`ById\` are automatically converted to URL parameters

Examples:
- \`HandleGetUsers\` → \`GET /user\`
- \`HandleGetUserById\` → \`GET /user/:id\`
- \`HandlePostUserLogin\` → \`POST /user/login\`
- \`HandlePutUserProfileById\` → \`PUT /user/profile/:id\`

## Registering Controllers

To use your controllers, register them in your \`main.go\` file:

\`\`\`go
func main() {
    app, err := flux.New(&flux.Config{
        Name:    "my-app",
        Version: "0.1.0",
        Server: flux.ServerConfig{
            Port: 3000,
        },
    })
    if err != nil {
        log.Fatal(err)
    }
    
    // Register controllers
    app.RegisterController(&controllers.UserController{})
    app.RegisterController(&controllers.AuthController{})
    
    if err := app.Start(); err != nil {
        log.Fatal(err)
    }
}
\`\`\`

## URL Parameters and Query Strings

Access URL parameters and query strings in your handlers:

\`\`\`go
// URL parameter - /user/:id
id := ctx.Param("id")

// Query string - /user?page=1&limit=10
page := ctx.Query("page", "1")  // Second param is default value
limit := ctx.Query("limit", "10")
\`\`\`

## Route Groups

Group related routes with a common prefix and middleware:

\`\`\`go
// Create a group with shared middleware
api := (&flux.Controller{}).Group("/api")
api.Use(middleware.RequireAuth())

// Add controllers to the group
api.Add(&controllers.UserController{})
api.Add(&controllers.ProductController{})

// Register all controllers in the group
api.Register(app)
\`\`\`

This simple yet powerful routing system makes it easy to organize your application's endpoints while following RESTful conventions.
        `
      },
      {
        id: "middleware",
        title: "Middleware",
        slug: "middleware",
        content: `
# Middleware System

Flux provides a powerful middleware system inspired by Express.js, allowing you to execute code before and after route handlers.

## Creating Middleware

Middleware in Flux are functions that take a \`flux.HandlerFunc\` and return another \`flux.HandlerFunc\`:

\`\`\`go
package middleware

import (
    "time"
    "github.com/Fluxgo/flux/pkg/flux"
)

// Logger middleware logs requests and their durations
func Logger() flux.MiddlewareFunc {
    return func(next flux.HandlerFunc) flux.HandlerFunc {
        return func(ctx *flux.Context) error {
            start := time.Now()
            
            // Call the next handler
            err := next(ctx)
            
            // Log after the request is processed
            duration := time.Since(start)
            ctx.App().Logger().Info("Request %s %s processed in %v", ctx.Method(), ctx.Path(), duration)
            
            return err
        }
    }
}

// RequireAuth middleware checks for authorization
func RequireAuth() flux.MiddlewareFunc {
    return func(next flux.HandlerFunc) flux.HandlerFunc {
        return func(ctx *flux.Context) error {
            token := ctx.Get("Authorization")
            
            if token == "" {
                return ctx.Status(401).JSON(flux.H{
                    "error": "Unauthorized",
                })
            }
            
            // Validate token...
            
            // Call the next handler if authenticated
            return next(ctx)
        }
    }
}
\`\`\`

## Applying Middleware

Middleware can be applied at different levels:

### 1. Global Middleware

\`\`\`go
// Apply middleware to all routes
app.Use(middleware.Logger())
\`\`\`

### 2. Controller-Level Middleware

\`\`\`go
// Apply middleware to a specific controller
userController := &controllers.UserController{}
userController.Use(middleware.RequireAuth())
app.RegisterController(userController)
\`\`\`

### 3. Controller Group Middleware

\`\`\`go
// Create a group with shared middleware
api := (&flux.Controller{}).Group("/api")
api.Use(middleware.Recover(), middleware.RequestLogger())

// Add controllers to the group
api.Add(&controllers.UserController{})
api.Add(&controllers.ProductController{})

// Register all controllers in the group
api.Register(app)
\`\`\`

## Built-in Middleware

Flux includes several built-in middleware functions:

- \`RequestLogger()\`: Logs request information and timing
- \`Recover()\`: Catches panics and converts them to errors
- \`RequireAuth()\`: Handles authentication checks
- \`CORS(options)\`: Configures CORS headers
- \`RateLimit(limit)\`: Limits request rates
- \`Timeout(duration)\`: Sets a timeout for request handling

## CORS Configuration

Flux includes built-in CORS support. Configure it in your application:

\`\`\`go
app, err := flux.New(&flux.Config{
    
    CORS: flux.CORSConfig{
        AllowOrigins:     "http://localhost:3000,https://example.com",
        AllowMethods:     "GET,POST,PUT,DELETE",
        AllowHeaders:     "Origin, Content-Type, Accept, Authorization",
        AllowCredentials: true,
        MaxAge:           86400, 
    },
})
\`\`\`

If not specified, Flux uses a permissive default CORS configuration that allows all origins.

The middleware system in Flux allows you to easily add cross-cutting concerns like logging, authentication, and error handling to your application in a clean and maintainable way.
        `
      },
      {
        id: "cli-overview",
        title: "CLI Overview",
        slug: "cli-overview",
        content: `
# CLI Overview

Flux includes a powerful CLI tool to help you scaffold and manage your application.

## Available Commands

| Command | Description |

| \`flux new <name>\` | Create a new monolithic Flux project |
| \`flux serve\` | Start the development server with hot reload |
| \`flux make:controller <name>\` | Generate a new controller |
| \`flux make:model <name>\` | Generate a new model |
| \`flux make:middleware <name>\` | Generate a new middleware |
| \`flux make:service <name>\` | Generate a new service |
| \`flux make:microservice <name>\` | Generate a new microservice project |
| \`flux db:migrate\` | Run database migrations |
| \`flux db:rollback\` | Roll back the last database migration |
| \`flux db:seed\` | Run database seeders |
| \`flux doc:generate\` | Generate OpenAPI documentation |

## Creating New Projects

\`\`\`bash
# Create a new monolithic application
flux new my-application

# Create a new microservice
flux make:microservice user-service
\`\`\`

## Scaffolding Components

The CLI provides several commands for scaffolding different parts of your application:

\`\`\`bash
# Create a new controller
flux make:controller User

# Create a new model with a migration
flux make:model Product --migration

# Create a new middleware
flux make:middleware Authorize

# Create a new microservice
flux make:microservice payment-service --with-db --with-auth
\`\`\`

## Microservice Options

When creating microservices, you can use flags to include common dependencies:

\`\`\`bash
flux make:microservice order-service --with-db --with-auth --with-cache
\`\`\`

Available flags:
- \`--with-db\`: Include database integration
- \`--with-auth\`: Include authentication support
- \`--with-cache\`: Include Redis cache integration
- \`--with-queue\`: Include task queue support

## Development Commands

\`\`\`bash
# Start the development server with hot reload
flux serve

# Run database migrations
flux db:migrate

# Generate OpenAPI documentation
flux doc:generate
\`\`\`

## Configuration

The CLI uses settings from your \`flux.yaml\` file to customize its behavior. You can also pass additional flags to most commands for fine-grained control.

The Flux CLI is designed to streamline your development workflow and help you focus on building your application rather than boilerplate code.
        `
      },
      {
        id: "scaffolding",
        title: "Scaffolding",
        slug: "scaffolding",
        content: `
# Scaffolding

Flux's scaffolding tools help you generate code and structure your project following best practices.

## Controller Scaffolding

Generate a new controller with:

\`\`\`bash
flux make:controller User
\`\`\`

This creates a file at \`app/controllers/user_controller.go\` with this structure:

\`\`\`go
package controllers

import (
    "github.com/Fluxgo/flux/pkg/flux"
)

// UserController handles user-related endpoints
type UserController struct {
    flux.Controller
}

// HandleGetUsers handles GET /user
func (c *UserController) HandleGetUsers(ctx *flux.Context) error {
    return ctx.JSON(flux.H{
        "message": "List all users",
    })
}

// HandleGetUserById handles GET /user/:id
func (c *UserController) HandleGetUserById(ctx *flux.Context) error {
    id := ctx.Param("id")
    return ctx.JSON(flux.H{
        "message": "Get user",
        "id": id,
    })
}

// HandlePostUser handles POST /user
func (c *UserController) HandlePostUser(ctx *flux.Context) error {
    return ctx.JSON(flux.H{
        "message": "Create user",
    })
}

// HandlePutUserById handles PUT /user/:id
func (c *UserController) HandlePutUserById(ctx *flux.Context) error {
    id := ctx.Param("id")
    return ctx.JSON(flux.H{
        "message": "Update user",
        "id": id,
    })
}

// HandleDeleteUserById handles DELETE /user/:id
func (c *UserController) HandleDeleteUserById(ctx *flux.Context) error {
    id := ctx.Param("id")
    return ctx.JSON(flux.H{
        "message": "Delete user",
        "id": id,
    })
}
\`\`\`

## Model Scaffolding

Generate a new model with:

\`\`\`bash
flux make:model Product --migration
\`\`\`

This creates:
1. A model file at \`app/models/product.go\`
2. A migration file at \`database/migrations/TIMESTAMP_create_products_table.go\`

The model file looks like:

\`\`\`go
package models

import (
    "time"
)

// Product represents a product in the system
type Product struct {
    ID          uint      \`json:"id" gorm:"primaryKey"\`
    Name        string    \`json:"name" gorm:"not null"\`
    Description string    \`json:"description"\`
    Price       float64   \`json:"price" gorm:"not null"\`
    CreatedAt   time.Time \`json:"created_at"\`
    UpdatedAt   time.Time \`json:"updated_at"\`
}

// TableName specifies the table name for this model
func (Product) TableName() string {
    return "products"
}
\`\`\`

## Middleware Scaffolding

Generate a new middleware with:

\`\`\`bash
flux make:middleware Auth
\`\`\`

This creates a file at \`app/middleware/auth.go\` with this structure:

\`\`\`go
package middleware

import (
    "github.com/Fluxgo/flux/pkg/flux"
)

// Auth middleware handles authentication
func Auth() flux.MiddlewareFunc {
    return func(next flux.HandlerFunc) flux.HandlerFunc {
        return func(ctx *flux.Context) error {
            // Check authentication here
            
            // Example: Check for a token in the Authorization header
            token := ctx.Get("Authorization")
            if token == "" {
                return ctx.Status(401).JSON(flux.H{
                    "error": "Unauthorized",
                })
            }
            
            // Add user information to context
            // ctx.Locals("user", user)
            
            // Call the next middleware or handler
            return next(ctx)
        }
    }
}
\`\`\`

## Service Scaffolding

Generate a new service with:

\`\`\`bash
flux make:service UserService
\`\`\`

This creates a file at \`app/services/user_service.go\` with this structure:

\`\`\`go
package services

import (
    "github.com/Fluxgo/flux/pkg/flux"
)

// UserService handles user-related business logic
type UserService struct {
    app *flux.Application
}

// NewUserService creates a new UserService
func NewUserService(app *flux.Application) *UserService {
    return &UserService{
        app: app,
    }
}

// Get returns a user by ID
func (s *UserService) Get(id string) (interface{}, error) {
    // Implement user retrieval logic
    return nil, nil
}

// List returns all users
func (s *UserService) List() (interface{}, error) {
    // Implement user listing logic
    return nil, nil
}

// Create creates a new user
func (s *UserService) Create(data interface{}) (interface{}, error) {
    // Implement user creation logic
    return nil, nil
}

// Update updates a user
func (s *UserService) Update(id string, data interface{}) (interface{}, error) {
    // Implement user update logic
    return nil, nil
}

// Delete deletes a user
func (s *UserService) Delete(id string) error {
    // Implement user deletion logic
    return nil
}
\`\`\`

## Microservice Scaffolding

Generate a new microservice with:

\`\`\`bash
flux make:microservice user-service --with-db --with-auth
\`\`\`

This creates a full microservice project with the appropriate structure and dependencies.

The scaffolding tools in Flux help you maintain consistent code structure and follow best practices, increasing your development speed and code quality.
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
# Database Setup

Flux uses GORM as its ORM for database operations, supporting PostgreSQL, MySQL, SQLite, and SQL Server.

## Configuration

Configure your database connection in \`flux.yaml\`:

\`\`\`yaml
database:
  driver: postgres        # postgres, mysql, sqlite, sqlserver
  host: localhost
  port: 5432
  name: fluxapp
  username: postgres
  password: secret
\`\`\`

Or programmatically in your \`main.go\`:

\`\`\`go
app, err := flux.New(&flux.Config{
    
    Database: flux.DatabaseConfig{
        Driver:   "postgres",
        Host:     "localhost",
        Port:     5432,
        Name:     "fluxapp",
        Username: "postgres",
        Password: "secret",
    },
})
\`\`\`

## Connection Management

Flux automatically manages database connections for you:

- Connection pooling for efficient resource usage
- Connection retries for resilience
- Graceful shutdown to close connections properly

## Accessing the Database

Access the database instance in your controllers and services:

\`\`\`go
// In a controller
func (c *UserController) HandleGetUsers(ctx *flux.Context) error {
    db := ctx.App().DB()
    
    // Use the database...
    
    return ctx.JSON(flux.H{
        "message": "Success",
    })
}
\`\`\`

## Multiple Databases

Flux supports connecting to multiple databases:

\`\`\`go
// Define a secondary database connection
secondaryDB, err := flux.NewDatabase(&flux.DatabaseConfig{
    Driver:   "mysql",
    Host:     "localhost",
    Port:     3306,
    Name:     "analytics",
    Username: "root",
    Password: "password",
})

if err != nil {
    log.Fatal(err)
}

// Use the secondary database
analytics := secondaryDB.DB.Table("events")
\`\`\`

## Transaction Support

Flux provides convenient transaction helpers:

\`\`\`go
func CreateUserWithProfile(db *gorm.DB, user User, profile Profile) error {
    return db.Transaction(func(tx *gorm.DB) error {
        if err := tx.Create(&user).Error; err != nil {
            return err
        }
        
        profile.UserID = user.ID
        if err := tx.Create(&profile).Error; err != nil {
            return err
        }
        
        return nil
    })
}
\`\`\`

## Query Logging

Enable SQL query logging in development mode:

\`\`\`go
app, err := flux.New(&flux.Config{
    // Other config...
    LogLevel: "debug",  // This will enable SQL logging
})
\`\`\`

Flux makes database operations simple and intuitive while maintaining the flexibility and power of GORM for more complex queries and operations.
        `
      },
      {
        id: "migration",
        title: "Migration",
        slug: "migration",
        content: `
# Migrations

Flux provides a migration system to manage database schema changes.

## Creating Migrations

Generate a new migration:

\`\`\`bash
flux make:migration create_users_table
\`\`\`

This creates a migration file in the \`database/migrations\` directory:

\`\`\`go
// database/migrations/20230415120000_create_users_table.go
package migrations

import (
    "github.com/Fluxgo/flux/pkg/flux",
    "gorm.io/gorm"
)

func init() {
    flux.RegisterMigration(&flux.Migration{
        Name: "create_users_table",
        Up: func(db *gorm.DB) error {
            return db.Exec(\`
                CREATE TABLE users (
                    id SERIAL PRIMARY KEY,
                    name VARCHAR(255) NOT NULL,
                    email VARCHAR(255) UNIQUE NOT NULL,
                    password VARCHAR(255) NOT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            \`).Error
        },
        Down: func(db *gorm.DB) error {
            return db.Exec(\`DROP TABLE users\`).Error
        },
    })
}
\`\`\`

## Using GORM for Migrations

You can also use GORM's AutoMigrate feature:

\`\`\`go
// database/migrations/20230415120000_create_products_table.go
package migrations

import (
    "github.com/Fluxgo/flux/pkg/flux",
    "gorm.io/gorm"
    "yourapp/app/models"
)

func init() {
    flux.RegisterMigration(&flux.Migration{
        Name: "create_products_table",
        Up: func(db *gorm.DB) error {
            return db.AutoMigrate(&models.Product{})
        },
        Down: func(db *gorm.DB) error {
            return db.Migrator().DropTable("products")
        },
    })
}
\`\`\`

## Running Migrations

Run pending migrations:

\`\`\`bash
flux db:migrate
\`\`\`

## Rolling Back Migrations

Roll back the most recent migration:

\`\`\`bash
flux db:rollback
\`\`\`

Roll back multiple steps:

\`\`\`bash
flux db:rollback --steps=3
\`\`\`

## Reset Database

Reset the database (drop all tables and run all migrations):

\`\`\`bash
flux db:reset
\`\`\`

## Migration Status

Check the status of migrations:

\`\`\`bash
flux db:status
\`\`\`

## Programmatic Migration

You can also run migrations programmatically in your application:

\`\`\`go
if err := app.RunMigrations(); err != nil {
    log.Fatalf("Failed to run migrations: %v", err)
}
\`\`\`

## Best Practices

1. Keep migrations small and focused: Each migration should do one thing
2. Make migrations reversible: Always implement both Up and Down methods
3. Test migrations: Ensure they run correctly on a test database
4. Use transactions: Wrap complex migrations in transactions
5. Version control: Always commit migrations to your repository

Migrations are a crucial part of database management, enabling you to evolve your schema over time in a controlled, reversible manner.
        `
      },
      {
        id: "models",
        title: "Models",
        slug: "models",
        content: `
# Models

Models in Flux represent your database tables and provide methods to interact with your data.

## Defining Models

Models are Go structs with field tags that define how they map to database columns:

\`\`\`go
package models

import (
    "time"
    "gorm.io/gorm"
)

// User represents a user account
type User struct {
    ID        uint      \`json:"id" gorm:"primaryKey"\`
    Name      string    \`json:"name"\`
    Email     string    \`json:"email" gorm:"uniqueIndex"\`
    Password  string    \`json:"-"\` // "-" excludes from JSON output
    CreatedAt time.Time \`json:"created_at"\`
    UpdatedAt time.Time \`json:"updated_at"\`
}

// TableName specifies the table name
func (User) TableName() string {
    return "users"
}
\`\`\`

## Generating Models

Generate a new model using the CLI:

\`\`\`bash
flux make:model User
\`\`\`

With a migration:

\`\`\`bash
flux make:model Product --migration
\`\`\`

## GORM Tags

Common GORM tags used in models:

- \`gorm:"primaryKey"\`: Defines a primary key
- \`gorm:"column:custom_name"\`: Specifies a custom column name
- \`gorm:"uniqueIndex"\`: Creates a unique index
- \`gorm:"not null"\`: Sets a NOT NULL constraint
- \`gorm:"size:255"\`: Sets the column size
- \`gorm:"default:value"\`: Sets a default value
- \`gorm:"type:varchar(100)"\`: Sets the column data type
- \`gorm:"autoCreateTime"\`: Automatically set current time on create
- \`gorm:"autoUpdateTime"\`: Automatically update time on update

## Hooks

GORM supports hooks (callbacks) that allow you to add custom logic before or after certain events:

\`\`\`go
// BeforeCreate hook runs before creating a record
func (u *User) BeforeCreate(tx *gorm.DB) error {
    // Hash password before creating the user
    hashedPassword, err := bcrypt.GenerateFromPassword([]byte(u.Password), bcrypt.DefaultCost)
    if err != nil {
        return err
    }
    u.Password = string(hashedPassword)
    return nil
}

// AfterFind hook runs after querying a record
func (u *User) AfterFind(tx *gorm.DB) error {
    // Do something after finding the user
    return nil
}
\`\`\`

## Relationships

GORM supports various relationship types:

### One-to-Many Relationship

\`\`\`go
// User has many posts
type User struct {
    ID    uint   \`gorm:"primaryKey"\`
    Name  string
    Posts []Post // One-to-many relationship
}

// Post belongs to a user
type Post struct {
    ID     uint   \`gorm:"primaryKey"\`
    Title  string
    Body   string
    UserID uint   // Foreign key
    User   User   // Reference to the user
}
\`\`\`

### Many-to-Many Relationship

\`\`\`go
// User belongs to many roles
type User struct {
    ID    uint   \`gorm:"primaryKey"\`
    Name  string
    Roles []Role \`gorm:"many2many:user_roles;"\` // Many-to-many relationship
}

// Role belongs to many users
type Role struct {
    ID    uint   \`gorm:"primaryKey"\`
    Name  string
    Users []User \`gorm:"many2many:user_roles;"\` // Many-to-many relationship
}
\`\`\`

## Using Models

Examples of using models with GORM:

\`\`\`go
// Create a new record
user := models.User{
    Name:  "Yemi Dev",
    Email: "yemi@flgo.com",
}
db.Create(&user)

// Find a record by ID
var user models.User
db.First(&user, 1) // Find user with ID 1

// Find a record by condition
var user models.User
db.Where("email = ?", "yemi@flgo.com").First(&user)

// Update a record
db.Model(&user).Update("name", "Engineer Yemi")

// Delete a record
db.Delete(&user)
\`\`\`

## Scopes

GORM supports scopes for reusable query logic:

\`\`\`go
// Define a scope
func Active(db *gorm.DB) *gorm.DB {
    return db.Where("active = ?", true)
}

// Use the scope
var users []models.User
db.Scopes(Active).Find(&users)
\`\`\`

Models in Flux are designed to be simple yet powerful, leveraging GORM's features for effective database operations.
        `
      }
    ]
  }
];