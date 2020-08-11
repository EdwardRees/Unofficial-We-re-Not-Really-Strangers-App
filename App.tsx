import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { TouchableOpacity, StyleSheet, Text, View, Modal } from "react-native";
import { parse } from "./util/parse";
import { Card } from "./components";

const HowToPlay = () => {
  return <Text></Text>;
};

export default function App() {
  const [level1, setLevel1] = useState([]);
  const [level1CardsDrawn, setLevel1CardsDrawn] = useState(0);
  const [level1DrawDisabled, setLevel1DrawDisabled] = useState(false);
  const [level2, setLevel2] = useState([]);
  const [level2CardsDrawn, setLevel2CardsDrawn] = useState(0);
  const [level2DrawDisabled, setLevel2DrawDisabled] = useState(false);
  const [level3, setLevel3] = useState([]);
  const [level3CardsDrawn, setLevel3CardsDrawn] = useState(0);
  const [level3DrawDisabled, setLevel3DrawDisabled] = useState(false);
  const [drawn, setDrawn] = useState("Draw a Card!");
  const [atFinal, setAtFinal] = useState(false);
  const [finalCard, setFinalCard] = useState("");
  useEffect(() => {
    let cards = parse();
    setLevel1(cards["Level 1"]);
    setLevel2(cards["Level 2"]);
    setLevel3(cards["Level 3"]);
    setFinalCard(cards["Final Card"]);
  }, []);
  const resetDeck = () => {
    let cards = parse();
    setLevel1(cards["Level 1"]);
    setLevel2(cards["Level 2"]);
    setLevel3(cards["Level 3"]);
    setFinalCard(cards["Final Card"]);
    setLevel1CardsDrawn(0);
    setLevel2CardsDrawn(0);
    setLevel3CardsDrawn(0);
    setLevel1DrawDisabled(false);
    setLevel2DrawDisabled(false);
    setLevel3DrawDisabled(false);
    setAtFinal(false);
    setDrawn("Draw a Card!");
  };
  const drawLevel1 = () => {
    if (level1.length === 0) {
      setDrawn("No more cards from Level 1!");
      setLevel1DrawDisabled(true);
    } else {
      let i = Math.floor(Math.random() * level1.length);
      let selected = level1[i];
      setLevel1(level1.filter((card) => card != selected));
      setDrawn(selected);
      setLevel1CardsDrawn(level1CardsDrawn + 1);
    }
  };
  const drawLevel2 = () => {
    if (level2.length === 0) {
      setDrawn("No more cards from Level 2!");
      setLevel2DrawDisabled(true);
    } else {
      let i = Math.floor(Math.random() * level2.length);
      let selected = level2[i];
      setLevel2(level2.filter((card) => card != selected));
      setDrawn(selected);
      setLevel2CardsDrawn(level2CardsDrawn + 1);
    }
  };
  const drawLevel3 = () => {
    if (level3.length === 0) {
      setDrawn("No more cards from Level 3!");
      setLevel3DrawDisabled(true);
    } else {
      let i = Math.floor(Math.random() * level3.length);
      let selected = level3[i];
      setLevel3(level3.filter((card) => card != selected));
      setDrawn(selected);
      setLevel3CardsDrawn(level3CardsDrawn + 1);
    }
  };

  const drawFinalCard = () => {
    setDrawn(finalCard);
    setLevel3DrawDisabled(true);
  };

  const { container, drawContainer, drawButton, drawButtonLabel } = styles;
  const [showInstructions, setShowInstructions] = useState(false);
  return (
    <View style={container}>
      <StatusBar style="auto" />
      <View style={{ alignItems: "center" }}>
        <Card question={drawn} />

        <View style={drawContainer}>
          <TouchableOpacity
            style={drawButton}
            onPress={() => drawLevel1()}
            disabled={level1DrawDisabled}
          >
            <Text
              style={[
                {
                  color: level1DrawDisabled ? "#cd0000" : "#f8f8f8",
                },
                drawButtonLabel,
              ]}
            >
              Draw Level 1 Card
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={level1CardsDrawn < 15 || level2DrawDisabled}
            onPress={() => {
              drawLevel2();
              setLevel1DrawDisabled(true);
            }}
            style={drawButton}
          >
            <Text
              style={[
                {
                  color:
                    level1CardsDrawn < 15 || level2DrawDisabled
                      ? "#cd0000"
                      : "#f8f8f8",
                },
                drawButtonLabel,
              ]}
            >
              Draw Level 2 Card
            </Text>
          </TouchableOpacity>
        </View>
        <View style={drawContainer}>
          <TouchableOpacity
            disabled={level2CardsDrawn < 15 || level3DrawDisabled}
            style={drawButton}
            onPress={() => {
              drawLevel3();
              setLevel2DrawDisabled(true);
            }}
          >
            <Text
              style={[
                {
                  color:
                    level2CardsDrawn < 15 || level3DrawDisabled
                      ? "#cd0000"
                      : "#f8f8f8",
                },
                drawButtonLabel,
              ]}
            >
              Draw Level 3 Card
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={level3CardsDrawn < 15 || atFinal}
            style={drawButton}
            onPress={() => {
              drawFinalCard();
              setAtFinal(true);
            }}
          >
            <Text
              style={[
                {
                  color:
                    level3CardsDrawn < 15 || atFinal ? "#cd0000" : "#f8f8f8",
                },
                drawButtonLabel,
              ]}
            >
              Draw Final Card
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => resetDeck()}>
          <Text style={{ color: "#f8f8f8", fontSize: 18 }}>Reset Deck</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#cd0000",
    alignItems: "center",
    padding: 10,
    justifyContent: "center",
  },
  drawContainer: {
    flexDirection: "row",
    textAlign: "center",
    padding: 10,
  },
  drawButton: {
    padding: 10,
  },
  drawButtonLabel: {
    fontSize: 18,
  },
});
