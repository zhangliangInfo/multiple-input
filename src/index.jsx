import * as React from 'react'
import {Input, Icon } from 'antd';
import omit from 'omit.js';
import './style/index.less'

class MultipleInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleContentKeyDown = this.handleContentKeyDown.bind(this);
    this.handleContentClick = this.handleContentClick.bind(this);

    this.state = {
      values: [],
      inputValue: '',
      count: 0,
      isCeil: false,
    }
  }

  handleChange(e) {
    let { value } = e.target;
    const {inputObj, inputValueCnt} = this.refs;
    const {isCeil} = this.state;
    this.props.selectChange && this.props.selectChange(isCeil);
    if(isCeil) {
      return;
    }
    this.setState({
      inputValue: value
    }, () => {
      let width = Math.ceil(getComputedStyle(inputValueCnt).width && getComputedStyle(this.refs.inputValueCnt).width.split('px')[0] || 0);
      inputObj.style.width = (value ? width : 5) + 'px';
    });
  }

  handleKeyDown(e) {
    e.stopPropagation();
    let {keyCode} = e;
    if(keyCode == 188 || keyCode == 229) { // 半角
      let {inputValue, values, isCeil} = this.state;
      if(keyCode == 229) {
        if(!/(,|，)$/g.test(inputValue)) return;
      }
      inputValue = inputValue.replace(/(,|，)/g, '');
      // 输入分隔符的时候生成单词,写入values数组中
      if(inputValue !== '') {
        values.push(inputValue);
        this.setState({
          values,
          inputValue: ''
        }, () => {
          let {selectMax} = this.props;
          this.setState({
            isCeil: selectMax && this.state.values.length >= selectMax
          });
        });
        this.refs.inputObj.style.width = '5px';
      }
      // 随着输入滚动
      let {refContentWrap, refContent} = this.refs;
      let timeoutId = setTimeout(function() {
        refContentWrap.scrollTo(getComputedStyle(refContent).width && getComputedStyle(refContent).width.split('px')[0], 0);
      }, 0);
      // clearTimeout(timeoutId)
    } else if(keyCode == 37 || keyCode == 8) {
      let { count, values } = this.state;
      let max = values.length;
      let {inputObj, refContent} = this.refs;
      let markPos = inputObj.selectionStart;
      if(max == 0) return;
      if(markPos != 0) return;
      // 更新光标
      count = max - 1;
      if(keyCode == 37) {
        this.setState({
          count
        });
        const selection = getSelection();
        selection.extend(refContent, count * 2);
        selection.collapseToStart();
      } else {
        values.splice(count, 1);
        this.setState({
          count,
          values
        }, () => {
          let {selectMax} = this.props;
          this.setState({
            isCeil: selectMax && this.state.values.length >= selectMax
          });
        });
      }
    }
  }

  handleRemove(idx) {
    let {values} = this.state;
    values.splice(idx, 1);
    this.setState({
      values
    }, () => {
      let {selectMax} = this.props;
      this.setState({
        isCeil: selectMax && this.state.values.length >= selectMax
      });
    });
    this.refs.inputObj.focus();
  }

  handleContentKeyDown(e) {
    e.stopPropagation();
    
    let {keyCode} = e;
    // 监听左右方向键和backspace\delete
    if(keyCode == 37 || keyCode == 39 || keyCode == 8 || keyCode == 46) {
      let { count, values } = this.state;
      let max = values.length;
      let {refContent, inputObj} = this.refs;
      // 37 left, 39 right
      if(keyCode == 37 || keyCode == 39) {
        // 更新光标位置信息
        count = keyCode == 37 ? count == 0 ? 0 : count - 1 :
        count == max ? max : count + 1;
      } else {
        // backspace & delete
        if(keyCode == 8) {
          count = count - 1;
        }
        if(count < 0) return;
        if(count < max) {
          values.splice(count, 1);
        }
        e.preventDefault();
      }
      this.setState({
        count,
        values
      });
      if(count == max || (max - count == 1) && keyCode == 46) {
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
    let { values } = this.state;
    let {refContentWrap, refContent, inputObj} = this.refs;
    if(values.length) {
      var selection = getSelection()
      // 设置最后光标对象
      refContent.focus();
      selection.selectAllChildren(refContent);
      // selection.collapseToEnd();
      selection.collapseToStart();
      refContentWrap.scrollTo(0, 0);
    } else {
      inputObj.focus();
    }
  }

  render() {
    const { state, props } = this;
    const getFileItem = () => {
      const {values = []} = state;
      return values.map((value, idx) => {
        return [
          <div className="multiple-ant-input-placeholder" key={idx + 'placeholder'}></div>,
          <div className="multiple-ant-input-item" contentEditable="false" suppressContentEditableWarning="true" key={idx}>
            <span className="prefix"></span>
            {value}
            <span className="suffix"></span>
            <Icon type="close" onClick={this.handleRemove.bind(null, idx)} />
          </div>
        ];
      })
    }

    props.onChange(state.values);

    return <div className="multiple-ant-input">
      <div className="multiple-ant-input-wrapper" ref="refContentWrap"
        onClick={this.handleContentClick}
      >
        <div
          className="multiple-ant-input-wrap"
          contentEditable="true"
          suppressContentEditableWarning="true"
          onKeyDown={this.handleContentKeyDown}
          ref="refContent"
        >
          {getFileItem()}
          <div className="multiple-ant-input-placeholder"></div>
        </div>
        <div className="multiple-ant-input-text-wrap">
          <input className="multiple-ant-input-text"
            onChange={this.handleChange}
            onKeyUp={this.handleKeyDown}
            value={state.inputValue}
            ref="inputObj"
          />
          <div className="multiple-ant-input-text-save" ref="inputValueCnt">{state.inputValue}</div>
        </div>
      </div>
    </div>
  }
}

export default MultipleInput;