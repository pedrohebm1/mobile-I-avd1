import { useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  FlatList,
} from "react-native";

import { styles } from "./styles";
import { Registers } from "../../components/Registers";

const acceptableCods = ["1234", "6789", "1708", "5952"];
const acceptableStates = ["RJ", "SP", "MG"];
const acceptableSuppliers = ["Totvs", "Microsoft"];

type Props = {
  id: string;
  invoice: string;
  codTax: string;
  invoiceValue: string;
  state: string;
  supplier: string;
};

export function Home() {
  const [invoice, setInvoice] = useState("");
  const [codTax, setCodTax] = useState("");
  const [invoiceValue, setInvoiceValue] = useState("");
  const [state, setState] = useState("");
  const [supplier, setSupplier] = useState("");
  const [register, setRegister] = useState<Props[]>([]);

  function clearInputs() {
    setInvoice("");
    setCodTax("");
    setInvoiceValue("");
    setState("");
    setSupplier("");
  }

  function handleAddNewUser() {
    if (
      invoice.trim() === "" &&
      codTax.trim() === "" &&
      invoiceValue.trim() === "" &&
      state.trim() === "" &&
      supplier.trim() === ""
    ) {
      return Alert.alert("Usuário", "Favor preencha os campos");
    }

    if (!parseFloat(invoiceValue.trim())) {
      return Alert.alert("Usuário", "Favor inserir um valor de imposto válido");
    }

    if (!acceptableCods.includes(codTax))
      return Alert.alert(
        "Código incorreto",
        "Favor inserir um código aceitável"
      );

    if (!acceptableStates.includes(state))
      return Alert.alert(
        "Estado incorreto",
        "Favor inserir um estado aceitável"
      );

    if (!acceptableSuppliers.includes(supplier))
      return Alert.alert(
        "Fornecedor incorreto",
        "Favor inserir um fornecedor aceitável"
      );

    const data = {
      id: String(new Date().getTime()),
      invoice,
      codTax,
      invoiceValue,
      state,
      supplier,
    };

    console.log(data);
    setRegister([...register, data]);
    clearInputs();
  }

  function handleRemoveUser(id: string) {
    console.log(`${id}`),
      Alert.alert("Remover", "Remover Usuario", [
        {
          text: "Sim",
          onPress: () =>
            setRegister((register) =>
              register.filter((register) => register.id !== id)
            ),
        },
        {
          text: "Nao",
          style: "cancel",
        },
      ]);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>Cadastro de informações</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nota fiscal"
          placeholderTextColor="#6B6B6B"
          keyboardType="numeric"
          maxLength={10}
          autoCapitalize="words"
          value={invoice}
          onChangeText={(value) => setInvoice(value)}
        />

        <TextInput
          style={styles.input}
          placeholder="Código imposto"
          placeholderTextColor="#6B6B6B"
          keyboardType="numeric"
          autoCapitalize="none"
          value={codTax}
          onChangeText={(value) => setCodTax(value)}
        />

        <TextInput
          style={styles.input}
          placeholder="Valor nota fiscal"
          placeholderTextColor="#6B6B6B"
          keyboardType="numeric"
          value={invoiceValue}
          onChangeText={(value) => setInvoiceValue(value)}
        />

        <TextInput
          style={styles.input}
          placeholder="Estado"
          placeholderTextColor="#6B6B6B"
          autoCapitalize="none"
          maxLength={2}
          value={state.toUpperCase()}
          onChangeText={(value) => setState(value.toUpperCase())}
        />

        <TextInput
          style={styles.input}
          placeholder="Fornecedor"
          placeholderTextColor="#6B6B6B"
          autoCapitalize="none"
          maxLength={40}
          value={supplier}
          onChangeText={(value) => setSupplier(value)}
        />

        <TouchableOpacity style={styles.button} onPress={handleAddNewUser}>
          <Text style={styles.buttonText}>Incluir</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={register}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Registers data={item} onRemove={() => handleRemoveUser(item.id)} />
        )}
      />
    </View>
  );
}
