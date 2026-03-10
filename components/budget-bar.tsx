interface BudgetBarProps {
  paidAmount: number;
  estimatedAmount: number;
}

export function BudgetBar({ paidAmount, estimatedAmount }: BudgetBarProps) {
  const value = estimatedAmount === 0 ? 0 : Math.min((paidAmount / estimatedAmount) * 100, 100);

  return (
    <div className="h-2 overflow-hidden rounded-full bg-[#ece3d3]">
      <div className="h-full rounded-full bg-gradient-to-r from-gold to-blush" style={{ width: `${value}%` }} />
    </div>
  );
}

