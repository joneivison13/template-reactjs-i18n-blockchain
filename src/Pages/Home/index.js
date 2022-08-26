import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { connectWallet } from "../../utils/wallet";
import { Context } from "../../context";
import ConnectWallet from "../../Components/Buttons/ConnectWallet";
import ChangeLanguage from "../../Components/Forms/Selects/ChangeLanguage";

function Home() {
  const context = useContext(Context);
  // const { t: translate } = useTranslation();
  return (
    <>
      <ConnectWallet />
      <ChangeLanguage />
    </>
  );
}

export default Home;
