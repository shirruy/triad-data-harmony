import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RegistrationFormFields } from "./RegistrationFormFields";
import { useRegistration } from "@/hooks/auth/useRegistration";
import { motion } from "framer-motion";

export const RegistrationForm = () => {
  const { handleSubmit, isSubmitting } = useRegistration();

  return (
    <Card className="w-full transform transition-all duration-500 hover:shadow-xl">
      <CardHeader className="space-y-2">
        <CardTitle className="text-2xl font-bold text-center">Create Account</CardTitle>
        <p className="text-muted-foreground text-center text-sm">Join us today</p>
      </CardHeader>
      <CardContent>
        <RegistrationFormFields onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      </CardContent>
    </Card>
  );
};