"use client";

import { OverallStat } from "@/lib/features/api/apiSlice";
import { useTheme } from "@mui/material";
import dynamic from "next/dynamic";
import type { Plugin, ChartOptions } from "chart.js";
const Doughnut = dynamic(
  () => import("react-chartjs-2").then((mod) => mod.Doughnut),
  {
    ssr: false,
  }
);

const BreakdownChart = ({
  salesByCategory,
  yearlySalesTotal,
}: {
  salesByCategory: OverallStat["salesByCategory"];
  yearlySalesTotal: OverallStat["yearlySalesTotal"];
}) => {
  const theme = useTheme();

  // Plugin<"doughnut", AnyObject>[]
  const doughnutLabel: {
    id: string;
    beforeDatasetsDraw: Plugin<"doughnut">["beforeDatasetsDraw"];
  } = {
    id: "doughnutLabel",
    // Doughnut text at the center
    beforeDatasetsDraw(chart, args, pluginOptions) {
      const { ctx } = chart;
      ctx.save();
      ctx.font = "bolder 1.25rem Roboto, sans-serif";
      ctx.textAlign = "center";
      ctx.fillStyle = theme.palette.text.primary;
      ctx.fillText(
        `Total: ${yearlySalesTotal}`,
        chart.chartArea.left + chart.chartArea.width / 2,
        chart.chartArea.top + chart.chartArea.height / 2
      );
      ctx.restore();
    },
  };
  const options: ChartOptions<"doughnut"> = {
    color: theme.palette.text.primary,
  };

  return (
    <Doughnut
      data={{
        datasets: [
          {
            data: Object.values(salesByCategory),
          },
        ],
        labels: Object.keys(salesByCategory),
      }}
      plugins={[doughnutLabel]}
      options={options}
    />
  );
};

export default BreakdownChart;
