import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Search,
  MapPin,
  Calendar,
  DollarSign,
  Building2,
  Filter,
  BookmarkPlus,
  Eye,
  Star,
  Clock,
  Users,
  TrendingUp,
  Award,
  ExternalLink,
  Heart,
  CheckCircle,
  AlertCircle,
  X
} from "lucide-react"

const Jobs = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDistrict, setSelectedDistrict] = useState("")
  const [selectedSubject, setSelectedSubject] = useState("")
  const [selectedExperience, setSelectedExperience] = useState("")
  const [selectedSalary, setSelectedSalary] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [sortBy, setSortBy] = useState("relevance")
  const [savedJobs, setSavedJobs] = useState<number[]>([])
  const [selectedJob, setSelectedJob] = useState<any>(null)

  // Mock data - will be replaced with real data later
  const jobs = [
    {
      id: 1,
      title: "Mathematics Teacher",
      school: "Government High School, Guntur",
      location: "Guntur",
      district: "Guntur",
      subject: "Mathematics",
      salary: "₹35,000 - ₹45,000",
      experience: "2-5 years",
      posted: "2 days ago",
      deadline: "2024-02-15",
      type: "Full-time",
      requirements: ["M.Sc Mathematics", "B.Ed", "2+ years experience"],
      description: "We are looking for a qualified Mathematics teacher to join our team. The candidate should have strong subject knowledge and excellent communication skills.",
      matchScore: 95,
      views: 127,
      applicants: 23,
      featured: true
    },
    {
      id: 2,
      title: "English Teacher",
      school: "Zilla Parishad High School, Krishna",
      location: "Vijayawada",
      district: "Krishna",
      subject: "English",
      salary: "₹32,000 - ₹42,000",
      experience: "1-3 years",
      posted: "3 days ago",
      deadline: "2024-02-20",
      type: "Full-time",
      requirements: ["M.A English", "B.Ed", "Good communication skills"],
      description: "Seeking an enthusiastic English teacher with passion for literature and language teaching.",
      matchScore: 88,
      views: 89,
      applicants: 15,
      featured: false
    },
    {
      id: 3,
      title: "Science Teacher",
      school: "Government Primary School, Visakhapatnam",
      location: "Visakhapatnam",
      district: "Visakhapatnam",
      subject: "Science",
      salary: "₹30,000 - ₹40,000",
      experience: "0-2 years",
      posted: "1 week ago",
      deadline: "2024-02-10",
      type: "Full-time",
      requirements: ["M.Sc Physics/Chemistry/Biology", "B.Ed"],
      description: "Looking for a dedicated science teacher to inspire young minds in primary education.",
      matchScore: 82,
      views: 156,
      applicants: 31,
      featured: false
    },
    {
      id: 4,
      title: "Telugu Teacher",
      school: "Government High School, Anantapur",
      location: "Anantapur",
      district: "Anantapur",
      subject: "Telugu",
      salary: "₹28,000 - ₹38,000",
      experience: "1-4 years",
      posted: "4 days ago",
      deadline: "2024-02-25",
      type: "Full-time",
      requirements: ["M.A Telugu", "B.Ed", "Native Telugu speaker"],
      description: "We need a passionate Telugu language teacher to promote regional language education.",
      matchScore: 76,
      views: 92,
      applicants: 18,
      featured: false
    }
  ]

  const districts = [
    "Anantapur", "Chittoor", "East Godavari", "Guntur", "Krishna", 
    "Kurnool", "Nellore", "Prakasam", "Srikakulam", "Visakhapatnam", 
    "Vizianagaram", "West Godavari", "YSR Kadapa"
  ]

  const subjects = [
    "Mathematics", "Physics", "Chemistry", "Biology", "English", 
    "Telugu", "Hindi", "Social Studies", "Computer Science", "Commerce"
  ]

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.school.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesDistrict = !selectedDistrict || job.district === selectedDistrict
    const matchesSubject = !selectedSubject || job.subject === selectedSubject
    const matchesExperience = !selectedExperience || 
      (selectedExperience === "fresher" && job.experience.includes("0")) ||
      (selectedExperience === "experienced" && job.experience.includes("2")) ||
      (selectedExperience === "senior" && job.experience.includes("5"))
    
    return matchesSearch && matchesDistrict && matchesSubject && matchesExperience
  }).sort((a, b) => {
    switch (sortBy) {
      case "date":
        return new Date(b.posted).getTime() - new Date(a.posted).getTime()
      case "salary":
        return parseInt(b.salary.replace(/[^\d]/g, '')) - parseInt(a.salary.replace(/[^\d]/g, ''))
      case "match":
        return b.matchScore - a.matchScore
      default:
        return b.matchScore - a.matchScore
    }
  })

  const toggleSaveJob = (jobId: number) => {
    setSavedJobs(prev => 
      prev.includes(jobId) 
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId]
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Job Opportunities
          </h1>
          <p className="text-lg text-muted-foreground">
            Discover teaching positions across Andhra Pradesh
          </p>
          <div className="flex items-center space-x-6 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Building2 className="w-4 h-4 mr-1" />
              {jobs.length} Active Jobs
            </div>
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-1" />
              {jobs.reduce((acc, job) => acc + job.applicants, 0)} Total Applications
            </div>
            <div className="flex items-center">
              <TrendingUp className="w-4 h-4 mr-1" />
              95% Success Rate
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" onClick={() => setShowFilters(!showFilters)}>
            <Filter className="w-4 h-4 mr-2" />
            {showFilters ? 'Hide Filters' : 'Advanced Filters'}
          </Button>
          <Tabs value={savedJobs.length > 0 ? "saved" : "all"} className="w-auto">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="all">All Jobs</TabsTrigger>
              <TabsTrigger value="saved" className="relative">
                Saved 
                {savedJobs.length > 0 && (
                  <Badge className="ml-1 h-5 w-5 p-0 text-xs">{savedJobs.length}</Badge>
                )}
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Search and Filters */}
      <Card className="border-0 shadow-soft bg-gradient-card">
        <CardContent className="p-6">
          <div className="space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search jobs by title, school name, or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Quick Filters */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>District</Label>
                <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Districts" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Districts</SelectItem>
                    {districts.map((district) => (
                      <SelectItem key={district} value={district}>{district}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Subject</Label>
                <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Subjects" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Subjects</SelectItem>
                    {subjects.map((subject) => (
                      <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Advanced Filters */}
            {showFilters && (
              <>
                <Separator />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Experience Level</Label>
                    <Select value={selectedExperience} onValueChange={setSelectedExperience}>
                      <SelectTrigger>
                        <SelectValue placeholder="Any Experience" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Any Experience</SelectItem>
                        <SelectItem value="fresher">Fresher (0-1 years)</SelectItem>
                        <SelectItem value="experienced">Experienced (2-5 years)</SelectItem>
                        <SelectItem value="senior">Senior (5+ years)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>School Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="All School Types" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="government">Government</SelectItem>
                        <SelectItem value="aided">Government Aided</SelectItem>
                        <SelectItem value="zp">Zilla Parishad</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Salary Range</Label>
                    <Select value={selectedSalary} onValueChange={setSelectedSalary}>
                      <SelectTrigger>
                        <SelectValue placeholder="Any Salary" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Any Salary</SelectItem>
                        <SelectItem value="25-35">₹25,000 - ₹35,000</SelectItem>
                        <SelectItem value="35-45">₹35,000 - ₹45,000</SelectItem>
                        <SelectItem value="45+">₹45,000+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground">
          Showing {filteredJobs.length} of {jobs.length} jobs
        </p>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-52">
            <SelectValue placeholder="Sort by Relevance" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="relevance">Sort by Match Score</SelectItem>
            <SelectItem value="date">Sort by Date Posted</SelectItem>
            <SelectItem value="salary">Sort by Salary</SelectItem>
            <SelectItem value="match">Sort by Best Match</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Job Listings */}
      <div className="space-y-6">
        {filteredJobs.map((job) => (
          <Card key={job.id} className={`group border-0 shadow-soft bg-gradient-card hover:shadow-elegant transition-all duration-300 ${job.featured ? 'ring-2 ring-primary/30 shadow-glow' : ''}`}>
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                <div className="flex-1 space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center flex-wrap gap-3">
                        <Dialog>
                          <DialogTrigger asChild>
                            <h3 className="text-xl font-semibold hover:text-primary cursor-pointer transition-colors group-hover:text-primary">
                              {job.title}
                            </h3>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle className="text-2xl">{job.title}</DialogTitle>
                              <DialogDescription className="text-base">
                                {job.school} • {job.location}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-6">
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label className="text-sm font-medium">Salary</Label>
                                  <p className="text-lg font-semibold text-primary">{job.salary}</p>
                                </div>
                                <div className="space-y-2">
                                  <Label className="text-sm font-medium">Experience Required</Label>
                                  <p>{job.experience}</p>
                                </div>
                                <div className="space-y-2">
                                  <Label className="text-sm font-medium">Application Deadline</Label>
                                  <p className="text-red-600 font-medium">{job.deadline}</p>
                                </div>
                                <div className="space-y-2">
                                  <Label className="text-sm font-medium">Job Type</Label>
                                  <p>{job.type}</p>
                                </div>
                              </div>
                              
                              <Separator />
                              
                              <div className="space-y-3">
                                <Label className="text-sm font-medium">Job Description</Label>
                                <p className="text-muted-foreground leading-relaxed">{job.description}</p>
                              </div>
                              
                              <div className="space-y-3">
                                <Label className="text-sm font-medium">Requirements</Label>
                                <ul className="space-y-2">
                                  {job.requirements.map((req, index) => (
                                    <li key={index} className="flex items-center text-sm">
                                      <CheckCircle className="w-4 h-4 mr-2 text-primary" />
                                      {req}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              
                              <div className="flex space-x-3 pt-4">
                                <Button className="flex-1">
                                  Apply Now
                                </Button>
                                <Button 
                                  variant="outline" 
                                  onClick={() => toggleSaveJob(job.id)}
                                  className={savedJobs.includes(job.id) ? "text-red-600 border-red-600" : ""}
                                >
                                  <Heart className={`w-4 h-4 mr-2 ${savedJobs.includes(job.id) ? "fill-current" : ""}`} />
                                  {savedJobs.includes(job.id) ? "Saved" : "Save"}
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        
                        {job.featured && (
                          <Badge className="bg-gradient-primary text-white shadow-sm">
                            <Award className="w-3 h-3 mr-1" />
                            Featured
                          </Badge>
                        )}
                        
                        <div className="flex items-center space-x-1 px-2 py-1 bg-warning/10 text-warning rounded-full text-sm font-medium">
                          <Star className="w-4 h-4 fill-current" />
                          <span>{job.matchScore}% match</span>
                        </div>
                      </div>
                      
                      <p className="text-muted-foreground font-medium flex items-center">
                        <Building2 className="w-4 h-4 mr-2" />
                        {job.school}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center text-sm">
                      <MapPin className="w-4 h-4 mr-2 text-primary" />
                      <div>
                        <p className="font-medium">{job.location}</p>
                        <p className="text-xs text-muted-foreground">{job.district}</p>
                      </div>
                    </div>
                    <div className="flex items-center text-sm">
                      <DollarSign className="w-4 h-4 mr-2 text-green-600" />
                      <div>
                        <p className="font-medium">{job.salary}</p>
                        <p className="text-xs text-muted-foreground">Per month</p>
                      </div>
                    </div>
                    <div className="flex items-center text-sm">
                      <Clock className="w-4 h-4 mr-2 text-blue-600" />
                      <div>
                        <p className="font-medium">{job.experience}</p>
                        <p className="text-xs text-muted-foreground">Required</p>
                      </div>
                    </div>
                    <div className="flex items-center text-sm">
                      <Calendar className="w-4 h-4 mr-2 text-red-600" />
                      <div>
                        <p className="font-medium">{job.deadline}</p>
                        <p className="text-xs text-muted-foreground">Deadline</p>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {job.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-primary/10 text-primary border-primary/20">
                      {job.subject}
                    </Badge>
                    {job.requirements.slice(0, 2).map((req, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {req}
                      </Badge>
                    ))}
                    {job.requirements.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{job.requirements.length - 2} more
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-6 text-xs text-muted-foreground">
                      <div className="flex items-center">
                        <Eye className="w-3 h-3 mr-1" />
                        {job.views} views
                      </div>
                      <div className="flex items-center">
                        <Users className="w-3 h-3 mr-1" />
                        {job.applicants} applicants
                      </div>
                      <span>Posted {job.posted}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {new Date(job.deadline) < new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) && (
                        <Badge variant="destructive" className="text-xs">
                          <AlertCircle className="w-3 h-3 mr-1" />
                          Closing Soon
                        </Badge>
                      )}
                      <Badge variant="outline" className="text-xs">
                        {job.type}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col space-y-3 lg:min-w-[140px]">
                  <Button className="w-full group/btn">
                    Apply Now
                    <ExternalLink className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full" 
                    onClick={() => toggleSaveJob(job.id)}
                  >
                    <Heart className={`w-4 h-4 mr-2 ${savedJobs.includes(job.id) ? "fill-current text-red-600" : ""}`} />
                    {savedJobs.includes(job.id) ? "Saved" : "Save"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {filteredJobs.length === 0 && (
          <Card className="border-0 shadow-soft bg-gradient-card">
            <CardContent className="p-12 text-center">
              <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No jobs found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search criteria or filters to find more opportunities.
              </p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchQuery("")
                  setSelectedDistrict("")
                  setSelectedSubject("")
                  setSelectedExperience("")
                  setSelectedSalary("")
                }}
              >
                Clear all filters
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Load More */}
      <div className="text-center">
        <Button variant="outline" size="lg">
          Load More Jobs
        </Button>
      </div>
    </div>
  )
}

export default Jobs