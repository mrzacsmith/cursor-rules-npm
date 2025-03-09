# @mrzacsmith/cursor-rules

Interactive CLI to install Cursor AI rules for your project.

## Usage

Run with npx (recommended):
```bash
npx @mrzacsmith/cursor-rules
```

Or install globally:
```bash
npm install -g @mrzacsmith/cursor-rules
cursor-rules
```

## Features

- 🎯 Interactive rule selection
- 📁 Organized by categories:
  - Code Style
  - Frontend
  - Backend
  - Database
  - Mobile
  - Desktop & Extension Development
  - MCP Servers
    - Browser Tools
- 🔄 Safe installation - won't overwrite existing rules without permission
- 📝 Each rule includes:
  - Description
  - Recommended glob patterns
  - Detailed guidelines

## How it Works

1. Run `npx @mrzacsmith/cursor-rules`
2. Select a category using arrow keys
3. Choose rules using space bar
4. Navigate back to categories with enter
5. Select "Done" when finished
6. Rules are installed to `.cursor/rules/`

## Available Rules

### Code Style
- **[✓] Commit Messages**: Standardized commit message format for consistent version control history
  - Enforces semantic commit messages
  - Includes type, scope, and description
  - Example: `Feat(component): add new component`
- **[✓] NPM Package Check**: Best practices for checking and installing NPM packages before use
  - Package dependency verification
  - Automatic installation commands
  - Dependency management
  - Error handling
  - Development workflow optimization
- **[✓] Python Development**: Modern Python development practices with type hints and testing
  - Type annotations and docstrings
  - Project structure and organization
  - Testing with pytest
  - Error handling and logging
  - Environment configuration
  - CI/CD with GitHub Actions
- **[✓] Terminal Path Verification**: Best practices for verifying paths and locations before executing terminal commands
  - Directory verification with pwd and ls
  - Path existence checks
  - File operation safety
  - Error prevention
  - Automated verification in scripts
- **[✓] Yoda Quote Endings**: End each Cursor chat with wisdom
  - Adds personality to coding sessions
  - Provides Yoda-style encouragement
  - Example: "Debug or debug not. There is no try-catch."

### Frontend
- **[✓] Tailwind Standards**: Best practices for Tailwind CSS v4+ implementation
  - Version compatibility and migration
  - Performance optimization
  - React integration
  - Accessibility and internationalization
- **[✓] React GraphQL Apollo**: Best practices for React development with GraphQL and Apollo Client
  - Project structure and organization
  - Apollo Client setup and configuration
  - Custom hooks and components
  - GraphQL operations and caching
  - Error handling and performance
- **[✓] Mobile First Web Development**: Best practices for mobile-first web development using Tailwind, React, and Firebase
  - Mobile-first design principles
  - Responsive component patterns
  - Firebase integration and security
  - Performance optimization
  - Accessibility and animations
- **[✓] Next.js App Router**: Best practices for Next.js App Router development with TypeScript, Shadcn UI, and Tailwind
  - Server and Client Components
  - TypeScript and component patterns
  - Performance optimization
  - State management with nuqs
  - Shadcn UI integration
- **[✓] Next.js Supabase Auth**: Guidelines for writing Next.js apps with Supabase Auth
  - Modern SSR authentication patterns
  - Correct cookie handling
  - Middleware implementation
  - Browser and server client setup
  - Security best practices
- **[✓] Modern React Next.js**: Best practices for modern React and Next.js development with TypeScript, Tailwind CSS, and accessibility
  - Component design patterns
  - Custom hooks and utilities
  - Accessibility best practices
  - Performance optimization
  - Type-safe development
- **[Coming Soon] React Best Practices**: Guidelines for React component development
- **[Coming Soon] TypeScript Standards**: TypeScript configuration and usage patterns
- **[Coming Soon] CSS/SCSS Conventions**: Styling standards and organization

