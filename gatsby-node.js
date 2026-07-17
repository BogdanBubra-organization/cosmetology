/* eslint-disable no-param-reassign */
/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

const path = require('path')
const { SERVICE_PAGE_SLUG } = require('./src/constants')

const serviceLandingSingleBlocks = {
  landingHero: ['landing_hero', 'DatoCmsServiceLandingHero'],
  landingAbout: ['landing_about', 'DatoCmsServiceLandingAbout'],
  landingPrices: ['landing_prices', 'DatoCmsServiceLandingPriceSection'],
  landingEquipment: ['landing_equipment', 'DatoCmsServiceLandingEquipment'],
  landingResults: ['landing_results', 'DatoCmsServiceLandingResultsSection'],
  landingDoctors: ['landing_doctors', 'DatoCmsServiceLandingDoctorSection'],
  landingCertificates: [
    'landing_certificates',
    'DatoCmsServiceLandingCertificateSection',
  ],
  landingPreparation: [
    'landing_preparation',
    'DatoCmsServiceLandingPreparation',
  ],
  landingContraindications: [
    'landing_contraindications',
    'DatoCmsServiceLandingContraindicationSection',
  ],
  landingClinicGallery: [
    'landing_clinic_gallery',
    'DatoCmsServiceLandingClinicGallery',
  ],
  landingReviews: ['landing_reviews', 'DatoCmsServiceLandingReviewSection'],
  landingFinalCta: ['landing_final_cta', 'DatoCmsServiceLandingFinalCta'],
}

const getBlockId = (value) => {
  if (typeof value === 'string') return value
  return value?.id || value?.data?.id || null
}

const createSingleBlockResolver = (apiKey, type) => ({
  type,
  async resolve(source, args, context) {
    const blockId = getBlockId(source.entityPayload?.attributes?.[apiKey])
    if (!blockId) return null

    const { entries } = await context.nodeModel.findAll({ type, query: {} })

    return (
      Array.from(entries).find((node) => node.entityPayload?.id === blockId) ||
      null
    )
  },
})

exports.createResolvers = ({ createResolvers }) => {
  createResolvers({
    DatoCmsService: Object.fromEntries(
      Object.entries(serviceLandingSingleBlocks).map(
        ([fieldName, [apiKey, type]]) => [
          fieldName,
          createSingleBlockResolver(apiKey, type),
        ]
      )
    ),
  })
}

exports.onCreateWebpackConfig = ({ getConfig, actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        '~components': path.resolve(__dirname, 'src/components'),
        '~containers': path.resolve(__dirname, 'src/containers'),
        '~constants': path.resolve(__dirname, 'src/constants'),
        '~contexts': path.resolve(__dirname, 'src/contexts'),
        '~pages': path.resolve(__dirname, 'src/pages'),
        '~hooks': path.resolve(__dirname, 'src/hooks'),
        '~styles': path.resolve(__dirname, 'src/styles'),
        '~img': path.resolve(__dirname, 'src/assets/img'),
        '~fonts': path.resolve(__dirname, 'src/assets/fonts'),
        '~images': path.resolve(__dirname, 'src/images'),
        '~utils': path.resolve(__dirname, 'src/utils'),
        '~routes': path.resolve(__dirname, 'src/routes.js'),
        '~service-icons': path.resolve(__dirname, 'src/service-icons'),
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

  /* Set ignoreOrder: true to remove warnings when using css modules */
  const miniCssExtractPlugin = config.plugins.find(
    (plugin) => plugin.constructor.name === 'MiniCssExtractPlugin'
  )
  if (miniCssExtractPlugin) {
    miniCssExtractPlugin.options.ignoreOrder = true
  }

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
      allDatoCmsService {
        nodes {
          slug
          category
          id
        }
      }
      allDatoCmsCategory {
        nodes {
          slug
        }
      }
    }
  `)

  if (results.error) {
    console.error('Something went wrong!')
    return
  }

  const serviceTemplate = path.resolve('src/templates/Product/index.js')
  const categoryTemplate = path.resolve('src/templates/CategoryPage/index.js')

  results.data.allDatoCmsService.nodes.forEach(({ slug, category, id }) => {
    if (slug) {
      SERVICE_PAGE_SLUG.forEach((pageSlug) =>
        createPage({
          path: `/${pageSlug}/${slug}`,
          component: serviceTemplate,
          context: {
            isPricingPage: pageSlug === SERVICE_PAGE_SLUG[1],
            slug,
            category,
            id,
          },
        })
      )
    }
  })

  results.data.allDatoCmsCategory.nodes.forEach(({ slug }) => {
    if (slug) {
      createPage({
        path: `/${SERVICE_PAGE_SLUG[0]}/${slug}`,
        component: categoryTemplate,
        context: {
          slug,
        },
      })
    }
  })
}
