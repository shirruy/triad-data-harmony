import { useQuery } from "@tanstack/react-query";

// Simulated API calls
const fetchFirstSource = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return { data: [10, 45, 30, 25, 60, 20] };
};

const fetchSecondSource = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return { users: 1250, activeNow: 420, trend: "up" };
};

const fetchThirdSource = async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return { status: "healthy", lastUpdate: new Date().toISOString(), metrics: { cpu: 45, memory: 72 } };
};

export const useFirstSource = () => {
  return useQuery({
    queryKey: ["firstSource"],
    queryFn: fetchFirstSource,
  });
};

export const useSecondSource = () => {
  return useQuery({
    queryKey: ["secondSource"],
    queryFn: fetchSecondSource,
  });
};

export const useThirdSource = () => {
  return useQuery({
    queryKey: ["thirdSource"],
    queryFn: fetchThirdSource,
  });
};