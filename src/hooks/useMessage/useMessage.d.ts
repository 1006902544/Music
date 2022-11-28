export interface IProps {
  rootDom: HTMLElement
  parentDom: HTMLElement
  timeout: number
  text: string | number
  type: 'success' | 'failed' | 'warn' | 'none'
  unmount: () => void
}