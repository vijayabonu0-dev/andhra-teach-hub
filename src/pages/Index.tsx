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
              <img src="/lovable-uploads/9873b002-0147-47db-b92b-843cd0d00bd2.png" alt="TeachMate Logo" className="w-6 h-6" />
            </div>
            <div>
            <h1 className="text-lg font-bold gradient-text">TeachMate</h1>
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
          <Badge variant="secondary" className="mb-4 pulse-slow glass-card">
            <BookOpen className="w-4 h-4 mr-2" />
            Revolutionary Teaching Platform
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-6 float">
            TeachMate Platform
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Where passionate educators meet exceptional opportunities. Transform your teaching journey 
            with AI-powered matching, smart analytics, and seamless career management.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/register?role=candidate">
              <Button size="lg" className="glow-button bg-gradient-primary hover:opacity-90 text-white shadow-rainbow">
                Start Teaching Journey
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/register?role=school">
              <Button size="lg" variant="outline" className="glow-button border-2 hover:bg-gradient-secondary hover:text-white">
                Partner with Us
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
              <Card key={index} className="interactive-card border-0 shadow-rainbow bg-gradient-card group">
                <CardHeader className="text-center pb-2">
                  <div className={`w-12 h-12 rounded-full bg-gradient-interactive flex items-center justify-center mx-auto mb-4 text-white shadow-glow group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-xl mb-2 group-hover:gradient-text transition-all duration-300">{feature.title}</CardTitle>
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
      <section className="py-16 px-4 bg-gradient-hero text-white relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-30" 
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        ></div>
        <div className="container mx-auto text-center max-w-3xl relative">
          <h2 className="text-3xl font-bold mb-4">Transform Education with TeachMate</h2>
          <p className="text-xl opacity-90 mb-8">
            Join the future of education technology. Connect, grow, and make a lasting impact on students' lives.
          </p>
          <Link to="/register">
            <Button size="lg" className="glow-button bg-white text-primary hover:bg-white/90 shadow-rainbow">
              Begin Your Journey
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
                <img src="/lovable-uploads/9873b002-0147-47db-b92b-843cd0d00bd2.png" alt="TeachMate Logo" className="w-5 h-5" />
              </div>
              <div>
                <div className="font-semibold text-sm gradient-text">TeachMate Platform</div>
                <div className="text-xs text-muted-foreground">Bridging talent and teaching careers</div>
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              © 2025 TeachMate Platform. Revolutionizing education through technology.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Index