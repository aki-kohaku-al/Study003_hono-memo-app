# 0から開発するときの手順

# Colimaのインストールと起動(Docker環境を動かすために必要)

brew install colima docker
colima start

# PostgreSQLコンテナの作成準備

・docker-compose.ymlを作成して内容を記述
docker compose up -d

# フォルダの作成＋npm開始

mkdir hono-prisma-app
cd hono-prisma-app
npm init -y

# 必要なパッケージを一括インストール

npm install hono @prisma/client @hono/node-server dotenv
npm install -D prisma typescript @types/node tsx

# Prisma初期化

npx prisma init

# .env (プロジェクト直下)

DATABASE_URL="postgresql://myuser:mypassword@localhost:5432/my_todo_db?schema=public"

# prisma/schema.prismaの一番下にテーブルのオブジェクトを追加

model Memo {
  id        Int      @id @default(autoincrement())
  content   String
  createdAt DateTime @default(now())
}

# prisma.config.tsを下記の記述にする

import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  engine: "classic",
  datasource: {
    url: env("DATABASE_URL"),
  },
});

# DB反映とClient生成

npx prisma migrate dev --name init
npx prisma generate

# 以降はAPI作成、クライアント作成を進めていく(ソース参照)
