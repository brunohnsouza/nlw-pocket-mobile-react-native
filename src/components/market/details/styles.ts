import { colors, fontFamily } from "@/styles/theme";
import { StyleSheet } from "react-native";

export const s = StyleSheet.create({
    container: {
        padding: 32,
        paddingBottom: 0,
        borderTopStartRadius: 20,
        borderTopEndRadius: 20,
        backgroundColor: colors.gray[100]
    },
    name: {
        fontSize: 20,
        fontFamily: fontFamily.bold,
        color: colors.gray[600],
        paddingRight: 8
    },
    description: {
        fontSize: 16,
        fontFamily: fontFamily.regular,
        color: colors.gray[500],
        marginTop: 12,
        marginBottom: 16,
        lineHeight: 22
    },
    coupon: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 8,
        paddingVertical: 10,
        borderRadius: 8,
        gap: 8,
        backgroundColor: colors.red.light,
        marginBottom: 32,
    },
    code: {
        fontFamily: fontFamily.regular,
        fontSize: 14,
    },
    group: {
        width: "100%",
        borderBottomWidth: 1,
        borderBottomColor: colors.gray[200],
        paddingBottom: 16,
        marginBottom: 16
    },
    title: {
        fontSize: 16,
        fontFamily: fontFamily.medium,
        color: colors.gray[500],
        marginBottom: 12
    },
    rule: {
        color: colors.gray[500],
        fontSize: 14,
        fontFamily: fontFamily.regular,
        lineHeight: 22.4,
        paddingLeft: 8,
        flex: 1
    }
})