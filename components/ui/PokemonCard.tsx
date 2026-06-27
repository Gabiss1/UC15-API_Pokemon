import { Image, StyleSheet, Text, View } from "react-native";

import { COLORS } from "../../constants/colors";
import { PokemonDetail } from "../../types/Pokemon";
import { formatPokemonName } from "../../utils/formatPokemon";

type Props = {
  pokemon: PokemonDetail;
};

export default function PokemonCard({ pokemon }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.imageBox}>
        <Image
          source={{ uri: pokemon.image }}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      <View style={styles.content}>
        <Text style={styles.number}>
          #{String(pokemon.id).padStart(3, "0")}
        </Text>

        <Text style={styles.name}>{formatPokemonName(pokemon.name)}</Text>
      </View>
      <View style={styles.details}>

            <View style={styles.typeContainer}>
                {pokemon.types.map((type) => (
                <Text key={type} style={styles.type}>
                    {type}
                </Text>
                ))}
            </View>

            <View style={styles.statsContainer}>
                {pokemon.status.map((stat) => (
                <View key={stat.status_name} style={styles.statRow}>
                    <Text style={styles.statName}>{stat.status_name}</Text>

                    <View style={styles.barContainer}>
                    <View
                        style={[
                        styles.bar,
                        { width: `${Math.min(stat.status_value, 100)}%` },
                        ]}
                    />
                    </View>

                    <Text style={styles.statValue}>{stat.status_value}</Text>
                </View>
                ))}
            </View>

            <View style={styles.infoRow}>
                <Text style={styles.info}>Altura: {pokemon.height / 10}m</Text>
                <Text style={styles.info}>Peso: {pokemon.weight / 10}kg</Text>
            </View>
      </View>
    </View>
  );
}

export const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: COLORS.card,
    borderRadius: 24,
    padding: 14,
    marginHorizontal: 20,
    marginBottom: 20,
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  image: {
    width: 92,
    height: 92,
  },
  imageBox: {
    width: 92,
    height: 92,
    borderRadius: 22,
  },
  number: {
    color: COLORS.muted,
    fontWeight: "700",
    marginBottom: 2,
  },
  content: {
    flex: 1
  },
  type: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    fontSize: 12,
    fontWeight: "800",
  },
  name: {
    color: COLORS.text,
    fontSize: 20,
    fontWeight: "900",
  },
  typeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginTop: 8,
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 10,
  },
  info: {
    color: COLORS.muted,
    fontSize: 12,
    fontWeight: "600",
  },
  statsContainer: {
    marginTop: 12,
    gap: 8,
  },
  statRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  statName: {
    width: 90,
    color: COLORS.text,
    fontWeight: "600",
    fontSize: 13,
  },
  barContainer: {
    flex: 1,
    height: 8,
    backgroundColor: "#ddd",
    borderRadius: 99,
    marginHorizontal: 10,
    overflow: "hidden",
  },
  bar: {
    height: "100%",
    backgroundColor: "#4CAF50",
    borderRadius: 99,
  },
  statValue: {
    width: 35,
    textAlign: "right",
    color: COLORS.text,
    fontWeight: "700",
  },
  details: {
    flex: 1,
    marginLeft: 16,
  }
});
