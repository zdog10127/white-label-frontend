import React from "react";
import {
  Box,
  Card,
  CardContent,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
} from "@mui/material";

export const DashboardCardSkeleton: React.FC = () => {
  return (
    <Card>
      <CardContent>
        <Skeleton variant="text" width="60%" height={24} />
        <Skeleton variant="text" width="40%" height={48} sx={{ mt: 1 }} />
        <Box mt={2} display="flex" gap={1}>
          <Skeleton variant="rectangular" width={80} height={24} sx={{ borderRadius: 1 }} />
          <Skeleton variant="rectangular" width={80} height={24} sx={{ borderRadius: 1 }} />
        </Box>
      </CardContent>
    </Card>
  );
};

export const DashboardChartSkeleton: React.FC = () => {
  return (
    <Card>
      <CardContent>
        <Skeleton variant="text" width="50%" height={32} sx={{ mb: 2 }} />
        <Box>
          {[1, 2, 3, 4].map((item) => (
            <Box key={item} mb={3}>
              <Skeleton variant="text" width="30%" height={20} />
              <Box display="flex" alignItems="center" gap={1} mt={1}>
                <Skeleton variant="text" width="20%" height={16} />
                <Skeleton variant="rectangular" height={8} sx={{ flex: 1, borderRadius: 1 }} />
                <Skeleton variant="text" width="10%" height={16} />
              </Box>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export const PatientTableSkeleton: React.FC<{ rows?: number }> = ({ rows = 5 }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {[1, 2, 3, 4, 5, 6].map((col) => (
              <TableCell key={col}>
                <Skeleton variant="text" width="80%" />
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.from({ length: rows }).map((_, index) => (
            <TableRow key={index}>
              <TableCell>
                <Skeleton variant="text" width="90%" />
              </TableCell>
              <TableCell>
                <Skeleton variant="text" width="70%" />
              </TableCell>
              <TableCell>
                <Skeleton variant="text" width="85%" />
              </TableCell>
              <TableCell>
                <Skeleton variant="rectangular" width={60} height={24} sx={{ borderRadius: 1 }} />
              </TableCell>
              <TableCell>
                <Skeleton variant="text" width="60%" />
              </TableCell>
              <TableCell>
                <Box display="flex" gap={1}>
                  <Skeleton variant="circular" width={32} height={32} />
                  <Skeleton variant="circular" width={32} height={32} />
                  <Skeleton variant="circular" width={32} height={32} />
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export const PatientDetailsSkeleton: React.FC = () => {
  return (
    <Box p={3}>
      <Box mb={3} display="flex" justifyContent="space-between" alignItems="center">
        <Box>
          <Skeleton variant="text" width={300} height={48} />
          <Skeleton variant="text" width={200} height={24} />
        </Box>
        <Box display="flex" gap={1}>
          <Skeleton variant="rectangular" width={100} height={40} sx={{ borderRadius: 1 }} />
          <Skeleton variant="rectangular" width={100} height={40} sx={{ borderRadius: 1 }} />
        </Box>
      </Box>

      <Box mb={3} display="flex" gap={1}>
        {[1, 2, 3, 4].map((item) => (
          <Skeleton key={item} variant="rectangular" width={120} height={32} sx={{ borderRadius: 2 }} />
        ))}
      </Box>

      <Grid container spacing={3}>
        {[1, 2, 3, 4].map((item) => (
          <Grid item xs={12} md={6} key={item}>
            <Card>
              <CardContent>
                <Skeleton variant="text" width="40%" height={32} sx={{ mb: 2 }} />
                <Box>
                  {[1, 2, 3, 4].map((line) => (
                    <Box key={line} mb={2}>
                      <Skeleton variant="text" width="30%" height={20} />
                      <Skeleton variant="text" width="70%" height={24} />
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export const FormSkeleton: React.FC = () => {
  return (
    <Box p={3}>
      <Skeleton variant="text" width="40%" height={48} sx={{ mb: 3 }} />
      
      <Grid container spacing={3}>
        {Array.from({ length: 8 }).map((_, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Skeleton variant="text" width="30%" height={20} sx={{ mb: 1 }} />
            <Skeleton variant="rectangular" height={56} sx={{ borderRadius: 1 }} />
          </Grid>
        ))}
      </Grid>

      <Box mt={4} display="flex" gap={2} justifyContent="flex-end">
        <Skeleton variant="rectangular" width={120} height={42} sx={{ borderRadius: 1 }} />
        <Skeleton variant="rectangular" width={120} height={42} sx={{ borderRadius: 1 }} />
      </Box>
    </Box>
  );
};

export const ListSkeleton: React.FC<{ items?: number }> = ({ items = 5 }) => {
  return (
    <Box>
      {Array.from({ length: items }).map((_, index) => (
        <Box key={index} p={2} borderBottom="1px solid" borderColor="divider">
          <Box display="flex" alignItems="center" gap={2}>
            <Skeleton variant="circular" width={40} height={40} />
            <Box flex={1}>
              <Skeleton variant="text" width="60%" height={24} />
              <Skeleton variant="text" width="40%" height={20} />
            </Box>
            <Skeleton variant="rectangular" width={80} height={32} sx={{ borderRadius: 1 }} />
          </Box>
        </Box>
      ))}
    </Box>
  );
};