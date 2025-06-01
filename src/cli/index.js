#!/usr/bin/env node

import prompts from 'prompts'
import chalk from 'chalk'
import fs from 'fs-extra'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const rules = {
  setup: [
    { title: 'Create Feature PRD', value: 'create-feature-prd' },
    { title: 'Generate Tasks', value: 'generate-tasks' },
    { title: 'Process Task List', value: 'process-task-list' },
  ],
  code_style: [
    { title: 'Commit Messages', value: 'commit-messages' },
    { title: 'NPM Package Check', value: 'npm-package-check' },
    { title: 'Python Development', value: 'python-development' },
    { title: 'Terminal Path Verification', value: 'terminal-path-verification' },
    { title: 'Yoda Quote Endings', value: 'yoda-quotes' },
  ],
  frontend: [
    { title: 'Tailwind Standards', value: 'tailwind' },
    { title: 'React GraphQL Apollo', value: 'react-graphql-apollo' },
    { title: 'Mobile First Web Development', value: 'mobile-first-web' },
    { title: 'Next.js App Router', value: 'nextjs-app-router' },
    { title: 'Next.js Supabase Auth', value: 'nextjs-supabase-auth' },
    { title: 'Modern React Next.js', value: 'modern-react-nextjs' },
  ],
  backend: [{ title: 'Firebase Integration', value: 'firebase' }],
  database: [],
  browser_extension: [
    { title: 'Chrome Extension Development', value: 'chrome-extension-development' },
    { title: 'Electron Development', value: 'electron-development' },
  ],
  mobile: [
    { title: 'Flutter Development', value: 'flutter-development' },
    { title: 'React Native Expo', value: 'react-native-expo' },
    { title: 'SwiftUI Development', value: 'swiftui-development' },
    { title: 'Jetpack Compose', value: 'jetpack-compose' },
  ],
  mcp_servers: [],
  mcp_servers_browser_tools: [{ title: 'Debug Commands', value: 'debug-commands' }],
}

const categories = [
  { title: 'Setup', value: 'setup' },
  { title: 'Code Style', value: 'code_style' },
  { title: 'Frontend', value: 'frontend' },
  { title: 'Backend', value: 'backend' },
  { title: 'Database', value: 'database' },
  { title: 'Desktop / Extension', value: 'browser_extension' },
  { title: 'Mobile', value: 'mobile' },
  {
    title: 'MCP Servers',
    value: 'mcp_servers',
    subcategories: [{ title: 'Browser Tools', value: 'mcp_servers_browser_tools' }],
  },
]

