from app.database.repository import SalesRepository
from app.database.connection import SessionLocal
from typing import Dict, Any, List

class InsightService:
    def generate_insights(self, filters: Dict[str, Any]) -> List[Dict[str, Any]]:
        db = SessionLocal()
        try:
            repo = SalesRepository(db)
            insights = []
            
            kpis = repo.get_summary_kpis(filters)
            regional = repo.get_regional_analysis(filters)
            category = repo.get_category_analysis(filters)
            product = repo.get_product_analysis(filters, limit=10, bottom=False)
            bottom_product = repo.get_product_analysis(filters, limit=10, bottom=True)
            segment = repo.get_segment_analysis(filters)
            yearly = repo.get_yearly_analysis(filters)
            
            if regional.get('regions'):
                top_region = regional['regions'][0]
                insights.append({
                    'title': f"Highest Sales Region: {top_region['name']}",
                    'description': f"{top_region['name']} generated the highest sales of {top_region['sales']:,.2f} across all regions.",
                    'type': 'region',
                    'metric': 'Sales',
                    'value': f"{top_region['sales']:,.2f}",
                    'recommendation': f"Focus marketing and inventory expansion on {top_region['name']} to maintain growth."
                })
                
                low_region = regional['regions'][-1]
                insights.append({
                    'title': f"Lowest Sales Region: {low_region['name']}",
                    'description': f"{low_region['name']} had the lowest sales of {low_region['sales']:,.2f}.",
                    'type': 'region',
                    'metric': 'Sales',
                    'value': f"{low_region['sales']:,.2f}",
                    'recommendation': f"Investigate {low_region['name']} for barriers to sales and consider targeted promotions."
                })
            
            if category.get('categories'):
                top_cat = category['categories'][0]
                insights.append({
                    'title': f"Best Performing Category: {top_cat['name']}",
                    'description': f"{top_cat['name']} leads with sales of {top_cat['sales']:,.2f} and profit of {top_cat['profit']:,.2f}.",
                    'type': 'category',
                    'metric': 'Sales',
                    'value': f"{top_cat['sales']:,.2f}",
                    'recommendation': f"Increase stock and marketing for {top_cat['name']} products."
                })
                
                loss_categories = [c for c in category['categories'] if c['profit'] < 0]
                if loss_categories:
                    insights.append({
                        'title': f"Loss-Making Categories",
                        'description': f"{len(loss_categories)} category/categories are generating losses: {', '.join([c['name'] for c in loss_categories])}.",
                        'type': 'profitability',
                        'metric': 'Profit',
                        'value': f"{sum(c['profit'] for c in loss_categories):,.2f}",
                        'recommendation': "Review pricing and cost structure for loss-making categories."
                    })
            
            if product.get('top_products'):
                top_prod = product['top_products'][0]
                insights.append({
                    'title': f"Top Product: {top_prod['name']}",
                    'description': f"{top_prod['name']} is the highest-selling product with {top_prod['sales']:,.2f} in sales.",
                    'type': 'product',
                    'metric': 'Sales',
                    'value': f"{top_prod['sales']:,.2f}",
                    'recommendation': f"Ensure consistent supply of {top_prod['name']} and explore bundle opportunities."
                })
            
            if bottom_product.get('bottom_products'):
                bottom_prod = bottom_product['bottom_products'][-1]
                insights.append({
                    'title': f"Lowest Performing Product: {bottom_prod['name']}",
                    'description': f"{bottom_prod['name']} has the lowest sales of {bottom_prod['sales']:,.2f}.",
                    'type': 'product',
                    'metric': 'Sales',
                    'value': f"{bottom_prod['sales']:,.2f}",
                    'recommendation': f"Evaluate {bottom_prod['name']} for discontinuation or promotional campaigns."
                })
            
            if segment.get('segments'):
                top_seg = segment['segments'][0]
                insights.append({
                    'title': f"Top Customer Segment: {top_seg['name']}",
                    'description': f"{top_seg['name']} segment contributes {top_seg['sales']:,.2f} in sales.",
                    'type': 'segment',
                    'metric': 'Sales',
                    'value': f"{top_seg['sales']:,.2f}",
                    'recommendation': f"Create loyalty programs and targeted offers for the {top_seg['name']} segment."
                })
            
            if yearly.get('yearly'):
                best_year = max(yearly['yearly'], key=lambda x: x['sales'])
                insights.append({
                    'title': f"Best Performing Year: {best_year['year']}",
                    'description': f"{best_year['year']} achieved the highest sales of {best_year['sales']:,.2f}.",
                    'type': 'trend',
                    'metric': 'Sales',
                    'value': f"{best_year['sales']:,.2f}",
                    'recommendation': f"Analyze strategies from {best_year['year']} to replicate success in other years."
                })
            
            profit_margin = kpis.get('profit_margin', 0)
            insights.append({
                'title': f"Overall Profit Margin: {profit_margin:.1f}%",
                'description': f"The business currently operates at a {profit_margin:.1f}% profit margin based on {kpis['total_sales']:,.2f} in sales.",
                'type': 'profitability',
                'metric': 'Profit Margin',
                'value': f"{profit_margin:.1f}%",
                'recommendation': "Optimize supply chain and pricing to improve margins."
            })
            
            return insights
        finally:
            db.close()
