# Todo App

This is a todo REST API built with [Bun.js](https://bun.sh/docs), [Elysia](https://elysiajs.com/) and [SQLite](https://bun.sh/docs) based on hexagonal/clean architecture principles.

## Architecture

### Domain Layer

Contains the core business logic and entities like the `Todo` class.

### Application Layer 

Contains use cases like `CreateTodoUseCase` which call the domain layer and repository interfaces.

### Infrastructure Layer

Contains implementations of interfaces defined in the application layer, like the database repository.

This separation of concerns keeps the business logic isolated from implementation details.

## Design Patterns

### Repository Pattern

The `ITodoRepository` interface defines a repository for data access. This is implemented by `SqliteTodoRepository` but can be swapped out easily.

Keeps data access encapsulated and separates it from business logic.

### Use Case Pattern

Each use case like `CreateTodoUseCase` handles a specific task or use case. This pattern encapsulates business logic related to that task.

The controllers call the use cases which contain the complex logic, keeping the controllers thin.

### Dependency Injection

Dependencies like repositories are injected into use cases through the constructor. This allows mocking dependencies for testing.

## Testing

Unit tests provided for domain, use cases and api using Bun Test Runner.

## API Documentation

API documentation provided by Swagger.

## Database

The app uses [SQLite](https://bun.sh/docs) for data persistence.

## Getting Started

### Installation
```sh
bun install
```

### Run
```sh
bun run dev
``````

Run all tests
```sh
bun run test
```

Run tests and return coverage
```sh
bun run test:coverage
```

Run all tests in watch mode
```sh
bun run test:watch
```

Run code linter
```sh
bun run lint
```

### Build app
```sh
bun run build
```

## Running with docker
install
```sh
make up
```

run dev mode
```sh
make start
```

run tests and return coverage
```sh
make coverage
```

run lint code
```sh
make lint
```

exec command inside container
```sh
make sh
```

build-prod
```sh
make build
```



## Contributing

Contributions welcome!