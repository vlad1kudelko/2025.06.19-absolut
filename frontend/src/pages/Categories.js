import React from 'react';
import { useQuery } from 'react-query';
import { api } from '../services/api';
import { Card, CardContent, Typography, Box, Grid, Button, Skeleton, Alert } from '@mui/material';

const Categories = () => {
  const { data: categories, isLoading, error } = useQuery('categories', () =>
    api.get('/api/categories/').then(res => res.data)
  );

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight={200}>
        <Skeleton variant="rectangular" width={300} height={80} />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ my: 4 }}>
        Ошибка загрузки данных: {error.message}
      </Alert>
    );
  }

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" fontWeight="bold">Категории</Typography>
        <Button variant="contained" color="primary" size="large">Добавить категорию</Button>
      </Box>
      <Grid container spacing={3}>
        {categories?.results?.map((category) => (
          <Grid item xs={12} md={6} lg={4} key={category.id}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  {category.name}
                </Typography>
                <Typography color="text.secondary" gutterBottom>
                  {category.description || 'Описание отсутствует'}
                </Typography>
                <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
                  <Typography variant="body2" color="text.secondary">
                    {category.parent_name ? `Родитель: ${category.parent_name}` : 'Корневая категория'}
                  </Typography>
                  <Typography variant="caption" color="text.disabled">
                    {new Date(category.created_at).toLocaleDateString('ru-RU')}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      {categories?.results?.length === 0 && (
        <Box textAlign="center" py={8}>
          <Typography color="text.secondary" variant="h6">
            Категории не найдены
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default Categories;