"use client";

import { OverallStat } from "@/lib/features/api/apiSlice";
import { useMemo } from "react";
import { useTheme } from "@mui/material";
import dynamic from "next/dynamic";
const Line = dynamic(() => import("react-chartjs-2").then((mod) => mod.Line), {
  ssr: false,
});

const OverviewChart = ({
  monthlyData,
}: {
  monthlyData: OverallStat["monthlyData"];
}) => {
  const theme = useTheme();

  const [totalSalesLine, totalUnitsLine] = useMemo(() => {
    if (!monthlyData) return [];
    const totalSalesLine: {
      id: string;
      color: string;
      data: { x: string; y: number }[];
    } = {
      id: "totalSales",
      color: theme.palette.secondary.main,
      data: [],
    };
    const totalUnitsLine: {
      id: string;
      color: string;
      data: { x: string; y: number }[];
    } = {
      id: "totalUnits",
      color: theme.palette.secondary[600],
      data: [],
    };

    // data of totalSalesLine and totalUnitsLine is the cumulative data of the month
    monthlyData.forEach(({ month, totalSales, totalUnits }, index) => {
      totalSalesLine.data.push({
        x: month,
        y: totalSales + (totalSalesLine.data[index - 1]?.y ?? 0),
      });
      totalUnitsLine.data.push({
        x: month,
        y: totalUnits + (totalUnitsLine.data[index - 1]?.y ?? 0),
      });
    });

    return [[totalSalesLine], [totalUnitsLine]];
  }, [monthlyData]);

  return (
    <Line
      data={{
        datasets: [
          {
            label: "Sales",
            data: totalSalesLine?.[0].data ?? [],
            borderWidth: 5,
          },
          {
            label: "Units",
            data: totalUnitsLine?.[0].data ?? [],
            borderWidth: 5,
          },
        ],
      }}
      options={{
        plugins: {
          legend: {
            display: true,
            labels: {
              color: theme.palette.neutral[0],
            },
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: "Month",
              padding: { top: 10, bottom: 10 },
              color: theme.palette.neutral[0],
            },
            ticks: {
              color: theme.palette.neutral[0],
            },
          },
          y: {
            title: {
              display: true,
              text: "Total Units and Sales",
              padding: { top: 10, bottom: 10 },
              color: theme.palette.neutral[0],
            },
            ticks: {
              color: theme.palette.neutral[0],
            },
          },
        },
        maintainAspectRatio: false,
      }}
    />
  );
};

export default OverviewChart;
