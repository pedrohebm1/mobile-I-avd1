import { Text, TouchableOpacity, View } from "react-native";

import { styles } from "./styles";
import calculateTax from "../../utils/calculateTax";

type Props = {
  invoice: string,
  codTax: string,
  invoiceValue: string,
  state: string,
  supplier: string
}

type PropsData ={
  data: Props,
  onRemove: () => void
}

export function Registers({data,onRemove}:PropsData) {
  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <View style={styles.middle}>
          <Text style={styles.name}>
            {`Nota fiscal: ${data.invoice}`}
          </Text>
          <Text style={styles.name}>
            {`Código imposto: ${data.codTax}`}
          </Text>
          <Text style={styles.name}>
            {`Valor nota fiscal: ${data.invoiceValue}`}
          </Text>
          <Text style={styles.name}>
            {`Estado: ${data.state}`}
          </Text>
          <Text style={styles.name}>
            {`Fornecedor: ${data.supplier}`}
          </Text>
          <Text style={styles.name}>
            {`Valor imposto: ${calculateTax(data.codTax, data.state, parseFloat(data.invoiceValue)).toFixed(2)}`}
          </Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={onRemove}>
          <Text>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}