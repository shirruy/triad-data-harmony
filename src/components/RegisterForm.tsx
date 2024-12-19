import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserRole } from "@/lib/auth/types";
import { useToast } from "./ui/use-toast";
import { validateRegistrationKey } from "@/lib/auth/validators";
import { AUTH_ERRORS } from "@/lib/auth/constants";

export const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("operations");
  const [registrationKey, setRegistrationKey] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register } = useAuth();
  const { toast } = useToast();

  const validatePassword = (password: string) => {
    if (password.length < 6) {
      return "Password must be at least 6 characters long";
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Password validation
    const passwordError = validatePassword(password);
    if (passwordError) {
      toast({
        variant: "destructive",
        title: "Invalid Password",
        description: passwordError,
      });
      return;
    }

    // Registration key validation
    if (!validateRegistrationKey(role, registrationKey)) {
      toast({
        variant: "destructive",
        title: "Invalid Registration Key",
        description: AUTH_ERRORS.REGISTRATION_KEY_INVALID,
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await register(email, password, role);
    } catch (error: any) {
      console.error("Registration error:", error);
      toast({
        variant: "destructive",
        title: "Registration Failed",
        description: error.message || "An unexpected error occurred",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto transform transition-all duration-500 hover:shadow-xl">
      <CardHeader className="space-y-2 animate-fade-in">
        <CardTitle className="text-2xl font-bold text-center">Create Account</CardTitle>
        <p className="text-muted-foreground text-center text-sm">Join us today</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2 animate-fade-in" style={{ animationDelay: '100ms' }}>
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isSubmitting}
              className="transform transition-all duration-300 hover:shadow-md focus:shadow-lg"
            />
          </div>
          <div className="space-y-2 animate-fade-in" style={{ animationDelay: '200ms' }}>
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isSubmitting}
              className="transform transition-all duration-300 hover:shadow-md focus:shadow-lg"
              placeholder="Minimum 6 characters"
            />
          </div>
          <div className="space-y-2 animate-fade-in" style={{ animationDelay: '300ms' }}>
            <label htmlFor="role" className="text-sm font-medium">
              Role
            </label>
            <Select 
              value={role} 
              onValueChange={(value: UserRole) => setRole(value)}
              disabled={isSubmitting}
            >
              <SelectTrigger className="transform transition-all duration-300 hover:shadow-md focus:shadow-lg">
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="administrator">Administrator</SelectItem>
                <SelectItem value="analyst">Real-Time Analyst</SelectItem>
                <SelectItem value="operations">Operations Team</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2 animate-fade-in" style={{ animationDelay: '400ms' }}>
            <label htmlFor="registrationKey" className="text-sm font-medium">
              Registration Key
            </label>
            <Input
              id="registrationKey"
              type="password"
              value={registrationKey}
              onChange={(e) => setRegistrationKey(e.target.value)}
              required
              disabled={isSubmitting}
              placeholder="Enter the registration key for your role"
              className="transform transition-all duration-300 hover:shadow-md focus:shadow-lg"
            />
          </div>
          <Button 
            type="submit" 
            className="w-full animate-fade-in transform hover:scale-105 transition-all duration-300"
            style={{ animationDelay: '500ms' }}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Registering..." : "Register"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};