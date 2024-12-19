import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TeamChat } from "./TeamChat";
import { TaskManager } from "./TaskManager";
import { TeamAvailability } from "./TeamAvailability";
import { PerformanceGoals } from "./PerformanceGoals";
import { motion } from "framer-motion";

export const TeamCollaboration = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-4"
    >
      <h2 className="text-2xl font-semibold">Team Collaboration</h2>
      <Tabs defaultValue="chat" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="chat">Team Chat</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="goals">Goals</TabsTrigger>
          <TabsTrigger value="availability">Availability</TabsTrigger>
        </TabsList>
        <TabsContent value="chat">
          <TeamChat />
        </TabsContent>
        <TabsContent value="tasks">
          <TaskManager />
        </TabsContent>
        <TabsContent value="goals">
          <PerformanceGoals />
        </TabsContent>
        <TabsContent value="availability">
          <TeamAvailability />
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};