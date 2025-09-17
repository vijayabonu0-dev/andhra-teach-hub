import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Eye, EyeOff, Shield, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/contexts/AuthContext"
import { useToast } from "@/hooks/use-toast"

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: ""
  })
  
  const { signIn, user } = useAuth()
  const { toast } = useToast()
  const navigate = useNavigate()

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/dashboard')
    }
  }, [user, navigate])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.email || !formData.password || !formData.role) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      })
      return
    }

    setIsLoading(true)
    try {
      const { error } = await signIn(formData.email, formData.password)
      
      if (error) {
        // Handle specific error cases
        if (error.message.includes('Invalid login credentials')) {
          toast({
            title: "Login Failed",
            description: "Invalid email or password. Please check your credentials.",
            variant: "destructive"
          })
        } else if (error.message.includes('Email not confirmed')) {
          toast({
            title: "Email Not Verified",
            description: "Please check your email and verify your account before signing in.",
            variant: "destructive"
          })
          navigate(`/verify-otp?email=${encodeURIComponent(formData.email)}&type=signup`)
        } else {
          toast({
            title: "Login Error",
            description: error.message || "An unexpected error occurred.",
            variant: "destructive"
          })
        }
      } else {
        toast({
          title: "Welcome Back!",
          description: "You have successfully logged in.",
        })
        navigate('/dashboard')
      }
    } catch (error) {
      toast({
        title: "Login Error",
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
            <CardTitle className="text-2xl">Welcome Back</CardTitle>
            <CardDescription>
              Sign in to access your teacher portal account
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="role">Select Your Role</Label>
                <Select value={formData.role} onValueChange={(value) => setFormData(prev => ({ ...prev, role: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="candidate">Teacher/Candidate</SelectItem>
                    <SelectItem value="school">School Administrator</SelectItem>
                    <SelectItem value="admin">System Administrator</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <Link 
                  to="/forgot-password" 
                  className="text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-primary hover:opacity-90 text-white shadow-soft"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Shield className="w-4 h-4 mr-2 animate-spin" />
                    Signing In...
                  </>
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link to="/register" className="text-primary hover:underline font-medium">
                  Create Account
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center text-xs text-muted-foreground">
          By signing in, you agree to our Terms of Service and Privacy Policy
        </div>
      </div>
    </div>
  )
}

export default Login