### Backend
- **[✓] Firebase Integration**: Best practices for Firebase services
  - Authentication setup and security
  - Firestore data structure
  - Storage organization
  - Cloud Functions architecture
- **[Coming Soon] API Design**: RESTful and GraphQL API standards
- **[Coming Soon] Security Guidelines**: Backend security best practices

### Database
- **[Coming Soon] MongoDB Patterns**: Schema design and query optimization
- **[Coming Soon] PostgreSQL Standards**: Database structure and performance
- **[Coming Soon] Redis Caching**: Caching strategies and patterns

### Mobile
- **[✓] Flutter Development**: Best practices for Flutter development using clean architecture and BLoC pattern
  - Project structure and organization
  - Clean architecture implementation
  - BLoC pattern and state management
  - Widget guidelines and testing
  - Performance optimization
  - Error handling and logging
- **[✓] React Native Expo**: Best practices for React Native development using Expo SDK and TypeScript
  - Project structure and TypeScript setup
  - Component design patterns
  - Navigation and state management
  - Asset and notification handling
  - Error boundaries and testing
  - Performance optimization
- **[✓] SwiftUI Development**: Modern SwiftUI development practices with clean architecture and MVVM pattern
  - Project structure and organization
  - MVVM pattern implementation
  - Modern layout and navigation
  - Animations and transitions
  - State management
  - Accessibility best practices
- **[✓] Jetpack Compose**: Modern Android development practices using Compose and clean architecture
  - Project structure and organization
  - Material Design 3 implementation
  - ViewModel and state management
  - Navigation and routing
  - Reusable components
  - Testing and performance
- **[Coming Soon] Native iOS**: Best practices for native iOS development

### Desktop & Extension Development
- **[✓] Chrome Extension Development**: Best practices for modern Chrome Extension development using TypeScript and Manifest V3
  - Project structure and organization
  - TypeScript integration and type safety
  - Manifest V3 configuration
  - Security best practices
  - Performance optimization
  - Cross-browser compatibility
- **[✓] Electron Development**: Best practices for building cross-platform desktop applications
  - Project architecture and security
  - IPC communication patterns
  - PouchDB offline support
  - Performance optimization
  - UI/UX best practices
  - Auto-updates and deployment
- **[Coming Soon] Firefox Add-on Development**: Guidelines for Firefox extension development
- **[Coming Soon] Web Extension APIs**: Cross-browser extension development patterns

### MCP Servers
#### Browser Tools
- **[✓] Debug Commands**: This tool performs debugging steps for applications
  - Console log collection
  - Error tracking
  - Network request monitoring
  - Screenshot capture
  - Automated analysis
  - Specialized debugging commands

## Contributing

1. Fork the repository
2. Create your feature branch
3. Add your rule to `src/rules/`
4. Submit a pull request

### Adding a New Rule

Rules should be added as JSON files in `src/rules/` following this structure:
```json
{
  "category": "category_name",
  "title": "Rule Title",
  "description": "Brief description",
  "recommended_globs": ["glob patterns"],
  "content": [
    "# Rule Title",
    "",
    "// Description: Brief description",
    "// Recommended Globs: glob patterns",
    "",
    "## Section",
    "- Guideline 1",
    "- Guideline 2"
  ]
}
```

The rule will be transformed into an MDC file with frontmatter:
```markdown
---
description: Brief description
globs: glob patterns
---

# Rule Title

// Description: Brief description
// Recommended Globs: glob patterns

## Section
- Guideline 1
- Guideline 2
```

### Rule Components
- `category`: One of `code_style`, `frontend`, `backend`, `database`, `mobile`, `desktop_extension`, `mcp_servers_browser_tools`
- `title`: Clear, concise title in Title Case
- `description`: Single sentence explaining the rule's purpose
- `recommended_globs`: Array of glob patterns for file matching (e.g., `["**/*.{js,ts}"]`)
- `content`: Array of markdown strings forming the rule documentation

## License

MIT

## Author

mrzacsmith
