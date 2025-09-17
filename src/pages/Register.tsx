import { useState, useEffect } from "react"
import { Link, useSearchParams, useNavigate } from "react-router-dom"
import { Eye, EyeOff, ArrowLeft, User, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/contexts/AuthContext"
import { useToast } from "@/hooks/use-toast"

const Register = () => {
  const [searchParams] = useSearchParams()
  const defaultRole = searchParams.get("role") || "candidate"
  
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [activeTab, setActiveTab] = useState(defaultRole)
  const [isLoading, setIsLoading] = useState(false)
  
  const { signUp, user } = useAuth()
  const { toast } = useToast()
  const navigate = useNavigate()

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/dashboard')
    }
  }, [user, navigate])
  
  const [candidateForm, setCandidateForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    district: ""
  })

  const [schoolForm, setSchoolForm] = useState({
    schoolName: "",
    contactPerson: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    district: "",
    schoolType: ""
  })

  const districts = [
    "Central", "North", "South", "East", "West", 
    "Northeast", "Southeast", "Southwest", "Northwest"
  ]

  const validateForm = (form: any, isSchool: boolean = false) => {
    if (isSchool) {
      if (!form.schoolName || !form.contactPerson || !form.email || !form.phone || !form.password || !form.confirmPassword || !form.district || !form.schoolType) {
        toast({
          title: "Missing Information",
          description: "Please fill in all required fields.",
          variant: "destructive"
        })
        return false
      }
    } else {
      if (!form.firstName || !form.lastName || !form.email || !form.phone || !form.password || !form.confirmPassword || !form.district) {
        toast({
          title: "Missing Information",
          description: "Please fill in all required fields.",
          variant: "destructive"
        })
        return false
      }
    }

    if (form.password !== form.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match. Please try again.",
        variant: "destructive"
      })
      return false
    }

    if (form.password.length < 6) {
      toast({
        title: "Password Too Short",
        description: "Password must be at least 6 characters long.",
        variant: "destructive"
      })
      return false
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(form.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive"
      })
      return false
    }

    return true
  }

  const handleCandidateSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm(candidateForm)) return

    setIsLoading(true)
    try {
      const metadata = {
        full_name: `${candidateForm.firstName} ${candidateForm.lastName}`,
        phone: candidateForm.phone,
        district: candidateForm.district,
        role: 'candidate'
      }

      const { error } = await signUp(candidateForm.email, candidateForm.password, metadata)
      
      if (error) {
        if (error.message.includes('User already registered')) {
          toast({
            title: "Account Exists",
            description: "An account with this email already exists. Try signing in instead.",
            variant: "destructive"
          })
        } else {
          toast({
            title: "Registration Failed",
            description: error.message || "An unexpected error occurred.",
            variant: "destructive"
          })
        }
      } else {
        toast({
          title: "Registration Successful!",
          description: "Please check your email to verify your account.",
        })
        navigate(`/verify-otp?email=${encodeURIComponent(candidateForm.email)}&type=signup`)
      }
    } catch (error) {
      toast({
        title: "Registration Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSchoolSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm(schoolForm, true)) return

    setIsLoading(true)
    try {
      const metadata = {
        full_name: schoolForm.contactPerson,
        phone: schoolForm.phone,
        district: schoolForm.district,
        school_name: schoolForm.schoolName,
        school_type: schoolForm.schoolType,
        role: 'school'
      }

      const { error } = await signUp(schoolForm.email, schoolForm.password, metadata)
      
      if (error) {
        if (error.message.includes('User already registered')) {
          toast({
            title: "Account Exists",
            description: "An account with this email already exists. Try signing in instead.",
            variant: "destructive"
          })
        } else {
          toast({
            title: "Registration Failed",
            description: error.message || "An unexpected error occurred.",
            variant: "destructive"
          })
        }
      } else {
        toast({
          title: "Registration Successful!",
          description: "Please check your email to verify your account.",
        })
        navigate(`/verify-otp?email=${encodeURIComponent(schoolForm.email)}&type=signup`)
      }
    } catch (error) {
      toast({
        title: "Registration Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/5 to-primary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
              <img src="/lovable-uploads/9873b002-0147-47db-b92b-843cd0d00bd2.png" alt="TeachMate Logo" className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">TeachMate</h1>
            </div>
          </div>
        </div>

        <Card className="shadow-medium border-0 bg-gradient-card">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl">Create Account</CardTitle>
            <CardDescription>
              Join the TeachMate platform today and connect with opportunities
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="candidate" className="flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span>Teacher</span>
                </TabsTrigger>
                <TabsTrigger value="school" className="flex items-center space-x-2">
                  <Building2 className="w-4 h-4" />
                  <span>School</span>
                </TabsTrigger>
              </TabsList>

              {/* Teacher Registration */}
              <TabsContent value="candidate">
                <form onSubmit={handleCandidateSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        placeholder="Enter first name"
                        value={candidateForm.firstName}
                        onChange={(e) => setCandidateForm(prev => ({ ...prev, firstName: e.target.value }))}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        placeholder="Enter last name"
                        value={candidateForm.lastName}
                        onChange={(e) => setCandidateForm(prev => ({ ...prev, lastName: e.target.value }))}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={candidateForm.email}
                      onChange={(e) => setCandidateForm(prev => ({ ...prev, email: e.target.value }))}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      value={candidateForm.phone}
                      onChange={(e) => setCandidateForm(prev => ({ ...prev, phone: e.target.value }))}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="district">District</Label>
                    <Select value={candidateForm.district} onValueChange={(value) => setCandidateForm(prev => ({ ...prev, district: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your district" />
                      </SelectTrigger>
                      <SelectContent>
                        {districts.map((district) => (
                          <SelectItem key={district} value={district}>{district}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a password"
                        value={candidateForm.password}
                        onChange={(e) => setCandidateForm(prev => ({ ...prev, password: e.target.value }))}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        value={candidateForm.confirmPassword}
                        onChange={(e) => setCandidateForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-primary hover:opacity-90 text-white shadow-soft"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <User className="w-4 h-4 mr-2 animate-spin" />
                        Creating Account...
                      </>
                    ) : (
                      'Create Teacher Account'
                    )}
                  </Button>
                </form>
              </TabsContent>

              {/* School Registration */}
              <TabsContent value="school">
                <form onSubmit={handleSchoolSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="schoolName">School Name</Label>
                    <Input
                      id="schoolName"
                      placeholder="Enter school name"
                      value={schoolForm.schoolName}
                      onChange={(e) => setSchoolForm(prev => ({ ...prev, schoolName: e.target.value }))}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contactPerson">Contact Person</Label>
                    <Input
                      id="contactPerson"
                      placeholder="Enter contact person name"
                      value={schoolForm.contactPerson}
                      onChange={(e) => setSchoolForm(prev => ({ ...prev, contactPerson: e.target.value }))}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="schoolEmail">Email Address</Label>
                    <Input
                      id="schoolEmail"
                      type="email"
                      placeholder="Enter school email"
                      value={schoolForm.email}
                      onChange={(e) => setSchoolForm(prev => ({ ...prev, email: e.target.value }))}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="schoolPhone">Phone Number</Label>
                    <Input
                      id="schoolPhone"
                      type="tel"
                      placeholder="Enter school phone number"
                      value={schoolForm.phone}
                      onChange={(e) => setSchoolForm(prev => ({ ...prev, phone: e.target.value }))}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="schoolDistrict">District</Label>
                    <Select value={schoolForm.district} onValueChange={(value) => setSchoolForm(prev => ({ ...prev, district: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select school district" />
                      </SelectTrigger>
                      <SelectContent>
                        {districts.map((district) => (
                          <SelectItem key={district} value={district}>{district}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="schoolType">School Type</Label>
                    <Select value={schoolForm.schoolType} onValueChange={(value) => setSchoolForm(prev => ({ ...prev, schoolType: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select school type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public">Public School</SelectItem>
                        <SelectItem value="private">Private School</SelectItem>
                        <SelectItem value="charter">Charter School</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="schoolPassword">Password</Label>
                    <div className="relative">
                      <Input
                        id="schoolPassword"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a password"
                        value={schoolForm.password}
                        onChange={(e) => setSchoolForm(prev => ({ ...prev, password: e.target.value }))}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="schoolConfirmPassword">Confirm Password</Label>
                    <div className="relative">
                      <Input
                        id="schoolConfirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        value={schoolForm.confirmPassword}
                        onChange={(e) => setSchoolForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-primary hover:opacity-90 text-white shadow-soft"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Building2 className="w-4 h-4 mr-2 animate-spin" />
                        Creating Account...
                      </>
                    ) : (
                      'Create School Account'
                    )}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link to="/login" className="text-primary hover:underline font-medium">
                  Sign In
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center text-xs text-muted-foreground">
          By creating an account, you agree to our Terms of Service and Privacy Policy
        </div>
      </div>
    </div>
  )
}

export default Register