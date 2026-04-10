export default function StatusBadge({ status, label }: { status: string; label?: string }) {
    const statusColors: { [key: string]: { bg: string; text: string } } = {
        planning: { bg: 'bg-amber-100', text: 'text-amber-800' },
        ongoing: { bg: 'bg-blue-100', text: 'text-blue-800' },
        selesai: { bg: 'bg-green-100', text: 'text-green-800' },
        pending: { bg: 'bg-gray-100', text: 'text-gray-800' },
        in_progress: { bg: 'bg-blue-100', text: 'text-blue-800' },
        done: { bg: 'bg-green-100', text: 'text-green-800' },
        paid: { bg: 'bg-green-100', text: 'text-green-800' },
        cancelled: { bg: 'bg-red-100', text: 'text-red-800' },
    };

    const colors = statusColors[status] || { bg: 'bg-gray-100', text: 'text-gray-800' };

    const displayLabel = label || status.replace(/_/g, ' ').charAt(0).toUpperCase() + status.slice(1).replace(/_/g, ' ');

    return (
        <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${colors.bg} ${colors.text}`}>
            {displayLabel}
        </span>
    );
}
