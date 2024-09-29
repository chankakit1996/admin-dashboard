"use client";

import { useGetSalesQuery } from "@/lib/features/api/apiSlice";
import { useMemo } from "react";
import { CircularProgress, useTheme } from "@mui/material";
import { Box } from "@mui/material";
import { HomePageHeader } from "@/app/components/HomePageLayout";
import dynamic from "next/dynamic";
const Line = dynamic(() => import("react-chartjs-2").then((mod) => mod.Line), {
  ssr: false,
});

const Overview = () => {
  const theme = useTheme();
  const { data, isFetching } = useGetSalesQuery();

  const [totalSalesLine, totalUnitsLine] = useMemo(() => {
    if (!data) return [];

    const { monthlyData } = data;
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
  }, [data]);

  return (
    <Box m="1.5rem 2.5rem" sx={{ flexGrow: 1 }}>
      <HomePageHeader
        title="OVERVIEW"
        description="Overview of general revenue and profit"
      />
      {isFetching || !data ? (
        <Box display="flex" justifyContent="center" alignItems="center">
          <CircularProgress color="primary" />
        </Box>
      ) : (
        <>
          <Box>
            <Line
              data={{
                datasets: [
                  {
                    label: "Sales",
                    data: totalSalesLine?.[0].data ?? [],
                  },
                  {
                    label: "Units",
                    data: totalUnitsLine?.[0].data ?? [],
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
              }}
            />
          </Box>
        </>
      )}
    </Box>
  );
};

export default Overview;
