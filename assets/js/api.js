const API_BASE = '/api/v1';
const WS_BASE = `${location.protocol === 'https:' ? 'wss' : 'ws'}://${location.host}`;

export async function api(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    credentials: 'include',
    ...options,
    body: options.body && typeof options.body !== 'string' ? JSON.stringify(options.body) : options.body
  });
  if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
  if (response.status === 204) return null;
  return response.json();
}

export const endpoints = {
  store: () => api('/store'), categories: () => api('/categories'), products: () => api('/products'),
  orders: () => api('/orders'), tables: () => api('/tables'), coupons: () => api('/coupons'), settings: () => api('/settings'),
  users: () => api('/users'), roles: () => api('/roles'), permissions: () => api('/permissions'), auditLogs: () => api('/audit-logs'),
  selfCheckout: () => api('/self-checkout'), selfCheckoutStatus: () => api('/self-checkout/status'), selfCheckoutLogs: () => api('/self-checkout/logs'),
  selfCheckoutSettings: () => api('/settings/self-checkout'), updateSelfCheckoutSettings: (body) => api('/settings/self-checkout', { method: 'PUT', body }),
  bill: (tableNumber) => api(`/tables/${encodeURIComponent(tableNumber)}/bill`),
  createOrder: (body) => api('/orders', { method: 'POST', body }), callStaff: (body) => api('/call-staff', { method: 'POST', body }), coupon: (body) => api('/coupon', { method: 'POST', body }),
  pay: (body) => api('/payments', { method: 'POST', body }), card: (body) => api('/payments/card', { method: 'POST', body }), qr: (body) => api('/payments/qrcode', { method: 'POST', body }), emoney: (body) => api('/payments/emoney', { method: 'POST', body }),
  refund: (body) => api('/refunds', { method: 'POST', body }), receipt: (body) => api('/receipts', { method: 'POST', body }), invoice: (body) => api('/invoices', { method: 'POST', body }),
  login: (body) => api('/auth/login', { method: 'POST', body }), logout: () => api('/auth/logout', { method: 'POST' }), resetPassword: (body) => api('/auth/reset-password', { method: 'POST', body }),
  selfAction: (action, body) => api(`/self-checkout/${action}`, { method: 'POST', body }), checkoutTable: (tableNumber, body) => api(`/tables/${encodeURIComponent(tableNumber)}/checkout`, { method: 'POST', body })
};

export function connectWS(path, onMessage) {
  const ws = new WebSocket(`${WS_BASE}${path}`);
  ws.addEventListener('message', (event) => { try { onMessage(JSON.parse(event.data)); } catch { onMessage(event.data); } });
  ws.addEventListener('close', () => setTimeout(() => connectWS(path, onMessage), 3000));
  return ws;
}
