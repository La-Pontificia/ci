import { LineLoading } from 'commons/loading/line'
import Link from 'next/link'
import { useRef } from 'react'
import { cn } from 'utils'

export interface DropDownItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  closeDropDownOnclick?: boolean
  isLink?: boolean
  isExternalLink?: boolean
  href?: string
  loading?: boolean
}

export function DropDownItem({
  children,
  className,
  isLink,
  href,
  loading,
  closeDropDownOnclick,
  isExternalLink,
  ...restProps
}: DropDownItemProps) {
  const ref = useRef<HTMLButtonElement | null>(null)
  const isDisabled = !!(restProps.disabled ?? loading)
  const classname =
    'rounded-sm font-medium first:rounded-t-2xl relative bg-inherit text-neutral-800 focus-visible:outline outline-[3px] focus-visible:outline-neutral-200 last:rounded-b-2xl p-3 text-[15px] text-left'
  if (isLink && href) {
    return (
      <Link
        target={isExternalLink ? '_blank' : ''}
        className={cn(classname, className)}
        href={href}
      >
        {children}
      </Link>
    )
  }

  return (
    <button
      ref={ref}
      className={cn(classname, className, isDisabled && 'opacity-50')}
      {...restProps}
    >
      {children}
      {loading && (
        <div className="absolute top-0 rounded-[inherit] left-0 w-full h-full z-10 bg-inherit items-center flex justify-center">
          <LineLoading size={20} className="text-neutral-800" />
        </div>
      )}
    </button>
  )
}
