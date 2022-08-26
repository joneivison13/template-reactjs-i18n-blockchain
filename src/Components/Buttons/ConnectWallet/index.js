import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Context } from "../../../context";
import { connectWallet } from "../../../utils/wallet";

// import { Container } from './styles';

function ConnectWallet() {
  const context = useContext(Context);
  const { t: translate } = useTranslation();
  return (
    <button onClick={async () => await connectWallet(context)}>
      {context.walletIsConnected ? context.walletAddress : translate("hello")}
    </button>
  );
}

export default ConnectWallet;
