import React from 'react';
import { Button, Text, View, StyleSheet } from 'react-native';
import { colors, metrics, iconNames, iconTypes } from '../../theme';
import { Icon } from 'react-native-elements';

const styles = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    elevation: 5,
  },
  textStyle: {
    fontSize: metrics.header,
    fontWeight: 'bold',
    color: colors.primary1,
  },
  rightIconContainer: {
    position: 'absolute',
    right: 0,
    marginRight: 10,
  },
});

function Header(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>{props.title}</Text>
      {props.rightIcon && (
        <View style={styles.rightIconContainer}>
          <Icon
            // icon={{ name: props.rightIcon, type: iconTypes.MaterialIcons }}
            name={props.rightIcon}
            type={iconTypes.MaterialIcons}
            size={metrics.iconSize}
            color={colors.iconColor}
            onPress={props.onIconPress}
            // title="Add"
          />
        </View>
      )}
    </View>
  );
}

export default Header;
