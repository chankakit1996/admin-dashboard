"use client";

import { HomePageHeader } from "@/app/components/HomePageLayout";
import { useGetProductsQuery } from "@/lib/features/api/apiSlice";
import {
  Box,
  CircularProgress,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Rating,
  Collapse,
  Grid2 as Grid,
} from "@mui/material";
import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import { Product } from "@/lib/features/api/apiSlice";
import { useState } from "react";
import { styled } from "@mui/system";
import { useTheme } from "@mui/material";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled(IconButton)<ExpandMoreProps>(
  ({ theme, expand }: { theme: any; expand: boolean }) => ({
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
    transform: expand ? "rotate(180deg)" : "rotate(0deg)",
  })
);

function ProductCard({ product }: { product: Product }) {
  const theme = useTheme();
  const { _id, supply, stat } = product;
  const [expanded, setExpanded] = useState(false);

  return (
    <Box sx={{ minWidth: 150 }}>
      <Card variant="outlined">
        <CardActionArea onClick={() => setExpanded(!expanded)}>
          <CardContent>
            <Typography
              gutterBottom
              sx={{ color: theme.palette.secondary[200], fontSize: 14 }}
            >
              {product.category}
            </Typography>
            <Typography variant="h5" component="div">
              {product.name}
            </Typography>
            <Typography sx={{ color: theme.palette.secondary[200], mb: 1.5 }}>
              ${product.price}
            </Typography>
            <Typography variant="body2">
              <Rating value={product.rating} />
            </Typography>

            <ExpandMore
              expand={expanded}
              onClick={() => setExpanded(!expanded)}
              aria-expanded={expanded}
              aria-label="show more"
              disableRipple
              sx={{
                paddingLeft: "0px",
                paddingRight: "0px",
              }}
            >
              <ExpandMoreIcon
                className="abc"
                sx={{
                  "& > span": {
                    backgroundColor: "transparent",
                    boxShadow: "none",
                  },
                }}
              />
            </ExpandMore>
          </CardContent>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent sx={{ color: "text.secondary", paddingTop: "0px" }}>
              <Typography>id: {_id}</Typography>
              <Typography>Supply Left: {supply}</Typography>
              <Typography>
                Yearly Sales This Year: {stat.yearlySalesTotal}
              </Typography>
              <Typography>
                Yearly Units Sold This Year: {stat.yearlyTotalSoldUnits}
              </Typography>
            </CardContent>
          </Collapse>
        </CardActionArea>
      </Card>
    </Box>
  );
}

export default function ProductsPage() {
  const { data, isLoading } = useGetProductsQuery();

  return (
    <Box m="1.5rem 2.5rem" sx={{ flexGrow: 1 }}>
      <HomePageHeader title="Products" description="View a list of products" />
      {isLoading || !data ? (
        <Box display="flex" justifyContent="center" alignItems="center">
          <CircularProgress color="primary" />
        </Box>
      ) : (
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {data.map((product) => (
            <Grid key={product._id} size={{ xs: 2, sm: 4, md: 4 }}>
              <ProductCard key={product._id} product={product} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
