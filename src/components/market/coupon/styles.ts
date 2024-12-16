import { colors, fontFamily } from "@/styles/theme";
import { StyleSheet } from "react-native";

export const s = StyleSheet.create({
    container: {
        paddingHorizontal: 32,
    },
    title: {
        color: colors.gray[500],
        fontFamily: fontFamily.medium,
        marginBottom: 12,
        fontSize: 16
    },
    content: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    code: {
        color: colors.gray[500],
        fontSize: 14,
        fontFamily: fontFamily.regular,
        lineHeight: 22.4,
        flex: 1
    }
})