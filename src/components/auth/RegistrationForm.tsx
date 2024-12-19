import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/lib/auth/types";
import { useToast } from "@/hooks/use-toast";
import { validateRegistrationKey } from "@/lib/auth/validators";
import { AUTH_ERRORS } from "@/lib/auth/constants";
import { RegistrationFormFields } from "./RegistrationFormFields";

export const RegistrationForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (formData: {
    email: string;
    password: string;
    role: UserRole;
    registrationKey: string;
  }) => {
    const { email, password, role, registrationKey } = formData;

    if (password.length < 6) {
      toast({
        variant: "destructive",
        title: "Invalid Password",
        description: "Password must be at least 6 characters long",
      });
      return;
    }

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
        <RegistrationFormFields onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      </CardContent>
    </Card>
  );
};