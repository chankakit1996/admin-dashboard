"use client";

import { useGetSalesQuery } from "@/lib/features/api/apiSlice";
import { CircularProgress, useTheme } from "@mui/material";
import { Box } from "@mui/material";
import { HomePageHeader } from "@/app/components/HomePageLayout";
import BreakdownChart from "@/app/components/chart/Breakdown";

const SalesPage = () => {
  const { data, isFetching } = useGetSalesQuery();
  console.log(data);

  if (isFetching || !data) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <CircularProgress color="primary" />
      </Box>
    );
  }

  return (
    <Box m="1.5rem 2.5rem" sx={{ flexGrow: 1 }}>
      <HomePageHeader
        title="BREAKDOWNS"
        description="Breakdown of sales by category"
      />
      <Box mt="40px" height="75vh">
        <BreakdownChart {...data} />
      </Box>
    </Box>
  );
};

export default SalesPage;
