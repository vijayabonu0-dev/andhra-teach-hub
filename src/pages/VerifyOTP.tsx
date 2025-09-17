import { useState, useEffect } from "react"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { ArrowLeft, Shield, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { useAuth } from "@/contexts/AuthContext"
import { useToast } from "@/hooks/use-toast"

const VerifyOTP = () => {
  const [otp, setOtp] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const { verifyOtp, resendOtp } = useAuth()
  const { toast } = useToast()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  
  const email = searchParams.get('email') || ''
  const type = searchParams.get('type') || 'signup'

  useEffect(() => {
    if (!email) {
      navigate('/login')
    }
  }, [email, navigate])

  const handleVerify = async () => {
    if (otp.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter a valid 6-digit code.",
        variant: "destructive"
      })
      return
    }

    setIsVerifying(true)
    try {
      const { error } = await verifyOtp(email, otp, 'email')
      
      if (error) {
        toast({
          title: "Verification Failed",
          description: error.message || "Invalid or expired OTP code.",
          variant: "destructive"
        })
      } else {
        toast({
          title: "Email Verified",
          description: "Your email has been successfully verified!",
        })
        navigate('/dashboard')
      }
    } catch (error) {
      toast({
        title: "Verification Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsVerifying(false)
    }
  }

  const handleResend = async () => {
    setIsResending(true)
    try {
      const { error } = await resendOtp(email, type as 'signup' | 'email_change')
      
      if (error) {
        toast({
          title: "Resend Failed",
          description: error.message || "Failed to resend verification code.",
          variant: "destructive"
        })
      } else {
        toast({
          title: "Code Sent",
          description: "A new verification code has been sent to your email.",
        })
        setOtp("")
      }
    } catch (error) {
      toast({
        title: "Resend Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsResending(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/5 to-primary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/login" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Login
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
            <div className="w-16 h-16 bg-gradient-secondary rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl">Verify Your Email</CardTitle>
            <CardDescription>
              We've sent a 6-digit verification code to<br />
              <strong>{email}</strong>
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="flex flex-col items-center space-y-4">
              <InputOTP 
                maxLength={6} 
                value={otp} 
                onChange={(value) => setOtp(value)}
                disabled={isVerifying}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
              
              <p className="text-sm text-muted-foreground text-center">
                Enter the 6-digit code from your email
              </p>
            </div>

            <Button 
              onClick={handleVerify}
              className="w-full bg-gradient-primary hover:opacity-90 text-white shadow-soft"
              disabled={otp.length !== 6 || isVerifying}
            >
              {isVerifying ? (
                <>
                  <Shield className="w-4 h-4 mr-2 animate-spin" />
                  Verifying...
                </>
              ) : (
                <>
                  <Shield className="w-4 h-4 mr-2" />
                  Verify Email
                </>
              )}
            </Button>

            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">
                Didn't receive the code?
              </p>
              <Button
                variant="ghost"
                onClick={handleResend}
                disabled={isResending}
                className="text-primary hover:underline font-medium"
              >
                {isResending ? "Sending..." : "Resend Code"}
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center text-xs text-muted-foreground">
          By verifying your email, you agree to our Terms of Service and Privacy Policy
        </div>
      </div>
    </div>
  )
}

export default VerifyOTP