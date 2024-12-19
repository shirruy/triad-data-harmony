import { useQuery } from "@tanstack/react-query";

// Simulated API calls with optimized timing
const fetchFirstSource = async () => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return { data: [10, 45, 30, 25, 60, 20] };
};

const fetchSecondSource = async () => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return { users: 1250, activeNow: 420, trend: "up" };
};

const fetchThirdSource = async () => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return { 
    status: "healthy", 
    lastUpdate: new Date().toISOString(), 
    metrics: { cpu: 45, memory: 72 } 
  };
};

export const useFirstSource = () => {
  return useQuery({
    queryKey: ["firstSource"],
    queryFn: fetchFirstSource,
    staleTime: 30000,
    gcTime: 3600000,
    retry: 2,
  });
};

export const useSecondSource = () => {
  return useQuery({
    queryKey: ["secondSource"],
    queryFn: fetchSecondSource,
    staleTime: 30000,
    gcTime: 3600000,
    retry: 2,
  });
};

export const useThirdSource = () => {
  return useQuery({
    queryKey: ["thirdSource"],
    queryFn: fetchThirdSource,
    staleTime: 30000,
    gcTime: 3600000,
    retry: 2,
  });
};