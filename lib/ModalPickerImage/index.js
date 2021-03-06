

import React from 'react';
import { View, Modal, Text, ScrollView, TouchableOpacity, Image } from 'react-native';

import PropTypes from 'prop-types';

import styles from './style';
import BaseComponent from './BaseComponent';

let componentIndex = 0;

const propTypes = {
  data: PropTypes.array,
  onChange: PropTypes.func,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
  selectStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
  optionStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
  optionTextStyle: Text.propTypes.style,
  sectionStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
  sectionTextStyle: Text.propTypes.style,
  cancelStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
  cancelTextStyle: Text.propTypes.style,
  overlayStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
  cancelText: PropTypes.string,
};

const defaultProps = {
  data: [],
  onChange: () => {},
  style: {},
  selectStyle: {},
  optionStyle: {},
  optionTextStyle: {},
  sectionStyle: {},
  sectionTextStyle: {},
  cancelStyle: {},
  cancelTextStyle: {},
  overlayStyle: {},
  cancelText: 'cancel',
};

export default class ModalPicker extends BaseComponent {
  constructor() {
    super();

    this._bind('onChange', 'open', 'close', 'renderChildren');

    this.state = {
      animationType: 'slide',
      modalVisible: false,
      transparent: false,
      selected: 'please select',
      data: []
    };
  }

  componentDidMount() {
    this.setState({ cancelText: this.props.cancelText });
    this.setState({ data: this.props.data || [] });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ data: nextProps.data });
  }

  onChange(item) {
    this.props.onChange(item);
    this.setState({ selected: item.label });
    this.close();
  }

  close() {
    this.setState({
      modalVisible: false,
    });
  }

  open() {
    this.setState({
      modalVisible: true,
    });
  }


  renderOption(option) {
    return (
      <TouchableOpacity key={option.key} onPress={() => this.onChange(option)}>
        <View
          style={[
            styles.optionStyle,
            this.props.optionStyle,
            {
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            },
          ]}
        >
          <View style={{ flex: 0.15 }}>
            <Image source={option.image} resizeMode="stretch" style={{ width: 40, height: 25 }} />
          </View>
          <View style={{ flex: 0.7, alignItems: 'center' }}>
            <Text
              style={[
                styles.optionTextStyle,
                this.props.optionTextStyle,
                { color: '#434343', fontSize: 15 },
              ]}
            >
              {option.label}
            </Text>
          </View>
          <View style={{ flex: 0.15, alignItems: 'flex-end' }}>
            <Text
              style={[
                styles.optionTextStyle,
                this.props.optionTextStyle,
                { color: 'grey', fontSize: 13 },
              ]}
            >
              {option.dialCode}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  renderOptionList() {
    const options = this.state.data.map((item) => {
       return this.renderOption(item);
    });

    return (
      <View
        style={[styles.overlayStyle, this.props.overlayStyle]}
        key={`modalPicker${componentIndex++}`}
      >
        <View style={styles.optionContainer}>
          <ScrollView keyboardShouldPersistTaps="always">
            <View style={{ paddingHorizontal: 10 }}>{options}</View>
          </ScrollView>
        </View>
        <View style={styles.cancelContainer}>
          <TouchableOpacity onPress={this.close}>
            <View style={[styles.cancelStyle, this.props.cancelStyle]}>
              <Text style={[styles.cancelTextStyle, this.props.cancelTextStyle]}>
                {this.props.cancelText}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  renderChildren() {
    if (this.props.children) {
      return this.props.children;
    }
  }

  render() {
    const dp = (
      <Modal
        transparent
        ref={(ref) => { this.modal = ref; }}
        visible={this.state.modalVisible}
        onRequestClose={this.close}
        animationType={this.state.animationType}
      >
        {this.renderOptionList()}
      </Modal>
    );

    return (
      <View style={this.props.style}>
        {dp}

        <TouchableOpacity onPress={this.open}>{this.renderChildren()}</TouchableOpacity>
      </View>
    );
  }
}

ModalPicker.propTypes = propTypes;
ModalPicker.defaultProps = defaultProps;
