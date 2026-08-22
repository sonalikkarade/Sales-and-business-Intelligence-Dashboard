# System Architecture

## High-Level Architecture

```
┌─────────────────┐     ┌──────────────────┐     ┌──────────────────┐
│   Raw CSV       │────▶│  Python Pipeline │────▶│  MySQL Database  │
│   Dataset       │     │  (Clean/Validate)│     │  sales_bi_platform│
└─────────────────┘     └──────────────────┘     └────────┬─────────┘
                                                          │
                    ┌─────────────────────────────────────┘
                    │
                    ▼
           ┌──────────────────┐
           │   FastAPI        │
           │   Backend        │
           │   (REST API)     │
           └────────┬─────────┘
                    │
                    ▼
           ┌──────────────────┐
           │   React          │
           │   Frontend       │
           │   (Vite +        │
           │    Tailwind)     │
           └────────┬─────────┘
                    │
                    ▼
           ┌──────────────────┐
           │  Plotly Charts   │
           │  Interactive     │
           │  Dashboard       │
           └──────────────────┘

┌──────────────────────────────────────────────────────────┐
│  Power BI Integration Layer                              │
│  (MySQL → Power BI Desktop → Interactive Reports)        │
└──────────────────────────────────────────────────────────┘
```

## Layer Responsibilities

### Data Layer
- **Raw CSV:** Original untouched dataset (`sales_business_intelligence_dataset.csv`)
- **Processed Data:** Cleaned, validated, enriched data ready for analytics

### Processing Layer
- **Dataset Inspector:** Profiles CSV structure, identifies columns, detects issues
- **Column Mapper:** Maps raw columns to internal standardized names
- **Data Cleaner:** Handles duplicates, missing values, data type conversions, business validation
- **Derived Fields:** Creates year, month, quarter, profit_margin

### Database Layer
- **Connection Manager:** Handles MySQL connections with pooling
- **SQLAlchemy Models:** Defines table schema with indexes
- **Repository:** Encapsulates all SQL queries and analytics logic
- **Seeder:** Automates database initialization and data import

### Backend Layer
- **FastAPI Application:** Main API entry point with CORS middleware
- **API Routes:** Organized endpoints (health, dashboard, analytics, filters, insights, export)
- **Services:** Business logic layer (dashboard, analytics, filter, insight, export services)
- **Schemas:** Pydantic models for request/response validation
- **Utils:** Formatters for currency, dates, numbers

### Frontend Layer
- **React App:** SPA with React Router
- **Layout:** Collapsible sidebar, header, page container
- **Components:** Reusable KPI cards, charts, filters, insights
- **Hooks:** Custom hooks for data fetching
- **API Client:** Centralized API communication

### Visualization Layer
- **Plotly Charts:** Interactive, responsive charts with tooltips
- **Chart Types:** Line, bar, pie, scatter, area charts
- **Filtering:** All charts respond to filter changes dynamically

### Power BI Layer
- **Connection Guide:** MySQL to Power BI Desktop
- **DAX Measures:** Pre-built formulas for KPIs
- **Dashboard Design:** Recommended pages and layouts
- **Power Query Steps:** Data transformation instructions

## Data Flow

1. **CSV Discovery:** System locates the real CSV dataset in the workspace
2. **Inspection:** Python inspects columns, types, missing values, duplicates
3. **Cleaning:** Pandas cleans data, handles issues, creates derived fields
4. **Database:** SQLAlchemy creates tables and imports cleaned data
5. **Analytics:** SQL queries aggregate data for KPIs and charts
6. **API:** FastAPI exposes analytics via REST endpoints
7. **Frontend:** React fetches data and renders interactive dashboard
8. **Insights:** Backend generates deterministic business insights
9. **Export:** Backend supports CSV export of filtered data
10. **Power BI:** Same MySQL data can be connected to Power BI Desktop

## Technology Choices

- **Python 3.11+:** Data processing and backend
- **FastAPI:** Modern, fast API with automatic docs
- **SQLAlchemy:** ORM with MySQL support
- **MySQL 8+:** Relational database for structured analytics
- **React 18:** Component-based UI
- **Vite:** Fast build tool and dev server
- **Tailwind CSS:** Utility-first styling
- **Plotly:** Interactive charting
- **Framer Motion:** Subtle professional animations
