import {View, Text, Image, StyleSheet, Button} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {axiosInstance} from "../api";
import {setAd, resetAd} from "../store/adsSlice";

export default function AdScreen({route}) {
    const {id} = route.params;
    const dispatch = useDispatch();
    const {ad} = useSelector((store) => store.ad);
    useEffect(() => {
        async function getAd() {
            await axiosInstance
                .get('/Ads/' + id)
                .then((response) => {
                    dispatch(setAd(response?.data))
                });
        }

        getAd();
        return () => {
            dispatch(resetAd());
        };
    }, [dispatch]);

    const handlePress = () => {
        const addCart = async () => {
            const values = {
                Status: 'Добавлено в корзину',
                AdID: +id,
                CustomerID: 1,
            };
            const response = await axiosInstance.post('Basket/', values);
        };
        addCart();
    };

    return (
        <View style={styles.card}>
            <Image style={styles.image} source={{uri: ad.Photo}}/>
            <Text style={styles.text}>Название: {ad.Title}</Text>
            <Text style={styles.text}>Описание: {ad.Description}</Text>
            <Text style={styles.text}>Цена: {ad.Price} р.</Text>
            <Button title='Добавить в корзину' onPress={handlePress}/>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexDirection: 'column',
        width: '100%',
        gap: 12,
        marginBottom: 8,
    },
    image: {height: 400, alignSelf: 'stretch'},
    text: {color: '#111', fontSize: 16},
});