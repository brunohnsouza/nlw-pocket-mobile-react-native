import { FlatList } from "react-native";

import { Category } from "../category";
import { s } from "./styles";

export type CategoriesProps = {
    id: string;
    name: string;
}[]

type Props = {
    data: CategoriesProps;
    selectedCategory: string;
    onSelectCategory: (id: string) => void;
}

export function Categories({ data, selectedCategory, onSelectCategory }: Props) {
    return (
        <FlatList
            data={data}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
                <Category 
                    name={item.name} 
                    iconId={item.id} 
                    onPress={() => onSelectCategory(item.id)}
                    isSelected={selectedCategory === item.id}
                />
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={s.content}
            style={s.container}
        />
    )
}