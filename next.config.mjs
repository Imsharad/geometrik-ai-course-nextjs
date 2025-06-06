let userConfig = undefined
try {
  userConfig = await import('./v0-user-next.config')
} catch (e) {
  // ignore error
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: '/blog',
        destination: '/',
        permanent: false,
      },
      {
        source: '/docs',
        destination: '/',
        permanent: false,
      },
      {
        source: '/tutorials',
        destination: '/',
        permanent: false,
      },
      {
        source: '/webinars',
        destination: '/',
        permanent: false,
      },
      {
        source: '/terms',
        destination: '/',
        permanent: false,
      },
      {
        source: '/about',
        destination: '/',
        permanent: false,
      },
      {
        source: '/careers',
        destination: '/',
        permanent: false,
      },
      {
        source: '/privacy',
        destination: '/',
        permanent: false,
      },
      {
        source: '/contact',
        destination: '/',
        permanent: false,
      },
      {
        source: '/cookies',
        destination: '/',
        permanent: false,
      },
      {
        source: '/partners',
        destination: '/',
        permanent: false,
      },
      {
        source: '/accessibility',
        destination: '/',
        permanent: false,
      },
    ]
  },
  experimental: {
    webpackBuildWorker: true,
    parallelServerBuildTraces: true,
    parallelServerCompiles: true,
  },
  webpack: (config) => {
    config.module = config.module || {};
    config.module.rules = config.module.rules || [];
    
    return config;
  }
}

mergeConfig(nextConfig, userConfig)

function mergeConfig(nextConfig, userConfig) {
  if (!userConfig) {
    return
  }

  for (const key in userConfig) {
    if (
      typeof nextConfig[key] === 'object' &&
      !Array.isArray(nextConfig[key])
    ) {
      nextConfig[key] = {
        ...nextConfig[key],
        ...userConfig[key],
      }
    } else {
      nextConfig[key] = userConfig[key]
    }
  }
}

export default nextConfig
