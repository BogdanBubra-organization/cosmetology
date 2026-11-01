/* eslint-disable no-await-in-loop, no-restricted-syntax */
const { readFile, readdir } = require('node:fs/promises')
const path = require('node:path')

async function auditOutput(publicRoot) {
  let pagesChecked = 0

  async function inspect(directory) {
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      const filename = path.join(directory, entry.name)
      if (entry.isDirectory()) await inspect(filename)
      else if (/\.(?:html|json|css|js)$/.test(filename)) {
        const content = await readFile(filename, 'utf8')
        if (content.includes('datocms-assets.com'))
          throw new Error(
            `Remote CMS media remains in ${path.relative(publicRoot, filename)}`
          )
        const relative = path.relative(publicRoot, filename)
        if (
          filename.endsWith('.html') &&
          /id="___gatsby"/.test(content) &&
          !/^404(?:\/|\.)/.test(relative)
        ) {
          if (!/<title[^>]*>[^<]+<\/title>/.test(content))
            throw new Error(`Missing page title in ${relative}`)
          if (!/<html\b[^>]*\blang=["'][^"']+["']/.test(content))
            throw new Error(`Missing document language in ${relative}`)
          pagesChecked += 1
        }
      }
    }
  }

  await inspect(publicRoot)
  return { pagesChecked, remoteCmsMediaUrls: 0 }
}

module.exports = { auditOutput }
