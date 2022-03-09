import React, { useState, useEffect } from "react";
import { View, Button, FlatList } from "react-native";
import {
  Container,
  HStack,
  VStack,
  Heading,
  Text,
  Radio,
  Icon,
  Select,
  Box,
  Vstack,
} from "native-base";

const methods = [
  { name: "Cash on Delivery", value: 1 },
  { name: "Bank Transfer", value: 2 },
  { name: "Card Payment", value: 3 },
];

const paymentCards = [
  { name: "Wallet", value: 1 },
  { name: "Visa", value: 2 },
  { name: "MasterCard", value: 3 },
  { name: "Other", value: 4 },
];

export default function Payment(props) {
  const order = props.route.params;

  const [selected, setSelected] = useState();
  const [card, setCard] = useState();

  useEffect(() => {
    console.log(order);
  }, [order]);

  return (
    <Container>
      <Heading mt="5">Choose your payment method</Heading>
      <Box mt="5">
        {methods.map((item) => (
          <HStack w="100%" justifyContent="space-between">
            <Text fontSize="xl" onPress={() => setSelected(item.value)}>
              {item.name}
            </Text>
            <Radio.Group
              name="myRadioGroup"
              accessibilityLabel="favorite number"
              value={item.value}
              onChange={() => setSelected(item.value)}
            >
              <Radio value={selected} />
            </Radio.Group>
          </HStack>
        ))}

        {selected == 3 ? (
          <VStack mt="5">
            <Select
              w="80%"
              selectedValue={card}
              accessibilityLabel="Choose Card"
              placeholder="Choose Card"
              _selectedItem={{
                bg: "teal.600",
              }}
              mt={1}
              onValueChange={(itemValue) => setCard(itemValue)}
            >
              {paymentCards.map((c) => (
                <Select.Item key={c.name} label={c.name} value={c.value} />
              ))}
            </Select>
          </VStack>
        ) : null}
        <View style={{ marginTop: 50, alignSelf: "center" }}>
          <Button
            title={"Confirm"}
            onPress={() => props.navigation.navigate("Confirm", { order })}
          />
        </View>
      </Box>
    </Container>
  );
}
