// Domain color mapping to actual tailwind classes
export const domainBadgeClasses: Record<string, string> = {
  Healthcare: "bg-blue-600 hover:bg-blue-700",
  Manufacturing: "bg-amber-600 hover:bg-amber-700",
  Finance: "bg-emerald-600 hover:bg-emerald-700",
  Retail: "bg-purple-600 hover:bg-purple-700",
  Education: "bg-pink-600 hover:bg-pink-700",
  "Customer Service": "bg-indigo-600 hover:bg-indigo-700",
  Logistics: "bg-cyan-600 hover:bg-cyan-700",
  Security: "bg-red-600 hover:bg-red-700",
  // Default
  default: "bg-slate-600 hover:bg-slate-700",
}

export const domainIconBgClasses: Record<string, string> = {
  Healthcare: "bg-blue-100 text-blue-700",
  Manufacturing: "bg-amber-100 text-amber-700",
  Finance: "bg-emerald-100 text-emerald-700",
  Retail: "bg-purple-100 text-purple-700",
  Education: "bg-pink-100 text-pink-700",
  "Customer Service": "bg-indigo-100 text-indigo-700",
  Logistics: "bg-cyan-100 text-cyan-700",
  Security: "bg-red-100 text-red-700",
  // Default
  default: "bg-slate-100 text-slate-700",
}

export const domainButtonClasses: Record<string, string> = {
  Healthcare: "bg-blue-600 hover:bg-blue-700",
  Manufacturing: "bg-amber-600 hover:bg-amber-700",
  Finance: "bg-emerald-600 hover:bg-emerald-700",
  Retail: "bg-purple-600 hover:bg-purple-700",
  Education: "bg-pink-600 hover:bg-pink-700",
  "Customer Service": "bg-indigo-600 hover:bg-indigo-700",
  Logistics: "bg-cyan-600 hover:bg-cyan-700",
  Security: "bg-red-600 hover:bg-red-700",
  // Default
  default: "bg-slate-600 hover:bg-slate-700",
}

export const domainAccentClasses: Record<string, string> = {
  Healthcare: "bg-blue-600",
  Manufacturing: "bg-amber-600",
  Finance: "bg-emerald-600",
  Retail: "bg-purple-600",
  Education: "bg-pink-600",
  "Customer Service": "bg-indigo-600",
  Logistics: "bg-cyan-600",
  Security: "bg-red-600",
  // Default
  default: "bg-slate-600",
}

// Domain gradients for section backgrounds
export const domainGradients: Record<string, string> = {
  Healthcare: "from-blue-400/10 to-cyan-400/10 border-blue-300/30",
  Manufacturing: "from-orange-400/10 to-amber-400/10 border-orange-300/30",
  Finance: "from-green-400/10 to-emerald-400/10 border-green-300/30",
  Retail: "from-purple-400/10 to-violet-400/10 border-purple-300/30",
  "Customer Service": "from-indigo-400/10 to-blue-400/10 border-indigo-300/30",
  Education: "from-pink-400/10 to-rose-400/10 border-pink-300/30",
  Security: "from-red-400/10 to-rose-400/10 border-red-300/30",
  Logistics: "from-teal-400/10 to-cyan-400/10 border-teal-300/30",
  default: "from-gray-400/10 to-slate-400/10 border-gray-300/30",
}

// Helper function to get domain-specific classes
export function getDomainClasses(domain: string) {
  return {
    badge: domainBadgeClasses[domain] || domainBadgeClasses.default,
    iconBg: domainIconBgClasses[domain] || domainIconBgClasses.default,
    button: domainButtonClasses[domain] || domainButtonClasses.default,
    accent: domainAccentClasses[domain] || domainAccentClasses.default,
    gradient: domainGradients[domain] || domainGradients.default,
    // Derive text color from accent class for text highlights
    accentText: (domainAccentClasses[domain] || domainAccentClasses.default).replace("bg-", "text-")
  }
} 