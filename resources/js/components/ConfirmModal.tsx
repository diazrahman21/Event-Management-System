export default function ConfirmModal({
    isOpen,
    title,
    message,
    onConfirm,
    onCancel,
    isDangerous = false,
}: {
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
    isDangerous?: boolean;
}) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="rounded-lg bg-white p-6 shadow-lg">
                <h2 className="text-lg font-bold text-gray-900">{title}</h2>
                <p className="mt-2 text-sm text-gray-600">{message}</p>

                <div className="mt-6 flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={onConfirm}
                        className={`px-4 py-2 text-sm font-medium text-white rounded-md ${
                            isDangerous 
                                ? 'bg-red-600 hover:bg-red-700' 
                                : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                    >
                        {isDangerous ? 'Delete' : 'Confirm'}
                    </button>
                </div>
            </div>
        </div>
    );
}
