import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { PrismaClient } from '@prisma/client'

const app = new Hono()
const prisma = new PrismaClient()

app.use('/*', cors())

app.get('/memos', async (c) => {
  const memos = await prisma.memo.findMany({ orderBy: { createdAt: 'desc' } })
  return c.json(memos)
})

app.post('/memos', async (c) => {
  const { content } = await c.req.json()
  const newMemo = await prisma.memo.create({ data: { content } })
  return c.json(newMemo)
})

app.post('/memos/delete', async (c) => {
  try {
    const { ids } = await c.req.json()
  
    const result = await prisma.memo.deleteMany({
      where: {
        id: {
          in: ids
        }
      }
    })

    // Honoでは、処理が終わった後に必ず c.json() や c.body() などでレスポンスを返す必要がある。
    return c.json({
      success: true,
      count: result.count
    })

  } catch {
    return c.json({
      success: false,
      error: '削除に失敗しました'
    }, 500)
  }
})

console.log('🚀 Server is running on http://localhost:3000')
serve({ fetch: app.fetch, port: 3000 })