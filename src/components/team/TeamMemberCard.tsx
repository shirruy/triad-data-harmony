import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

interface TeamMemberCardProps {
  name: string;
  role: string;
  performanceScore: number;
  avatarUrl?: string;
}

export const TeamMemberCard = ({ name, role, performanceScore, avatarUrl }: TeamMemberCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="overflow-hidden backdrop-blur-sm bg-card/50">
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={avatarUrl} />
            <AvatarFallback>{name.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-lg">{name}</CardTitle>
            <Badge variant="secondary" className="mt-1">
              {role}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Performance Score</span>
            <span className={`text-lg font-semibold ${
              performanceScore >= 80 ? 'text-green-500' :
              performanceScore >= 60 ? 'text-yellow-500' : 'text-red-500'
            }`}>
              {performanceScore}%
            </span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};