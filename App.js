import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, Button } from 'react-native';
import { parse } from 'node-html-parser';
import Katex from 'react-native-katex';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from "./style";

export default App = () => {
  const [loaded, setLoading] = useState(false);
  const [data, setData] = useState(false);

  const getData = async () => {
     try {
      const response = await fetch('http://62fe137ba85c52ee482f275b.mockapi.io/api/v1/exercise/1');
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(true);
    }
  }

  useEffect(() => {
    getData();
  }, []);
  
  const [showHelp, changeHelp] = useState(false)
  const [showSteps, changeSteps] = useState(false)
  const [showAnswerComment, changeAnswer] = useState(false)
  
  if(loaded){

    let steps = []
    for (let i = 0; i < data.solution_step_by_step.length; i++) {
      steps.push(
        <Katex key={'step_text_'+i} expression={parse(data.solution_step_by_step[i].text).childNodes[0].text}style={styles.katex}inlineStyle={inlineStyle}displayMode={false}throwOnError={false}errorColor="#f00"macros={{}}colorIsTextColor={false}onError={() => console.error('Error')}/>
      )
      steps.push(
        <Text key={'step_comment_'+i} style={styles.text}>{parse(data.solution_step_by_step[i].comment).childNodes[0].text}</Text>
      )
    }
    return (
      <ScrollView style={styles.container} contentContainerStyle={{flexGrow:1}}>
        <View style={styles.session}>
          <View style={styles.console}>
            <View style={styles.topBlock}>
              <Text style={[styles.text, {width: '40%'}]}>{parse(data.assignment).childNodes[0].text}</Text>
              <View style={styles.infoBlock}>
                <Icon.Button style={[styles.icon, {marginLeft: 0}]} name={data.difficulty > 0 ? "star" : "star-o"} size={18} color="#ecc014"></Icon.Button>
                <Icon.Button style={styles.icon} name={data.difficulty > 1 ? "star" : "star-o"} size={18} color="#ecc014"></Icon.Button>
                <Icon.Button style={styles.icon} name={data.difficulty > 2 ? "star" : "star-o"} size={18} color="#ecc014"></Icon.Button>
                <Icon.Button style={styles.icon} name={data.difficulty > 3 ? "star" : "star-o"} size={18} color="#ecc014"></Icon.Button>
                <Icon.Button style={styles.icon} name={data.difficulty > 4 ? "star" : "star-o"} size={18} color="#ecc014"></Icon.Button>
                <Icon.Button style={styles.icon} name="hourglass-half" size={18} color="#000"></Icon.Button>
                <Text style={{fontSize:20, marginTop:2}}>{parseInt(data.duration/60)+1} min.</Text>
              </View>
            </View>
            <Katex expression={parse(data.assignment).childNodes[1].text}style={styles.katex}inlineStyle={inlineStyle}displayMode={false}throwOnError={false}errorColor="#f00"macros={{}}colorIsTextColor={false}onError={() => console.error('Error')}/>

            <View style={styles.options}>
              <View style={styles.btn}>
                <Button
                  title={showSteps ? 'Hide Steps' : 'Show Steps'}
                  onPress={()=>changeSteps(showSteps ? false : true)}
                />
              </View>
              <View style={styles.btn}>
                <Button
                  title={showHelp ? 'Hide Help' : 'Show Help'}
                  onPress={()=>changeHelp(showHelp ? false : true)}
                />
              </View>
              <View style={[styles.answer, !showHelp ? {backgroundColor: '#fff'} : {backgroundColor: '#f4f4ff'}]}>
                {showHelp ? <Text style={styles.text}>{parse(data.assignment_comment).childNodes[0].text}</Text>: ''}
              </View>
            </View>

            {showSteps ? steps : ''}

            {showSteps & !showAnswerComment ? <Button title='Show Answer' onPress={()=>changeAnswer(true)} />: ''}

            {showSteps & showAnswerComment ? <View><Katex expression={parse(data.answer).childNodes[0].text}style={styles.katex}inlineStyle={inlineStyle}displayMode={false}throwOnError={false}errorColor="#f00"macros={{}}colorIsTextColor={false}onError={() => console.error('Error')}/><Text style={styles.text}>{parse(data.answer_comment).childNodes[0].text}</Text></View> : ''}

          </View>
        </View>
      </ScrollView>
    );

  }
};
const inlineStyle =`
html, body {
  justify-content: center;
  align-items: center;
  height: 100%;
  margin: 0;
  padding: 0;
}
.katex {
  font-size: 3em;
}
`;