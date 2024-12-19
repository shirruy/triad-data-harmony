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
  const { register } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateRegistrationKey(role, registrationKey)) {
      toast({
        variant: "destructive",
        title: "Invalid Registration Key",
        description: AUTH_ERRORS.REGISTRATION_KEY_INVALID,
      });
      return;
    }

    await register(email, password, role);
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
              className="transform transition-all duration-300 hover:shadow-md focus:shadow-lg"
            />
          </div>
          <div className="space-y-2 animate-fade-in" style={{ animationDelay: '300ms' }}>
            <label htmlFor="role" className="text-sm font-medium">
              Role
            </label>
            <Select value={role} onValueChange={(value: UserRole) => setRole(value)}>
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
              placeholder="Enter the registration key for your role"
              className="transform transition-all duration-300 hover:shadow-md focus:shadow-lg"
            />
          </div>
          <Button 
            type="submit" 
            className="w-full animate-fade-in transform hover:scale-105 transition-all duration-300"
            style={{ animationDelay: '500ms' }}
          >
            Register
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};