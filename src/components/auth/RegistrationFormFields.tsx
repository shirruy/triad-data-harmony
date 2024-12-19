import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserRole } from "@/lib/auth/types";

interface RegistrationFormFieldsProps {
  onSubmit: (formData: {
    email: string;
    password: string;
    role: UserRole;
    registrationKey: string;
  }) => void;
  isSubmitting: boolean;
}

export const RegistrationFormFields = ({ onSubmit, isSubmitting }: RegistrationFormFieldsProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("operations");
  const [registrationKey, setRegistrationKey] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ email, password, role, registrationKey });
  };

  return (
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
  );
};