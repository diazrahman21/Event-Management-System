export default function BudgetProgressBar({ 
    planned, 
    actual 
}: { 
    planned: number; 
    actual: number 
}) {
    const percentage = planned > 0 ? (actual / planned) * 100 : 0;
    const isOverBudget = actual > planned;

    return (
        <div className="space-y-2">
            <div className="flex justify-between text-sm">
                <span className="font-medium text-gray-700">
                    Budget Usage: Rp {actual.toLocaleString('id-ID')} / Rp {planned.toLocaleString('id-ID')}
                </span>
                <span className={`font-semibold ${isOverBudget ? 'text-red-600' : 'text-green-600'}`}>
                    {percentage.toFixed(0)}%
                </span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                <div
                    className={`h-full transition-all duration-300 ${isOverBudget ? 'bg-red-600' : 'bg-green-600'}`}
                    style={{ width: `${Math.min(percentage, 100)}%` }}
                />
            </div>
            {isOverBudget && (
                <p className="text-xs text-red-600">
                    Over budget by Rp {(actual - planned).toLocaleString('id-ID')}
                </p>
            )}
        </div>
    );
}
