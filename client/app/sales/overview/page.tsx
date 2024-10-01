"use client";

import { useGetSalesQuery } from "@/lib/features/api/apiSlice";
import { CircularProgress } from "@mui/material";
import { Box } from "@mui/material";
import { HomePageHeader } from "@/app/components/HomePageLayout";
import OverviewChart from "@/app/components/chart/Overview";

const Overview = () => {
  const { data, isFetching } = useGetSalesQuery();

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
        title="OVERVIEW"
        description="Overview of general revenue and profit"
      />
      <Box>
        <OverviewChart {...data} />
      </Box>
    </Box>
  );
};

export default Overview;
