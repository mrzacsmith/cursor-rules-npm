#!/usr/bin/env node

import prompts from 'prompts'
import chalk from 'chalk'
import fs from 'fs-extra'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const rules = {
  code_style: [
    { title: 'Commit Messages', value: 'commit-messages' },
    { title: 'Yoda Quote Endings', value: 'yoda-quotes' },
  ],
  frontend: [{ title: 'Tailwind Standards', value: 'tailwind' }],
  backend: [{ title: 'Firebase Integration', value: 'firebase' }],
  database: [],
}

const categories = [
  { title: 'Code Style', value: 'code_style' },
  { title: 'Frontend', value: 'frontend' },
  { title: 'Backend', value: 'backend' },
  { title: 'Database', value: 'database' },
]

async function main() {
  console.log(chalk.bold.cyan('\n✨ Cursor Rules Setup\n'))

  const selectedRules = []
  let done = false

  while (!done) {
    // Category selection
    const categoryResponse = await prompts({
      type: 'select',
      name: 'category',
      message: 'Select a category or press Enter to finish',
      choices: [...categories, { title: '✓ Done', value: 'done' }],
      initial: 0,
    })

    if (!categoryResponse.category || categoryResponse.category === 'done') {
      done = true
      continue
    }

    const category = categoryResponse.category

    if (rules[category].length === 0) {
      console.log(chalk.yellow(`\nNo rules available yet for ${category}\n`))
      continue
    }

    // Rule selection for the chosen category
    const ruleResponse = await prompts({
      type: 'multiselect',
      name: 'rules',
      message: `Select ${category} rules`,
      choices: rules[category].map((rule) => ({
        ...rule,
        selected: selectedRules.includes(rule.value),
      })),
      hint: '- Space to select. Return to submit',
    })

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
