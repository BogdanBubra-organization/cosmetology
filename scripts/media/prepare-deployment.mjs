/* eslint-disable no-await-in-loop, no-restricted-syntax, no-console */
import { createHash } from 'node:crypto'
import { cp, mkdir, readFile, readdir, stat, writeFile } from 'node:fs/promises'
import path from 'node:path'

const run = async () => {
  const publicRoot = path.resolve(process.argv[2] || 'public')
  const deploymentRoot = path.resolve(process.argv[3] || 'output/media-deploy')
  const outputRoot = path.join(deploymentRoot, '.vercel/output')
  const staticRoot = path.join(outputRoot, 'static')

  try {
    await stat(deploymentRoot)
    throw new Error(
      'Deployment directory already exists; select a fresh directory'
    )
  } catch (error) {
    if (error.code !== 'ENOENT') throw error
  }

  await mkdir(outputRoot, { recursive: true })
  await cp(publicRoot, staticRoot, {
    recursive: true,
    filter: (source) =>
      !path.basename(source).startsWith('.') && !source.endsWith('.map'),
  })

  const files = []
  async function inventory(directory) {
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      const filename = path.join(directory, entry.name)
      if (entry.isDirectory()) await inventory(filename)
      else {
        const relative = path.relative(staticRoot, filename)
        const content = await readFile(filename)
        if (/(^|\/)(\.env|.*backup.*|media-manifest\.json)/.test(relative))
          throw new Error('Private artifact in deployment')
        if (
          /\.(?:html|json|css|js)$/.test(filename) &&
          content.includes('datocms-assets.com')
        )
          throw new Error(`Remote CMS media in ${relative}`)
        files.push({
          path: relative,
          bytes: content.length,
          sha256: createHash('sha256').update(content).digest('hex'),
        })
      }
    }
  }
  await inventory(staticRoot)
  const routes = files
    .filter(
      (file) => file.path.endsWith('/index.html') || file.path === 'index.html'
    )
    .map((file) =>
      file.path === 'index.html'
        ? '/'
        : `/${file.path.slice(0, -'/index.html'.length)}`
    )
  const config = {
    version: 3,
    routes: [
      {
        src: '^/media/(.*)$',
        headers: { 'Cache-Control': 'public, max-age=31536000, immutable' },
        continue: true,
      },
      {
        src: '^/static/(.*)$',
        headers: { 'Cache-Control': 'public, max-age=31536000, immutable' },
        continue: true,
      },
      {
        src: '^/page-data/(.*)$',
        headers: { 'Cache-Control': 'public, max-age=0, must-revalidate' },
        continue: true,
      },
      { src: '^/(.+)/$', headers: { Location: '/$1' }, status: 308 },
      ...routes.map((route) => ({
        src: `^${route.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}/?$`,
        dest: route === '/' ? '/index.html' : `${route}/index.html`,
      })),
      { handle: 'filesystem' },
      { src: '^/.*$', dest: '/404.html', status: 404 },
    ],
  }
  await writeFile(
    path.join(outputRoot, 'config.json'),
    JSON.stringify(config, null, 2)
  )
  await writeFile(
    path.join(deploymentRoot, 'vercel.json'),
    JSON.stringify({ framework: null }, null, 2)
  )
  const report = {
    createdAt: new Date().toISOString(),
    publicRoot,
    routes,
    files,
    fileCount: files.length,
    bytes: files.reduce((sum, file) => sum + file.bytes, 0),
    largestFile: Math.max(...files.map((file) => file.bytes)),
    uploadMode: 'vercel deploy --prebuilt --archive=split-tgz',
    sourceMapsExcluded: true,
    privateFilesExcluded: true,
    remoteCmsMediaUrls: 0,
  }
  await writeFile(
    path.join(deploymentRoot, 'deployment-manifest.json'),
    JSON.stringify(report, null, 2)
  )
  console.log(
    JSON.stringify({
      routes: routes.length,
      files: report.fileCount,
      bytes: report.bytes,
      largestFile: report.largestFile,
      uploadMode: report.uploadMode,
    })
  )
}

run().catch((error) => {
  console.error(error.message)
  process.exitCode = 1
})
