import { api } from "@/services/api";
import { Redirect, router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, ScrollView, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

import { Button } from "@/components/button";
import { Loading } from "@/components/loading";
import { Details, type DetailsProps } from "@/components/location/details";
import { IconArrowLeft } from "@tabler/icons-react-native";

type DataProps = DetailsProps & {
    latitude: number;
    longitude: number;
}

export default function Location() {
    const [data, setData] = useState<DataProps>();
    const [isLoading, setIsLoading] = useState(true);

    const { id } = useLocalSearchParams<{ id: string }>();

    async function fetchMarket() {
        try {
            const { data } = await api.get(`/markets/${id}`);
            setData(data);
            setIsLoading(false);
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Não foi possível carregar os dados', [
                {
                    text: "OK",
                    onPress: () => router.back(),
                }
            ]);
        }
    }

    useEffect(() => {
        fetchMarket();
    }, [id]);

    if (isLoading) return <Loading />;

    if (!data) return <Redirect href="/home" />;

    return (
        <View style={{ flex: 1, backgroundColor: "#CECECE" }}>
            {/* Botão 'voltar' */}
            <View style={{ position: "absolute", zIndex: 10, padding: 24, paddingTop: 56 }} >
                <Button style={{ width: 40, height: 40 }} onPress={() => router.navigate("/home")}>
                    <Button.Icon icon={IconArrowLeft} />
                </Button>
            </View>

            {/* Mapa */}
            <MapView
                style={{ flex: 1 }}
                initialRegion={{
                    latitude: data?.latitude,
                    longitude: data?.longitude,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005,
                }}
            >
                <Marker
                    identifier="current"
                    coordinate={{
                        latitude: data?.latitude,
                        longitude: data?.longitude,
                    }}
                    image={require('@/assets/pin.png')}
                    onPress={() => router.navigate(`/market/${id}`)}
                />
            </MapView>

            {/* Detalhes */}
            <ScrollView style={{ position: "absolute", bottom: 32, left: 16, right: 16 }} showsVerticalScrollIndicator={false}>
                <Details data={data} iconId={data.categoryId} markerId={id} />
            </ScrollView>
        </View>
    );
}