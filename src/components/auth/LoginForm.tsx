import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signIn } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await signIn(email, password);
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto transform transition-all duration-500 hover:shadow-xl">
      <CardHeader className="space-y-2 animate-fade-in">
        <CardTitle className="text-2xl font-bold text-center">Welcome Back</CardTitle>
        <p className="text-muted-foreground text-center text-sm">Sign in to your account</p>
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
            />
          </div>
          <Button 
            type="submit" 
            className="w-full animate-fade-in transform hover:scale-105 transition-all duration-300"
            style={{ animationDelay: '300ms' }}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Signing in..." : "Sign In"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};