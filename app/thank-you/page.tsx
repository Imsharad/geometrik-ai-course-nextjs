"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { RetargetingScript } from "@/components/marketing/retargeting-script"
import { adCampaign, leadMagnets } from "@/config/marketing"
import { Check, ArrowLeft, Download } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ThankYouPage() {
  const [leadMagnet, setLeadMagnet] = useState("career-roadmap")
  const [downloadUrl, setDownloadUrl] = useState("")
  const [emailSubject, setEmailSubject] = useState("")
  
  useEffect(() => {
    // Extract lead magnet type from URL
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search)
      const magnet = urlParams.get('magnet')
      
      if (magnet && leadMagnets[magnet as keyof typeof leadMagnets]) {
        setLeadMagnet(magnet)
        
        // Set the appropriate download URL and email subject
        const magnetConfig = leadMagnets[magnet as keyof typeof leadMagnets]
        setDownloadUrl(magnetConfig.fileUrl)
        setEmailSubject(magnetConfig.emailSubject)
      } else {
        // Default to career roadmap
        setDownloadUrl(leadMagnets.careerRoadmap.fileUrl)
        setEmailSubject(leadMagnets.careerRoadmap.emailSubject)
      }
    }
  }, [])
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12 px-4">
      {/* Conversion tracking - this will fire Google Ads and Facebook conversion events */}
      <RetargetingScript 
        pixelID={adCampaign.facebookAds.pixelId}
        conversionID={`${adCampaign.googleAds.conversionId}/${adCampaign.googleAds.conversionLabel}`}
        pageType="thank-you"
      />
      
      <div className="max-w-md w-full mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 sm:p-10">
          <div className="h-20 w-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="h-10 w-10 text-green-600" />
          </div>
          
          <h1 className="text-2xl font-bold text-center mb-2">Thank You!</h1>
          
          <p className="text-gray-600 text-center mb-6">
            Your {leadMagnet === 'career-roadmap' ? 'AI Career Roadmap' : 
               leadMagnet === 'aiSalaryGuide' ? 'AI Salary Guide' : 
               'Hiring Partners List'} is on its way to your inbox.
          </p>
          
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6">
            <p className="text-sm text-blue-800">
              <span className="font-medium">Check your email:</span> The download link has been sent to your inbox with the subject "{emailSubject}". 
              Please check your spam folder if you don't see it.
            </p>
          </div>
          
          <div className="space-y-4">
            <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-none">
              <Download className="mr-2 h-4 w-4" />
              Download Directly
            </Button>
            
            <Link href="/">
              <Button variant="outline" className="w-full">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Return to Homepage
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="bg-gray-50 p-6 border-t border-gray-200">
          <h2 className="text-lg font-medium mb-4">What's Next?</h2>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="bg-green-100 rounded-full p-1 mt-0.5">
                <Check className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium">Join our upcoming free webinar</p>
                <p className="text-xs text-gray-500">
                  "How to Land Your First AI Job in 90 Days" - This Thursday at 2PM PST
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="bg-green-100 rounded-full p-1 mt-0.5">
                <Check className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium">Book a free career strategy call</p>
                <p className="text-xs text-gray-500">
                  Get personalized advice from our career coaches (15 minutes)
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="bg-green-100 rounded-full p-1 mt-0.5">
                <Check className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium">Apply for the full AI Career program</p>
                <p className="text-xs text-gray-500">
                  Limited spots available for the next cohort starting May 15th
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Conversion Value Display - For testing purposes */}
      <div className="mt-8 p-4 border border-gray-200 rounded-lg bg-white text-sm max-w-md w-full">
        <p className="font-medium mb-2">Conversion Tracking Active:</p>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-gray-50 p-2 rounded">
            <span className="font-medium text-gray-600">Google Event:</span> conversion
          </div>
          <div className="bg-gray-50 p-2 rounded">
            <span className="font-medium text-gray-600">FB Event:</span> Lead
          </div>
          <div className="bg-gray-50 p-2 rounded">
            <span className="font-medium text-gray-600">Lead Value:</span> $5.00
          </div>
          <div className="bg-gray-50 p-2 rounded">
            <span className="font-medium text-gray-600">Lead Magnet:</span> {leadMagnet}
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-3">
          * This data is displayed for testing purposes only and would not appear in production.
        </p>
      </div>
    </div>
  )
} 