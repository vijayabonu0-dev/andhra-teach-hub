import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { 
  User, 
  FileText, 
  Briefcase, 
  TrendingUp, 
  Calendar, 
  CheckCircle, 
  Clock,
  Star,
  Download
} from "lucide-react"

const Dashboard = () => {
  // Mock data - will be replaced with real data later
  const stats = [
    { title: "Profile Completion", value: "85%", icon: User, color: "text-blue-600", trend: "+5%" },
    { title: "Applications Sent", value: "12", icon: FileText, color: "text-green-600", trend: "+3" },
    { title: "Jobs Viewed", value: "45", icon: Briefcase, color: "text-purple-600", trend: "+8" },
    { title: "Profile Views", value: "127", icon: TrendingUp, color: "text-orange-600", trend: "+23" }
  ]

  const recentApplications = [
    {
      school: "Government High School, Guntur",
      position: "Mathematics Teacher",
      appliedOn: "2024-01-15",
      status: "Under Review",
      statusColor: "bg-yellow-100 text-yellow-800"
    },
    {
      school: "Zilla Parishad High School, Krishna",
      position: "English Teacher", 
      appliedOn: "2024-01-12",
      status: "Shortlisted",
      statusColor: "bg-green-100 text-green-800"
    },
    {
      school: "Government Primary School, Visakhapatnam",
      position: "Science Teacher",
      appliedOn: "2024-01-10",
      status: "Interview Scheduled",
      statusColor: "bg-blue-100 text-blue-800"
    }
  ]

  const recommendedJobs = [
    {
      school: "Government High School, Anantapur",
      position: "Physics Teacher",
      location: "Anantapur",
      salary: "₹35,000 - ₹45,000",
      posted: "2 days ago",
      matchScore: 95
    },
    {
      school: "Zilla Parishad School, Chittoor", 
      position: "Chemistry Teacher",
      location: "Chittoor",
      salary: "₹32,000 - ₹42,000",
      posted: "3 days ago",
      matchScore: 88
    }
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-hero rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Welcome back, John Doe! 👋</h1>
        <p className="opacity-90">Here's what's happening with your teaching career today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="border-0 shadow-soft bg-gradient-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-success">
                    <TrendingUp className="w-3 h-3 inline mr-1" />
                    {stat.trend} from last month
                  </p>
                </div>
                <div className={`p-3 rounded-full bg-accent/20 ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Profile Completion */}
        <Card className="lg:col-span-1 border-0 shadow-soft bg-gradient-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="w-5 h-5 mr-2" />
              Profile Status
            </CardTitle>
            <CardDescription>Complete your profile to get better matches</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Profile Completion</span>
                <span>85%</span>
              </div>
              <Progress value={85} className="h-2" />
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-success mr-2" />
                  <span className="text-sm">Basic Information</span>
                </div>
                <Badge variant="secondary">Complete</Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-success mr-2" />
                  <span className="text-sm">Education Details</span>
                </div>
                <Badge variant="secondary">Complete</Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 text-warning mr-2" />
                  <span className="text-sm">Work Experience</span>
                </div>
                <Badge variant="outline">Pending</Badge>
              </div>
            </div>
            
            <Button className="w-full" variant="outline">
              Complete Profile
            </Button>
          </CardContent>
        </Card>

        {/* Recent Applications */}
        <Card className="lg:col-span-2 border-0 shadow-soft bg-gradient-card">
          <CardHeader>
            <CardTitle>Recent Applications</CardTitle>
            <CardDescription>Track your recent job applications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentApplications.map((app, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-lg border bg-card/50">
                  <div className="flex-1">
                    <h4 className="font-medium">{app.position}</h4>
                    <p className="text-sm text-muted-foreground">{app.school}</p>
                    <p className="text-xs text-muted-foreground">Applied on {app.appliedOn}</p>
                  </div>
                  <Badge className={app.statusColor}>
                    {app.status}
                  </Badge>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              View All Applications
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recommended Jobs */}
        <Card className="border-0 shadow-soft bg-gradient-card">
          <CardHeader>
            <CardTitle>Recommended for You</CardTitle>
            <CardDescription>Jobs matching your profile and preferences</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recommendedJobs.map((job, index) => (
                <div key={index} className="p-4 rounded-lg border bg-card/50 space-y-2">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium">{job.position}</h4>
                      <p className="text-sm text-muted-foreground">{job.school}</p>
                      <p className="text-sm text-muted-foreground">{job.location} • {job.salary}</p>
                    </div>
                    <div className="flex items-center space-x-1 text-warning">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-sm font-medium">{job.matchScore}%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{job.posted}</span>
                    <Button size="sm">Apply Now</Button>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              View All Jobs
            </Button>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="border-0 shadow-soft bg-gradient-card">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks to boost your profile</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start" variant="outline">
              <FileText className="w-4 h-4 mr-2" />
              Generate CV
            </Button>
            
            <Button className="w-full justify-start" variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Download Profile PDF
            </Button>
            
            <Button className="w-full justify-start" variant="outline">
              <Briefcase className="w-4 h-4 mr-2" />
              Browse All Jobs
            </Button>
            
            <Button className="w-full justify-start" variant="outline">
              <TrendingUp className="w-4 h-4 mr-2" />
              View Analytics
            </Button>
            
            <Button className="w-full justify-start" variant="outline">
              <Calendar className="w-4 h-4 mr-2" />
              Schedule Interview Prep
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Dashboard