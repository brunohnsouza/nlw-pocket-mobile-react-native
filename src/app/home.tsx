import { Button } from "@/components/button";
import { Categories, type CategoriesProps } from "@/components/categories";
import type { PlaceProps } from "@/components/place/index";
import { Places } from "@/components/places/index";
import { api } from "@/services/api";
import { colors, fontFamily } from "@/styles/theme";
import { LocationAccuracy, type LocationObject, getCurrentPositionAsync, requestForegroundPermissionsAsync, watchPositionAsync } from 'expo-location';
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Alert, Modal, Text, TouchableOpacity, View } from "react-native";
import MapView, { Callout, Marker } from "react-native-maps";

type MarketsProps = PlaceProps & {
    latitude: number;
    longitude: number;
}

const currentLocation = {
    latitude: -23.561187293883442,
    longitude: -46.656451388116494,
}

export default function Home() {
    const [categories, setCategories] = useState<CategoriesProps>([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [markets, setMarkets] = useState<MarketsProps[]>([]);

    async function fetchCategories() {
        try {
            const { data } = await api.get('/categories');
            setCategories(data);
            setSelectedCategory(data[0].id);
        } catch (error) {
            console.log(error);
            Alert.alert("Categorias", 'Não foi possível carregar as categorias.');
        }
    }

    async function fetchMarkets() {
        try {
            if (!selectedCategory) return;

            const { data } = await api.get(`/markets/category/${selectedCategory}`);
            setMarkets(data);
        } catch (error) {
            console.log(error);
            Alert.alert("Locais", 'Não foi possível carregar os locais.');
        }
    }

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        fetchMarkets();
    }, [selectedCategory]);

    return (
        <View style={{ flex: 1, backgroundColor: "#CECECE" }}>
            {/* Categorias */}
            <Categories
                data={categories}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
            />

            <Button onPress={() => router.navigate(`/location/${markets[0].id}`)}>
                <Text style={{ fontFamily: fontFamily.bold, color: colors.gray[100] }}>Ver todos</Text>
            </Button>

            {/* Mapa */}
            <MapView
                style={{ flex: 1 }}
                initialRegion={{
                    latitude: currentLocation.latitude,
                    longitude: currentLocation.longitude,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005,
                }}
            >
                <Marker
                    identifier="current"
                    coordinate={{
                        latitude: currentLocation.latitude,
                        longitude: currentLocation.longitude,
                    }}
                    image={require('@/assets/location.png')}
                />

                {
                    markets.map((market) => (
                        <Marker
                            key={market.id}
                            identifier={market.id}
                            coordinate={{
                                latitude: market.latitude,
                                longitude: market.longitude,
                            }}
                            image={require('@/assets/pin.png')}
                            onPress={() => router.push(`/location/${market.id}`)}
                        />
                    ))
                }
            </MapView>

            {/* Lista de locais */}    
            <Places data={markets} />
        </View>
    )
} 