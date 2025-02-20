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
- `category`: One of `code_style`, `frontend`, `backend`, `database`
- `title`: Clear, concise title in Title Case
- `description`: Single sentence explaining the rule's purpose
- `recommended_globs`: Array of glob patterns for file matching (e.g., `["**/*.{js,ts}"]`)
- `content`: Array of markdown strings forming the rule documentation

## License

MIT

## Author

mrzacsmith
