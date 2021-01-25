

import React,{ useState,useEffect } from 'react';
import axios from 'axios';
import SplashScreen from 'react-native-splash-screen';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  Image,
  TouchableHighlight,
  Modal,
  ImageBackground,
  ActivityIndicator

} from 'react-native';


export default  function App()
{
  useEffect(() => {
    
    SplashScreen.hide();
  
  });

  const apiurl="http://www.omdbapi.com/?apikey=4d80ce0a"
//   const [loading,setLoading]=useState(
//  false
   
//   )
  const [state,SetState]=useState({
    s:"",
    results:[],
    selected:{},
    loading:false,
    poploading:false,
  
  })
const search =()=>{
  // axios(apiurl + "&s=" + state.s).then(({data})=>{
  //   let results=data.Search
 
  //   SetState(PrevState=>{
  //     return { ...PrevState, results:results}
  //   })
  
  // })
  SetState(PrevState=>{
    return { ...PrevState, loading:true,}
  })


  
  axios.get('http://www.omdbapi.com/?apikey=4d80ce0a&s=' + state.s)
  .then((res) => {
    if (res.data.Response) {
     
      if (res.data.Search && res.data.Search.length)

      // setState({
      //     results: res.data.Search,

      //   })
        SetState(PrevState=>{
             return { ...PrevState, results:res.data.Search,}
           })
        
           SetState(PrevState=>{
            return { ...PrevState, loading:false,}
          })
       


    }



  })

}
const openPopup =(id)=>{
  
  SetState(PrevState=>{
    return { ...PrevState, poploading:true,}
  })


  axios(apiurl + "&i=" +id ).then(({data})=>{
    let result=data;
    
    SetState(PrevState=>{
      return{
        ...PrevState,selected:result
      }
    })
    SetState(PrevState=>{
      return { ...PrevState, poploading:false,}
    })
   
  }
  )}
  const image = { uri: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/29e8c296-5af6-41c3-af31-df4f964dff90/d2kws23-14496ea8-e933-4063-8629-21c0dd4c09f8.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvMjllOGMyOTYtNWFmNi00MWMzLWFmMzEtZGY0Zjk2NGRmZjkwXC9kMmt3czIzLTE0NDk2ZWE4LWU5MzMtNDA2My04NjI5LTIxYzBkZDRjMDlmOC5qcGcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.SYrh4ljObjvN9pYXj_pNu9LOTkzOCH9--r2ZKUlk2ns" };

  
  return (
    <View style={styles.container}>

     <Text style={styles.title}>Movies Search</Text>
     
     <TextInput  placeholder="Enter the movie..." value={state.results}
     style={styles.searcbox}
     onChangeText={text => SetState(PrevState=>{
       return {...PrevState,s:text,loading:true}
     })}
     value={state.s}
     onSubmitEditing={search}
  />
  {
 state.loading === false? (
  <ScrollView style={styles.results}>
  
      {state.results.map(result=>(
  <TouchableHighlight  key={result.imdbID} onPress={()=>openPopup(result.imdbID) }>

        <View  style={styles.result}>
        
        <Text style={styles.heading}>{result.Title}</Text>
          <Image
            source={{uri :result.Poster}}
            style={{width:'100%',
            height:300

           }}
           resizeMode="cover"
          />
        </View>
        </TouchableHighlight>

      ))}
  </ScrollView>):
<ActivityIndicator size={100} color={'red'}/>
  }
  {
  state.poploading === false ?(
      
  <Modal
  animationType="fade"
    transparent={false}
    visible={(typeof state.selected.Title != "undefined") }>
     
  
<ImageBackground source={image} style={styles.image}>  
<View style={styles.popupTop}>
      <Text style={styles.poptitle}>{state.selected.Title}</Text>
      <Text style={styles.popuprating}>Year:   {state.selected.Year}</Text>
      <Text style={styles.polt}>Polt:   {state.selected.Plot}</Text>
  

    </View>
   </ImageBackground>
      

   
<ImageBackground
            source={{uri :state.selected.Poster}}
            style={styles.popBottom}
          //   style={{width:'100%',
          //   height:300

          //  }}
           resizeMode="cover">
          
            <TouchableHighlight onPress={()=> SetState(PrevState=>{
  return{ ... PrevState,selected:{}}
})}>
  <Text style={styles.bclose}>Close</Text>
</TouchableHighlight>
  </ImageBackground>
    
  </Modal>
  
     ):
     <ActivityIndicator size={50} color={'red'}/>
  }


    </View>
  );
};

const styles = StyleSheet.create({
 container:{
   flex:1,
   backgroundColor:'#223343',
   alignItems:'center',
   justifyContent:'flex-start',
   
   paddingHorizontal:20
 },
 title:{
   color:'#fff',
   fontSize:32,
   fontWeight:'700',
   textAlign:'center',
   marginBottom:20,

 },
 searcbox:{
   fontSize:20,
   fontWeight:'300',
   padding:20,
   width:'100%',
   backgroundColor:'#fff',
   borderRadius:8,
   marginBottom:40,
 },
 results:{
   flex:1

 },
 result:{
   flex:1,
   width:'100%',
   marginBottom:20,
 },
 heading:{
   color:'#fff',
   fontSize:18,
   fontWeight:'700',
   padding:20,
   backgroundColor:'#445565'
 },
 popupTop:{
   paddingTop:50,
 paddingHorizontal:50,

   flex:1
 },
 poptitle:{
   fontSize:24,
   fontWeight:'700',
   marginBottom:5,
 },
 bclose:{
color:'#fff',
   fontSize:20,
   fontWeight:'700',
   backgroundColor:'green',
   textAlign:'center',
   borderRadius:15,
  width:150,
   height:38
 },

   
  popBottom:{
 

     flex:1,
    width:'100%',
  justifyContent:'flex-end',

   alignItems:'center'
   
  
   },
   image:{
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
   }

 



});


