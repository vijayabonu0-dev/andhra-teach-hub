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
      <div className="bg-gradient-hero rounded-lg p-6 text-white relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-20" 
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        ></div>
        <div className="relative">
          <h1 className="text-2xl font-bold mb-2 float">Welcome to TeachMate, John! 👋</h1>
          <p className="opacity-90">Bridging talent and teaching careers with AI-powered solutions.</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="interactive-card border-0 shadow-rainbow bg-gradient-card group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold gradient-text group-hover:scale-105 transition-transform">{stat.value}</p>
                  <p className="text-xs text-success">
                    <TrendingUp className="w-3 h-3 inline mr-1" />
                    {stat.trend} from last month
                  </p>
                </div>
                <div className="p-3 rounded-full bg-gradient-interactive text-white shadow-glow group-hover:rotate-12 transition-transform">
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Profile Completion */}
        <Card className="lg:col-span-1 interactive-card border-0 shadow-rainbow bg-gradient-card">
          <CardHeader>
            <CardTitle className="flex items-center gradient-text">
              <User className="w-5 h-5 mr-2" />
              Profile Power-Up
            </CardTitle>
            <CardDescription>Unlock your teaching potential with AI optimization</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>AI Profile Score</span>
                <span className="font-bold gradient-text">85%</span>
              </div>
              <Progress value={85} className="h-3 bg-muted/30" />
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between p-2 rounded-lg bg-gradient-glass">
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-success mr-2" />
                  <span className="text-sm">Smart Profile</span>
                </div>
                <Badge className="bg-gradient-to-r from-success to-success/80 text-white">Complete</Badge>
              </div>
              
              <div className="flex items-center justify-between p-2 rounded-lg bg-gradient-glass">
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-success mr-2" />
                  <span className="text-sm">AI Optimization</span>
                </div>
                <Badge className="bg-gradient-to-r from-success to-success/80 text-white">Complete</Badge>
              </div>
              
              <div className="flex items-center justify-between p-2 rounded-lg bg-gradient-glass">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 text-warning mr-2 pulse-slow" />
                  <span className="text-sm">Experience Boost</span>
                </div>
                <Badge variant="outline" className="border-warning text-warning">Pending</Badge>
              </div>
            </div>
            
            <Button className="w-full glow-button bg-gradient-secondary text-white shadow-glow">
              Enhance Profile
            </Button>
          </CardContent>
        </Card>

        {/* Recent Applications */}
        <Card className="lg:col-span-2 interactive-card border-0 shadow-rainbow bg-gradient-card">
          <CardHeader>
            <CardTitle className="gradient-text">Application Tracker</CardTitle>
            <CardDescription>Monitor your teaching journey in real-time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentApplications.map((app, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-gradient-glass hover:bg-gradient-interactive/10 transition-all cursor-pointer group">
                  <div className="flex-1">
                    <h4 className="font-medium group-hover:gradient-text transition-all">{app.position}</h4>
                    <p className="text-sm text-muted-foreground">{app.school}</p>
                    <p className="text-xs text-muted-foreground">Applied on {app.appliedOn}</p>
                  </div>
                  <Badge className="bg-gradient-to-r from-warning to-warning/80 text-white shadow-glow">
                    {app.status}
                  </Badge>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4 glow-button hover:bg-gradient-tertiary hover:text-white">
              View All Applications
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recommended Jobs */}
        <Card className="interactive-card border-0 shadow-rainbow bg-gradient-card">
          <CardHeader>
            <CardTitle className="gradient-text">AI Recommendations</CardTitle>
            <CardDescription>Perfect matches powered by machine learning</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recommendedJobs.map((job, index) => (
                <div key={index} className="p-4 rounded-lg bg-gradient-glass hover:bg-gradient-interactive/20 transition-all space-y-2 group cursor-pointer">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium group-hover:gradient-text transition-all">{job.position}</h4>
                      <p className="text-sm text-muted-foreground">{job.school}</p>
                      <p className="text-sm text-muted-foreground">{job.location} • {job.salary}</p>
                    </div>
                    <div className="flex items-center space-x-1 bg-gradient-to-r from-warning to-warning/80 text-white px-2 py-1 rounded-full">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-sm font-medium">{job.matchScore}%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{job.posted}</span>
                    <Button size="sm" className="glow-button bg-gradient-primary text-white">Apply Now</Button>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4 glow-button hover:bg-gradient-secondary hover:text-white">
              Discover More Jobs
            </Button>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="interactive-card border-0 shadow-rainbow bg-gradient-card">
          <CardHeader>
            <CardTitle className="gradient-text">Smart Actions</CardTitle>
            <CardDescription>AI-powered shortcuts to success</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start glow-button bg-gradient-primary text-white hover:shadow-glow" onClick={() => window.location.href = '/cv-generator'}>
              <FileText className="w-4 h-4 mr-2" />
              AI CV Generator
            </Button>
            
            <Button className="w-full justify-start glow-button bg-gradient-secondary text-white hover:shadow-glow">
              <Download className="w-4 h-4 mr-2" />
              Smart Profile Export
            </Button>
            
            <Button className="w-full justify-start glow-button bg-gradient-tertiary text-white hover:shadow-glow">
              <Briefcase className="w-4 h-4 mr-2" />
              Explore Opportunities
            </Button>
            
            <Button className="w-full justify-start glow-button bg-gradient-interactive text-white hover:shadow-glow" onClick={() => window.location.href = '/analytics'}>
              <TrendingUp className="w-4 h-4 mr-2" />
              Career Analytics
            </Button>
            
            <Button className="w-full justify-start glow-button bg-gradient-to-r from-warning to-warning/80 text-white hover:shadow-glow">
              <Calendar className="w-4 h-4 mr-2" />
              AI Interview Prep
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Dashboard