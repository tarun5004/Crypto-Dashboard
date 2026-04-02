import { EmptyState } from './EmptyState.jsx'
import { StatusBadge } from './StatusBadge.jsx'
import { Button } from './Button.jsx'

const renderValue = (column, item) => {
  if (column.render) {
    return column.render(item)
  }

  const value = item[column.key]
  return column.type === 'status' ? <StatusBadge value={value} /> : <span>{value}</span>
}

export const CollectionView = ({ columns, items, emptyTitle, emptyDescription, onCreate, createLabel, onEdit, onDelete }) => {
  if (!items.length) {
    return <EmptyState title={emptyTitle} description={emptyDescription} actionLabel={createLabel} onAction={onCreate} />
  }

  return (
    <>
      <div className="hidden overflow-x-auto lg:block">
        <table className="min-w-full border-separate border-spacing-y-2">
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column.key} className="px-3 text-left text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-secondary)]">
                  {column.label}
                </th>
              ))}
              <th className="px-3 text-right text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-secondary)]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                {columns.map((column) => (
                  <td key={column.key} className="rounded-2xl border border-[var(--border-soft)] bg-white px-3 py-3 text-sm text-[var(--text-primary)]">
                    {renderValue(column, item)}
                  </td>
                ))}
                <td className="rounded-2xl border border-[var(--border-soft)] bg-white px-3 py-3">
                  <div className="flex justify-end gap-2">
                    <Button variant="secondary" onClick={() => onEdit(item)}>
                      Edit
                    </Button>
                    <Button className="bg-rose-500 text-white hover:bg-rose-400" onClick={() => onDelete(item)}>
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="grid gap-3 lg:hidden">
        {items.map((item) => (
          <div key={item.id} className="rounded-[24px] border border-[var(--border-soft)] bg-white p-4">
            <div className="space-y-2">
              {columns.map((column) => (
                <div key={column.key} className="flex items-center justify-between gap-3">
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-secondary)]">{column.label}</span>
                  <div className="text-sm text-[var(--text-primary)]">{renderValue(column, item)}</div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex gap-2">
              <Button className="flex-1" variant="secondary" onClick={() => onEdit(item)}>
                Edit
              </Button>
              <Button className="flex-1 bg-rose-500 text-white hover:bg-rose-400" onClick={() => onDelete(item)}>
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
