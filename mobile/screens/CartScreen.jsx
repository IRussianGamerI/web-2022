import {Button, Dimensions, ScrollView, StyleSheet, View, Image, Text} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { axiosInstance } from '../api';
import {setCart} from "../store/cartSlice";

const window = Dimensions.get('window');

export default function CartScreen() {
    const dispatch = useDispatch();
    const { cart } = useSelector((store) => store.cart);

    useEffect(() => {
        async function getWholeCart() {
            await axiosInstance
                .get('ExpandedApps/')
                .then((response) => {
                    dispatch(setCart(response?.data))
                });
        }
        getWholeCart();
    }, [dispatch]);

    const handleDelete = (id) => {
        const fetchDelete = async (id) => {
            await axiosInstance
                .delete(`Applications/${id}/`)
                .then(
                    async () =>
                        await axiosInstance
                            .get('ExpandedApps/')
                            .then((response) => {
                                dispatch(setCart(response?.data))
                            })
                );
        };
        fetchDelete(id);
    };

    return (
        <ScrollView>
            {cart.map((note) => (
                <View style={styles.card}>
                    <Image resizeMode='contain' style={styles.image} source={{ uri: note?.AdID.Photo }} />
                    <Text style={styles.text}>Название: {note?.AdID.Title}</Text>
                    <Text style={styles.text}>Описание: {note?.AdID.Description}</Text>
                    <Text style={styles.text}>Цена: {note?.AdID.Price} р.</Text>
                    <Text style={styles.text}>Статус: {note?.Status}</Text>
                    <Button title='Удалить' onPress={() => handleDelete(note?.id)} />
                </View>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    card: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: '#fff',
        width: '100%',
        gap: 12,
        marginBottom: 8,
    },
    image: {
        width: 400,
        height: 400,
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontSize: 16,
        color: '#111',
    }
});
