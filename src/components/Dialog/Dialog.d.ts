export interface IProps {
  show: boolean
  El: ReactNode
  stop?: boolean
  click?: () => unknown | void
}