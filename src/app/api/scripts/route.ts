import { NextResponse } from 'next/server'
// import { getDataListParser } from '../../../../scripts/load-data'
export async function GET() {
  try {
    // const list = await getDataListParser()
    return NextResponse.json({
      success: 'success'
      // list
    })
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { error: 'Error' },
      {
        status: 500
      }
    )
  }
}
