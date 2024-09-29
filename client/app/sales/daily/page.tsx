"use client";

import { useGetSalesQuery } from "@/lib/features/api/apiSlice";
import { useMemo, useState } from "react";
import { CircularProgress, useTheme } from "@mui/material";
import { Box } from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { HomePageHeader } from "@/app/components/HomePageLayout";
import dynamic from "next/dynamic";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import FlexBetween from "@/app/components/FlexBetween";
const Line = dynamic(() => import("react-chartjs-2").then((mod) => mod.Line), {
  ssr: false,
});

const Overview = () => {
  dayjs.extend(isBetween);
  const theme = useTheme();
  const [fromOpen, setFromOpen] = useState(false);
  const [toOpen, setToOpen] = useState(false);
  const { data, isFetching } = useGetSalesQuery();
  const [formattedData, setFormattedData] = useState({
    from: dayjs("2021-01-01"),
    to: dayjs("2021-12-31"),
  });

  const [totalSalesLine, totalUnitsLine] = useMemo(() => {
    if (isFetching) return [];

    const { dailyData } = data!;
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

    if (!formattedData.from && !formattedData.to) return [];

    dailyData.forEach(({ date, totalSales, totalUnits }) => {
      const dataT = dayjs(date);
      if (dataT.isBetween(formattedData.from, formattedData.to)) {
        totalSalesLine.data.push({ x: date, y: totalSales });
        totalUnitsLine.data.push({ x: date, y: totalUnits });
      }
    });
    return [[totalSalesLine], [totalUnitsLine]];
  }, [data, formattedData]);

  return (
    <Box m="1.5rem 2.5rem" sx={{ flexGrow: 1 }}>
      <HomePageHeader
        title="DAILY SALES"
        description="Select your date to show the daily sales and units"
      />
      {isFetching || !data ? (
        <Box display="flex" justifyContent="center" alignItems="center">
          <CircularProgress color="primary" />
        </Box>
      ) : (
        <Box>
          <FlexBetween>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer
                components={["DatePicker"]}
                sx={{
                  flexGrow: 1,
                }}
              >
                <DatePicker
                  value={formattedData.from}
                  open={fromOpen}
                  onClose={() => {
                    setFromOpen(false);
                  }}
                  onAccept={(day) => {
                    setFormattedData({
                      ...formattedData,
                      from: dayjs(day),
                    });
                  }}
                  slotProps={{
                    textField: {
                      onClick: () => setFromOpen(true),
                    },
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer
                components={["DatePicker"]}
                sx={{
                  flexGrow: 1,
                }}
              >
                <DatePicker
                  value={formattedData.to}
                  open={toOpen}
                  onClose={() => {
                    setToOpen(false);
                  }}
                  slotProps={{
                    textField: {
                      onClick: () => setToOpen(true),
                    },
                  }}
                  onAccept={(day) => {
                    setFormattedData({
                      ...formattedData,
                      to: dayjs(day),
                    });
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
          </FlexBetween>
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
      )}
    </Box>
  );
};

export default Overview;
