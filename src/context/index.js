import React, { useState, createContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { connectWallet, update_network } from "../utils/wallet";

export const Context = createContext({
  language: "en",
  walletIsConnected: false,
  setWalletIsConnected: () => null,
  walletAddress: "",
  networkId: "",
  setWalletAddress: () => null,
  setNetworkId: () => null,
  networkIsAvaliable: true,
  setNetworkIsAvaliable: () => null,
  languages: [{ name: "English", id: "en" }],
  setLanguages: () => null,
  updateLanguage: () => null,
});

function Provider({ children }) {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState("en");
  const [walletIsConnected, setWalletIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [networkId, setNetworkId] = useState("");
  const [networkIsAvaliable, setNetworkIsAvaliable] = useState(true);
  const [languages, setLanguages] = useState([
    { name: "English", id: "en" },
    { name: "Portugês", id: "pt" },
  ]);

  useEffect(() => {
    const walletStoraged = localStorage.getItem("@WALLET");
    if (walletStoraged?.length >= 1) {
      connectWallet({
        setNetworkId,
        setWalletAddress,
        setWalletIsConnected,
        walletIsConnected,
      });
    }
  }, []);

  useEffect(() => {
    const LANGUAGE = localStorage.getItem("@LANGUAGE");
    const [lang_data] = languages.filter((l) => l.id === LANGUAGE);
    setLanguage(lang_data?.id || "en");
    i18n.changeLanguage(lang_data?.id || "en");
  }, []);

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("networkChanged", function (chainId) {
        setNetworkIsAvaliable(false);
        update_network(chainId)
          .then(() => setNetworkIsAvaliable(true))
          .catch(() => setNetworkIsAvaliable(false));
      });
    }
  }, [walletAddress]);

  const updateLanguage = async (lang) => {
    const [lang_data] = languages.filter((l) => l.id === lang);
    setLanguage(lang_data.id || "en");
    i18n.changeLanguage(lang_data.id || "en");
    localStorage.setItem("@LANGUAGE", lang_data.id || "en");
  };
  return (
    <Context.Provider
      value={{
        language,
        walletIsConnected,
        setWalletIsConnected,
        walletAddress,
        setWalletAddress,
        networkId,
        setNetworkId,
        networkIsAvaliable,
        setNetworkIsAvaliable,
        languages,
        setLanguages,
        updateLanguage,
      }}
    >
      {children}
      {!networkIsAvaliable && <div>Please, switch network</div>}
    </Context.Provider>
  );
}

export default Provider;
