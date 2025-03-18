"use client"
import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  FileText,
  Play,
  Zap,
  FileCode,
  Network,
  BarChart,
  Clock,
  CheckCircle,
  Lock,
  Star,
  Download,
  Eye,
  AlertCircle,
  Flame,
  MessageSquare,
  ThumbsUp,
  Timer,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export interface Topic {
  id: string
  title: string
  duration: string
  type: "video" | "workshop" | "project" | "discussion" | "assessment" | "quiz"
  preview?: boolean
  completed?: boolean
  locked?: boolean
  difficulty?: "beginner" | "intermediate" | "advanced"
  popularity?: number // 1-5 scale
  newContent?: boolean
  resources?: {
    type: string
    url: string
    label: string
  }[]
  engagement?: {
    views?: number
    likes?: number
    comments?: number
  }
}

interface TopicItemProps {
  topic: Topic
  moduleColor: string
}

export function TopicItem({ topic, moduleColor }: TopicItemProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const itemRef = useRef<HTMLLIElement>(null)
  const [hoverStyle, setHoverStyle] = useState({
    opacity: 0,
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  })

  // Update hover effect position when isHovered changes
  useEffect(() => {
    if (isHovered && itemRef.current && !topic.locked) {
      const { offsetTop, offsetLeft, offsetWidth, offsetHeight } = itemRef.current
      setHoverStyle({
        opacity: 1,
        top: 0,
        left: 0,
        width: offsetWidth,
        height: offsetHeight,
      })
    } else {
      setHoverStyle((prev) => ({ ...prev, opacity: 0 }))
    }
  }, [isHovered, topic.locked])

  let Icon = FileText
  if (topic.type === "video") Icon = Play
  if (topic.type === "workshop") Icon = Zap
  if (topic.type === "project") Icon = FileCode
  if (topic.type === "discussion") Icon = Network
  if (topic.type === "assessment" || topic.type === "quiz") Icon = BarChart

  // Status indicator styles
  const getStatusStyles = () => {
    if (topic.completed) {
      return {
        bgColor: "bg-emerald-100",
        iconColor: "text-emerald-600",
        icon: <CheckCircle className="h-4 w-4" />,
        borderColor: "border-emerald-200",
      }
    } else if (topic.locked) {
      return {
        bgColor: "bg-red-50",
        iconColor: "text-red-400",
        icon: <Lock className="h-4 w-4" />,
        borderColor: "border-red-200",
      }
    } else {
      return {
        bgColor: "bg-blue-50",
        iconColor: "text-blue-500",
        icon: <Icon className="h-4 w-4" />,
        borderColor: "border-blue-200",
      }
    }
  }

  const statusStyles = getStatusStyles()

  // Difficulty indicator
  const getDifficultyIndicator = () => {
    switch (topic.difficulty) {
      case "beginner":
        return { icon: <Zap className="h-3 w-3" />, color: "text-green-500", label: "Beginner" }
      case "intermediate":
        return { icon: <Zap className="h-3 w-3" />, color: "text-blue-500", label: "Intermediate" }
      case "advanced":
        return { icon: <Zap className="h-3 w-3" />, color: "text-purple-500", label: "Advanced" }
      default:
        return null
    }
  }

  const difficultyIndicator = getDifficultyIndicator()

  // Popularity stars
  const renderPopularityStars = () => {
    if (!topic.popularity) return null

    return (
      <div className="flex items-center">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={cn("h-3 w-3", i < topic.popularity! ? "text-amber-400 fill-amber-400" : "text-muted")}
          />
        ))}
      </div>
    )
  }

  return (
    <motion.li
      ref={itemRef}
      className={cn(
        "flex items-start gap-3 p-3 rounded-lg transition-all relative border",
        topic.locked ? "opacity-70 border-red-100" : topic.completed ? "border-emerald-100" : "border-transparent",
        isExpanded ? "bg-muted/30" : "",
      )}
      whileHover={{ x: topic.locked ? 0 : 3 }}
      onMouseEnter={() => !topic.locked && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Hover background effect - smooth transition */}
      {!topic.locked && !isExpanded && (
        <div
          className="absolute inset-0 bg-muted/50 rounded-lg transition-all duration-300 ease-out pointer-events-none"
          style={{
            opacity: hoverStyle.opacity,
            width: `${hoverStyle.width}px`,
            height: `${hoverStyle.height}px`,
          }}
        />
      )}

      <div className={cn("p-2 rounded-md relative z-10", statusStyles.bgColor, "border", statusStyles.borderColor)}>
        <div className={statusStyles.iconColor}>{statusStyles.icon}</div>
      </div>

      <div className="flex-1 relative z-10">
        <div className="flex flex-wrap justify-between gap-2">
          <div className="font-medium flex items-center gap-2">
            {topic.title}
            {topic.locked && <Lock className="h-3 w-3 text-red-500" />}
            {topic.completed && <CheckCircle className="h-3 w-3 text-emerald-500" />}
            {topic.newContent && (
              <Badge variant="outline" className="bg-red-50 text-red-500 border-red-200 text-[10px] py-0 px-1.5">
                <Flame className="h-2 w-2 mr-0.5" /> NEW
              </Badge>
            )}
          </div>
          <div className="text-xs text-muted-foreground flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {topic.duration}
          </div>
        </div>

        <div className="flex items-center gap-2 mt-1 flex-wrap">
          <Badge
            variant="outline"
            className={cn(
              "text-xs capitalize",
              topic.type === "video"
                ? "border-blue-200 bg-blue-50 text-blue-700"
                : topic.type === "workshop"
                  ? "border-purple-200 bg-purple-50 text-purple-700"
                  : topic.type === "project"
                    ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                    : topic.type === "discussion"
                      ? "border-amber-200 bg-amber-50 text-amber-700"
                      : topic.type === "quiz"
                        ? "border-pink-200 bg-pink-50 text-pink-700"
                        : "border-gray-200 bg-gray-50 text-gray-700",
            )}
          >
            {topic.type}
          </Badge>

          {topic.preview && (
            <Badge variant="secondary" className="text-xs bg-amber-100 text-amber-700 border-amber-200">
              <Eye className="mr-1 h-3 w-3" /> Free Preview
            </Badge>
          )}

          {difficultyIndicator && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge
                    variant="outline"
                    className={cn("text-xs border-transparent bg-transparent", difficultyIndicator.color)}
                  >
                    {difficultyIndicator.icon}
                    <span className="sr-only">{difficultyIndicator.label}</span>
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">{difficultyIndicator.label} level</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}

          {renderPopularityStars()}

          {/* Engagement metrics */}
          {topic.engagement && (
            <div className="flex items-center gap-2 ml-auto">
              {topic.engagement.views && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Eye className="h-3 w-3 mr-0.5" />
                        <span>
                          {topic.engagement.views > 999
                            ? `${(topic.engagement.views / 1000).toFixed(1)}k`
                            : topic.engagement.views}
                        </span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">{topic.engagement.views} views</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}

              {topic.engagement.likes && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <ThumbsUp className="h-3 w-3 mr-0.5" />
                        <span>{topic.engagement.likes}</span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">{topic.engagement.likes} likes</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}

              {topic.engagement.comments && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <MessageSquare className="h-3 w-3 mr-0.5" />
                        <span>{topic.engagement.comments}</span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">{topic.engagement.comments} comments</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
          )}
        </div>

        {/* Expandable content */}
        {isExpanded && (
          <div className="mt-3 pt-3 border-t border-dashed border-muted-foreground/20">
            {/* Resources section */}
            {topic.resources && topic.resources.length > 0 && (
              <div className="mb-3">
                <h5 className="text-xs font-medium mb-2 flex items-center">
                  <Download className="h-3 w-3 mr-1" /> Resources
                </h5>
                <div className="flex flex-wrap gap-2">
                  {topic.resources.map((resource, idx) => (
                    <Badge
                      key={idx}
                      variant="outline"
                      className="text-xs bg-blue-50/50 text-blue-700 border-blue-200 hover:bg-blue-100 cursor-pointer"
                    >
                      {resource.type === "pdf" && <FileText className="h-3 w-3 mr-1" />}
                      {resource.type === "code" && <FileCode className="h-3 w-3 mr-1" />}
                      {resource.type === "video" && <Play className="h-3 w-3 mr-1" />}
                      {resource.label}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Estimated completion time */}
            <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
              <Timer className="h-3 w-3" />
              <span>Estimated completion: {topic.duration}</span>
            </div>
          </div>
        )}
      </div>

      {!topic.locked && (
        <div className="self-center relative z-10 flex flex-col gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 bg-primary/10 hover:bg-primary/20"
            onClick={(e) => {
              e.stopPropagation()
              if (!isExpanded) {
                setIsExpanded(true)
                setIsHovered(false)
              }
            }}
          >
            <Play className="h-3.5 w-3.5 text-primary" />
          </Button>

          {isExpanded && (
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 hover:bg-muted"
              onClick={(e) => {
                e.stopPropagation()
                setIsExpanded(false)
              }}
            >
              <AlertCircle className="h-3.5 w-3.5 text-muted-foreground" />
            </Button>
          )}
        </div>
      )}
    </motion.li>
  )
}

