import { Text, View } from "react-native";

import { colors, fontFamily } from "@/styles/theme";
import { categoriesIcons } from "@/utils/categories-icons";
import { IconMapPin, IconPhone, IconTicket } from "@tabler/icons-react-native";
import { Info } from "../../info";
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
}

export function Details({ data, iconId }: Props) {
    const Icon = categoriesIcons[iconId];

    return (
        <View style={s.container}>
            {/* Título */}
            <View style={{ flexDirection: "row" }}>
                <Text style={s.name}>{data.name}</Text>
                <Icon size={24} color={colors.green.light} />
            </View>

            {/* Descrição */}
            <Text style={s.description}>{data.description}</Text>

            {/* Cupons disponíveis */}
            <View style={[s.coupon, { backgroundColor: data.coupons !== 0 ? colors.red.light : colors.gray[200] }]}>
                <IconTicket size={24} color={data.coupons !== 0 ? colors.red.base : colors.gray[400]} />

                <Text style={[s.code, { color: data.coupons !== 0 ? colors.gray[600] : colors.gray[500] }]}>
                    <Text style={{ fontFamily: fontFamily.semiBold }}>{data.coupons} </Text>
                    cupons disponíveis
                </Text>
            </View>

            {/* Regulamento */}
            <View style={s.group}>
                <Text style={s.title}>Regulamento</Text>

                {data.rules.map(rule => (
                    <Text
                        key={rule.id}
                        style={s.rule}
                    >
                        {`\u2022  ${rule.description}`}
                    </Text>
                ))}
            </View>

            {/* Informações */}
            <View style={s.group}>
                <Text style={s.title}>Informações</Text>

                <Info icon={IconMapPin} description={data.address} />
                <Info icon={IconPhone} description={data.phone} />
            </View>
        </View>
    )
}