import { useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { Eye, EyeOff, Shield, ArrowLeft, User, Building2, Shield as AdminIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const Register = () => {
  const [searchParams] = useSearchParams()
  const defaultRole = searchParams.get("role") || "candidate"
  
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [activeTab, setActiveTab] = useState(defaultRole)
  
  const [candidateData, setCandidateData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    rollNo: "",
    district: ""
  })

  const [schoolData, setSchoolData] = useState({
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

  const handleCandidateSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Candidate registration:", candidateData)
  }

  const handleSchoolSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("School registration:", schoolData)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/5 to-primary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
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
            <CardTitle className="text-2xl">Create Your Account</CardTitle>
            <CardDescription>
              Join the TeachMate platform today
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="candidate" className="flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  Teacher
                </TabsTrigger>
                <TabsTrigger value="school" className="flex items-center">
                  <Building2 className="w-4 h-4 mr-2" />
                  School
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
                        value={candidateData.firstName}
                        onChange={(e) => setCandidateData(prev => ({ ...prev, firstName: e.target.value }))}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        placeholder="Enter last name"
                        value={candidateData.lastName}
                        onChange={(e) => setCandidateData(prev => ({ ...prev, lastName: e.target.value }))}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="rollNo">Teacher ID</Label>
                    <Input
                      id="rollNo"
                      placeholder="Enter your teacher ID"
                      value={candidateData.rollNo}
                      onChange={(e) => setCandidateData(prev => ({ ...prev, rollNo: e.target.value }))}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter email"
                        value={candidateData.email}
                        onChange={(e) => setCandidateData(prev => ({ ...prev, email: e.target.value }))}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        placeholder="Enter phone number"
                        value={candidateData.phone}
                        onChange={(e) => setCandidateData(prev => ({ ...prev, phone: e.target.value }))}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="district">District</Label>
                    <Select value={candidateData.district} onValueChange={(value) => setCandidateData(prev => ({ ...prev, district: value }))}>
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

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Create password"
                          value={candidateData.password}
                          onChange={(e) => setCandidateData(prev => ({ ...prev, password: e.target.value }))}
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
                          placeholder="Confirm password"
                          value={candidateData.confirmPassword}
                          onChange={(e) => setCandidateData(prev => ({ ...prev, confirmPassword: e.target.value }))}
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
                  </div>

                  <Button type="submit" className="w-full bg-gradient-primary hover:opacity-90 text-white shadow-soft">
                    Create Teacher Account
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
                      value={schoolData.schoolName}
                      onChange={(e) => setSchoolData(prev => ({ ...prev, schoolName: e.target.value }))}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contactPerson">Contact Person</Label>
                    <Input
                      id="contactPerson"
                      placeholder="Principal/Head Teacher name"
                      value={schoolData.contactPerson}
                      onChange={(e) => setSchoolData(prev => ({ ...prev, contactPerson: e.target.value }))}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="schoolEmail">Email Address</Label>
                      <Input
                        id="schoolEmail"
                        type="email"
                        placeholder="Enter email"
                        value={schoolData.email}
                        onChange={(e) => setSchoolData(prev => ({ ...prev, email: e.target.value }))}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="schoolPhone">Phone Number</Label>
                      <Input
                        id="schoolPhone"
                        placeholder="Enter phone number"
                        value={schoolData.phone}
                        onChange={(e) => setSchoolData(prev => ({ ...prev, phone: e.target.value }))}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="schoolDistrict">District</Label>
                      <Select value={schoolData.district} onValueChange={(value) => setSchoolData(prev => ({ ...prev, district: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select district" />
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
                      <Select value={schoolData.schoolType} onValueChange={(value) => setSchoolData(prev => ({ ...prev, schoolType: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="primary">Primary School</SelectItem>
                          <SelectItem value="secondary">Secondary School</SelectItem>
                          <SelectItem value="higher-secondary">Higher Secondary</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="schoolPassword">Password</Label>
                      <div className="relative">
                        <Input
                          id="schoolPassword"
                          type={showPassword ? "text" : "password"}
                          placeholder="Create password"
                          value={schoolData.password}
                          onChange={(e) => setSchoolData(prev => ({ ...prev, password: e.target.value }))}
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
                          placeholder="Confirm password"
                          value={schoolData.confirmPassword}
                          onChange={(e) => setSchoolData(prev => ({ ...prev, confirmPassword: e.target.value }))}
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
                  </div>

                  <Button type="submit" className="w-full bg-gradient-primary hover:opacity-90 text-white shadow-soft">
                    Create School Account
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