import { bootPWA, load, state, setHTML, installRealtime, empty } from './common.js';
bootPWA();
async function render(){ await load(['orders','store','settings']); setHTML(`<section class="display-board"><header><h1>${state.store?.name||'呼び出しモニター'}</h1><time>${new Date().toLocaleTimeString('ja-JP')}</time></header><section class="call-list">${state.orders.map(o=>`<article><strong>${o.callNumber||o.id}</strong><span>テーブル ${o.tableNumber||''}</span><em>${o.status||'提供状況'}</em></article>`).join('')||empty('呼び出し')}</section><footer><b>お知らせ</b><span>${state.settings?.notice||'APIからお知らせを取得します'}</span><b>混雑状況</b><span>待ち組数 ${state.settings?.waitingGroups??'API同期'}</span></footer></section>`); }
render(); setInterval(render, 60000); installRealtime(['/ws/display','/ws/orders'], render);
