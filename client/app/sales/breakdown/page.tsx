"use client";

import { useGetSalesQuery } from "@/lib/features/api/apiSlice";
import { useMemo } from "react";
import { CircularProgress, useTheme } from "@mui/material";
import { Box } from "@mui/material";
import { HomePageHeader } from "@/app/components/HomePageLayout";
import dynamic from "next/dynamic";
const Doughnut = dynamic(
  () => import("react-chartjs-2").then((mod) => mod.Doughnut),
  {
    ssr: false,
  }
);

const SalesPage = () => {
  const theme = useTheme();
  const { data, isFetching } = useGetSalesQuery();

  if (isFetching || !data) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <CircularProgress color="primary" />
      </Box>
    );
  }
  const doughnutLabel = {
    id: "doughnutLabel",
    // Doughnut text at the center
    beforeDatasetsDraw(chart: any, args: any, pluginOptions: any) {
      const { ctx } = chart;
      ctx.save();
      ctx.font = "bolder 1.5rem Roboto, sans-serif";
      ctx.textAlign = "center";
      ctx.fillStyle = theme.palette.text.primary;
      ctx.fillText(
        `Total: ${data.yearlySalesTotal}`,
        chart.chartArea.left + chart.chartArea.width / 2,
        chart.chartArea.top + chart.chartArea.height / 2
      );
      ctx.restore();
    },
  };

  return (
    <>
      <Box>
        <Doughnut
          data={{
            datasets: [
              {
                data: Object.values(data.salesByCategory),
              },
            ],
            labels: Object.keys(data.salesByCategory),
          }}
          plugins={[doughnutLabel]}
        />
      </Box>
    </>
  );
};

export default SalesPage;
