import {Button, ScrollView, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import React, {useEffect} from 'react';
import {axiosInstance} from '../api';
import Ad from '../components/Ad';
import {setAds} from "../store/adsSlice";

export default function HomeScreen({navigation}) {
    const dispatch = useDispatch();
    const {ads} = useSelector((store) => store.ad);

    useEffect(() => {
        async function getAllAds() {
            await axiosInstance
                .get('/Ads/')
                .then((response) => {
                    dispatch(setAds(response?.data))
                });
        }
        getAllAds();
    }, [dispatch]);

    const handlePress = () => {
        navigation.navigate('Корзина');
    };

    return (
        <ScrollView>
            <Button title='Корзина' onPress={handlePress}/>
            <View>
                {!!ads &&
                ads.map((ad) => <Ad key={ad.AdID} {...ad} navigation={navigation}/>)}
            </View>
        </ScrollView>
    );
}
