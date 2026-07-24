import { endpoints, connectWS } from './api.js';

export const state = { store:null, categories:[], products:[], orders:[], tables:[], coupons:[], settings:null, users:[], roles:[], permissions:[], selfCheckout:[], logs:[] };
export const yen = (n) => new Intl.NumberFormat('ja-JP', { style:'currency', currency:'JPY' }).format(Number(n || 0));
export const qs = (s, root=document) => root.querySelector(s);
export const qsa = (s, root=document) => [...root.querySelectorAll(s)];
export const empty = (label) => `<section class="empty" role="status">${label}をAPIから取得できませんでした。接続状態と認証を確認してください。</section>`;
export async function load(keys) { await Promise.all(keys.map(async (key) => { try { state[key] = await endpoints[key](); } catch (e) { state[key] = Array.isArray(state[key]) ? [] : null; console.warn(key, e); } })); return state; }
export function bootPWA(){ if ('serviceWorker' in navigator) navigator.serviceWorker.register('/sw.js'); }
export function route(){ return location.hash.replace(/^#/, '') || '/'; }
export function setHTML(html){ qs('#app').innerHTML = html; }
export function button(label, cls='primary'){ return `<button class="btn ${cls}" type="button">${label}</button>`; }
export function panel(title, body, cls=''){ return `<section class="panel ${cls}"><h2>${title}</h2>${body}</section>`; }
export function moneyPad(){ return `<div class="keypad">${['7','8','9','4','5','6','1','2','3','0','00','←'].map(k=>`<button class="btn key" data-key="${k}">${k}</button>`).join('')}</div>`; }
export function installRealtime(paths, render){ paths.forEach((p)=>connectWS(p, () => render())); }
export function audit(action, detail={}){ const logs = JSON.parse(localStorage.getItem('ruos-audit') || '[]'); logs.unshift({ action, detail, at:new Date().toISOString() }); localStorage.setItem('ruos-audit', JSON.stringify(logs.slice(0,300))); }
export function requireRole(user, allowed){ return Boolean(user && allowed.includes(user.role)); }
export function logoutTimer(ms, cb){ let t; const reset=()=>{ clearTimeout(t); t=setTimeout(cb, ms); }; ['pointerdown','keydown','touchstart'].forEach(e=>addEventListener(e, reset, {passive:true})); reset(); return reset; }
export function productCards(products){ return products.length ? products.map(p=>`<article class="product-card"><img src="${p.imageUrl || p.image || '/assets/images/icon.svg'}" alt="${p.name}"><h3>${p.name}</h3><p>${p.description || ''}</p><strong>${yen(p.price)}</strong><button class="btn primary" data-product="${p.id}">注文</button></article>`).join('') : empty('商品情報'); }
