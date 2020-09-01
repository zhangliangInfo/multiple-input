import * as React from 'react';
import { Input, Icon } from 'antd';
import omit from 'omit.js';
import './style/index.less';

class MultipleInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleContentKeyDown = this.handleContentKeyDown.bind(this);
    this.handleContentClick = this.handleContentClick.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handlePaste = this.handlePaste.bind(this);

    this.state = {
      values: [],
      valuelength: 0,
      inputValue: '',
      count: 0,
      isCeil: false,
      isFocus: false
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.valuelength != prevState.valuelength) {
      this.props.onChange(this.state.values);
    }
  }

  scrollWithInput() {
    // 随着输入滚动
    let { refContentWrap, refContent } = this.refs;
    let timeoutId = setTimeout(function () {
      refContentWrap.scrollTo(
        getComputedStyle(refContent).width && getComputedStyle(refContent).width.split('px')[0],
        0
      );
    }, 0);
    // clearTimeout(timeoutId)
  }

  handleChange(e) {
    let { value } = e.target;
    const { inputObj, inputValueCnt } = this.refs;
    const { isCeil } = this.state;
    let { inputReg } = this.props;
    if ((inputReg instanceof RegExp && new RegExp(inputReg, 'g').test(value)) || inputReg == undefined) {
      this.props.selectChange && this.props.selectChange(isCeil);
      if (isCeil) {
        return;
      }
      this.setState(
        {
          inputValue: value
        },
        () => {
          let width = inputValueCnt.clientWidth;
          inputObj.style.width = (value ? width : 5) + 'px';
        }
      );
    }
  }

  handleKeyDown(e) {
    e.stopPropagation();
    let { keyCode } = e;
    if (keyCode == 188 || keyCode == 229) {
      // 半角
      let { inputValue, values, isCeil } = this.state;
      if (keyCode == 229) {
        if (!/(,|，)$/g.test(inputValue)) return;
      }
      inputValue = inputValue.replace(/(,|，)/g, '');
      // 输入分隔符的时候生成单词,写入values数组中
      if (inputValue !== '') {
        values.push(inputValue);
        this.setState(
          {
            values,
            inputValue: '',
            valuelength: values.length
          },
          () => {
            let { selectMax } = this.props;
            this.setState({
              isCeil: selectMax && this.state.values.length >= selectMax
            });
          }
        );
        this.refs.inputObj.style.width = '5px';
      }

      this.scrollWithInput();
    } else if (keyCode == 37 || keyCode == 8) {
      let { count, values } = this.state;
      let max = values.length;
      let { inputObj, refContent } = this.refs;
      let markPos = inputObj.selectionStart;
      if (max == 0) return;
      if (markPos != 0) return;
      // 更新光标
      count = max - 1;
      if (keyCode == 37) {
        this.setState({
          count
        });
        const selection = getSelection();
        selection.extend(refContent, count * 2);
        selection.collapseToStart();
      } else {
        values.splice(count, 1);
        this.setState(
          {
            count,
            values,
            valuelength: values.length
          },
          () => {
            let { selectMax } = this.props;
            this.setState({
              isCeil: selectMax && this.state.values.length >= selectMax
            });
          }
        );
      }
    }
  }

  handleFocus() {
    this.setState({
      isFocus: true
    });
  }

  handleBlur() {
    this.setState({
      isFocus: false
    });
  }

  handlePaste(e) {
    e.preventDefault();
    const { values } = this.state;
    const { selectMax, inputReg } = this.props;
    const inputValue = e.clipboardData.getData('text');

    if (inputValue != null && inputValue.length) {
      const inputValues = inputValue.split(/,|，/);

      inputValues.forEach((item, index) => {
        if (inputReg != null && inputReg instanceof RegExp && !new RegExp(inputReg, 'g').test(item.trim())) {
          return;
        }

        if (selectMax && this.state.values.length >= selectMax) {
          if (index === inputValues.length - 1) {
            this.setState({
              isCeil: true
            });
          }
          return;
        }

        if (item !== '') {
          values.push(item.trim());
          this.setState({
            values,
            inputValue: '',
            valuelength: values.length
          });
          this.refs.inputObj.style.width = '5px';
        }

        this.scrollWithInput();
      });
    }
  }

  handleRemove(idx) {
    let { values } = this.state;
    values.splice(idx, 1);
    this.setState(
      {
        values,
        valuelength: values.length
      },
      () => {
        let { selectMax } = this.props;
        this.setState({
          isCeil: selectMax && this.state.values.length >= selectMax
        });
      }
    );
    this.refs.inputObj.focus();
  }

  handleContentKeyDown(e) {
    e.stopPropagation();

    let { keyCode } = e;
    // 监听左右方向键和backspace\delete
    if (keyCode == 37 || keyCode == 39 || keyCode == 8 || keyCode == 46) {
      let { count, values } = this.state;
      let max = values.length;
      let { refContent, inputObj } = this.refs;
      // 37 left, 39 right
      if (keyCode == 37 || keyCode == 39) {
        // 更新光标位置信息
        count = keyCode == 37 ? (count == 0 ? 0 : count - 1) : count == max ? max : count + 1;
      } else {
        // backspace & delete
        if (keyCode == 8) {
          count = count - 1;
        }
        if (count < 0) return;
        if (count < max) {
          values.splice(count, 1);
        }
        e.preventDefault();
      }
      this.setState({
        count,
        values,
        valuelength: values.length
      });
      if (count == max || (max - count == 1 && keyCode == 46)) {
        inputObj.focus();
      } else {
        const selection = getSelection();
        selection.extend(refContent, count * 2);
        keyCode == 8 && selection.collapseToStart();
        // keyCode == 39 ? selection.collapseToEnd() : selection.collapseToStart();
      }
      // e.preventDefault();
    } else {
      e.preventDefault();
    }
  }

  handleContentClick() {
    // let { values } = this.state;
    let { refContentWrap, refContent, inputObj } = this.refs;
    inputObj.focus();
    refContentWrap.scrollTo(refContent.clientWidth, 0);
    // if(values.length) {
    //   var selection = getSelection()
    //   // 设置最后光标对象
    //   refContent.focus();
    //   selection.selectAllChildren(refContent);
    //   // selection.collapseToEnd();
    //   selection.collapseToStart();
    //   refContentWrap.scrollTo(0, 0);
    // } else {
    //   inputObj.focus();
    // }
  }

  render() {
    const { state, props } = this;
    const getFileItem = () => {
      const { values = [] } = state;
      return values.map((value, idx) => {
        return [
          <div className="multiple-ant-input-placeholder" key={idx + 'placeholder'}></div>,
          <div
            className="multiple-ant-input-item"
            contentEditable="false"
            suppressContentEditableWarning="true"
            key={idx}>
            <span className="prefix"></span>
            {value}
            <span className="suffix"></span>
            <Icon type="close" onClick={this.handleRemove.bind(null, idx)} />
          </div>
        ];
      });
    };

    let placeholder = props.placeholder || '请输入';

    return (
      <div className={state.isFocus ? 'multiple-ant-input multiple-ant-input-focus' : 'multiple-ant-input'}>
        <div className="multiple-ant-input-wrapper" ref="refContentWrap" onClick={this.handleContentClick}>
          <div
            className="multiple-ant-input-wrap"
            contentEditable="true"
            suppressContentEditableWarning="true"
            onKeyDown={this.handleContentKeyDown}
            ref="refContent">
            {getFileItem()}
            <div className="multiple-ant-input-placeholder"></div>
          </div>
          <div className="multiple-ant-input-text-wrap">
            <input
              className="multiple-ant-input-text"
              onChange={this.handleChange}
              onKeyUp={this.handleKeyDown}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
              onPaste={this.handlePaste}
              value={state.inputValue}
              ref="inputObj"
            />
            <div className="multiple-ant-input-text-save" ref="inputValueCnt">
              {state.inputValue}
            </div>
          </div>
          <div
            className={
              state.values.length || state.inputValue.length
                ? 'none multiple-ant-input-place-text'
                : 'multiple-ant-input-place-text'
            }>
            {placeholder}
          </div>
        </div>
      </div>
    );
  }
}

export default MultipleInput;
