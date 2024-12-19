interface TooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

export const AHTCustomTooltip = ({ active, payload, label }: TooltipProps) => {
  if (!active || !payload?.length) return null;

  return (
    <div className="bg-popover p-3 rounded-lg border border-border shadow-lg">
      <p className="text-foreground font-medium">{label}</p>
      <p className="text-primary">AHT: {payload[0].value}</p>
    </div>
  );
};