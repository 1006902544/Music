export interface rule {
  rule: RegExp | boolean;
  text: string
}

export type rules = Array<rule>

export interface IProps {
  label: string
  value: string
  type?: 'text' | 'password'
  change?: function
  rules?: rules
}