import React from "react";
import { Dimensions, StyleSheet, View, Text } from "react-native";
import { useColorScheme } from "react-native-appearance";

const Card = (props: any) => {
  const { question } = props;
  const colorScheme = useColorScheme();
  const { container, text } = styles;
  const isWild = () =>
    question.includes("[WILDCARD]") || question.includes("[REMINDER]");
  return (
    <View
      style={[
        {
          backgroundColor: isWild()
            ? "#cd0000"
            : colorScheme === "dark"
            ? "#f8f8f8"
            : "#000",
        },
        container,
      ]}
    >
      <Text
        style={[
          {
            color: isWild()
              ? "#f8f8f8"
              : colorScheme === "dark"
              ? "#000"
              : "#f8f8f8",
          },
          text,
        ]}
      >
        {question}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    borderColor: "#f8f8f8",
    borderWidth: 2,
    height: "40%",
    width: Dimensions.get("screen").width * 0.9,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  regularCard: {},
  wildCard: {},
  text: {
    fontSize: 18,
    textAlign: "center",
  },
});

export { Card };
