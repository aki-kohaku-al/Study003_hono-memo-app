# 必要なモジュールをインストール

npm install

# コンテナ起動

docker compose up -d

# DBへ反映 & クライアント生成

# ⭐︎最初に立ち上げるときに一度のみ実行

# データベースに反映

npx prisma migrate dev --name init

# ソースコードに反映

# ※prisma migrate dev を実行すると、内部で自動的に prisma generate も実行されるため、基本的には migrate だけ打てば事足りる。

# 今回のように「Clientが初期化されていない」というエラーが出たときだけ、手動で generate を叩くイメージでOK。

npx prisma generate

# ⭐︎

# Hono サーバー起動

npx tsx src/index.ts

# ◆Docker 停止・削除

# コマンドの他に、実行したターミナルで「ctrl + c」を入力すると終了する

docker compose down

# ◆ログの確認（DBが動いているか見たい時）

docker compose logs -f
