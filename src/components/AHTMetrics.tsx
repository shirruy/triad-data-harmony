import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HelpCircle, PhoneCall, PhoneForwarded, PhoneOff } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";

interface MetricsData {
  callsOffered: number;
  answeredCalls: number;
  abandonCalls: number;
}

export const AHTMetrics = () => {
  const [metrics, setMetrics] = useState<MetricsData>({
    callsOffered: 0,
    answeredCalls: 0,
    abandonCalls: 0,
  });

  useEffect(() => {
    // Initial fetch
    fetchMetrics();

    // Set up real-time subscription
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'aht_metrics'
        },
        () => {
          fetchMetrics();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchMetrics = async () => {
    try {
      const { data, error } = await supabase
        .from('aht_metrics')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) {
        console.error('Error fetching metrics:', error);
        return;
      }

      if (data) {
        setMetrics({
          callsOffered: data.calls_offered,
          answeredCalls: data.answered_calls,
          abandonCalls: data.abandon_calls,
        });
      }
      // If no data is found, we'll keep using the default values set in useState
    } catch (error) {
      console.error('Error in fetchMetrics:', error);
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <motion.div variants={cardVariants} initial="hidden" animate="visible" custom={0}>
        <MetricCard
          title="Calls Offered"
          value={metrics.callsOffered.toLocaleString()}
          icon={PhoneCall}
          color="blue"
        />
      </motion.div>
      <motion.div variants={cardVariants} initial="hidden" animate="visible" custom={1}>
        <MetricCard
          title="Answered Calls"
          value={metrics.answeredCalls.toLocaleString()}
          icon={PhoneForwarded}
          color="green"
        />
      </motion.div>
      <motion.div variants={cardVariants} initial="hidden" animate="visible" custom={2}>
        <MetricCard
          title="Abandon Calls"
          value={metrics.abandonCalls.toLocaleString()}
          icon={PhoneOff}
          color="red"
        />
      </motion.div>
    </div>
  );
};

const MetricCard = ({ 
  title, 
  value, 
  icon: Icon,
  color 
}: { 
  title: string; 
  value: string;
  icon: any;
  color: "blue" | "green" | "red";
}) => {
  const colorClasses = {
    blue: "bg-blue-600 text-white",
    green: "bg-emerald-600 text-white",
    red: "bg-rose-600 text-white"
  };

  return (
    <Card className={`${colorClasses[color]} shadow-lg hover:scale-105 transition-transform duration-300`}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-white/90">{title}</CardTitle>
        <Icon className="h-5 w-5 text-white/70" />
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
};
