"use client"

import { useEffect } from "react"

type RetargetingScriptProps = {
  pixelID?: string
  conversionID?: string
  pageType?: "landing" | "thank-you" | "checkout"
}

export function RetargetingScript({ 
  pixelID = "PIXEL_ID_PLACEHOLDER", 
  conversionID,
  pageType = "landing"
}: RetargetingScriptProps) {
  
  useEffect(() => {
    // Google Ads Remarketing tag
    const loadGoogleRemarketing = () => {
      if (!window.gtag) {
        // Mock implementation - in production, this would be actual tracking code
        console.log(`[Mock] Loading Google Ads remarketing for conversion ID: ${conversionID || "not set"}`)
      } else {
        if (pageType === "thank-you" && conversionID) {
          console.log(`[Mock] Tracking conversion: ${conversionID}`)
          // window.gtag('event', 'conversion', { 'send_to': conversionID })
        }
      }
    }
    
    // Facebook Pixel
    const loadFacebookPixel = () => {
      if (!window.fbq) {
        // Mock implementation - in production, this would be actual Facebook pixel code
        console.log(`[Mock] Loading Facebook Pixel: ${pixelID}`)
        
        if (pageType === "landing") {
          console.log("[Mock] FB Event: PageView")
          // In production: fbq('track', 'PageView')
        } else if (pageType === "thank-you") {
          console.log("[Mock] FB Event: Lead")
          // In production: fbq('track', 'Lead')
        } else if (pageType === "checkout") {
          console.log("[Mock] FB Event: Purchase")
          // In production: fbq('track', 'Purchase', {value: 99.00, currency: 'USD'})
        }
      }
    }
    
    // Track UTM parameters for retargeting
    const saveUtmParams = () => {
      if (typeof window !== "undefined") {
        const urlParams = new URLSearchParams(window.location.search)
        const utmSource = urlParams.get('utm_source')
        const utmMedium = urlParams.get('utm_medium')
        const utmCampaign = urlParams.get('utm_campaign')
        const utmContent = urlParams.get('utm_content')
        const utmTerm = urlParams.get('utm_term')
        
        // Store in localStorage or first-party cookie for retention
        if (utmSource) localStorage.setItem('utm_source', utmSource)
        if (utmMedium) localStorage.setItem('utm_medium', utmMedium)
        if (utmCampaign) localStorage.setItem('utm_campaign', utmCampaign)
        if (utmContent) localStorage.setItem('utm_content', utmContent)
        if (utmTerm) localStorage.setItem('utm_term', utmTerm)
        
        console.log("[Mock] Saved UTM params:", { utmSource, utmMedium, utmCampaign, utmContent, utmTerm })
      }
    }
    
    // Track page view time for engagement metrics
    const trackEngagement = () => {
      let startTime = Date.now()
      let scrollDepth = 0
      
      const handleScroll = () => {
        const newDepth = Math.floor((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100)
        if (newDepth > scrollDepth) {
          scrollDepth = newDepth
          // In production, you'd send this to your analytics at certain thresholds
          if (scrollDepth === 25 || scrollDepth === 50 || scrollDepth === 75 || scrollDepth === 100) {
            console.log(`[Mock] Scroll depth: ${scrollDepth}%`)
          }
        }
      }
      
      window.addEventListener('scroll', handleScroll)
      
      return () => {
        const timeSpent = Math.floor((Date.now() - startTime) / 1000)
        console.log(`[Mock] Time spent on page: ${timeSpent} seconds, Max scroll depth: ${scrollDepth}%`)
        window.removeEventListener('scroll', handleScroll)
      }
    }
    
    // Run all tracking functions
    loadGoogleRemarketing()
    loadFacebookPixel()
    saveUtmParams()
    const cleanupEngagement = trackEngagement()
    
    return () => {
      cleanupEngagement()
    }
  }, [pixelID, conversionID, pageType])
  
  // This component doesn't render anything visible
  return null
}

// Add type declarations for window globals
declare global {
  interface Window {
    fbq?: any
    gtag?: any
  }
} 