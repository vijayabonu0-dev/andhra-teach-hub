import { ArrowRight, Users, Building2, Shield, BookOpen, TrendingUp, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Link } from "react-router-dom"

const Index = () => {
  const features = [
    {
      icon: Users,
      title: "For Teachers",
      description: "Create professional profiles, generate CVs, and find teaching opportunities across Andhra Pradesh.",
      color: "text-blue-600"
    },
    {
      icon: Building2,
      title: "For Schools",
      description: "Post job vacancies, search qualified candidates, and streamline your hiring process.",
      color: "text-green-600"
    },
    {
      icon: Shield,
      title: "Admin Control",
      description: "Comprehensive verification system and analytics for effective talent management.",
      color: "text-purple-600"
    }
  ]

  const stats = [
    { label: "Registered Teachers", value: "25,000+" },
    { label: "Active Schools", value: "3,500+" },
    { label: "Job Placements", value: "12,000+" },
    { label: "Districts Covered", value: "13" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/5 to-primary/5">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur supports-[backdrop-filter]:bg-card/80">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">Mega-DSC Portal</h1>
              <p className="text-xs text-muted-foreground">Government of Andhra Pradesh</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Link to="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link to="/register">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge variant="secondary" className="mb-4">
            <BookOpen className="w-4 h-4 mr-2" />
            Department of School Education
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-6">
            Mega-DSC Teacher Portal
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Connecting qualified teachers with educational opportunities across Andhra Pradesh. 
            Your gateway to a rewarding teaching career in government schools.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/register?role=candidate">
              <Button size="lg" className="bg-gradient-primary hover:opacity-90 text-white shadow-medium">
                Join as Teacher
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/register?role=school">
              <Button size="lg" variant="outline">
                Register School
                <Building2 className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-primary mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-card/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Built for Every Stakeholder</h2>
            <p className="text-lg text-muted-foreground">
              Comprehensive platform designed to serve teachers, schools, and administrators
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-soft bg-gradient-card hover:shadow-medium transition-all duration-300">
                <CardHeader className="text-center pb-2">
                  <div className={`w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4 ${feature.color}`}>
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Mega-DSC Portal?</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <CheckCircle className="w-6 h-6 text-success mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-2">Official Government Platform</h3>
                  <p className="text-muted-foreground">Verified and authorized by the Department of School Education, Government of Andhra Pradesh.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <CheckCircle className="w-6 h-6 text-success mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-2">Professional CV Generation</h3>
                  <p className="text-muted-foreground">AI-powered CV builder that creates professional resumes tailored for teaching positions.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <CheckCircle className="w-6 h-6 text-success mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-2">Smart Matching System</h3>
                  <p className="text-muted-foreground">Advanced algorithms match teachers with suitable positions based on qualifications and preferences.</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <CheckCircle className="w-6 h-6 text-success mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-2">Real-time Analytics</h3>
                  <p className="text-muted-foreground">Comprehensive dashboards with insights on talent distribution and employment trends.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <CheckCircle className="w-6 h-6 text-success mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-2">Secure & Verified</h3>
                  <p className="text-muted-foreground">Multi-level verification process ensures authenticity of all profiles and job postings.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <CheckCircle className="w-6 h-6 text-success mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-2">Mobile Responsive</h3>
                  <p className="text-muted-foreground">Access your account and apply for positions from any device, anywhere in Andhra Pradesh.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-primary text-white">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Teaching Journey?</h2>
          <p className="text-xl opacity-90 mb-8">
            Join thousands of educators who have found their perfect teaching position through our platform.
          </p>
          <Link to="/register">
            <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
              Create Your Account Today
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card py-8 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-semibold text-sm">Mega-DSC Teacher Portal</div>
                <div className="text-xs text-muted-foreground">Government of Andhra Pradesh</div>
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              © 2024 Department of School Education, AP. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Index