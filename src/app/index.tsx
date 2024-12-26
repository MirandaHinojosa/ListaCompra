import { Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Fontisto from '@expo/vector-icons/Fontisto';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useState } from "react";


interface BuysProps{
  id: number;
  name:string;
  complete: boolean;
}

export default function Index() {

  const [buys,setBuys]= useState<BuysProps[]>([])
  const [item,setItem]= useState("");

  function saveItem(){
     if(item.trim()){
       setBuys([...buys,{id:buys.length + 1, name: item ,complete:false}]);
       setItem("");
     }
   }
 

   function toggleComplete(id:number){
    const updatedBuys = buys.map((buy)=>
      buy.id ===id?{...buy,complete: !buy.complete}:buy
    );
    setBuys(updatedBuys);
   }

   function deleteItem(id: number) { 
        const updatedBuys = buys .filter(buy =>
       buy.id !== id)
        .map((buy, index) => ({ ...buy, id: index + 1 })); 
        setBuys(updatedBuys);

   }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Compra de la Semana</Text>
      <TextInput
        style={styles.input} 
        placeholder="adicione nuevo item"
        placeholderTextColor="9CA3AF" 
        onChangeText={setItem}
        value={item}
      />
      <TouchableOpacity onPress={saveItem} style={styles.button}>
        <Text style={styles.textButton}>Adicionar Item</Text>
      </TouchableOpacity>

      <View style={styles.containerCard}>
        {buys.map((item)=>(
        <View key={item.id} style={ item.complete ? [styles.Card,{backgroundColor:"#a9ffbe"}]:styles.Card}>
          <View style={styles.infoCard}>
          <Pressable onPress={()=> toggleComplete(item.id)}>
            {
              item.complete?(
                <MaterialIcons name="check-box" size={16} color="black" />
              ):(
                <MaterialCommunityIcons 
              name="checkbox-blank-outline" 
              size={20} 
              color="#D1D5DB" 
              />
              )}
            
          </Pressable>
          <Text style={styles.textItem}>{item.name}</Text>
          </View>
          <Pressable onPress={()=> deleteItem(item.id)}>
          <AntDesign name="delete" size={24} color={item.complete ? "black": "#D1D5DB"} />
          </Pressable>
        </View>
        ))}
      </View>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    // justifyContent:"center",
    alignItems:"center",
    paddingHorizontal:30,
    paddingTop:60,

    backgroundColor:"#F4F5FB",
  },
  title:{
    color:"#111827",
    fontSize :24,
    fontWeight:"bold",
    marginBottom:50,
  },
  input:{
    height:44,
    width:"100%",
    borderWidth:1,
    borderColor:"#D1D5DB",
    borderRadius:12,
    paddingHorizontal:20,
    marginBottom:20,
  },
  button:{
    width:"100%",
    height:44,
    backgroundColor:"#CA3884",
    borderRadius:12,
    alignItems:"center",
    justifyContent:"center",
    marginBottom:20,
  },
  textButton:{
    fontWeight:"semibold",
    color:"#FFFFFF",
    fontSize: 16,
  },
  infoCard:{
    flexDirection:"row",
    alignItems:"center",
    gap:10,
  },
  textItem:{
    color:"#374151",
    fontSize:16,
  },
  Card:{
    width:"100%",
    height: 57,
    backgroundColor:"#FFFFFF",
    elevation:15,
    borderRadius:12,
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    paddingHorizontal:20,
  },

  containerCard:{
    gap:20,
  },
  
})