import { useQuery } from "@tanstack/react-query";

import Table from "../../components/Table";
import { getAllServices } from "../../utils/apis";
import Loader from "../../components/Loader";
import { Column } from "../../interfaces/Table";
import { Service } from "../../interfaces/Service";

function App() {
  const { isLoading, data, error } = useQuery({
    queryKey: ["query-services"],
    queryFn: getAllServices,
  });

  const columns: Column<Service>[] = [
    {
      key: "InstanceId",
      label: "InstanceId",
      renderCell: (row: Service) => row.InstanceId,
      width: 296,
    },
    {
      key: "ConsumedQuantity",
      label: "Consumed Quantity",
      renderCell: (row: Service) => row.ConsumedQuantity,
      width: 160,
    },
    {
      key: "Cost",
      label: "Cost",
      renderCell: (row: Service) => row.Cost,
      width: 80,
    },
    {
      key: "Date",
      label: "Date",
      renderCell: (row: Service) => row.Date,
      width: 100,
    },
    {
      key: "MeterCategory",
      label: "Meter Category",
      renderCell: (row: Service) => row.MeterCategory,
      width: 120,
    },
    {
      key: "ResourceGroup",
      label: "Resource Group",
      renderCell: (row: Service) => row.ResourceGroup,
      width: 120,
    },
    {
      key: "ServiceName",
      label: "Service Name",
      renderCell: (row: Service) => row.ServiceName,
      width: 140,
    },
  ];

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="h-64 flex items-center justify-center w-full">
          <Loader />
        </div>
      );
    }

    if (error) {
      return (
        <div className="h-64 flex items-center justify-center w-full">
          <p className="text-red-900">Something went wrong....</p>
        </div>
      );
    }

    return <Table data={data || []} columns={columns} />;
  };

  return <div className="container mx-auto">{renderContent()}</div>;
}

export default App;
