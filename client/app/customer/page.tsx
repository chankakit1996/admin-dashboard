"use client";

import { useGetCustomersQuery } from "@/lib/features/api/apiSlice";
import { Box, CircularProgress } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { User } from "@/lib/features/api/apiSlice";
import { HomePageHeader } from "../components/HomePageLayout";
import { useTheme } from "@mui/material";

const columns: GridColDef<User>[] = [
  {
    field: "_id",
    headerName: "ID",
    flex: 0.25,
  },
  {
    field: "name",
    headerName: "Name",
    flex: 0.5,
  },
  {
    field: "email",
    headerName: "Email",
    flex: 1,
  },
  {
    field: "phoneNumber",
    headerName: "Phone Number",
    flex: 0.5,
    renderCell: (params) => {
      return params.value.replace(/^(\d{3})(\d{3})(\d{4})/, "($1)$2-$3");
    },
  },
  {
    field: "country",
    headerName: "Country",
    flex: 0.4,
  },
  {
    field: "occupation",
    headerName: "Occupation",
    flex: 1,
  },
  {
    field: "role",
    headerName: "Role",
    flex: 0.5,
  },
];

export default function CustomerPage() {
  const { data, isFetching } = useGetCustomersQuery();
  const theme = useTheme();

  return isFetching || !data ? (
    <Box display="flex" justifyContent="center" alignItems="center">
      <CircularProgress color="primary" />
    </Box>
  ) : (
    <Box
      m="1.5rem 2.5rem"
      sx={{
        flexGrow: 1,
        "& .MuiDataGrid-virtualScroller": {
          backgroundColor: theme.palette.primary.light,
        },
        "& .MuiDataGrid-columnHeaders": {
          border: "none",
        },
        "& .MuiDataGrid-row": {
          border: "none",
        },
        "& .MuiDataGrid-cell": {
          border: "none",
        },
        "& .MuiButtonBase-root.Mui-checked": {
          color: "inherit",
        },
      }}
      height="75vh"
    >
      <HomePageHeader
        title="Customers"
        description="List of customers, pagnation on client side only"
      />
      <DataGrid
        getRowId={(row) => row._id}
        rows={data}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 25,
              page: 0,
            },
          },
        }}
        pageSizeOptions={[25]}
        checkboxSelection
      />
    </Box>
  );
}
