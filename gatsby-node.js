/* eslint-disable no-param-reassign */
/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

const path = require('path')

exports.onCreateWebpackConfig = ({ getConfig, actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        '~components': path.resolve(__dirname, 'src/components'),
        '~containers': path.resolve(__dirname, 'src/containers'),
        '~contexts': path.resolve(__dirname, 'src/contexts'),
        '~pages': path.resolve(__dirname, 'src/pages'),
        '~hooks': path.resolve(__dirname, 'src/hooks'),
        '~styles': path.resolve(__dirname, 'src/styles'),
        '~img': path.resolve(__dirname, 'src/assets/img'),
        '~fonts': path.resolve(__dirname, 'src/assets/fonts'),
        '~images': path.resolve(__dirname, 'src/images'),
        '~utils': path.resolve(__dirname, 'src/utils'),
        '~routes': path.resolve(__dirname, 'src/routes.js'),
      },
    },
  })

  const config = getConfig()
  const fontsRegex = /\.(eot|otf|ttf|woff(2)?)(\?.*)?$/
  const fontsLoader = config.module.rules.find(
    (rule) => rule.test && String(rule.test) === String(fontsRegex)
  )
  ;[].concat(fontsLoader.use).forEach((it) => {
    it.options = it.options || {}
    it.options.limit = 5_000 // Embed all Fonts into CSS to reduce outbound connections
  })
  actions.replaceWebpackConfig(config)
}

if (process.env.NODE_ENV === `development`) {
  exports.createPages = async ({ actions }) => {
    const { createPage } = actions
    const productTemplate = path.resolve(`src/templates/SVGPreview/index.jsx`)
    createPage({
      path: `/___svg`,
      component: productTemplate,
    })
  }
}

exports.createPages = async ({ actions: { createPage }, graphql }) => {
  const results = await graphql(`
    {
      allServicesJson {
        edges {
          node {
            slug
            category
            id
          }
        }
      }
    }
  `)

  if (results.error) {
    console.error('Something went wrong!')
    return
  }

  results.data.allServicesJson.edges.forEach(({ node }) => {
    if (node.slug) {
      createPage({
        path: `/services/${node.slug}`,
        component: path.resolve('src/templates/Product/index.js'),
        context: {
          slug: node.slug,
          category: node.category,
          id: node.id,
        },
      })
    }
  })
}
