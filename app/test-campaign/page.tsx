"use client"

import { useState, useEffect } from "react"
import { LeadCaptureForm } from "@/components/marketing/lead-capture-form"
import { RetargetingScript } from "@/components/marketing/retargeting-script"
import { adCampaign, leadMagnets } from "@/config/marketing"
import { Badge } from "@/components/ui/badge"

export default function TestCampaign() {
  const [utmParams, setUtmParams] = useState<Record<string, string>>({})
  
  useEffect(() => {
    // Extract UTM parameters on client side
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search)
      const params: Record<string, string> = {}
      
      // Store UTM parameters
      if (urlParams.has('utm_source')) params.utm_source = urlParams.get('utm_source')!
      if (urlParams.has('utm_medium')) params.utm_medium = urlParams.get('utm_medium')!
      if (urlParams.has('utm_campaign')) params.utm_campaign = urlParams.get('utm_campaign')!
      if (urlParams.has('utm_content')) params.utm_content = urlParams.get('utm_content')!
      if (urlParams.has('utm_term')) params.utm_term = urlParams.get('utm_term')!
      
      setUtmParams(params)
      
      // Log for testing
      console.log("UTM Parameters:", params)
    }
  }, [])
  
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      {/* Retargeting Script */}
      <RetargetingScript 
        pixelID={adCampaign.facebookAds.pixelId}
        conversionID={`${adCampaign.googleAds.conversionId}/${adCampaign.googleAds.conversionLabel}`}
        pageType="landing"
      />
      
      <div className="container max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            AI Career Transformation Test Page
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            This page tests our marketing components with UTM parameter tracking for Google Ads campaigns.
          </p>
        </div>
        
        {/* UTM Parameters Display */}
        {Object.keys(utmParams).length > 0 && (
          <div className="max-w-2xl mx-auto mb-8 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-lg font-semibold mb-3">Detected UTM Parameters:</h2>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(utmParams).map(([key, value]) => (
                <div key={key} className="flex items-center gap-2">
                  <Badge variant="outline" className="font-mono text-xs">{key}</Badge>
                  <span className="text-sm text-gray-700">{value}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Lead Capture Form */}
        <div className="max-w-md mx-auto">
          <LeadCaptureForm 
            title={leadMagnets.careerRoadmap.title}
            description={leadMagnets.careerRoadmap.description}
            leadMagnet="career-roadmap"
            actionLabel={leadMagnets.careerRoadmap.ctaText}
            additionalFields={true}
          />
        </div>
        
        {/* Test Results Area */}
        <div className="max-w-2xl mx-auto mt-12 p-6 bg-white rounded-lg shadow border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Marketing Component Testing Console</h2>
          <div className="bg-gray-50 p-4 rounded-md font-mono text-sm mb-4">
            <p>Check the browser console for retargeting script logs.</p>
            <p className="mt-2 text-blue-600">RetargetingScript is active and monitoring engagement...</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="p-3 bg-green-50 rounded border border-green-100">
              <h3 className="font-medium text-green-800 mb-1">✓ Lead Capture Form</h3>
              <p className="text-green-700">Form with UTM parameter tracking is active and functional.</p>
            </div>
            
            <div className="p-3 bg-green-50 rounded border border-green-100">
              <h3 className="font-medium text-green-800 mb-1">✓ Retargeting Scripts</h3>
              <p className="text-green-700">Google Ads and Facebook Pixel integrations ready.</p>
            </div>
            
            <div className="p-3 bg-green-50 rounded border border-green-100">
              <h3 className="font-medium text-green-800 mb-1">✓ Engagement Metrics</h3>
              <p className="text-green-700">Scroll depth and time on page are being tracked.</p>
            </div>
            
            <div className="p-3 bg-green-50 rounded border border-green-100">
              <h3 className="font-medium text-green-800 mb-1">✓ Config Integration</h3>
              <p className="text-green-700">Marketing configuration centralized and accessible.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 