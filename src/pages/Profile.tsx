import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { 
  User, 
  GraduationCap, 
  Briefcase, 
  Award, 
  Plus,
  Edit,
  Save,
  X
} from "lucide-react"

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false)

  // Mock data - will be replaced with real data later
  const [profileData, setProfileData] = useState({
    personal: {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@email.com",
      phone: "+91 9876543210",
      rollNo: "DSC2024001",
      district: "Guntur",
      address: "123 Main Street, Guntur, Andhra Pradesh",
      dateOfBirth: "1990-05-15",
      category: "General"
    },
    education: [
      {
        degree: "Master of Science",
        subject: "Mathematics",
        institution: "Andhra University",
        year: "2015",
        percentage: "85%"
      },
      {
        degree: "Bachelor of Science", 
        subject: "Mathematics",
        institution: "Government College, Guntur",
        year: "2013",
        percentage: "78%"
      }
    ],
    experience: [
      {
        position: "Mathematics Teacher",
        school: "Private High School, Guntur",
        duration: "2018 - 2023",
        description: "Taught mathematics to high school students, developed curriculum, managed student assessments."
      }
    ],
    skills: ["Mathematics", "Physics", "Computer Applications", "English", "Telugu"],
    certifications: [
      {
        name: "Teaching Excellence Certificate",
        issuer: "AP State Education Board",
        year: "2022"
      }
    ]
  })

  const districts = [
    "Anantapur", "Chittoor", "East Godavari", "Guntur", "Krishna", 
    "Kurnool", "Nellore", "Prakasam", "Srikakulam", "Visakhapatnam", 
    "Vizianagaram", "West Godavari", "YSR Kadapa"
  ]

  const categories = ["General", "OBC", "SC", "ST", "EWS"]

  const subjects = [
    "Mathematics", "Physics", "Chemistry", "Biology", "English", 
    "Telugu", "Hindi", "Social Studies", "Computer Science", "Commerce"
  ]

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Profile</h1>
          <p className="text-muted-foreground">Manage your personal information and qualifications</p>
        </div>
        <div className="flex space-x-2">
          {isEditing ? (
            <>
              <Button onClick={() => setIsEditing(false)} variant="outline">
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
              <Button>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)}>
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          )}
        </div>
      </div>

      <Tabs defaultValue="personal" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="personal" className="flex items-center">
            <User className="w-4 h-4 mr-2" />
            Personal
          </TabsTrigger>
          <TabsTrigger value="education" className="flex items-center">
            <GraduationCap className="w-4 h-4 mr-2" />
            Education
          </TabsTrigger>
          <TabsTrigger value="experience" className="flex items-center">
            <Briefcase className="w-4 h-4 mr-2" />
            Experience
          </TabsTrigger>
          <TabsTrigger value="skills" className="flex items-center">
            <Award className="w-4 h-4 mr-2" />
            Skills & Certs
          </TabsTrigger>
        </TabsList>

        {/* Personal Information */}
        <TabsContent value="personal">
          <Card className="border-0 shadow-soft bg-gradient-card">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Basic details and contact information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={profileData.personal.firstName}
                    disabled={!isEditing}
                    onChange={(e) => setProfileData(prev => ({
                      ...prev,
                      personal: { ...prev.personal, firstName: e.target.value }
                    }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={profileData.personal.lastName}
                    disabled={!isEditing}
                    onChange={(e) => setProfileData(prev => ({
                      ...prev,
                      personal: { ...prev.personal, lastName: e.target.value }
                    }))}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.personal.email}
                    disabled={!isEditing}
                    onChange={(e) => setProfileData(prev => ({
                      ...prev,
                      personal: { ...prev.personal, email: e.target.value }
                    }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={profileData.personal.phone}
                    disabled={!isEditing}
                    onChange={(e) => setProfileData(prev => ({
                      ...prev,
                      personal: { ...prev.personal, phone: e.target.value }
                    }))}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="rollNo">DSC Roll Number</Label>
                  <Input
                    id="rollNo"
                    value={profileData.personal.rollNo}
                    disabled={!isEditing}
                    onChange={(e) => setProfileData(prev => ({
                      ...prev,
                      personal: { ...prev.personal, rollNo: e.target.value }
                    }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="district">District</Label>
                  <Select disabled={!isEditing} value={profileData.personal.district}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {districts.map((district) => (
                        <SelectItem key={district} value={district}>{district}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select disabled={!isEditing} value={profileData.personal.category}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  value={profileData.personal.address}
                  disabled={!isEditing}
                  onChange={(e) => setProfileData(prev => ({
                    ...prev,
                    personal: { ...prev.personal, address: e.target.value }
                  }))}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Education */}
        <TabsContent value="education">
          <Card className="border-0 shadow-soft bg-gradient-card">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Educational Qualifications</CardTitle>
                <CardDescription>Your academic background and achievements</CardDescription>
              </div>
              {isEditing && (
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Education
                </Button>
              )}
            </CardHeader>
            <CardContent className="space-y-6">
              {profileData.education.map((edu, index) => (
                <div key={index} className="p-4 rounded-lg border bg-card/50">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Degree</Label>
                      <Input value={edu.degree} disabled={!isEditing} />
                    </div>
                    <div className="space-y-2">
                      <Label>Subject/Specialization</Label>
                      <Input value={edu.subject} disabled={!isEditing} />
                    </div>
                    <div className="space-y-2">
                      <Label>Institution</Label>
                      <Input value={edu.institution} disabled={!isEditing} />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-2">
                        <Label>Year</Label>
                        <Input value={edu.year} disabled={!isEditing} />
                      </div>
                      <div className="space-y-2">
                        <Label>Percentage</Label>
                        <Input value={edu.percentage} disabled={!isEditing} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Experience */}
        <TabsContent value="experience">
          <Card className="border-0 shadow-soft bg-gradient-card">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Work Experience</CardTitle>
                <CardDescription>Your professional teaching experience</CardDescription>
              </div>
              {isEditing && (
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Experience
                </Button>
              )}
            </CardHeader>
            <CardContent className="space-y-6">
              {profileData.experience.map((exp, index) => (
                <div key={index} className="p-4 rounded-lg border bg-card/50">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2">
                      <Label>Position</Label>
                      <Input value={exp.position} disabled={!isEditing} />
                    </div>
                    <div className="space-y-2">
                      <Label>School/Institution</Label>
                      <Input value={exp.school} disabled={!isEditing} />
                    </div>
                    <div className="space-y-2">
                      <Label>Duration</Label>
                      <Input value={exp.duration} disabled={!isEditing} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea value={exp.description} disabled={!isEditing} />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Skills & Certifications */}
        <TabsContent value="skills">
          <div className="space-y-6">
            <Card className="border-0 shadow-soft bg-gradient-card">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Skills & Subjects</CardTitle>
                  <CardDescription>Subjects you can teach and technical skills</CardDescription>
                </div>
                {isEditing && (
                  <Button size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Skill
                  </Button>
                )}
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {profileData.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="text-sm">
                      {skill}
                      {isEditing && (
                        <X className="w-3 h-3 ml-2 cursor-pointer hover:text-destructive" />
                      )}
                    </Badge>
                  ))}
                </div>
                {isEditing && (
                  <div className="mt-4">
                    <Select>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select subjects to add" />
                      </SelectTrigger>
                      <SelectContent>
                        {subjects.map((subject) => (
                          <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="border-0 shadow-soft bg-gradient-card">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Certifications</CardTitle>
                  <CardDescription>Professional certifications and awards</CardDescription>
                </div>
                {isEditing && (
                  <Button size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Certification
                  </Button>
                )}
              </CardHeader>
              <CardContent className="space-y-4">
                {profileData.certifications.map((cert, index) => (
                  <div key={index} className="p-4 rounded-lg border bg-card/50">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label>Certification Name</Label>
                        <Input value={cert.name} disabled={!isEditing} />
                      </div>
                      <div className="space-y-2">
                        <Label>Issuing Authority</Label>
                        <Input value={cert.issuer} disabled={!isEditing} />
                      </div>
                      <div className="space-y-2">
                        <Label>Year</Label>
                        <Input value={cert.year} disabled={!isEditing} />
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Profile