/**
 * Utility to fetch company logos from various sources
 */

// Primary logo sources
const LOGO_SOURCES = {
  CLEARBIT: "clearbit",
  BRANDFETCH: "brandfetch",
  SIMPLE_ICONS: "simple-icons",
}

/**
 * Get a company logo URL from multiple potential sources
 * Falls back gracefully if primary source fails
 */
export async function getCompanyLogo(
  companyName: string,
  domain?: string,
  preferredSource = LOGO_SOURCES.CLEARBIT,
): Promise<string> {
  // Clean up the company name and create a domain if not provided
  const cleanName = companyName.toLowerCase().replace(/[^a-z0-9]/g, "")
  const companyDomain = domain || `${cleanName}.com`

  try {
    // Try the preferred source first
    switch (preferredSource) {
      case LOGO_SOURCES.CLEARBIT:
        return `https://logo.clearbit.com/${companyDomain}`

      case LOGO_SOURCES.BRANDFETCH:
        // Note: In a real implementation, this would use the Brandfetch API
        // which requires authentication
        return `https://asset.brandfetch.io/id/${cleanName}/logo`

      case LOGO_SOURCES.SIMPLE_ICONS:
        return `https://cdn.simpleicons.org/${cleanName}`

      default:
        return `https://logo.clearbit.com/${companyDomain}`
    }
  } catch (error) {
    // Fallback to a generic placeholder
    return `/placeholder.svg?height=40&width=120&text=${companyName}`
  }
}

/**
 * Preload an image to check if it exists
 */
export function preloadImage(src: string): Promise<boolean> {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => resolve(true)
    img.onerror = () => resolve(false)
    img.src = src
  })
}

/**
 * Batch fetch multiple company logos with fallbacks
 */
export async function batchFetchLogos(
  companies: Array<{ name: string; domain?: string }>,
): Promise<Record<string, string>> {
  const results: Record<string, string> = {}

  await Promise.all(
    companies.map(async (company) => {
      try {
        // Try Clearbit first
        const clearbitUrl = `https://logo.clearbit.com/${company.domain || `${company.name.toLowerCase().replace(/[^a-z0-9]/g, "")}.com`}`
        const clearbitExists = await preloadImage(clearbitUrl)

        if (clearbitExists) {
          results[company.name] = clearbitUrl
          return
        }

        // Fallback to Simple Icons
        const simpleIconsUrl = `https://cdn.simpleicons.org/${company.name.toLowerCase().replace(/[^a-z0-9]/g, "")}`
        const simpleIconsExists = await preloadImage(simpleIconsUrl)

        if (simpleIconsExists) {
          results[company.name] = simpleIconsUrl
          return
        }

        // Final fallback
        results[company.name] = `/placeholder.svg?height=40&width=120&text=${company.name}`
      } catch (error) {
        results[company.name] = `/placeholder.svg?height=40&width=120&text=${company.name}`
      }
    }),
  )

  return results
}

