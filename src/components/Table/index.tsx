import { ChangeEvent, FunctionComponent, useEffect, useState } from "react";
import {
  SortDirection,
  SortDirectionType,
  Column as VirtualizedColumn,
  Table as VirtualizedTable,
} from "react-virtualized";
import "react-virtualized/styles.css";

import { Column } from "../../interfaces/Table";
import { Service } from "../../interfaces/Service";
import { useDebounce } from "usehooks-ts";

interface Props<T> {
  columns: Column<T>[];
  data: Array<T>;
}

const Table: FunctionComponent<Props<Service>> = (props) => {
  const { columns, data } = props;
  const [list, setList] = useState<Service[]>(data);
  const [query, setQuery] = useState<string>("");
  const [sort, setSort] = useState<{
    sortBy: string;
    sortDirection: SortDirectionType;
  }>({
    sortBy: "",
    sortDirection: SortDirection.ASC,
  });
  const debouncedValue = useDebounce<string>(query, 500);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    if (!event.target.value.trim()) {
      setList(data);
    }
  };

  useEffect(() => {
    if (debouncedValue) {
      setList(
        data.filter(
          (item) =>
            item.Date.includes(debouncedValue) ||
            item.InstanceId.includes(debouncedValue) ||
            item.MeterCategory.includes(debouncedValue) ||
            item.ServiceName.includes(debouncedValue)
        )
      );
    }
  }, [debouncedValue, data]);

  const onSort = (info: {
    sortBy: string;
    sortDirection: SortDirectionType;
  }) => {
    const sortKey = info.sortBy as keyof Service;
    const newList = [...list];
    newList.sort((a, b) => {
      if (a[sortKey] < b[sortKey]) {
        return -1;
      }
      if (a[sortKey] > b[sortKey]) {
        return 1;
      }
      return 0;
    });
    setList(
      info.sortDirection === SortDirection.DESC ? newList.reverse() : newList
    );
    setSort(info);
  };

  return (
    <div className="not-prose relative bg-slate-50 rounded-xl overflow-hidden dark:bg-slate-800/25">
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25 dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]"></div>
      <div className="relative rounded-xl overflow-auto">
        <div className="shadow-sm overflow-hidden my-8 flex flex-1 flex-col items-center">
          <div
            className="flex flex-1 justify-end mb-2"
            style={{ width: "1200px" }}
          >
            <input
              className="border dark:border-slate-600 rounded px-4 py-2"
              type="text"
              onChange={handleChange}
              name="search"
              value={query}
              placeholder="Search here..."
            />
          </div>
          <VirtualizedTable
            width={1200}
            height={768}
            headerHeight={40}
            rowHeight={40}
            rowCount={list.length}
            rowGetter={({ index }) => list[index]}
            headerClassName="border-b dark:border-slate-600 font-medium text-slate-400 dark:text-slate-200 text-left py-2 capitalize flex items-center"
            rowClassName="border-b dark:border-slate-600 bg-white"
            sort={onSort}
            sortBy={sort.sortBy}
            sortDirection={sort.sortDirection}
            noRowsRenderer={() => (
              <p className="text-center mt-4">No Data found</p>
            )}
          >
            {columns.map((column) => {
              return (
                <VirtualizedColumn
                  key={`COLUMN_${column.key}`}
                  className="font-medium text-slate-400 dark:text-slate-200 py-2 align-middle"
                  label={column.label}
                  dataKey={column.key}
                  width={column.width}
                />
              );
            })}
          </VirtualizedTable>
        </div>
      </div>
      <div className="absolute inset-0 pointer-events-none border border-black/5 rounded-xl dark:border-white/5"></div>
    </div>
  );
};

export default Table;
