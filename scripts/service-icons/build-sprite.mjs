/* eslint-disable no-await-in-loop, no-console, no-restricted-syntax */
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const run = async () => {
  const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../..')
  const catalogPath = resolve(projectRoot, 'src/service-icons/catalog.json')
  const spritePath = resolve(projectRoot, 'src/service-icons/icons.svg')
  const licensePath = resolve(
    projectRoot,
    'src/service-icons/LUCIDE-LICENSE.txt'
  )
  const lucideRoot = resolve(projectRoot, 'node_modules/lucide-static')
  const catalog = JSON.parse(await readFile(catalogPath, 'utf8'))
  const keys = new Set()

  if (catalog.length !== 120) {
    throw new Error(`Expected 120 service icons, received ${catalog.length}`)
  }

  const symbols = []

  for (const icon of catalog) {
    if (keys.has(icon.key)) {
      throw new Error(`Duplicate service icon key: ${icon.key}`)
    }

    keys.add(icon.key)

    const sourcePath = resolve(lucideRoot, 'icons', `${icon.source}.svg`)
    const source = await readFile(sourcePath, 'utf8')
    const sourceMatch = source.match(/<svg\b[^>]*>([\s\S]*?)<\/svg>\s*$/)

    if (!sourceMatch) {
      throw new Error(`Invalid SVG source for service icon: ${icon.source}`)
    }

    const content = sourceMatch[1].trim()

    symbols.push(
      `  <symbol id="service-${
        icon.key
      }" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">\n    ${content.replace(
        /\n/g,
        '\n    '
      )}\n  </symbol>`
    )
  }

  await mkdir(dirname(spritePath), { recursive: true })
  await writeFile(
    spritePath,
    `<svg xmlns="http://www.w3.org/2000/svg">\n${symbols.join('\n')}\n</svg>\n`
  )
  await writeFile(licensePath, await readFile(resolve(lucideRoot, 'LICENSE')))

  console.log(`Generated ${catalog.length} service icons`)
}

run().catch((error) => {
  console.error(error.message)
  process.exitCode = 1
})
