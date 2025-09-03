import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
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
  Clock
} from "lucide-react"

const Jobs = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDistrict, setSelectedDistrict] = useState("")
  const [selectedSubject, setSelectedSubject] = useState("")
  const [showFilters, setShowFilters] = useState(false)

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
    
    return matchesSearch && matchesDistrict && matchesSubject
  })

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Job Opportunities</h1>
          <p className="text-muted-foreground">Find teaching positions across Andhra Pradesh</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={() => setShowFilters(!showFilters)}>
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
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
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Any Experience" />
                      </SelectTrigger>
                      <SelectContent>
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
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Any Salary" />
                      </SelectTrigger>
                      <SelectContent>
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
        <Select>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Sort by Relevance" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="relevance">Sort by Relevance</SelectItem>
            <SelectItem value="date">Sort by Date</SelectItem>
            <SelectItem value="salary">Sort by Salary</SelectItem>
            <SelectItem value="location">Sort by Location</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Job Listings */}
      <div className="space-y-4">
        {filteredJobs.map((job) => (
          <Card key={job.id} className={`border-0 shadow-soft bg-gradient-card hover:shadow-medium transition-all duration-300 ${job.featured ? 'ring-2 ring-primary/20' : ''}`}>
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                <div className="flex-1 space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="text-xl font-semibold hover:text-primary cursor-pointer">
                          {job.title}
                        </h3>
                        {job.featured && (
                          <Badge className="bg-gradient-primary text-white">Featured</Badge>
                        )}
                        <div className="flex items-center space-x-1 text-warning">
                          <Star className="w-4 h-4 fill-current" />
                          <span className="text-sm font-medium">{job.matchScore}% match</span>
                        </div>
                      </div>
                      <p className="text-muted-foreground font-medium">{job.school}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {job.location}
                    </div>
                    <div className="flex items-center">
                      <DollarSign className="w-4 h-4 mr-1" />
                      {job.salary}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {job.experience}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      Deadline: {job.deadline}
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {job.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {job.requirements.slice(0, 3).map((req, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {req}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <div className="flex items-center">
                      <Eye className="w-3 h-3 mr-1" />
                      {job.views} views
                    </div>
                    <div className="flex items-center">
                      <Building2 className="w-3 h-3 mr-1" />
                      {job.applicants} applicants
                    </div>
                    <span>Posted {job.posted}</span>
                  </div>
                </div>

                <div className="flex flex-col space-y-2 lg:min-w-[120px]">
                  <Button className="w-full">
                    Apply Now
                  </Button>
                  <Button variant="outline" size="sm" className="w-full">
                    <BookmarkPlus className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
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