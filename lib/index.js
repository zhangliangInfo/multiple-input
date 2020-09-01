"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("antd/es/icon/style/css");

var _icon = _interopRequireDefault(require("antd/es/icon"));

var React = _interopRequireWildcard(require("react"));

var _omit = _interopRequireDefault(require("omit.js"));

require("./style/index.less");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var MultipleInput = /*#__PURE__*/function (_React$Component) {
  _inherits(MultipleInput, _React$Component);

  var _super = _createSuper(MultipleInput);

  function MultipleInput(props) {
    var _this;

    _classCallCheck(this, MultipleInput);

    _this = _super.call(this, props);
    _this.handleChange = _this.handleChange.bind(_assertThisInitialized(_this));
    _this.handleKeyDown = _this.handleKeyDown.bind(_assertThisInitialized(_this));
    _this.handleRemove = _this.handleRemove.bind(_assertThisInitialized(_this));
    _this.handleContentKeyDown = _this.handleContentKeyDown.bind(_assertThisInitialized(_this));
    _this.handleContentClick = _this.handleContentClick.bind(_assertThisInitialized(_this));
    _this.handleFocus = _this.handleFocus.bind(_assertThisInitialized(_this));
    _this.handleBlur = _this.handleBlur.bind(_assertThisInitialized(_this));
    _this.handlePaste = _this.handlePaste.bind(_assertThisInitialized(_this));
    _this.state = {
      values: [],
      valuelength: 0,
      inputValue: '',
      count: 0,
      isCeil: false,
      isFocus: false
    };
    return _this;
  }

  _createClass(MultipleInput, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      if (this.state.valuelength != prevState.valuelength) {
        this.props.onChange(this.state.values);
      }
    }
  }, {
    key: "scrollWithInput",
    value: function scrollWithInput() {
      // 随着输入滚动
      var _this$refs = this.refs,
          refContentWrap = _this$refs.refContentWrap,
          refContent = _this$refs.refContent;
      var timeoutId = setTimeout(function () {
        refContentWrap.scrollTo(getComputedStyle(refContent).width && getComputedStyle(refContent).width.split('px')[0], 0);
      }, 0); // clearTimeout(timeoutId)
    }
  }, {
    key: "handleChange",
    value: function handleChange(e) {
      var value = e.target.value;
      var _this$refs2 = this.refs,
          inputObj = _this$refs2.inputObj,
          inputValueCnt = _this$refs2.inputValueCnt;
      var isCeil = this.state.isCeil;
      var inputReg = this.props.inputReg;

      if (inputReg instanceof RegExp && new RegExp(inputReg, 'g').test(value) || inputReg == undefined) {
        this.props.selectChange && this.props.selectChange(isCeil);

        if (isCeil) {
          return;
        }

        this.setState({
          inputValue: value
        }, function () {
          var width = inputValueCnt.clientWidth;
          inputObj.style.width = (value ? width : 5) + 'px';
        });
      }
    }
  }, {
    key: "handleKeyDown",
    value: function handleKeyDown(e) {
      var _this2 = this;

      e.stopPropagation();
      var keyCode = e.keyCode;

      if (keyCode == 188 || keyCode == 229) {
        // 半角
        var _this$state = this.state,
            inputValue = _this$state.inputValue,
            values = _this$state.values,
            isCeil = _this$state.isCeil;

        if (keyCode == 229) {
          if (!/(,|，)$/g.test(inputValue)) return;
        }

        inputValue = inputValue.replace(/(,|，)/g, ''); // 输入分隔符的时候生成单词,写入values数组中

        if (inputValue !== '') {
          values.push(inputValue);
          this.setState({
            values: values,
            inputValue: '',
            valuelength: values.length
          }, function () {
            var selectMax = _this2.props.selectMax;

            _this2.setState({
              isCeil: selectMax && _this2.state.values.length >= selectMax
            });
          });
          this.refs.inputObj.style.width = '5px';
        }

        this.scrollWithInput();
      } else if (keyCode == 37 || keyCode == 8) {
        var _this$state2 = this.state,
            count = _this$state2.count,
            _values = _this$state2.values;
        var max = _values.length;
        var _this$refs3 = this.refs,
            inputObj = _this$refs3.inputObj,
            refContent = _this$refs3.refContent;
        var markPos = inputObj.selectionStart;
        if (max == 0) return;
        if (markPos != 0) return; // 更新光标

        count = max - 1;

        if (keyCode == 37) {
          this.setState({
            count: count
          });
          var selection = getSelection();
          selection.extend(refContent, count * 2);
          selection.collapseToStart();
        } else {
          _values.splice(count, 1);

          this.setState({
            count: count,
            values: _values,
            valuelength: _values.length
          }, function () {
            var selectMax = _this2.props.selectMax;

            _this2.setState({
              isCeil: selectMax && _this2.state.values.length >= selectMax
            });
          });
        }
      }
    }
  }, {
    key: "handleFocus",
    value: function handleFocus() {
      this.setState({
        isFocus: true
      });
    }
  }, {
    key: "handleBlur",
    value: function handleBlur() {
      this.setState({
        isFocus: false
      });
    }
  }, {
    key: "handlePaste",
    value: function handlePaste(e) {
      var _this3 = this;

      e.preventDefault();
      var values = this.state.values;
      var _this$props = this.props,
          selectMax = _this$props.selectMax,
          inputReg = _this$props.inputReg;
      var inputValue = e.clipboardData.getData('text');

      if (inputValue != null && inputValue.length) {
        var inputValues = inputValue.split(/,|，/);
        inputValues.forEach(function (item, index) {
          if (inputReg != null && inputReg instanceof RegExp && !new RegExp(inputReg, 'g').test(item.trim())) {
            return;
          }

          if (selectMax && _this3.state.values.length >= selectMax) {
            if (index === inputValues.length - 1) {
              _this3.setState({
                isCeil: true
              });
            }

            return;
          }

          if (item !== '') {
            values.push(item.trim());

            _this3.setState({
              values: values,
              inputValue: '',
              valuelength: values.length
            });

            _this3.refs.inputObj.style.width = '5px';
          }

          _this3.scrollWithInput();
        });
      }
    }
  }, {
    key: "handleRemove",
    value: function handleRemove(idx) {
      var _this4 = this;

      var values = this.state.values;
      values.splice(idx, 1);
      this.setState({
        values: values,
        valuelength: values.length
      }, function () {
        var selectMax = _this4.props.selectMax;

        _this4.setState({
          isCeil: selectMax && _this4.state.values.length >= selectMax
        });
      });
      this.refs.inputObj.focus();
    }
  }, {
    key: "handleContentKeyDown",
    value: function handleContentKeyDown(e) {
      e.stopPropagation();
      var keyCode = e.keyCode; // 监听左右方向键和backspace\delete

      if (keyCode == 37 || keyCode == 39 || keyCode == 8 || keyCode == 46) {
        var _this$state3 = this.state,
            count = _this$state3.count,
            values = _this$state3.values;
        var max = values.length;
        var _this$refs4 = this.refs,
            refContent = _this$refs4.refContent,
            inputObj = _this$refs4.inputObj; // 37 left, 39 right

        if (keyCode == 37 || keyCode == 39) {
          // 更新光标位置信息
          count = keyCode == 37 ? count == 0 ? 0 : count - 1 : count == max ? max : count + 1;
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
          count: count,
          values: values,
          valuelength: values.length
        });

        if (count == max || max - count == 1 && keyCode == 46) {
          inputObj.focus();
        } else {
          var selection = getSelection();
          selection.extend(refContent, count * 2);
          keyCode == 8 && selection.collapseToStart(); // keyCode == 39 ? selection.collapseToEnd() : selection.collapseToStart();
        } // e.preventDefault();

      } else {
        e.preventDefault();
      }
    }
  }, {
    key: "handleContentClick",
    value: function handleContentClick() {
      // let { values } = this.state;
      var _this$refs5 = this.refs,
          refContentWrap = _this$refs5.refContentWrap,
          refContent = _this$refs5.refContent,
          inputObj = _this$refs5.inputObj;
      inputObj.focus();
      refContentWrap.scrollTo(refContent.clientWidth, 0); // if(values.length) {
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
  }, {
    key: "render",
    value: function render() {
      var _this5 = this;

      var state = this.state,
          props = this.props;

      var getFileItem = function getFileItem() {
        var _state$values = state.values,
            values = _state$values === void 0 ? [] : _state$values;
        return values.map(function (value, idx) {
          return [/*#__PURE__*/React.createElement("div", {
            className: "multiple-ant-input-placeholder",
            key: idx + 'placeholder'
          }), /*#__PURE__*/React.createElement("div", {
            className: "multiple-ant-input-item",
            contentEditable: "false",
            suppressContentEditableWarning: "true",
            key: idx
          }, /*#__PURE__*/React.createElement("span", {
            className: "prefix"
          }), value, /*#__PURE__*/React.createElement("span", {
            className: "suffix"
          }), /*#__PURE__*/React.createElement(_icon["default"], {
            type: "close",
            onClick: _this5.handleRemove.bind(null, idx)
          }))];
        });
      };

      var placeholder = props.placeholder || '请输入';
      return /*#__PURE__*/React.createElement("div", {
        className: state.isFocus ? 'multiple-ant-input multiple-ant-input-focus' : 'multiple-ant-input'
      }, /*#__PURE__*/React.createElement("div", {
        className: "multiple-ant-input-wrapper",
        ref: "refContentWrap",
        onClick: this.handleContentClick
      }, /*#__PURE__*/React.createElement("div", {
        className: "multiple-ant-input-wrap",
        contentEditable: "true",
        suppressContentEditableWarning: "true",
        onKeyDown: this.handleContentKeyDown,
        ref: "refContent"
      }, getFileItem(), /*#__PURE__*/React.createElement("div", {
        className: "multiple-ant-input-placeholder"
      })), /*#__PURE__*/React.createElement("div", {
        className: "multiple-ant-input-text-wrap"
      }, /*#__PURE__*/React.createElement("input", {
        className: "multiple-ant-input-text",
        onChange: this.handleChange,
        onKeyUp: this.handleKeyDown,
        onFocus: this.handleFocus,
        onBlur: this.handleBlur,
        onPaste: this.handlePaste,
        value: state.inputValue,
        ref: "inputObj"
      }), /*#__PURE__*/React.createElement("div", {
        className: "multiple-ant-input-text-save",
        ref: "inputValueCnt"
      }, state.inputValue)), /*#__PURE__*/React.createElement("div", {
        className: state.values.length || state.inputValue.length ? 'none multiple-ant-input-place-text' : 'multiple-ant-input-place-text'
      }, placeholder)));
    }
  }]);

  return MultipleInput;
}(React.Component);

var _default = MultipleInput;
exports["default"] = _default;
