import { colors, fontFamily } from "@/styles/theme";
import { StyleSheet } from "react-native";

export const s = StyleSheet.create({
    container: {
        paddingTop: 20,
        paddingRight: 24,
        paddingLeft: 24,
        paddingBottom: 0,
        borderWidth: 1,
        borderColor: colors.gray[200],
        borderRadius: 20,
        backgroundColor: colors.gray[100]
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16
    },
    name: {
        fontSize: 20,
        fontFamily: fontFamily.bold,
        color: colors.gray[600],
        paddingRight: 8
    },
    coupon: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 8,
        paddingVertical: 10,
        borderRadius: 8,
        gap: 6,
        backgroundColor: colors.red.light,
    },
    code: {
        fontFamily: fontFamily.regular,
        fontSize: 16,
    },
    group: {
        width: "100%",
        paddingBottom: 16,
        marginBottom: 16
    },
})