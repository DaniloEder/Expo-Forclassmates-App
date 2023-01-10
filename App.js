import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, Button, TouchableOpacity, Alert } from 'react-native';
import ReactHtmlParser from 'react-html-parser';
import Katex from 'react-native-katex';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './style';

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
  const [showAnswerComment, changeAnswer] = useState(false)

  const [stp, changeStep] = useState(null)
  function showStep(step){
    changeStep(step!=stp?step:null)
  }

  if(data){
    
    var steps = []
    for (let i = 0; i < data.solution_step_by_step.length; i++) {
      var step = (
        <TouchableOpacity key={'step_text_'+i} onPress={()=> showStep(i)}>
          <Katex expression={ReactHtmlParser(data.solution_step_by_step[i].text)[0].props.children[0].props.children[0]}style={styles.katex}inlineStyle={inlineStyle}displayMode={false}throwOnError={false}errorColor="#f00"macros={{}}colorIsTextColor={false}onError={() => console.error('Error')}/>
          {stp == i ? <Text key={'step_comment_'+i} style={styles.text}>{ReactHtmlParser(data.solution_step_by_step[i].comment)[0].props.children[0]}</Text> : null}
        </TouchableOpacity>        
      )
      steps[i] = step
      if (i == data.solution_step_by_step.length-1) {
        steps[i+1] = (
          <TouchableOpacity key={'step_answer'} onPress={()=> showStep(i+1)}>
            <Katex expression={ReactHtmlParser(data.answer)[0].props.children[0].props.children[0]}style={styles.katex}inlineStyle={inlineStyle}displayMode={false}throwOnError={false}errorColor="#f00"macros={{}}colorIsTextColor={false}onError={() => console.error('Error')}/>
            {stp == i+1 ? <Text style={styles.text}>{ReactHtmlParser(data.answer_comment)[0].props.children[0]}</Text> : null}
          </TouchableOpacity>
        )
      }

    }

    return (
      <ScrollView style={styles.container} contentContainerStyle={{flexGrow:1}}>
        <View style={styles.session}>
          <View style={styles.console}>
            <View style={styles.topBlock}>
              <Text style={[styles.text, {width: '40%'}]}>{ReactHtmlParser(data.assignment)[0].props.children[0]}</Text>
              <View style={styles.infoBlock}>
                <Icon.Button style={[styles.icon, {marginLeft: 0}]} name={data.difficulty > 0 ? "star" : "star-o"} size={18} color="#ecc014"></Icon.Button>
                <Icon.Button style={styles.icon} name={data.difficulty > 1 ? "star" : "star-o"} size={18} color="#ecc014"></Icon.Button>
                <Icon.Button style={styles.icon} name={data.difficulty > 2 ? "star" : "star-o"} size={18} color="#ecc014"></Icon.Button>
                <Icon.Button style={styles.icon} name={data.difficulty > 3 ? "star" : "star-o"} size={18} color="#ecc014"></Icon.Button>
                <Icon.Button style={styles.icon} name={data.difficulty > 4 ? "star" : "star-o"} size={18} color="#ecc014"></Icon.Button>
                <Icon.Button style={styles.icon} name="hourglass-half" size={18} color="#000"></Icon.Button>
                <Text style={{fontSize:20, marginTop:2}}>{parseInt(data.duration/60)} min.</Text>
              </View>
            </View>
            <Katex expression={ReactHtmlParser(data.assignment)[1].props.children[0].props.children[0]}style={styles.katex}inlineStyle={inlineStyle}displayMode={false}throwOnError={false}errorColor="#f00"macros={{}}colorIsTextColor={false}onError={() => console.error('Error')}/>

            <View style={styles.options}>
              <View style={styles.btn}>
                <Button
                  title={showHelp ? 'Hide Help' : 'Show Help'}
                  onPress={()=>changeHelp(showHelp ? false : true)}
                />
              </View>
              <View style={[styles.answer, !showHelp ? {backgroundColor: '#fff'} : {backgroundColor: '#f4f4ff'}]}>
                {showHelp ? <Text style={styles.text}>{ReactHtmlParser(data.assignment_comment)[0].props.children[0]}</Text>: null}
              </View>
            </View>

            {steps}

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
