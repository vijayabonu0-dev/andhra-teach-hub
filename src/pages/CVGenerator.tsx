import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { 
  FileText,
  Download,
  Eye,
  Settings,
  CheckCircle,
  User,
  GraduationCap,
  Briefcase,
  Award,
  Palette,
  Layout
} from "lucide-react"

const CVGenerator = () => {
  const [selectedTemplate, setSelectedTemplate] = useState("modern")
  const [isGenerating, setIsGenerating] = useState(false)

  // Mock data - will be fetched from user profile
  const profileCompleteness = {
    personal: { completed: true, weight: 20 },
    education: { completed: true, weight: 25 },
    experience: { completed: true, weight: 30 },
    skills: { completed: false, weight: 15 },
    certifications: { completed: true, weight: 10 }
  }

  const completionPercentage = Object.values(profileCompleteness)
    .reduce((acc, section) => acc + (section.completed ? section.weight : 0), 0)

  const templates = [
    {
      id: "modern",
      name: "Modern Professional",
      description: "Clean and contemporary design perfect for government positions",
      preview: "/api/placeholder/300/400",
      color: "blue",
      features: ["ATS Friendly", "Clean Layout", "Professional Typography"]
    },
    {
      id: "academic",
      name: "Academic Excellence",
      description: "Traditional academic format highlighting education and research",
      preview: "/api/placeholder/300/400",
      color: "green",
      features: ["Education Focus", "Research Sections", "Publication Ready"]
    },
    {
      id: "creative",
      name: "Creative Educator",
      description: "Vibrant design for creative subjects and innovative teaching",
      preview: "/api/placeholder/300/400",
      color: "purple",
      features: ["Visual Appeal", "Color Accents", "Modern Design"]
    }
  ]

  const sections = [
    { id: "personal", name: "Personal Information", icon: User, required: true },
    { id: "education", name: "Educational Qualifications", icon: GraduationCap, required: true },
    { id: "experience", name: "Teaching Experience", icon: Briefcase, required: true },
    { id: "skills", name: "Skills & Subjects", icon: Award, required: false },
    { id: "certifications", name: "Certifications", icon: Award, required: false }
  ]

  const handleGenerateCV = () => {
    setIsGenerating(true)
    // Simulate CV generation process
    setTimeout(() => {
      setIsGenerating(false)
      // In real implementation, this would generate and download the PDF
      console.log("CV generated successfully!")
    }, 3000)
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Professional CV Generator</h1>
        <p className="text-muted-foreground">
          Create a professional resume tailored for teaching positions in Andhra Pradesh
        </p>
      </div>

      {/* Profile Completeness Check */}
      <Card className="border-0 shadow-soft bg-gradient-card">
        <CardHeader>
          <CardTitle className="flex items-center">
            <CheckCircle className="w-5 h-5 mr-2 text-success" />
            Profile Readiness
          </CardTitle>
          <CardDescription>
            Complete your profile to generate the best possible CV
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Profile Completion</span>
            <span className="text-sm font-bold">{completionPercentage}%</span>
          </div>
          <Progress value={completionPercentage} className="h-3" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {sections.map((section) => {
              const sectionData = profileCompleteness[section.id as keyof typeof profileCompleteness]
              return (
                <div key={section.id} className="flex items-center space-x-2">
                  <div className={`p-2 rounded-full ${sectionData?.completed ? 'bg-success/20 text-success' : 'bg-muted text-muted-foreground'}`}>
                    <section.icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{section.name}</p>
                    <Badge 
                      variant={sectionData?.completed ? "default" : "secondary"}
                      className="text-xs"
                    >
                      {sectionData?.completed ? "Complete" : "Pending"}
                    </Badge>
                  </div>
                </div>
              )
            })}
          </div>

          {completionPercentage < 80 && (
            <div className="p-4 bg-warning/10 rounded-lg border border-warning/20">
              <p className="text-sm text-warning-foreground">
                <strong>Tip:</strong> Complete at least 80% of your profile sections to generate a comprehensive CV.
                Missing sections may result in incomplete resume content.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Template Selection */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-0 shadow-soft bg-gradient-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Layout className="w-5 h-5 mr-2" />
                Choose Template
              </CardTitle>
              <CardDescription>
                Select a template that best represents your professional style
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
                {templates.map((template) => (
                  <div 
                    key={template.id}
                    className={`relative cursor-pointer rounded-lg border-2 transition-all hover:shadow-medium ${
                      selectedTemplate === template.id 
                        ? 'border-primary bg-primary/5' 
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => setSelectedTemplate(template.id)}
                  >
                    <div className="p-4 space-y-3">
                      <div className="aspect-[3/4] bg-muted rounded-md flex items-center justify-center">
                        <FileText className="w-8 h-8 text-muted-foreground" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="font-semibold">{template.name}</h3>
                        <p className="text-sm text-muted-foreground">{template.description}</p>
                        <div className="flex flex-wrap gap-1">
                          {template.features.map((feature, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    {selectedTemplate === template.id && (
                      <div className="absolute top-2 right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Customization Options */}
          <Card className="border-0 shadow-soft bg-gradient-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Palette className="w-5 h-5 mr-2" />
                Customization
              </CardTitle>
              <CardDescription>
                Personalize your CV appearance and content
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Color Scheme</h4>
                  <div className="flex space-x-2">
                    {['blue', 'green', 'purple', 'orange', 'red'].map((color) => (
                      <div 
                        key={color}
                        className={`w-8 h-8 rounded-full cursor-pointer border-2 ${
                          color === 'blue' ? 'bg-blue-500 border-blue-600' :
                          color === 'green' ? 'bg-green-500 border-green-600' :
                          color === 'purple' ? 'bg-purple-500 border-purple-600' :
                          color === 'orange' ? 'bg-orange-500 border-orange-600' :
                          'bg-red-500 border-red-600'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Font Style</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {['Professional', 'Modern', 'Classic'].map((font) => (
                      <Button key={font} variant="outline" size="sm">
                        {font}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Include Sections</h4>
                  <div className="space-y-2">
                    {sections.map((section) => (
                      <div key={section.id} className="flex items-center justify-between">
                        <span className="text-sm">{section.name}</span>
                        <div className="flex items-center space-x-2">
                          {section.required && (
                            <Badge variant="secondary" className="text-xs">Required</Badge>
                          )}
                          <input 
                            type="checkbox" 
                            defaultChecked={true}
                            disabled={section.required}
                            className="rounded"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Panel */}
        <div className="space-y-6">
          <Card className="border-0 shadow-soft bg-gradient-card">
            <CardHeader>
              <CardTitle>Generate Your CV</CardTitle>
              <CardDescription>
                Create and download your professional resume
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <Button 
                  className="w-full bg-gradient-primary hover:opacity-90 text-white"
                  onClick={handleGenerateCV}
                  disabled={isGenerating || completionPercentage < 60}
                >
                  {isGenerating ? (
                    <>
                      <Settings className="w-4 h-4 mr-2 animate-spin" />
                      Generating CV...
                    </>
                  ) : (
                    <>
                      <FileText className="w-4 h-4 mr-2" />
                      Generate CV
                    </>
                  )}
                </Button>

                <Button variant="outline" className="w-full" disabled={!isGenerating && completionPercentage < 60}>
                  <Eye className="w-4 h-4 mr-2" />
                  Preview CV
                </Button>

                <Button variant="outline" className="w-full" disabled>
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
              </div>

              <Separator />

              <div className="text-center space-y-2">
                <p className="text-sm text-muted-foreground">
                  Last generated: Never
                </p>
                <p className="text-xs text-muted-foreground">
                  CV will be automatically updated when you modify your profile
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Tips */}
          <Card className="border-0 shadow-soft bg-gradient-card">
            <CardHeader>
              <CardTitle className="text-lg">CV Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                  <p>Keep your CV to 1-2 pages for optimal readability</p>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                  <p>Highlight your teaching experience and student outcomes</p>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                  <p>Include relevant certifications and professional development</p>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                  <p>Use action verbs to describe your achievements</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default CVGenerator