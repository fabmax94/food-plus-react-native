import { useCallback, useEffect } from "react";
import { Alert, BackHandler } from "react-native";


const useBackAlert = (navigation) => {
  const backAction = useCallback(() => {
    Alert.alert("Você quer voltar?", "Você perderá as alterações.", [
      {
        text: "Não",
        onPress: () => null,
        style: "cancel",
      },
      { text: "Sim", onPress: () => navigation.goBack() },
    ]);
    return true;
  }, []);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  return { backAction };
};

export default useBackAlert;
