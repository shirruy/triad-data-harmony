import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Attempting login with email:", email);
    await signIn(email, password);
  };

  return (
    <Card className="w-full transform transition-all duration-500 hover:shadow-xl">
      <CardHeader className="space-y-2 animate-fade-in">
        <CardTitle className="text-2xl font-bold text-center">Welcome Back</CardTitle>
        <p className="text-muted-foreground text-center text-sm">Enter your credentials to continue</p>
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
          <Button 
            type="submit" 
            className="w-full animate-fade-in transform hover:scale-105 transition-all duration-300"
            style={{ animationDelay: '300ms' }}
          >
            Sign In
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};