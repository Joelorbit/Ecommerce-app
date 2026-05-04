# Contributing to E-Commerce Mobile Application

## 🤝 How to Contribute

We welcome contributions from the community! This document provides guidelines and best practices for contributing to the e-commerce mobile application project. Whether you're fixing bugs, adding features, improving documentation, or suggesting enhancements, your contributions are valuable.

---

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [GitHub Best Practices](#github-best-practices)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Testing Guidelines](#testing-guidelines)
- [Documentation](#documentation)
- [Issue Reporting](#issue-reporting)
- [License](#license)

---

## 🏛️ Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inclusive environment for all contributors. We pledge to:

- **Be respectful** and considerate in all interactions
- **Accept responsibility** for mistakes and learn from them
- **Show empathy** towards other community members
- **Focus on constructive feedback** rather than criticism
- **Value diverse perspectives** and experiences

### Unacceptable Behavior

The following behaviors are considered unacceptable:

- Harassment, discrimination, or offensive comments
- Personal attacks or trolling
- Public or private harassment
- Publishing others' private information without permission
- Other conduct deemed inappropriate in a professional setting

### Reporting Violations

If you experience or witness unacceptable behavior, please report it by:

- Emailing: conduct@company.com
- Creating a private issue on GitHub with details
- Contacting a project maintainer directly

---

## 🚀 Getting Started

### Prerequisites

Before contributing, ensure you have:

- **Node.js 18+** installed
- **npm or yarn** package manager
- **Expo CLI** for React Native development
- **Git** for version control
- **Supabase account** for backend services
- **iOS Simulator** or **Android Emulator** for testing

### Development Setup

#### 1. Fork and Clone

```bash
# Fork the repository on GitHub
# Then clone your fork
git clone https://github.com/Joelorbit/ecommerce-mobile-app.git
cd ecommerce-mobile-app
```

#### 2. Install Dependencies

```bash
# Install backend dependencies
cd backend
npm install

# Install mobile app dependencies
cd ../mobile
npm install
```

#### 3. Environment Configuration

```bash
# Copy environment templates
cp backend/.env.example backend/.env
cp mobile/.env.example mobile/.env

# Configure your Supabase credentials
# Edit .env files with your Supabase project details
```

#### 4. Database Setup

```bash
# Initialize Supabase locally (optional)
npx supabase start

# Or use cloud Supabase project
# Run migrations
npx supabase db push
```

#### 5. Start Development

```bash
# Terminal 1: Start API server
cd backend
npm run dev

# Terminal 2: Start mobile app
cd mobile
npx expo start
```

---

## 🔄 Development Workflow

### Branching Strategy

We follow a **Git Flow** branching model:

```
main (production-ready)
├── develop (integration branch)
│   ├── feature/user-authentication
│   ├── feature/product-catalog
│   ├── bugfix/login-validation
│   ├── hotfix/critical-security-patch
│   └── refactor/state-management
```

#### Branch Naming Conventions

- **Features:** `feature/description-of-feature`
- **Bug Fixes:** `bugfix/description-of-bug`
- **Hotfixes:** `hotfix/description-of-fix`
- **Refactoring:** `refactor/description-of-change`
- **Documentation:** `docs/description-of-docs`

### Commit Message Standards

We follow the **Conventional Commits** specification:

```
type(scope): description

[optional body]

[optional footer]
```

#### Commit Types

- **feat:** New feature
- **fix:** Bug fix
- **docs:** Documentation changes
- **style:** Code style changes (formatting, etc.)
- **refactor:** Code refactoring
- **test:** Adding or updating tests
- **chore:** Maintenance tasks

#### Examples

```bash
feat(auth): add biometric login support
fix(cart): resolve duplicate item addition bug
docs(api): update authentication endpoint documentation
test(products): add unit tests for product filtering
refactor(state): migrate to Zustand for state management
```

---

## 🎯 GitHub Best Practices

### Repository Organization

#### Labels

We use standardized labels for issues and PRs:

- **bug** - Something isn't working
- **enhancement** - New feature or request
- **documentation** - Documentation improvements
- **good first issue** - Ideal for newcomers
- **help wanted** - Extra attention needed
- **priority: high** - High priority items
- **priority: low** - Low priority items
- **status: in progress** - Currently being worked on
- **status: blocked** - Blocked by dependencies

#### Projects

We organize work using GitHub Projects:

- **Sprint Backlog** - Current sprint items
- **Bug Triage** - Incoming bug reports
- **Feature Requests** - Planned enhancements
- **Documentation** - Documentation tasks

### Issue Management

#### Creating Issues

When creating issues, please:

- **Use clear, descriptive titles**
- **Provide detailed descriptions** with steps to reproduce
- **Include screenshots** for UI-related issues
- **Specify environment details** (OS, device, app version)
- **Add appropriate labels** and assignees
- **Link related issues** or pull requests

#### Issue Templates

We provide templates for:

- **Bug Reports** - Structured bug reporting
- **Feature Requests** - Feature proposal template
- **Security Issues** - Responsible disclosure template

### Pull Request Best Practices

#### PR Guidelines

- **Keep PRs focused** - One feature or fix per PR
- **Write descriptive titles** following commit conventions
- **Provide detailed descriptions** explaining the change
- **Reference related issues** using keywords (fixes #123, closes #456)
- **Include screenshots** for UI changes
- **Update documentation** if needed

#### PR Size

- **Small PRs** (< 200 lines): Quick review, low risk
- **Medium PRs** (200-500 lines): Standard review process
- **Large PRs** (> 500 lines): May require multiple reviewers

---

## 🔄 Pull Request Process

### Step-by-Step Guide

#### 1. Prepare Your Branch

```bash
# Ensure you're on develop branch
git checkout develop
git pull origin develop

# Create and switch to feature branch
git checkout -b feature/your-feature-name
```

#### 2. Make Changes

```bash
# Make your changes following coding standards
# Write tests for new functionality
# Update documentation if needed

# Stage and commit changes
git add .
git commit -m "feat: add your feature description"
```

#### 3. Push and Create PR

```bash
# Push your branch
git push origin feature/your-feature-name

# Create Pull Request on GitHub
```

#### 4. Code Review

- Address review comments
- Make necessary changes
- Ensure CI/CD passes
- Get approval from maintainers

#### 5. Merge

- Squash merge for clean history
- Delete feature branch after merge
- Update any related documentation

---

## 💻 Coding Standards

### TypeScript/JavaScript

#### Code Style

- Use **ES6+** features
- Follow **Airbnb JavaScript Style Guide**
- Use **Prettier** for code formatting
- Use **ESLint** for code linting

#### Naming Conventions

```javascript
// Components
const MyComponent = () => { ... }

// Functions
const getUserData = () => { ... }

// Variables
const userName = 'John';
const isLoggedIn = true;

// Constants
const API_BASE_URL = 'https://api.example.com';
```

#### File Structure

```
src/
├── components/
│   ├── common/
│   ├── screens/
│   └── ui/
├── hooks/
├── services/
├── stores/
├── types/
└── utils/
```

### React Native Specific

#### Component Structure

```javascript
import React from 'react';
import { View, Text } from 'react-native';

interface Props {
  title: string;
}

const MyComponent: React.FC<Props> = ({ title }) => {
  return (
    <View>
      <Text>{title}</Text>
    </View>
  );
};

export default MyComponent;
```

#### State Management

- Use **Zustand** for global state
- Use **React hooks** for local state
- Avoid prop drilling with context when possible

### API Development

#### RESTful API Design

- Use RESTful conventions
- Implement proper HTTP status codes
- Use JSON for request/response bodies
- Implement pagination for list endpoints

#### Error Handling

```javascript
// Backend error response
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": {
      "field": "email",
      "reason": "Invalid email format"
    }
  }
}
```

---

## 🧪 Testing Guidelines

### Testing Strategy

#### Test Types

- **Unit Tests:** Test individual functions and components
- **Integration Tests:** Test component interactions
- **E2E Tests:** Test complete user workflows

#### Testing Tools

- **Jest** for unit and integration testing
- **React Testing Library** for component testing
- **Detox** for end-to-end testing

### Writing Tests

#### Unit Test Example

```javascript
import { render, screen } from "@testing-library/react-native";
import MyComponent from "./MyComponent";

describe("MyComponent", () => {
  it("renders correctly", () => {
    render(<MyComponent title="Test Title" />);
    expect(screen.getByText("Test Title")).toBeTruthy();
  });
});
```

#### Integration Test Example

```javascript
import { render, fireEvent } from "@testing-library/react-native";
import LoginScreen from "./LoginScreen";

describe("Login Flow", () => {
  it("allows user to login", async () => {
    render(<LoginScreen />);

    fireEvent.changeText(
      screen.getByPlaceholderText("Email"),
      "user@example.com",
    );
    fireEvent.changeText(screen.getByPlaceholderText("Password"), "password");
    fireEvent.press(screen.getByText("Login"));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("Home");
    });
  });
});
```

### Test Coverage

- Aim for **80%+ code coverage**
- Focus on critical business logic
- Test error scenarios
- Test edge cases

---

## 📚 Documentation

### Documentation Standards

#### README Files

Every component or module should have a README with:

- Purpose and description
- Installation instructions
- Usage examples
- API documentation

#### Code Comments

```javascript
/**
 * Calculates the total price of items in cart
 * @param {Array} items - Array of cart items
 * @param {number} taxRate - Tax rate as decimal
 * @returns {number} Total price including tax
 */
const calculateTotal = (items, taxRate) => {
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  return subtotal * (1 + taxRate);
};
```

#### API Documentation

Use **OpenAPI/Swagger** for API documentation:

```yaml
paths:
  /products:
    get:
      summary: Get list of products
      parameters:
        - name: category
          in: query
          schema:
            type: string
      responses:
        "200":
          description: Successful response
```

---

## 🐛 Issue Reporting

### Bug Reports

When reporting bugs, please include:

- **Clear title** describing the issue
- **Steps to reproduce** the problem
- **Expected behavior** vs actual behavior
- **Environment details** (OS, device, app version)
- **Screenshots or videos** if applicable
- **Log files** if available

### Feature Requests

For feature requests, provide:

- **Clear description** of the proposed feature
- **Use case** and benefits
- **Mockups or examples** if possible
- **Acceptance criteria** for implementation

### Security Issues

For security vulnerabilities:

- **Do not** create public issues
- Email security@company.com directly
- Include detailed reproduction steps
- Allow time for fix before public disclosure

---

## 📄 License

By contributing to this project, you agree that your contributions will be licensed under the same MIT License that covers the project.

---

_Thank you for contributing to the E-Commerce Mobile Application! Your efforts help make this project better for everyone._

## Additional Resources

- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [Supabase Documentation](https://supabase.com/docs)
- [Expo Documentation](https://docs.expo.dev)

---

_Last updated: May 3, 2026_
