from datetime import datetime
from decimal import Decimal

def format_currency(value: float, currency: str = "INR") -> str:
    if value is None:
        return "₹0.00"
    return f"₹{value:,.2f}"

def format_number(value: float) -> str:
    if value is None:
        return "0"
    if value >= 1_000_000:
        return f"{value/1_000_000:.2f}M"
    if value >= 1_000:
        return f"{value/1_000:.2f}K"
    return f"{value:.2f}"

def format_percentage(value: float) -> str:
    if value is None:
        return "0.0%"
    return f"{value:.1f}%"

def format_date(date_str: str) -> str:
    if not date_str:
        return ""
    try:
        dt = datetime.strptime(date_str, "%Y-%m-%d")
        return dt.strftime("%b %d, %Y")
    except Exception:
        return date_str

def format_kpi_value(value: float, metric_type: str = "currency") -> str:
    if metric_type == "currency":
        return format_currency(value)
    elif metric_type == "percentage":
        return format_percentage(value)
    elif metric_type == "number":
        return f"{int(value):,}"
    else:
        return str(value)
