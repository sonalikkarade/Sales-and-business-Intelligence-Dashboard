const API_BASE = '/api';

async function request(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };
  
  const response = await fetch(url, config);
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'An error occurred' }));
    throw new Error(error.detail || `HTTP ${response.status}`);
  }
  
  if (response.status === 204) {
    return null;
  }
  
  return response.json();
}

export const api = {
  health: () => request('/health'),
  
  dashboard: {
    summary: (filters = {}) => {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });
      const qs = params.toString();
      return request(`/dashboard/summary${qs ? `?${qs}` : ''}`);
    },
    trends: (filters = {}) => {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });
      const qs = params.toString();
      return request(`/dashboard/trends${qs ? `?${qs}` : ''}`);
    },
  },
  
  analytics: {
    regions: (filters = {}) => {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });
      const qs = params.toString();
      return request(`/analytics/regions${qs ? `?${qs}` : ''}`);
    },
    categories: (filters = {}) => {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });
      const qs = params.toString();
      return request(`/analytics/categories${qs ? `?${qs}` : ''}`);
    },
    subcategories: (filters = {}) => {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });
      const qs = params.toString();
      return request(`/analytics/subcategories${qs ? `?${qs}` : ''}`);
    },
    products: (filters = {}) => {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });
      const qs = params.toString();
      return request(`/analytics/products${qs ? `?${qs}` : ''}`);
    },
    customers: (filters = {}) => {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });
      const qs = params.toString();
      return request(`/analytics/customers${qs ? `?${qs}` : ''}`);
    },
    segments: (filters = {}) => {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });
      const qs = params.toString();
      return request(`/analytics/segments${qs ? `?${qs}` : ''}`);
    },
    yearly: (filters = {}) => {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });
      const qs = params.toString();
      return request(`/analytics/yearly${qs ? `?${qs}` : ''}`);
    },
    discount: (filters = {}) => {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });
      const qs = params.toString();
      return request(`/analytics/discount${qs ? `?${qs}` : ''}`);
    },
    performance: (filters = {}) => {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });
      const qs = params.toString();
      return request(`/analytics/performance${qs ? `?${qs}` : ''}`);
    },
  },
  
  filters: {
    getValues: () => request('/filters'),
  },
  
  insights: {
    get: (filters = {}) => {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });
      const qs = params.toString();
      return request(`/insights${qs ? `?${qs}` : ''}`);
    },
  },
  
  export: {
    csv: (filters = {}) => {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });
      const qs = params.toString();
      return `${API_BASE}/export/csv${qs ? `?${qs}` : ''}`;
    },
  },
  
  data: {
    get: (filters = {}) => {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });
      const qs = params.toString();
      return request(`/data${qs ? `?${qs}` : ''}`);
    },
  },
};
