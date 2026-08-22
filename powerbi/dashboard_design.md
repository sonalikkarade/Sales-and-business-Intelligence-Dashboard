# Dashboard Design

This document outlines the recommended Power BI dashboard pages and visuals.

## Page 1: Executive Overview

**Purpose:** High-level summary for executives and stakeholders.

### Visuals:
1. **KPI Cards Row** (top of page)
   - Total Sales
   - Total Profit
   - Total Orders
   - Profit Margin
   - Average Order Value

2. **Sales Trend** (line/area chart)
   - X-axis: Year-Month
   - Y-axis: Total Sales
   - Slicer: Year

3. **Profit Trend** (line/area chart)
   - X-axis: Year-Month
   - Y-axis: Total Profit

4. **Regional Sales** (horizontal bar chart)
   - X-axis: Total Sales
   - Y-axis: Region

5. **Category Breakdown** (donut chart)
   - Legend: Category
   - Values: Total Sales

6. **Slicers Panel**
   - Region
   - Segment
   - Category
   - Year

## Page 2: Product & Profitability Analysis

**Purpose:** Deep dive into product performance and profitability.

### Visuals:
1. **Top 10 Products** (horizontal bar chart)
   - Sort by: Sales descending
   - Values: Sales, Profit

2. **Bottom 10 Products** (horizontal bar chart)
   - Sort by: Sales ascending
   - Values: Sales, Profit

3. **Category Profitability** (clustered bar chart)
   - X-axis: Category
   - Y-axis: Sales, Profit

4. **Sub-Category Performance** (table/matrix)
   - Columns: Sub-Category, Sales, Profit, Quantity, Margin

5. **Discount Impact** (scatter chart)
   - X-axis: Discount
   - Y-axis: Profit
   - Bubble size: Sales

6. **Segment Comparison** (stacked bar chart)
   - X-axis: Segment
   - Y-axis: Sales, Profit

## Page 3: Customer & Regional Deep Dive

**Purpose:** Customer behavior and regional analysis.

### Visuals:
1. **Top Customers** (table)
   - Columns: Customer Name, Orders, Sales, Profit

2. **Regional Heatmap** (map visual)
   - Field: State
   - Values: Sales

3. **Monthly Performance Matrix** (matrix)
   - Rows: Year
   - Columns: Month
   - Values: Sales, Profit

4. **State-wise Performance** (bar chart)
   - X-axis: State
   - Y-axis: Sales

## Page 4: Trend Analysis

**Purpose:** Time-series and trend analysis.

### Visuals:
1. **Year-over-Year Growth** (line chart)
   - X-axis: Year
   - Y-axis: Sales, Profit

2. **Quarterly Comparison** (clustered column chart)
   - X-axis: Quarter
   - Y-axis: Sales, Profit
   - Legend: Year

3. **Monthly Heatmap** (conditional formatting table)
   - Rows: Year
   - Columns: Month
   - Values: Sales with conditional formatting

## Design Guidelines

- Use a clean white background with subtle shadows.
- Consistent color palette:
  - Sales: Blue (#3b82f6)
  - Profit: Green (#10b981)
  - Loss: Red (#ef4444)
  - Quantity: Orange (#f59e0b)
- Keep charts minimal and readable.
- Use tooltips for detailed values.
- Add page navigation buttons for smooth browsing.
