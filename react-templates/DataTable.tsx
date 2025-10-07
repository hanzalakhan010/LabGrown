// components/ui/DataTable.tsx
import { type ReactNode, useState } from 'react';
import {
  Table,
  TableHead,
  TableHeaderCell,
  TableRow,
  TableCell,
} from './Table';
import { Link } from 'react-router-dom';
import { Modal } from './Modal';

// ----- Type definition -----
interface BaseProps<T> {
  title: string;
  addLink?: string | (() => void);
  addLabel?: string;
  columns: {
    key: keyof T | string;
    label: string;
    render?: (item: T) => ReactNode;
  }[];
  data: T[];
  loading?: boolean;
  emptyMessage?: string;
  actions?: Record<string, (ids: number[]) => void | Promise<void>>; // ✅ actions now accept selected IDs
}

// If selectable = true → must provide selection props
interface SelectableProps<T> extends BaseProps<T> {
  selectable: true;
  selected: Set<number>;
  toggleAll: (checked: boolean) => void;
  toggleOne: (id: number) => void;
}

// If selectable = false → no selection props required
interface NonSelectableProps<T> extends BaseProps<T> {
  selectable?: false;
  selected?: never;
  toggleAll?: never;
  toggleOne?: never;
}

type DataTableProps<T> = SelectableProps<T> | NonSelectableProps<T>;

// ----- Component -----
export function DataTable<T extends { id: number }>({
  title,
  addLink,
  addLabel = '+ Add',
  columns,
  data,
  loading,
  emptyMessage = 'No records found.',
  selectable = true,
  selected,
  toggleAll,
  toggleOne,
  actions,
}: DataTableProps<T>) {
  const [showActions, setShowActions] = useState(false);

  return (
    <div className='w-full mx-auto px-6 py-6 max-w-5xl'>
      {/* Header */}
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-semibold'>{title}</h1>
        {typeof addLink === 'string' ? (
          <Link
            to={addLink}
            className='px-4 py-2 rounded-md bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition'
          >
            {addLabel}
          </Link>
        ) : typeof addLink === 'function' ? (
          <button
            onClick={addLink}
            className='px-4 py-2 rounded-md bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition'
          >
            {addLabel}
          </button>
        ) : null}
      </div>

      {/* Selection notice + Actions */}
      {selectable && selected && selected.size > 0 && (
        <div className='mb-4 flex justify-between items-center bg-yellow-50 text-yellow-800 p-2 rounded'>
          <span>{selected.size} item(s) selected</span>
          {actions && (
            <button
              onClick={() => setShowActions(true)}
              className='px-3 py-1 rounded-md bg-indigo-600 text-white text-sm hover:bg-indigo-700 transition'
            >
              Actions
            </button>
          )}
        </div>
      )}

      {/* Table */}
      <Table>
        <TableHead>
          <TableRow>
            {selectable && (
              <TableHeaderCell>
                <input
                  type='checkbox'
                  onChange={(e) => toggleAll?.(e.target.checked)}
                  checked={selected?.size === data.length && data.length > 0}
                />
              </TableHeaderCell>
            )}
            {columns.map((col) => (
              <TableHeaderCell key={String(col.key)}>
                {col.label}
              </TableHeaderCell>
            ))}
          </TableRow>
        </TableHead>
        <tbody>
          {data.map((item) => (
            <TableRow key={item.id}>
              {selectable && (
                <TableCell>
                  <input
                    type='checkbox'
                    checked={selected?.has(item.id) ?? false}
                    onChange={() => toggleOne?.(item.id)}
                  />
                </TableCell>
              )}
              {columns.map((col) => (
                <TableCell key={String(col.key)}>
                  {col.render ? col.render(item) : (item as any)[col.key]}
                </TableCell>
              ))}
            </TableRow>
          ))}

          {/* Empty state */}
          {data.length === 0 && !loading && (
            <TableRow>
              <TableCell
                colSpan={columns.length + (selectable ? 1 : 0)}
                className='p-6 text-center text-gray-500 italic'
              >
                {emptyMessage}
              </TableCell>
            </TableRow>
          )}
        </tbody>
      </Table>

      {/* Modal for actions */}
      {showActions && actions && (
        <Modal onClose={() => setShowActions(false)}>
          <h2 className='text-lg font-semibold mb-4'>Batch action</h2>
          <div className='space-y-2'>
            {Object.entries(actions).map(([label, fn]) => (
              <button
                key={label}
                onClick={async () => {
                  await fn(Array.from(selected ?? [])); // ✅ pass selected IDs
                  setShowActions(false);
                }}
                className='w-full px-4 py-2 rounded-md bg-indigo-600 text-white text-sm hover:bg-indigo-700 transition'
              >
                {label}
              </button>
            ))}
          </div>
        </Modal>
      )}
    </div>
  );
}
