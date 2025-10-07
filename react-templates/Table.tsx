// components/ui/Table.tsx

import React from "react";

type DivProps = React.HTMLAttributes<HTMLDivElement>;
type THeadProps = React.HTMLAttributes<HTMLTableSectionElement>;
type TrProps = React.HTMLAttributes<HTMLTableRowElement>;
type ThProps = React.ThHTMLAttributes<HTMLTableHeaderCellElement>;
type TdProps = React.TdHTMLAttributes<HTMLTableCellElement>;

export const Table: React.FC<DivProps & { children: React.ReactNode }> = ({
  children,
  className = "",
  ...props
}) => (
  <div
    className={`overflow-x-auto rounded-lg shadow border border-gray-200 ${className}`}
    {...props}
  >
    <table className="min-w-full bg-white text-sm text-left">{children}</table>
  </div>
);

export const TableHead: React.FC<THeadProps & { children: React.ReactNode }> = ({
  children,
  className = "",
  ...props
}) => (
  <thead className={`bg-gray-100 text-gray-700 font-semibold ${className}`} {...props}>
    {children}
  </thead>
);

export const TableRow: React.FC<TrProps & { children: React.ReactNode }> = ({
  children,
  className = "",
  ...props
}) => (
  <tr className={`border-b last:border-0 hover:bg-gray-50 ${className}`} {...props}>
    {children}
  </tr>
);

/** Header cell forwards native th props (e.g. scope, colSpan) */
export const TableHeaderCell: React.FC<ThProps & { children: React.ReactNode }> = ({
  children,
  className = "",
  ...props
}) => (
  <th scope="col" className={`px-4 py-2 text-sm font-medium ${className}`} {...props}>
    {children}
  </th>
);

/** TableCell forwards native td props (e.g. colSpan, rowSpan) */
export const TableCell: React.FC<TdProps & { children: React.ReactNode }> = ({
  children,
  className = "",
  ...props
}) => (
  <td className={`px-4 py-2 ${className}`} {...props}>
    {children}
  </td>
);
