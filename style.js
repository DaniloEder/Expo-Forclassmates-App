import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container:{
      flex: 1,
      padding: 2,
      marginTop: 20,
    },
    session: {
      flex: 1,
      padding: 10,
      backgroundColor: '#f3f3fe',
    },
    console:{
      padding: 5,
      paddingTop: 0,
      backgroundColor: '#fff',
    },
    topBlock:{
      flexDirection: 'row',
    },
    infoBlock:{
      flexDirection: 'row',
      marginLeft: 5,
      width: '60%',
      maxHeight: 29,
      backgroundColor: '#f3f3fe',
    },
    icon:{
      marginTop: -5,
      marginRight: -14,
      marginLeft: -8,
      backgroundColor: '#f3f3fe',
    },
    options: {
      width:'100%',
      minHeight: 50,
      flexDirection: 'row',
    },
    btn: {
      width: '22%',
      marginLeft: '3%',
      height: '100%',
    },
    answer: {
      flex: 1,
      padding: 5,
    },
    text:{
      width: '100%',
      fontSize: 15,
      color: '#000',
    },
    katex: {
      minHeight: 70,
      maxHeight: 70,
      marginTop: 10,
      width: '100%',
    }
});