async function main() {
  console.log(chalk.bold.cyan('\n✨ Cursor Rules Setup\n'))

  const selectedRules = []
  let done = false
  let lastCategoryIndex = 0 // Track the last selected category index

  while (!done) {
    // Category selection
    const categoryResponse = await prompts(
      {
        type: 'select',
        name: 'category',
        message: 'Select a category or press Enter to finish',
        choices: [...categories, { title: '✓ Done', value: 'done' }],
        initial: lastCategoryIndex, // Start at the last selected category
      },
      {
        onCancel: () => {
          console.log(chalk.yellow('\n👋 Operation cancelled. Exiting...\n'))
          process.exit(0)
        },
      }
    )

    if (!categoryResponse.category || categoryResponse.category === 'done') {
      done = true
      break
    }

    // Save the current category index for next time
    lastCategoryIndex = categories.findIndex((c) => c.value === categoryResponse.category)
    if (lastCategoryIndex === -1) lastCategoryIndex = 0

    let category = categoryResponse.category
    const selectedCategory = categories.find((c) => c.value === category)

    // Check if category has subcategories
    if (
      selectedCategory &&
      selectedCategory.subcategories &&
      selectedCategory.subcategories.length > 0
    ) {
      let inSubcategory = true
      let lastSubcategoryIndex = 0 // Track the last selected subcategory index

      while (inSubcategory) {
        // Subcategory selection
        const subcategoryResponse = await prompts(
          {
            type: 'select',
            name: 'subcategory',
            message: `Select a ${selectedCategory.title} subcategory`,
            choices: [...selectedCategory.subcategories, { title: '← Back', value: 'back' }],
            initial: lastSubcategoryIndex, // Start at the last selected subcategory
          },
          {
            onCancel: () => {
              console.log(chalk.yellow('\n👋 Operation cancelled. Exiting...\n'))
              process.exit(0)
            },
          }
        )

        if (!subcategoryResponse.subcategory || subcategoryResponse.subcategory === 'back') {
          inSubcategory = false
          continue
        }

        // Save the current subcategory index for next time
        lastSubcategoryIndex = selectedCategory.subcategories.findIndex(
          (sc) => sc.value === subcategoryResponse.subcategory
        )
        if (lastSubcategoryIndex === -1) lastSubcategoryIndex = 0

        // Use subcategory for rule selection
        category = subcategoryResponse.subcategory

        if (rules[category].length === 0) {
          console.log(chalk.yellow(`\nNo rules available yet for ${category}\n`))
          continue
        }

        // Rule selection for the chosen subcategory
        const ruleResponse = await prompts(
          {
            type: 'multiselect',
            name: 'rules',
            message: `Select ${category} rules`,
            choices: rules[category]
              .sort((a, b) => a.title.localeCompare(b.title))
              .map((rule) => ({
                ...rule,
                selected: selectedRules.includes(rule.value),
              })),
            instructions: `
Instructions:
  ↑/↓: Highlight option
  </>/[space]: Toggle selection
  a: Toggle all
  enter/return: Complete answer

`,
            hint: '\n\n',
          },
          {
            onCancel: () => {
              console.log(chalk.yellow('\n👋 Operation cancelled. Exiting...\n'))
              process.exit(0)
            },
          }
        )

        if (ruleResponse.rules) {
          // Remove any previously selected rules from this category
          const categoryRuleValues = rules[category].map((r) => r.value)
          selectedRules.splice(
            0,
            selectedRules.length,
            ...selectedRules.filter((r) => !categoryRuleValues.includes(r)),
            ...ruleResponse.rules
          )
        }
      }

      // Skip the rest of the loop after handling subcategories
      continue
    }

    if (rules[category].length === 0) {
      console.log(chalk.yellow(`\nNo rules available yet for ${category}\n`))
      continue
    }

    // Rule selection for the chosen category
    const ruleResponse = await prompts(
      {
        type: 'multiselect',
        name: 'rules',
        message: `Select ${category} rules`,
        choices: rules[category]
          .sort((a, b) => a.title.localeCompare(b.title))
          .map((rule) => ({
            ...rule,
            selected: selectedRules.includes(rule.value),
          })),
        instructions: `
Instructions:
  ↑/↓: Highlight option
  </>/[space]: Toggle selection
  a: Toggle all
  enter/return: Complete answer

`,
        hint: '\n\n',
      },
      {
        onCancel: () => {
          console.log(chalk.yellow('\n👋 Operation cancelled. Exiting...\n'))
          process.exit(0)
        },
      }
    )

    if (ruleResponse.rules) {
      // Remove any previously selected rules from this category
      const categoryRuleValues = rules[category].map((r) => r.value)
      selectedRules.splice(
        0,
        selectedRules.length,
        ...selectedRules.filter((r) => !categoryRuleValues.includes(r)),
        ...ruleResponse.rules
      )
    }
  }

  if (selectedRules.length === 0) {
    console.log(chalk.yellow('\n👋 No rules selected. Exiting...\n'))
    return
  }

  console.log(chalk.green('\n✅ Installing selected rules...\n'))

  // Create .cursor/rules directory if it doesn't exist
  const rulesDir = path.join(process.cwd(), '.cursor', 'rules')

  try {
    await fs.ensureDir(rulesDir)
  } catch (error) {
    console.error(chalk.red(`\n❌ Failed to create/access rules directory: ${error.message}\n`))
    return
  }

  // Install selected rules
  for (const rule of selectedRules) {
    try {
      const ruleContent = await fs.readJson(path.join(__dirname, '..', 'rules', `${rule}.json`))
      const targetFile = path.join(rulesDir, `${rule}.mdc`)

      // Check if file exists
      const exists = await fs.pathExists(targetFile)
      if (exists) {
        const overwrite = await prompts({
          type: 'confirm',
          name: 'value',
          message: `Rule '${ruleContent.title}' already exists. Overwrite?`,
          initial: false,
        })

        if (!overwrite.value) {
          console.log(chalk.yellow(`⚠️  Skipping ${ruleContent.title}`))
          continue
        }
      }

      // Create MDC content with frontmatter
      const mdcContent = [
        '---',
        `description: ${ruleContent.description}`,
        `globs: ${ruleContent.recommended_globs.join(', ')}`,
        '---',
        '',
        ...ruleContent.content,
      ].join('\n')

      await fs.writeFile(targetFile, mdcContent)
      console.log(chalk.green(`✓ ${exists ? 'Updated' : 'Installed'} ${ruleContent.title}`))
    } catch (error) {
      console.error(chalk.red(`✗ Failed to install ${rule}: ${error.message}`))
    }
  }

  console.log(chalk.bold.green('\n🎉 Rules installed successfully!\n'))
}

main().catch((error) => {
  console.error(chalk.red('\n❌ Error:', error.message))
  process.exit(1)
})
