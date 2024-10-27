import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ReadMore = ({ text, maxLength = 100, style }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const isLongText = text.length > maxLength;
  const displayText = isExpanded ? text : text.slice(0, maxLength);

  return (
    <Text style={style}>
      {displayText}
      {!isExpanded && isLongText && (
        <>
          {' '}
          <TouchableOpacity onPress={toggleExpand}>
            <Text style={styles.readMore}>View More</Text>
          </TouchableOpacity>
        </>
      )}
      {isExpanded && isLongText && (
        <TouchableOpacity onPress={toggleExpand}>
          <Text style={styles.readLess}>View Less</Text>
        </TouchableOpacity>
      )}
    </Text>
  );
};

const styles = StyleSheet.create({
  readMore: {
    color: '#000000',
    fontWeight: '600',
    fontSize: 14,
    marginLeft: 4,
  },
  readLess: {
    color: '#000000',
    fontWeight: '600',
    fontSize: 14,
    marginLeft: 4,
  },
});

export default ReadMore;
