# Technical Glossary

## A

### API (Application Programming Interface)

A set of rules and protocols for accessing a software application or web service. In this project, refers to the RESTful API built with Express.js that handles communication between the mobile app and Supabase backend.

### Authentication

The process of verifying the identity of a user or system. This project uses JWT (JSON Web Tokens) combined with Supabase Auth for secure user authentication.

## B

### Backend

The server-side of the application that handles business logic, database operations, and API endpoints. In this project, implemented using Node.js and Express.js.

### Bundle Size

The total size of the compiled JavaScript bundle that users download when using the mobile app. Target: < 5MB for optimal performance.

## C

### CI/CD (Continuous Integration/Continuous Deployment)

Automated processes for building, testing, and deploying software. This project uses GitHub Actions for automated testing and deployment pipelines.

### CORS (Cross-Origin Resource Sharing)

A security feature implemented in web browsers that controls which web pages can request resources from different domains. Configured in the Express server for secure API access.

### CRUD (Create, Read, Update, Delete)

The four basic operations for persistent storage. Applied to product management, user profiles, and order processing in this application.

## D

### Database Schema

The structure of the database including tables, columns, relationships, and constraints. This project uses PostgreSQL with a normalized schema for products, users, and orders.

### Detox

An end-to-end testing framework for React Native applications. Used for automated UI testing across iOS and Android platforms.

## E

### Entity-Relationship Diagram (ERD)

A visual representation of the database schema showing entities (tables), attributes (columns), and relationships. See [diagrams/erd.mmd](diagrams/erd.mmd) for the project ERD.

### Expo

A framework and platform for building React Native applications. Provides managed workflow, build services, and development tools for this project.

## F

### Frontend

The client-side of the application that users interact with. In this project, a React Native mobile application built with Expo.

### Functional Requirements

Specific behaviors or functions that the system must perform. Documented in [01_Analysis_Requirements.md](docs/01_Analysis_Requirements.md).

## G

### GDPR (General Data Protection Regulation)

European Union regulation on data protection and privacy. This application implements GDPR-compliant data handling practices.

## H

### Hot Reload

A development feature that automatically updates the running application when code changes are made, without requiring a full restart.

## I

### Integration Testing

Testing that verifies the interaction between different components or systems. This project includes API integration tests and component interaction tests.

## J

### Jest

A JavaScript testing framework used for unit and integration testing in this project.

### JSON Web Token (JWT)

A compact, URL-safe means of representing claims between two parties. Used for stateless authentication in the API.

## K

### Key Performance Indicators (KPIs)

Measurable values that demonstrate how effectively the application is achieving business objectives. Examples include user retention, conversion rates, and performance metrics.

## L

### Lighthouse

An open-source tool for auditing web app quality, including performance, accessibility, and SEO. Used for performance testing and optimization.

## M

### Mermaid

A JavaScript-based diagramming tool used to create charts and diagrams. All architectural diagrams in this project are created with Mermaid.

### Middleware

Software that acts as a bridge between applications, handling requests and responses. In this project, includes authentication middleware, CORS handling, and logging.

## N

### Node.js

A JavaScript runtime environment that executes JavaScript code outside of a web browser. Used for the backend API server in this project.

### Non-Functional Requirements

Requirements that specify criteria for system operation, such as performance, security, and usability. Documented in [01_Analysis_Requirements.md](docs/01_Analysis_Requirements.md).

## O

### Offline Support

The ability of the application to function without an internet connection. This project implements offline cart functionality using AsyncStorage.

## P

### PostgreSQL

An advanced open-source relational database system. Used as the primary database through Supabase in this project.

### Progressive Web App (PWA)

A web application that can be installed on devices and work offline. While this is a mobile app, PWA principles inform the architecture.

## R

### React Native

A framework for building native mobile applications using React and JavaScript. The core technology for the mobile app in this project.

### Real-time

Immediate data synchronization across clients without manual refresh. Implemented using Supabase's real-time capabilities for live inventory and order updates.

### REST (Representational State Transfer)

An architectural style for designing networked applications. The API in this project follows RESTful principles.

### Row Level Security (RLS)

A PostgreSQL feature that restricts data access at the row level based on user context. Implemented in Supabase for data security.

## S

### Scalability

The ability of the system to handle increased load. This project is designed with horizontal scaling in mind through stateless APIs and database connection pooling.

### SDLC (Software Development Life Cycle)

The process of planning, creating, testing, and deploying software. This documentation covers the complete SDLC for the e-commerce application.

### State Management

The management of application state across components. This project uses Zustand for client-side state management.

### Supabase

An open-source Firebase alternative providing database, authentication, real-time subscriptions, and storage. The backend platform for this project.

## T

### Three-Tier Architecture

A software architecture pattern with presentation, application, and data layers. Implemented in this project with mobile app, API server, and database.

### TypeScript

A superset of JavaScript that adds static typing. Used in the React Native application for better code quality and developer experience.

## U

### UML (Unified Modeling Language)

A standardized modeling language for software systems. Used for creating use case, activity, and sequence diagrams in this project.

### Unit Testing

Testing of individual units or components in isolation. This project achieves 87% code coverage with Jest and React Testing Library.

### User Acceptance Testing (UAT)

Testing performed by end-users to validate that the system meets their requirements and is ready for production deployment.

## V

### Version Control

The management of changes to documents, computer programs, and other information stored as computer files. This project uses Git for version control.

## W

### WebSocket

A computer communications protocol providing full-duplex communication channels over a single TCP connection. Used by Supabase for real-time features.

## X

### XML (eXtensible Markup Language)

A markup language that defines a set of rules for encoding documents in a format that is both human-readable and machine-readable.

## Y

### YAML (YAML Ain't Markup Language)

A human-readable data serialization standard that is commonly used for configuration files and data exchange.

## Z

### Zustand

A small, fast and scalable state management solution for React applications. Used in this project for managing application state.

---

_This glossary provides definitions for technical terms used throughout the e-commerce mobile application project documentation._

## Contributing to the Glossary

When adding new terms:

1. Add in alphabetical order
2. Include full form in parentheses for acronyms
3. Provide clear, concise definitions
4. Reference related documentation when applicable

---

_Last updated: May 3, 2026_
