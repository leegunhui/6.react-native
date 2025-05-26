import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function Calculator() {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [result, setResult] = useState(null);

  const handleOperation = (op) => {
    const n1 = parseFloat(num1);
    const n2 = parseFloat(num2);

    if (isNaN(n1) || isNaN(n2)) {
      setResult('입력이 옳지 않습니다');
      return;
    }

    let res;
    switch (op) {
      case '+':
        res = n1 + n2;
        break;
      case '-':
        res = n1 - n2;
        break;
      case '*':
        res = n1 * n2;
        break;
      case '/':
        res = n2 === 0 ? 'Error: Divide by zero' : n1 / n2;
        break;
      default:
        res = 'Unknown operation';
    }

    setResult(res.toString());
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Enter first number"
        value={num1}
        onChangeText={setNum1}
      />
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Enter second number"
        value={num2}
        onChangeText={setNum2}
      />

      <View style={styles.resultContainer}>
        <Text style={styles.resultText}>
          {result === null ? 'Enter numbers and select operation' : result}
        </Text>
      </View>

      <View style={styles.buttonRow}>
        {['+', '-', '*', '/'].map((op) => (
          <TouchableOpacity
            key={op}
            style={styles.opButton}
            onPress={() => handleOperation(op)}
          >
            <Text style={styles.opButtonText}>{op}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },

  input: {
    height: 50,
    borderColor: 'lightgray',
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 28,
    paddingHorizontal: 15,
    marginVertical: 10,
    textAlign: 'center',
  },

  resultContainer: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15,
  },

  resultText: {
    fontSize: 22,
  },

  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    marginTop: 10,
  },

  opButton: {
    backgroundColor: 'blue',
    borderRadius: 10,
    width: 70,          
    height: 100,      
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  opButtonText: {
    color: 'white',
    fontSize: 28,
    fontWeight: '600',
  },
});
