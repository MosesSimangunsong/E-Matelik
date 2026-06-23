export default function SimpleTable({ columns = [], rows = [], emptyText = 'Belum ada data.' }) {
    return (
        <div className="overflow-hidden rounded-card border border-neutral-200 bg-white shadow-panel">
            <div className="block md:hidden">
                {rows.length > 0 ? (
                    <div className="divide-y divide-neutral-200">
                        {rows.map((row, index) => (
                            <div key={row.id ?? index} className="space-y-3 px-4 py-4">
                                {columns.map((column) => (
                                    <div key={column.key}>
                                        <p className="text-xs font-bold uppercase tracking-[0.16em] text-neutral-500">
                                            {column.label}
                                        </p>
                                        <div className="mt-1 text-sm leading-7 text-neutral-700">
                                            {row[column.key] || '-'}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="px-4 py-8 text-center text-sm text-neutral-500">{emptyText}</div>
                )}
            </div>

            <div className="hidden overflow-x-auto md:block">
                <table className="data-table">
                    <thead>
                        <tr>
                            {columns.map((column) => (
                                <th key={column.key}>{column.label}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {rows.length > 0 ? (
                            rows.map((row, index) => (
                                <tr key={row.id ?? index}>
                                    {columns.map((column) => (
                                        <td key={column.key}>
                                            {row[column.key]}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={columns.length || 1}
                                    className="px-4 py-8 text-center text-sm text-neutral-500"
                                >
                                    {emptyText}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
