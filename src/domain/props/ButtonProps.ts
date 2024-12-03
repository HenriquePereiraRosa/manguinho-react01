export type ButtonProps = React.DetailedHTMLProps<
React.ButtonHTMLAttributes<HTMLButtonElement>,
HTMLButtonElement
> & {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
  disabled: boolean
}
