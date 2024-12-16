import { Text, TouchableOpacity, View } from "react-native";

import { Info } from "@/components/info";
import { colors, fontFamily } from "@/styles/theme";
import { categoriesIcons } from "@/utils/categories-icons";
import { IconMapPin, IconPhone, IconTicket } from "@tabler/icons-react-native";
import { router } from "expo-router";
import { s } from "./styles";

export type DetailsProps = {
    name: string;
    description: string;
    address: string;
    phone: string;
    coupons: number;
    categoryId: string;
    rules: {
        id: string;
        description: string;
    }[];
}

type Props = {
    data: DetailsProps;
    iconId: string;
    markerId: string;
}

export function Details({ data, iconId, markerId }: Props) {
    const Icon = categoriesIcons[iconId];

    return (
        <TouchableOpacity activeOpacity={0.8} style={s.container} onPress={() => router.navigate(`/market/${markerId}`)}
        >
            <View style={s.header}>
                {/* Título */}
                <View style={{ flexDirection: "row" }}>
                    <Text style={s.name}>{data.name}</Text>
                    <Icon size={24} color={colors.green.light} />
                </View>

                {/* Cupons disponíveis */}
                <View style={[s.coupon, { backgroundColor: data.coupons !== 0 ? colors.red.light : colors.gray[200] }]}>
                    <IconTicket size={20} color={data.coupons !== 0 ? colors.red.base : colors.gray[400]} />

                    <Text style={[s.code, { color: data.coupons !== 0 ? colors.gray[600] : colors.gray[500] }]}>
                        {data.coupons}
                    </Text>
                </View>
            </View>

            {/* Informações */}
            <View style={s.group}>
                <Info icon={IconMapPin} description={data.address} />
                <Info icon={IconPhone} description={data.phone} />
            </View>
        </TouchableOpacity>
    )
}