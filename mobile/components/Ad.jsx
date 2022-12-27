import {View, Text, Image, StyleSheet, Button} from 'react-native';
import React from "react";

export default function Ad({navigation, ...props}) {
    const handlePress = () => {
        navigation.navigate('Объявление', {id: props.AdID});
    };

    return (
        <View style={styles.ad}>
            <Image style={styles.image} source={{uri: props.Photo}}/>
            <Text style={styles.text}>Название: {props.Title}</Text>
            <Text style={styles.text}>Цена: {props.Price} р.</Text>
            <Button title='Подробнее' onPress={handlePress}/>
        </View>
    )
}

const styles = StyleSheet.create({
    ad: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: '#fdfdfd',
        width: '100%',
        gap: 12,
        marginBottom: 8,
    },
    image: {height: 400, alignSelf: 'stretch'},
    text: {color: '#111', fontSize: 16},
});

