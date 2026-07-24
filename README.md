# Restaurant Unified Operating System / 飲食店統合OS

Vanilla JavaScript ES2022、HTML5、CSS3で構築した飲食店向け統合オーダーシステムです。全画面はAPI取得データを前提にし、商品・ユーザー・注文のハードコードやモックデータを含めません。

## アプリケーションURL

- お客様モバイルオーダー: `/#/`
- 管理画面: `/#/admin` または `admin.html`
- POSレジ: `/#/pos` または `pos.html`
- POSセルフレジ監視モード: `/#/pos/self-checkout-monitor`
- ハンディーオーダー: `/#/handy`
- セルフレジ: `/#/self-checkout`
- セルフレジ専用スタッフモード: `/#/self-checkout/staff`
- キッチンディスプレイ（KDS）: `/#/kds` または `kds.html`
- 呼び出しモニター: `/#/display` または `display.html`

## 実装概要

- Fetch APIで `/api/v1/*` から店舗、商品、注文、テーブル、ユーザー、権限、監査ログ、セルフレジ状態を取得します。
- WebSocketで `/ws/orders`、`/ws/kds`、`/ws/display`、`/ws/payments`、`/ws/users`、`/ws/self-checkout` を購読します。
- PWA manifest、Service Worker、オフラインキャッシュ、Vercel rewriteを備えます。
- 共通ナビゲーション、共通サイドバー、共通タブバー、共通ヘッダーは設けず、各専用画面内だけで操作が完結します。
- iPad横画面、スマートフォン、タッチパネル、ダークモード、アクセシビリティを考慮した大型3DタッチUIです。

## 管理画面

ログインフォームの初期入力値はログインID `admin`、パスワード `2026` です。認証は `POST /api/v1/auth/login` に送信します。ユーザー管理、権限管理、店舗管理、スタッフ管理、POS管理、セルフレジ管理、ハンディー管理、KDS管理、リンク生成、QRコード管理、AIメニュー抽出、売上分析、勤怠管理、監査ログ、システム設定を含みます。

## セルフレジスタッフモード

セルフレジ初期画面で隠しコードを入力すると `/#/self-checkout/staff` に遷移します。初期値は `2026` で、管理画面のセルフレジ管理からAPI設定値として変更できます。スタッフモードは認証API、権限チェック、自動ログアウト、監査ログ記録を前提としたUIを提供します。

## 開発・デプロイ

静的ファイルのみで動作します。Vercelでは `vercel.json` のrewriteにより各HTMLとSPA hash routeを配信します。
