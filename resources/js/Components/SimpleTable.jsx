export default function SimpleTable({ columns = [], rows = [], emptyText = 'Belum ada data.' }) {
    return (
        <div className="overflow-hidden rounded-card border border-neutral-200 bg-white shadow-panel">
            <div className="overflow-x-auto">
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
