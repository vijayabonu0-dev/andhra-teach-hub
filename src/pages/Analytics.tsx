import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  TrendingUp, 
  Eye, 
  Users, 
  Target,
  Calendar,
  Award,
  MapPin,
  Briefcase,
  BookOpen,
  BarChart3
} from "lucide-react"

const Analytics = () => {
  // Mock data - will be replaced with real analytics data
  const stats = {
    profileViews: { current: 127, previous: 89, change: 42.7 },
    applicationsSent: { current: 12, previous: 8, change: 50 },
    jobMatches: { current: 45, previous: 32, change: 40.6 },
    responseRate: { current: 25, previous: 20, change: 25 }
  }

  const profileMetrics = [
    { label: "Profile Completeness", value: 85, target: 100, color: "text-blue-600" },
    { label: "Skill Match Rate", value: 92, target: 100, color: "text-green-600" },
    { label: "Experience Relevance", value: 78, target: 100, color: "text-orange-600" },
    { label: "Location Preference", value: 95, target: 100, color: "text-purple-600" }
  ]

  const applicationBreakdown = [
    { status: "Under Review", count: 5, percentage: 41.7, color: "bg-yellow-500" },
    { status: "Shortlisted", count: 3, percentage: 25, color: "bg-blue-500" },
    { status: "Interview Scheduled", count: 2, percentage: 16.7, color: "bg-green-500" },
    { status: "Rejected", count: 2, percentage: 16.7, color: "bg-red-500" }
  ]

  const subjectDemand = [
    { subject: "Mathematics", demand: 95, applications: 8, color: "text-blue-600" },
    { subject: "English", demand: 88, applications: 3, color: "text-green-600" },
    { subject: "Science", demand: 82, applications: 1, color: "text-purple-600" },
    { subject: "Social Studies", demand: 75, applications: 0, color: "text-orange-600" }
  ]

  const districtOpportunities = [
    { district: "Guntur", jobs: 23, competition: "Medium", match: 95 },
    { district: "Krishna", jobs: 18, competition: "High", match: 88 },
    { district: "Visakhapatnam", jobs: 31, competition: "High", match: 75 },
    { district: "Anantapur", jobs: 15, competition: "Low", match: 92 }
  ]

  const monthlyTrends = [
    { month: "Oct", views: 45, applications: 3 },
    { month: "Nov", views: 67, applications: 5 },
    { month: "Dec", views: 89, applications: 4 },
    { month: "Jan", views: 127, applications: 12 }
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Personal Analytics</h1>
        <p className="text-muted-foreground">
          Track your job search progress and optimize your profile for better results
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 shadow-soft bg-gradient-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Profile Views</p>
                <p className="text-2xl font-bold">{stats.profileViews.current}</p>
                <p className="text-xs text-success flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +{stats.profileViews.change}% this month
                </p>
              </div>
              <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                <Eye className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-soft bg-gradient-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Applications Sent</p>
                <p className="text-2xl font-bold">{stats.applicationsSent.current}</p>
                <p className="text-xs text-success flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +{stats.applicationsSent.change}% this month
                </p>
              </div>
              <div className="p-3 rounded-full bg-green-100 text-green-600">
                <Briefcase className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-soft bg-gradient-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Job Matches</p>
                <p className="text-2xl font-bold">{stats.jobMatches.current}</p>
                <p className="text-xs text-success flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +{stats.jobMatches.change}% this month
                </p>
              </div>
              <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                <Target className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-soft bg-gradient-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Response Rate</p>
                <p className="text-2xl font-bold">{stats.responseRate.current}%</p>
                <p className="text-xs text-success flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +{stats.responseRate.change}% this month
                </p>
              </div>
              <div className="p-3 rounded-full bg-orange-100 text-orange-600">
                <Users className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Profile Optimization */}
        <Card className="border-0 shadow-soft bg-gradient-card">
          <CardHeader>
            <CardTitle>Profile Optimization</CardTitle>
            <CardDescription>Areas to improve for better job matches</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {profileMetrics.map((metric, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{metric.label}</span>
                  <span className={`text-sm font-bold ${metric.color}`}>{metric.value}%</span>
                </div>
                <Progress value={metric.value} className="h-2" />
              </div>
            ))}
            <div className="pt-2">
              <p className="text-sm text-muted-foreground">
                Focus on improving your experience relevance score by adding more detailed work history.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Application Status */}
        <Card className="border-0 shadow-soft bg-gradient-card">
          <CardHeader>
            <CardTitle>Application Breakdown</CardTitle>
            <CardDescription>Current status of your job applications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {applicationBreakdown.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${item.color}`} />
                    <span className="text-sm font-medium">{item.status}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold">{item.count}</span>
                    <span className="text-xs text-muted-foreground ml-2">({item.percentage}%)</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Subject Demand Analysis */}
        <Card className="border-0 shadow-soft bg-gradient-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BookOpen className="w-5 h-5 mr-2" />
              Subject Demand Analysis
            </CardTitle>
            <CardDescription>Market demand for your teaching subjects</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {subjectDemand.map((subject, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{subject.subject}</span>
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary" className="text-xs">
                      {subject.applications} applications
                    </Badge>
                    <span className={`text-sm font-bold ${subject.color}`}>{subject.demand}%</span>
                  </div>
                </div>
                <Progress value={subject.demand} className="h-2" />
              </div>
            ))}
            <div className="pt-2 text-sm text-muted-foreground">
              <p>Mathematics shows highest demand. Consider applying to more math positions.</p>
            </div>
          </CardContent>
        </Card>

        {/* District Opportunities */}
        <Card className="border-0 shadow-soft bg-gradient-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <MapPin className="w-5 h-5 mr-2" />
              District Opportunities
            </CardTitle>
            <CardDescription>Job availability across different districts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {districtOpportunities.map((district, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg border bg-card/50">
                  <div>
                    <h4 className="font-medium">{district.district}</h4>
                    <p className="text-sm text-muted-foreground">{district.jobs} open positions</p>
                  </div>
                  <div className="text-right">
                    <Badge 
                      variant={district.competition === 'Low' ? 'default' : district.competition === 'Medium' ? 'secondary' : 'destructive'}
                      className="mb-1"
                    >
                      {district.competition} Competition
                    </Badge>
                    <p className="text-sm font-bold text-success">{district.match}% Match</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Trends */}
      <Card className="border-0 shadow-soft bg-gradient-card">
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart3 className="w-5 h-5 mr-2" />
            Monthly Activity Trends
          </CardTitle>
          <CardDescription>Your job search activity over the past 4 months</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4">
            {monthlyTrends.map((month, index) => (
              <div key={index} className="text-center p-4 rounded-lg border bg-card/50">
                <h4 className="font-medium text-sm text-muted-foreground">{month.month} 2024</h4>
                <div className="mt-2 space-y-1">
                  <div>
                    <p className="text-lg font-bold text-blue-600">{month.views}</p>
                    <p className="text-xs text-muted-foreground">Profile Views</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-green-600">{month.applications}</p>
                    <p className="text-xs text-muted-foreground">Applications</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Insights & Recommendations */}
      <Card className="border-0 shadow-soft bg-gradient-card">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Award className="w-5 h-5 mr-2" />
            Insights & Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-medium text-success">What's Working Well</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-success rounded-full mt-2 mr-3 flex-shrink-0" />
                  Your profile views increased by 43% this month
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-success rounded-full mt-2 mr-3 flex-shrink-0" />
                  Mathematics subject expertise is in high demand
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-success rounded-full mt-2 mr-3 flex-shrink-0" />
                  Your response rate is above average (25% vs 18%)
                </li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-medium text-warning">Areas for Improvement</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-warning rounded-full mt-2 mr-3 flex-shrink-0" />
                  Add more detailed work experience descriptions
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-warning rounded-full mt-2 mr-3 flex-shrink-0" />
                  Consider expanding to nearby districts for more opportunities
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-warning rounded-full mt-2 mr-3 flex-shrink-0" />
                  Upload additional teaching certifications
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Analytics