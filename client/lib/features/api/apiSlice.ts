import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface User {
  _id: string;
  userId: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
}

export interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  rating: number;
  supply: number;
  stat: {
    productId: string;
    yearlySalesTotal: number;
    yearlyTotalSoldUnits: number;
    year: number;
    monthlyData: {};
  };
}

export interface Transaction {
  _id: string;
  userId: string;
  customerId: string;
  productId: string;
  quantity: number;
  total: number;
  status: string;
}

export interface OverallStat {
  _id: string;
  totalSales: number;
  totalUnits: number;
  year: number;
  monthlyData: {
    month: string;
    totalSales: number;
    totalUnits: number;
  }[];
  dailyData: {
    date: string;
    totalSales: number;
    totalUnits: number;
  }[];
  salesByCategory: Record<string, number>;
  yearlySalesTotal: number;
}

export interface DashboardStats {
  totalCustomers: number;
  yearlyTotalSoldUnits: number;
  yearlySalesTotal: number;
  monthlyData: {
    month: string;
    totalSales: number;
    totalUnits: number;
  }[];
  salesByCategory: {
    shoes: number;
    clothing: number;
    accessories: number;
    misc: number;
  };
  thisMonthStats: {
    month: string;
    totalSales: number;
    totalUnits: number;
  };
  todayStats: {
    date: string;
    totalSales: number;
    totalUnits: number;
  };
  transactions: Transaction[];
}

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080" }),
  reducerPath: "userApi",
  tagTypes: [
    "User",
    "Products",
    "Customers",
    "Transactions",
    "Sales",
    "DashboardStats",
  ],
  endpoints: (builder) => ({
    getUser: builder.query<User, string | number>({
      query: (id) => `/user/${id}`,
      providesTags: ["User"],
      transformResponse: (response: User) => ({
        ...response,
        userId: response._id,
      }),
    }),
    getProducts: builder.query<Product[], void>({
      query: () => `/products`,
      providesTags: ["Products"],
    }),
    getCustomers: builder.query<User[], void>({
      query: () => ({ url: `/users`, method: "GET", params: { role: "user" } }),
      providesTags: ["Customers"],
      transformResponse: (response: User[]) =>
        response.map((user) => ({
          ...user,
          userId: user._id,
        })),
    }),
    getTransactions: builder.query<
      { transactions: Transaction[]; total: number },
      {
        page: number;
        pageSize: number;
        sort: string;
        search: string;
      }
    >({
      query: ({
        page,
        pageSize,
        sort,
        search,
      }: {
        page: number;
        pageSize: number;
        sort: string;
        search: string;
      }) => ({
        url: "/transactions",
        method: "GET",
        params: { page, pageSize, sort, search },
      }),
      providesTags: ["Transactions"],
    }),
    getSales: builder.query<OverallStat, void>({
      query: () => "/sales",
      providesTags: ["Sales"],
    }),
    getDashboardStats: builder.query<DashboardStats, void>({
      query: () => "/dashboard-stats",
      providesTags: ["DashboardStats"],
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetProductsQuery,
  useGetCustomersQuery,
  useGetTransactionsQuery,
  useGetSalesQuery,
  useGetDashboardStatsQuery,
} = apiSlice;
