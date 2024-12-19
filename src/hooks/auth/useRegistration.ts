import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/lib/auth/types";
import { useToast } from "@/hooks/use-toast";
import { validateRegistrationKey } from "@/lib/auth/validators";
import { AUTH_ERRORS } from "@/lib/auth/constants";

export const useRegistration = () => {
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
    } finally {
      setIsSubmitting(false);
    }
  };

  return { handleSubmit, isSubmitting };
};