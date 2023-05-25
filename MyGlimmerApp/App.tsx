import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StyleSheet,
} from 'react-native';

const GlimmerApp: React.FC = () => {
  const [diaryEntries, setDiaryEntries] = useState<
    {id: number; content: string}[]
  >([]);
  const nextTextareaIndex = useRef(1);

  const createNewEntry = () => {
    setDiaryEntries(prevEntries => [
      ...prevEntries,
      {id: nextTextareaIndex.current, content: ''},
    ]);
    nextTextareaIndex.current++;
  };

  const updateEntryContent = (index: number, content: string) => {
    setDiaryEntries(prevEntries => {
      const updatedEntries = [...prevEntries];
      updatedEntries[index].content = content;
      return updatedEntries;
    });
  };

  const renderDiaryEntries = () => {
    return diaryEntries.map((entry, index) => (
      <View key={entry.id} style={styles.diaryEntry}>
        <TextInput
          style={styles.diaryEntryTextarea}
          multiline
          value={entry.content}
          onChangeText={text => updateEntryContent(index, text)}
        />
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.contentContainer}>
        {renderDiaryEntries()}
      </ScrollView>
      <TouchableOpacity style={styles.button} onPress={createNewEntry}>
        <Text style={styles.buttonText}>New Entry</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333333',
    padding: 20,
  },
  contentContainer: {
    flex: 1,
  },
  diaryEntry: {
    width: '100%',
    height: 150,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#333',
    color: '#fff',
    fontFamily: 'Inter',
  },
  diaryEntryTextarea: {
    flex: 1,
    backgroundColor: 'transparent',
    color: '#fff',
    fontFamily: 'Inter',
  },
  button: {
    alignSelf: 'center',
    width: 200,
    height: 50,
    marginTop: 10,
    marginBottom: 20,
    backgroundColor: '#800080',
    borderWidth: 2,
    borderColor: '#651e8f',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'Inter',
    fontSize: 16,
  },
});

export default GlimmerApp;
