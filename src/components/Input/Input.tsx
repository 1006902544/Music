import React, { useState, forwardRef, useImperativeHandle, useRef, useEffect } from 'react';
import { IProps } from './Input.d';
import verifyType from '@/utils/verifyType';
import './Input.less';

export interface IAllowed {
  isAllowed: boolean;
  warnText: string
}

const Input = forwardRef((props: IProps, ref): React.ReactElement => {
  const { label, change, value, rules, type } = props;

  useImperativeHandle(ref, () => ({
    isAllowed,
    warnText
  }));

  const inputRef = useRef(null);


  //如果rule是正则
  const isRegExp = (value: string, exp: RegExp): boolean => {
    const regexp = new RegExp(exp);
    return regexp.test(value);
  };

  //判断是否符合规则
  const [isAllowed, setIsAllowed] = useState<boolean>(true);
  const [warnText, setWarnText] = useState<string>('');


  const handleChange = () => {
    if (rules) {
      const res = rules.every(item => {
        const type = verifyType(item.rule);
        switch (type) {
          case 'RegExp': {
            const res = isRegExp(value, item.rule as RegExp);
            if (!res) setWarnText(item.text);
            return res;
          }
          case 'Boolean': {
            if (!item.rule) setWarnText(item.text);
            return item.rule;
          }
          default:
            return true;
        }
      });
      setIsAllowed(res);
    }
  };

  useEffect(() => {
    handleChange();
  }, [value]);


  return (
    <div className="input-container">
      <div className={["input-isallowed", isAllowed ? "input-isallowed-active" : null].join(' ')}>{warnText}</div>
      <div className="input-label">{label}</div>
      <input type={type ? type : 'text'} ref={inputRef} onChange={change} />
    </div>
  );
});

Input.displayName = 'Input';

export default Input;