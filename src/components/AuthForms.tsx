import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LoginForm } from "@/components/LoginForm";
import { RegisterForm } from "@/components/RegisterForm";

export const AuthForms = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => setIsLogin(!isLogin);

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4">
      <div className="space-y-4 w-full max-w-md animate-fade-in">
        <div className={`transform transition-all duration-500 ${isLogin ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 absolute'}`}>
          {isLogin && <LoginForm />}
        </div>
        <div className={`transform transition-all duration-500 ${!isLogin ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0 absolute'}`}>
          {!isLogin && <RegisterForm />}
        </div>
        <Button 
          variant="outline" 
          className="w-full transform hover:scale-105 transition-all duration-300 animate-fade-in"
          onClick={toggleForm}
        >
          {isLogin ? "Need an account? Register" : "Already have an account? Login"}
        </Button>
      </div>
    </div>
  );
};