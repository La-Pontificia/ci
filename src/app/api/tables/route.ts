import { getAllTables } from 'libs/server'
import { NextResponse, type NextRequest } from 'next/server'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(req: NextRequest) {
  try {
    const table = await getAllTables()
    return NextResponse.json(table, { status: 200 })
  } catch (error) {
    return NextResponse.json(error, { status: 500 })
  }
}
