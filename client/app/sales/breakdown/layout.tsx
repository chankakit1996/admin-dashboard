import { Box, CircularProgress } from "@mui/material";
import { HomePageHeader } from "@/app/components/HomePageLayout";

const BreakDownLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box m="1.5rem 2.5rem" sx={{ flexGrow: 1 }}>
      <HomePageHeader
        title="BREAKDOWNS"
        description="Breakdown of sales by category"
      />
      {children}
    </Box>
  );
};

export default BreakDownLayout;
