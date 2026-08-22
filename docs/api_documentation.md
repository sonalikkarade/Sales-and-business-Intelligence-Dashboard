# API Documentation

Base URL: `http://localhost:8000/api`

Interactive docs available at: `http://localhost:8000/docs`

## Endpoints

### Health Check

**GET** `/health`

Returns application and database health status.

**Response:**
```json
{
  "status": "healthy",
  "database": "connected",
  "app": "running",
  "version": "1.0.0"
}
```

### Dashboard Summary

**GET** `/dashboard/summary`

Returns KPI summary based on applied filters.

**Query Parameters:**
- `year` (optional): Filter by year
- `region` (optional): Filter by region
- `category` (optional): Filter by category
- `sub_category` (optional): Filter by sub-category
- `segment` (optional): Filter by segment
- `state` (optional): Filter by state
- `start_date` (optional): Filter by start date (YYYY-MM-DD)
- `end_date` (optional): Filter by end date (YYYY-MM-DD)

**Response:**
```json
{
  "total_sales": 12345678.90,
  "total_profit": 1234567.89,
  "total_orders": 1500,
  "total_quantity": 8021,
  "profit_margin": 10.0,
  "average_order_value": 8230.45
}
```

### Dashboard Trends

**GET** `/dashboard/trends`

Returns monthly sales and profit trends.

**Query Parameters:** Same as summary.

**Response:**
```json
{
  "trends": [
    {
      "year": 2024,
      "month": 1,
      "label": "2024-01",
      "sales": 450000.00,
      "profit": 45000.00
    }
  ]
}
```

### Analytics - Regions

**GET** `/analytics/regions`

Returns sales and profit breakdown by region.

### Analytics - Categories

**GET** `/analytics/categories`

Returns sales and profit breakdown by category.

### Analytics - Sub-Categories

**GET** `/analytics/subcategories`

Returns sales and profit breakdown by sub-category.

### Analytics - Products

**GET** `/analytics/products`

Returns top 10 and bottom 10 products by sales.

**Response:**
```json
{
  "top_products": [...],
  "bottom_products": [...]
}
```

### Analytics - Customers

**GET** `/analytics/customers`

Returns top 10 customers by sales.

### Analytics - Segments

**GET** `/analytics/segments`

Returns performance by customer segment.

### Analytics - Yearly

**GET** `/analytics/yearly`

Returns yearly sales and profit comparison.

### Analytics - Discount

**GET** `/analytics/discount`

Returns sales and profit by discount level.

### Analytics - Performance

**GET** `/analytics/performance`

Returns combined regional, category, segment, and yearly analytics.

### Filters

**GET** `/filters`

Returns available filter values based on actual data.

**Response:**
```json
{
  "regions": ["Central", "East", "North", "South", "West"],
  "segments": ["Consumer", "Corporate", "Home Office"],
  "categories": ["Furniture", "Office Supplies", "Technology"],
  "sub_categories": ["Accessories", "Art", "Bookcases", ...],
  "years": [2026, 2025, 2024],
  "states": ["Bihar", "Delhi", "Gujarat", ...],
  "products": ["Business Laptop", "Ergonomic Chair", ...],
  "customers": ["Customer 001", "Customer 002", ...]
}
```

### Insights

**GET** `/insights`

Returns dynamically generated business insights.

### Export CSV

**GET** `/export/csv`

Exports filtered data as CSV file.

**Response:** CSV file download

## Error Responses

All endpoints return errors in the following format:

```json
{
  "detail": "Error message"
}
```

Common HTTP status codes:
- 200: Success
- 404: Resource not found
- 500: Server error
