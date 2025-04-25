"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowRight, Check, X } from "lucide-react"
import { motion, AnimatePresence } from "@/app/fix-framer-motion"
import { Badge } from "@/components/ui/badge"

type UtmParams = {
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_content?: string
  utm_term?: string
}

export function LeadCaptureForm({ 
  title = "Get Your Free AI Career Roadmap",
  description = "Learn how our graduates landed $120k+ jobs at top tech companies",
  leadMagnet = "career-roadmap",
  actionLabel = "Get Free Career Roadmap",
  additionalFields = false,
  className = ""
}) {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [agreed, setAgreed] = useState(false)
  const [utmParams, setUtmParams] = useState<UtmParams>({})
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")
  const [countdown, setCountdown] = useState(5)

  // Extract UTM parameters from URL
  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search)
      const params: UtmParams = {}
      
      // Store UTM parameters
      if (urlParams.has('utm_source')) params.utm_source = urlParams.get('utm_source')!
      if (urlParams.has('utm_medium')) params.utm_medium = urlParams.get('utm_medium')!
      if (urlParams.has('utm_campaign')) params.utm_campaign = urlParams.get('utm_campaign')!
      if (urlParams.has('utm_content')) params.utm_content = urlParams.get('utm_content')!
      if (urlParams.has('utm_term')) params.utm_term = urlParams.get('utm_term')!
      
      setUtmParams(params)
    }
  }, [])

  // Countdown timer after form submission
  useEffect(() => {
    let timer: NodeJS.Timeout
    
    if (submitted && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(prev => prev - 1)
      }, 1000)
    }
    
    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [submitted, countdown])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email) {
      setError("Email is required")
      return
    }
    
    if (additionalFields && !name) {
      setError("Name is required")
      return
    }

    if (additionalFields && !agreed) {
      setError("You must agree to the terms")
      return
    }
    
    try {
      // This would be an actual API call in production
      // const response = await fetch('/api/leads', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     email,
      //     name: name || undefined,
      //     phone: phone || undefined,
      //     leadMagnet,
      //     ...utmParams
      //   }),
      // })
      
      // Mock successful submission
      setSubmitted(true)
      setError("")
      
      // In production, you would redirect to a thank you page with conversion tracking
      if (countdown === 0) {
        window.location.href = `/thank-you?magnet=${leadMagnet}`
      }
    } catch (err) {
      setError("Something went wrong. Please try again.")
    }
  }

  return (
    <div className={`bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden ${className}`}>
      <div className="p-5 bg-gradient-to-r from-blue-50 to-purple-50">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-600 mt-1">{description}</p>
      </div>
      
      <AnimatePresence mode="wait">
        {!submitted ? (
          <motion.form 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="p-5 space-y-4" 
            onSubmit={handleSubmit}
          >
            {additionalFields && (
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Jane Smith"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1"
                />
              </div>
            )}
            
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="jane@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1"
                required
              />
            </div>
            
            {additionalFields && (
              <div>
                <Label htmlFor="phone">Phone Number (Optional)</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="(555) 123-4567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="mt-1"
                />
              </div>
            )}
            
            {additionalFields && (
              <div className="flex items-start space-x-2 pt-2">
                <Checkbox 
                  id="terms" 
                  checked={agreed}
                  onCheckedChange={(checked) => setAgreed(checked as boolean)}
                />
                <label htmlFor="terms" className="text-xs text-gray-500 leading-tight cursor-pointer">
                  I agree to receive communications about AI career opportunities. View our{" "}
                  <a href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</a>.
                </label>
              </div>
            )}
            
            {error && (
              <div className="text-red-500 text-sm px-3 py-2 bg-red-50 rounded border border-red-100 flex items-center">
                <X className="h-4 w-4 mr-2 flex-shrink-0" />
                {error}
              </div>
            )}
            
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-none flex items-center justify-center group"
            >
              {actionLabel}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            
            <div className="text-center">
              <Badge variant="outline" className="font-normal">
                Used by 3,459 AI professionals
              </Badge>
            </div>
          </motion.form>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-5 text-center space-y-4"
          >
            <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            
            <h3 className="text-xl font-semibold text-gray-900">Thank You!</h3>
            
            <p className="text-gray-600">
              Your AI Career Roadmap is on its way to your inbox.
            </p>
            
            <div className="py-2 px-3 bg-blue-50 rounded text-sm text-blue-700 inline-block">
              Redirecting in {countdown} seconds...
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="bg-gray-50 p-4 border-t border-gray-200">
        <div className="flex items-center justify-center space-x-4">
          <div className="flex items-center space-x-1 text-gray-500 text-xs">
            <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Industry Reports</span>
          </div>
          
          <div className="flex items-center space-x-1 text-gray-500 text-xs">
            <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Job Alerts</span>
          </div>
          
          <div className="flex items-center space-x-1 text-gray-500 text-xs">
            <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>AI Updates</span>
          </div>
        </div>
      </div>
    </div>
  )
} 