import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ReadMore = ({ text, maxLength = 100,style }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const isLongText = text.length > maxLength;
  const displayText = isExpanded ? text : text.slice(0, maxLength);

  return (
    <View style={styles.container}>
      <Text style={style}>
        {displayText}
        {!isExpanded && isLongText && (
          <>
            {'...'}
            <TouchableOpacity onPress={toggleExpand}>
              <Text style={styles.readMore}> Read More</Text>
            </TouchableOpacity>
          </>
        )}
        {isExpanded && isLongText && (
          <TouchableOpacity onPress={toggleExpand}>
            <Text style={styles.readLess}> Read Less</Text>
          </TouchableOpacity>
        )}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  readMore: {
    color: 'blue',
    fontSize: 16,
    paddingTop:15,
    paddingLeft:10
  },
  readLess: {
    color: 'blue',
    fontSize: 16,
    position:'absolute',
    top:-6,
    left:10
  },
});

export default ReadMore;