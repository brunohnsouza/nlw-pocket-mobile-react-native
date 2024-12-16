import { api } from "@/services/api";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Redirect, router, useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Alert, Modal, ScrollView, StatusBar, View } from "react-native";

import { Button } from "@/components/button";
import { Loading } from "@/components/loading";
import { Coupon } from "@/components/market/coupon";
import { Cover } from "@/components/market/cover";
import { Details, type DetailsProps } from "@/components/market/details";
import { IconMapPin, IconScan } from "@tabler/icons-react-native";

type DataProps = DetailsProps & {
    cover: string;
}

export default function Market() {
    const [data, setData] = useState<DataProps>();
    const [coupon, setCoupon] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [couponIsFetching, setCouponIsFetching] = useState(false);
    const [isVisibleCameraModal, setIsVisibleCameraModal] = useState(false);

    const [_, requestCameraPermissions] = useCameraPermissions();
    const { id } = useLocalSearchParams<{ id: string }>();

    const qrCodeLock = useRef(false);

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

    async function handleScan() {
        try {
            const { granted } = await requestCameraPermissions();

            if (!granted) return Alert.alert('Câmera', 'Você precisa autorizar o acesso à câmera');

            qrCodeLock.current = false;
            setIsVisibleCameraModal(true);
        } catch (error) {
            console.error(error);
            Alert.alert('Câmera', 'Não foi possível acessar a câmera');
        }
    }

    async function getCoupon(id: string) {
        try {
            setCouponIsFetching(true);
            const { data } = await api.patch(`/coupons/${id}`);

            Alert.alert('Cupom', `Cupom obtido com sucesso: ${data.coupon}`);
            setCoupon(data.coupon);
        } catch (error) {
            console.error(error);
            Alert.alert('Erro', 'Não foi possível obter o cupom');
        } finally {
            setCouponIsFetching(false);
        }
    }

    async function handleUseCoupon(id: string) {
        setIsVisibleCameraModal(false);

        Alert.alert(
            "Cupom",
            "Não é possível reutilizar o mesmo cupom, deseja realmente obter o cupom?",
            [
                {
                    text: "Não",
                    style: "cancel"
                },
                {
                    text: "Sim",
                    onPress: () => getCoupon(id)
                }
            ]
        )
    }

    useEffect(() => {
        fetchMarket();
    }, [id, coupon]);

    if (isLoading) return <Loading />;

    if (!data) return <Redirect href="/home" />;

    return (
        <View style={{ flex: 1 }}>
            <StatusBar barStyle="light-content" hidden={isVisibleCameraModal} />

            {/* Conteúdos */}
            <ScrollView showsVerticalScrollIndicator={false}>
                <Cover uri={data.cover} />
                <Details data={data} iconId={data.categoryId} />
                {coupon && <Coupon code={coupon} />}
            </ScrollView>

            {/* Ações (Scanner e retorno a localização do estabelicimento no mapa) */}
            <View style={{ padding: 32, flexDirection: "row", gap: 12 }}>
                <Button style={{ width: 56, height: 56 }} onPress={() => router.push(`/location/${id}`)}
                >
                    <Button.Icon icon={IconMapPin} />
                </Button>

                <Button style={{ flex: 1 }} onPress={handleScan}>
                    <Button.Icon icon={IconScan} />
                    <Button.Title>Ler QR Code</Button.Title>
                </Button>
            </View>

            {/* Modal da câmera */}
            <Modal style={{ flex: 1 }} visible={isVisibleCameraModal}>
                <CameraView
                    style={{ flex: 1 }}
                    facing="back"
                    onBarcodeScanned={({ data }) => {
                        if (data && !qrCodeLock.current) {
                            qrCodeLock.current = true;
                            setTimeout(() => handleUseCoupon(data), 500);
                        };
                    }}
                />

                <View style={{ position: "absolute", bottom: 32, left: 32, right: 32 }}>
                    <Button
                        onPress={() => setIsVisibleCameraModal(false)}
                        isLoading={couponIsFetching}
                    >
                        <Button.Title>Fechar</Button.Title>
                    </Button>
                </View>
            </Modal>
        </View>
    );
}