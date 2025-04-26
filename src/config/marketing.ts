/**
 * Marketing Configuration
 * 
 * This file contains all marketing-related configuration settings,
 * including ad campaign parameters, conversion tracking IDs,
 * and messaging variants for A/B testing.
 */

// Ad Campaign Settings
export const adCampaign = {
  // Google Ads Settings
  googleAds: {
    campaignName: "AI Services Lead Generation Campaign 2025-03-08",
    conversionId: "AW-123456789",
    conversionLabel: "AbC-D_efG-h1i2J3k4L5",
    remarketing: {
      audienceId: "123456789",
      dynamicRemarketing: true,
    },
    // Automated bidding adjustments
    bidAdjustments: {
      mobile: 1.2, // 20% increase for mobile
      desktop: 1.0,
      tablet: 0.9, // 10% decrease for tablet
      // Time-based adjustments
      timeOfDay: {
        businessHours: 1.3, // 30% increase during business hours
        evenings: 1.0,
        weekends: 0.8, // 20% decrease on weekends
      },
      // Geo targeting adjustments
      location: {
        sanFrancisco: 1.5, // 50% increase for San Francisco
        newYork: 1.4, // 40% increase for New York
        other: 1.0,
      },
    },
  },
  
  // Facebook Ads Settings
  facebookAds: {
    pixelId: "123456789012345",
    campaignObjective: "LEAD_GENERATION",
    adSetOptimization: "LEADS", 
    customAudiences: [
      "website_visitors_30d", 
      "email_subscribers",
      "lookalike_customers"
    ],
    // Custom conversion events
    events: {
      lead: "Lead",
      completeRegistration: "CompleteRegistration",
      viewContent: "ViewContent"
    },
  },
  
  // LinkedIn Ads Settings
  linkedInAds: {
    conversionId: "12345678",
    insightTag: "123456",
    // Custom targeting parameters
    targeting: {
      jobTitles: [
        "Software Engineer",
        "Data Scientist",
        "Machine Learning Engineer",
        "AI Engineer",
        "Product Manager",
        "CTO",
        "Engineering Manager"
      ],
      skills: [
        "Machine Learning",
        "Python",
        "Data Science",
        "Artificial Intelligence",
        "Programming"
      ],
      industries: [
        "Computer Software",
        "Information Technology",
        "Internet",
        "Financial Services"
      ],
    },
  },
}

// Lead Magnet Configurations
export const leadMagnets = {
  careerRoadmap: {
    title: "AI Career Roadmap: From Novice to Six-Figure Jobs",
    description: "Learn how our graduates landed $120k+ jobs at top tech companies",
    imageUrl: "/images/lead-magnets/ai-career-roadmap.png",
    ctaText: "Get Free Career Roadmap",
    emailSubject: "Your AI Career Roadmap (87% Placement Rate)",
    fileUrl: "/downloads/ai-career-roadmap.pdf",
  },
  aiSalaryGuide: {
    title: "2025 AI Salary Guide: Negotiate Top Dollar",
    description: "Industry salary benchmarks with negotiation scripts that work",
    imageUrl: "/images/lead-magnets/ai-salary-guide.png",
    ctaText: "Get Salary Guide",
    emailSubject: "Your 2025 AI Salary Guide (Unlock Your Worth)",
    fileUrl: "/downloads/ai-salary-guide.pdf",
  },
  hiringPartners: {
    title: "32 Companies Hiring AI Engineers Today",
    description: "Direct contacts & insider application tips for top AI employers",
    imageUrl: "/images/lead-magnets/hiring-partners.png",
    ctaText: "Get Hiring List",
    emailSubject: "32 Companies Hiring AI Engineers Right Now",
    fileUrl: "/downloads/ai-hiring-partners.pdf",
  },
}

// A/B Test Configurations
export const abTests = {
  heroHeadline: {
    variants: [
      "Master AI Agents & Transform Your Career",
      "From Zero to AI Engineer: Guaranteed Job Placement",
      "AI Skills → $120K+ Jobs: Your Career Accelerator",
    ],
    weights: [0.33, 0.33, 0.34], // Traffic distribution
    defaultVariant: 0,
  },
  ctaButton: {
    variants: [
      "Apply Now - 15 Spots Left",
      "Start Your AI Career Today",
      "Get Hired in 90 Days or Money Back",
      "Join 2,500+ Successful Graduates",
    ],
    weights: [0.25, 0.25, 0.25, 0.25],
    defaultVariant: 0,
  },
  pricingDisplay: {
    variants: [
      "Monthly",
      "Full Payment",
      "Deferred Tuition",
      "Income Share Agreement",
    ],
    weights: [0.2, 0.3, 0.2, 0.3],
    defaultVariant: 1,
  },
}

// Social Proof Elements
export const socialProof = {
  studentTestimonials: [
    {
      name: "Sarah K.",
      role: "AI Product Manager",
      company: "TechVision",
      image: "/images/testimonials/sarah.jpg",
      quote: "The program completely changed how I approach product development. I landed a job at TechVision within 2 months of graduating.",
      before: "Junior Product Analyst",
      after: "AI Product Manager",
      improvement: "+65% salary increase",
    },
    {
      name: "Michael R.",
      role: "ML Engineer",
      company: "DataSphere",
      image: "/images/testimonials/michael.jpg",
      quote: "Shedding my old mental models about AI was challenging but incredibly rewarding. I'm now making $142K at DataSphere.",
      before: "Software Developer",
      after: "ML Engineer",
      improvement: "3 promotions in 18 months",
    },
    // Additional testimonials...
  ],
  
  partnerLogos: [
    { name: "Google", logoUrl: "/images/partners/google.svg" },
    { name: "Meta", logoUrl: "/images/partners/meta.svg" },
    { name: "Amazon", logoUrl: "/images/partners/amazon.svg" },
    { name: "Microsoft", logoUrl: "/images/partners/microsoft.svg" },
    { name: "Tesla", logoUrl: "/images/partners/tesla.svg" },
    { name: "OpenAI", logoUrl: "/images/partners/openai.svg" },
    { name: "Anthropic", logoUrl: "/images/partners/anthropic.svg" },
    { name: "Databricks", logoUrl: "/images/partners/databricks.svg" },
  ],
  
  stats: {
    totalStudents: 2531,
    placementRate: 87,
    avgSalaryIncrease: 72, // percentage
    avgStartingSalary: 126000,
    companiesHiring: 32,
  },
}

// Tracking and Analytics
export const analytics = {
  googleAnalytics: "G-ABC123DEF4",
  facebookPixel: "123456789012345",
  linkedInInsightTag: "987654",
  hotjar: "1234567",
  utmParameters: {
    allowedSources: [
      "google", "facebook", "linkedin", "twitter", "instagram", 
      "email", "partner", "referral", "direct", "organic"
    ],
    defaultMedium: "cpc",
    fallbackCampaign: "brand_awareness",
  },
  conversionGoals: {
    leadCapture: "lead_capture",
    applicationStart: "application_start",
    applicationComplete: "application_complete",
    paymentInitiated: "payment_initiated",
    paymentComplete: "payment_complete",
  },
} 