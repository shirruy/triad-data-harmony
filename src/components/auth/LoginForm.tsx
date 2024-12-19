import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";

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
    } finally {
      setIsSubmitting(false);
    }
  };

  const formFields = [
    {
      id: "email",
      label: "Email",
      type: "email",
      value: email,
      onChange: setEmail,
      delay: 100,
    },
    {
      id: "password",
      label: "Password",
      type: "password",
      value: password,
      onChange: setPassword,
      delay: 200,
    },
  ];

  return (
    <Card className="w-full transform transition-all duration-500 hover:shadow-xl">
      <CardHeader className="space-y-2">
        <CardTitle className="text-2xl font-bold text-center">Welcome Back</CardTitle>
        <p className="text-muted-foreground text-center text-sm">Sign in to your account</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {formFields.map(({ id, label, type, value, onChange, delay }) => (
            <motion.div
              key={id}
              className="space-y-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: delay * 0.001 }}
            >
              <label htmlFor={id} className="text-sm font-medium">
                {label}
              </label>
              <Input
                id={id}
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                required
                disabled={isSubmitting}
                className="transform transition-all duration-300 hover:shadow-md focus:shadow-lg"
              />
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Button 
              type="submit" 
              className="w-full transform hover:scale-105 transition-all duration-300"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Signing in..." : "Sign In"}
            </Button>
          </motion.div>
        </form>
      </CardContent>
    </Card>
  );
};