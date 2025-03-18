import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { CheckCircle, Info } from "lucide-react"

export function CourseSummary() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Course Name</CardTitle>
        <CardDescription>Comprehensive curriculum with lifetime access</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-start gap-2">
            <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <h4 className="font-medium">Complete Course Access</h4>
              <p className="text-sm text-muted-foreground">All modules, resources, and future updates</p>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <h4 className="font-medium">Community Membership</h4>
              <p className="text-sm text-muted-foreground">Connect with peers and instructors</p>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <h4 className="font-medium">Practical Projects</h4>
              <p className="text-sm text-muted-foreground">Build your portfolio with hands-on work</p>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <h4 className="font-medium">Completion Certificate</h4>
              <p className="text-sm text-muted-foreground">Demonstrate your expertise</p>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium">Professional Plan</span>
            <span className="font-medium">$899</span>
          </div>
          <div className="flex justify-between mb-2 text-sm text-muted-foreground">
            <span>30-day money-back guarantee</span>
            <span>Lifetime access</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between bg-muted/50 p-4 rounded-b-lg">
        <div className="flex items-center text-sm">
          <Info className="h-4 w-4 mr-1 text-muted-foreground" />
          <span className="text-muted-foreground">Secure payment processing</span>
        </div>
        <div className="text-sm font-medium">Payment plans available</div>
      </CardFooter>
    </Card>
  )
}

