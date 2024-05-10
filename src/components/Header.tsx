import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {DW} from '../utils/responsive';

interface HeaderComponentProps {
  title: string;
}

const HeaderComponent = (props: HeaderComponentProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>{props.title}</Text>
    </View>
  );
};

export default HeaderComponent;

const styles = StyleSheet.create({
  container: {
    paddingLeft: DW(5),
  },
  headerText: {
    fontSize: DW(5),
    fontWeight: 'bold',
    paddingHorizontal: DW(2),
    paddingBottom: DW(3),
  },
});
