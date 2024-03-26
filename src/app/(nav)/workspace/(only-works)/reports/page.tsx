import Records from './records/page'

export default function page({
  searchParams
}: {
  searchParams: {
    from: string
    to: string
    cubicle: string
    tenant: string
  }
}) {
  return <Records searchParams={searchParams} />
}
