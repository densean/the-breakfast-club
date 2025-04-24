import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  PaginationState,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import WebLoader from "../loader/Loader";
import { WebInput } from "../input/Input";
import { ArrowDown, ArrowUp, ChevronsUpDown } from "lucide-react";

interface TableProps<T> {
  columns: ColumnDef<T>[];
  data: T[];
  isLoading?: boolean;
  emptyMessage?: React.ReactNode;
  onAddClick?: () => void;
  actions?: (row: T) => React.ReactNode;
  searchKey?: keyof T;
}

export function WebTable<T>({
  columns,
  data,
  isLoading,
  emptyMessage,
  actions,
  searchKey,
}: TableProps<T>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = useMemo(() => {
    if (!searchKey || !searchTerm) return data;
    return data.filter((item) =>
      String(item[searchKey]).toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [data, searchKey, searchTerm]);

  const table = useReactTable({
    data: filteredData,
    columns,
    state: { sorting, pagination },
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="w-full my-6">
      <div className="flex justify-between items-center mb-4">
        {searchKey && (
          <WebInput
            size="3"
            label="Search movie title"
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="text-white"
          />
        )}
      </div>
      {isLoading ? (
        <WebLoader />
      ) : filteredData.length === 0 ? (
        <div className="text-center text-gray-500 ">{emptyMessage}</div>
      ) : (
        <div>
          <div className="overflow-x-auto border rounded">
            <table className="table-auto min-w-full text-left">
              <thead className="bg-gray-100 text-center">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className={`border-b p-3 font-medium ${
                          header.column.getCanSort()
                            ? "cursor-pointer select-none"
                            : ""
                        }`}
                        onClick={
                          header.column.getCanSort()
                            ? header.column.getToggleSortingHandler()
                            : undefined
                        }
                      >
                        <div className="flex items-center justify-center gap-1">
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}

                          {header.column.getCanSort() && (
                            <>
                              {header.column.getIsSorted() === "asc" ? (
                                <ArrowUp className="w-4 h-4" />
                              ) : header.column.getIsSorted() === "desc" ? (
                                <ArrowDown className="w-4 h-4" />
                              ) : (
                                <ChevronsUpDown className="w-4 h-4 text-muted-foreground" />
                              )}
                            </>
                          )}
                        </div>
                      </th>
                    ))}
                    {actions && (
                      <th className="border-b p-3 text-center">Actions</th>
                    )}
                  </tr>
                ))}
              </thead>
              <tbody className="bg-white">
                {table.getPaginationRowModel().rows.map((row) => (
                  <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="p-3 border-b text-center">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                    {actions && (
                      <td className="p-3 border-b text-center">
                        <div className="flex justify-center items-center gap-2">
                          {actions(row.original)}
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between mt-4 items-center text-sm">
            <div>
              Showing {pagination.pageIndex * pagination.pageSize + 1} to{" "}
              {Math.min(
                (pagination.pageIndex + 1) * pagination.pageSize,
                data.length
              )}{" "}
              of {data.length} entries
            </div>
            <div className="flex gap-2">
              <button
                onClick={() =>
                  setPagination((prev) => ({
                    ...prev,
                    pageIndex: Math.max(prev.pageIndex - 1, 0),
                  }))
                }
                disabled={pagination.pageIndex === 0}
                className="px-4 md:py-2 bg-gray-700 text-white hover:bg-gray-600 hover:shadow-md rounded-full disabled:opacity-50"
              >
                <span className="font-medium md:px-4">Previous</span>
              </button>

              <button
                onClick={() =>
                  setPagination((prev) => ({
                    ...prev,
                    pageIndex: prev.pageIndex + 1,
                  }))
                }
                disabled={
                  (pagination.pageIndex + 1) * pagination.pageSize >=
                  data.length
                }
                className="px-4 py-3 bg-emerald-500 hover:bg-emerald-600 text-white hover:shadow-md rounded-full disabled:opacity-50"
              >
                <span className="font-medium md:px-4">Next</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
