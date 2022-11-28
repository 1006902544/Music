export type type = 'articles' | 'comments' | 'fans' | 'concerns'

export interface IProps {
  show: boolean
  type: type
}