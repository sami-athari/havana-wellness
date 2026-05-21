import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-full border border-transparent bg-clip-padding text-sm font-medium transition-colors outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-gold text-white hover:bg-gold-hover [a]:hover:bg-gold-hover",
        outline: "border border-[#E5E2DC] bg-white text-[#111111] hover:bg-[#F8F7F4]",
        secondary: "bg-[#F2F0EC] text-[#111111] hover:bg-[#E8E3DA]",
        ghost: "text-[#111111] hover:bg-[#F8F7F4]",
        destructive: "bg-red-500/10 text-red-600 hover:bg-red-500/20",
        link: "text-gold underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 gap-1.5 px-4",
        xs: "h-8 gap-1 rounded-[10px] px-3 text-xs",
        sm: "h-9 gap-1 rounded-[12px] px-3.5 text-[0.8rem]",
        lg: "h-11 gap-2 px-5",
        icon: "size-9 rounded-full",
        "icon-xs": "size-8 rounded-full",
        "icon-sm": "size-9 rounded-full",
        "icon-lg": "size-11 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

type ButtonProps = React.ComponentPropsWithoutRef<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = "default", size = "default", asChild = false, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot.Root : "button"

    return (
      <Comp
        ref={ref}
        data-slot="button"
        data-variant={variant}
        data-size={size}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
