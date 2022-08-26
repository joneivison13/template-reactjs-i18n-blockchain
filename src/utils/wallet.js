import Web3 from "web3";
const networks_avaliables_data = process.env.REACT_APP_NETWORKS_AVALIABLES;
const networks_avaliables = networks_avaliables_data.split(";");
const main_network = process.env.REACT_APP_NETWORK_MAIN;

export const connectWallet = async ({
  setWalletAddress,
  setNetworkId,
  setWalletIsConnected,
  walletIsConnected,
}) => {
  console.log(networks_avaliables_data);
  if (walletIsConnected) {
    setWalletIsConnected(false);
  } else {
    if (window.ethereum) {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      window.web3 = new Web3(window.ethereum);
      const account = window.web3.eth.accounts;
      const walletAddress = account.givenProvider.selectedAddress;
      const this_network = await window.web3.eth.getChainId();
      console.log(networks_avaliables, String(this_network));
      const this_network_is_avaliable = networks_avaliables.includes(
        String(this_network)
      );
      if (!this_network_is_avaliable) {
        update_network(+main_network);
      }

      localStorage.setItem("@WALLET", walletAddress);
      setWalletAddress(walletAddress);
      setNetworkId(await window.web3.eth.getChainId());
      setWalletIsConnected(true);
      return Promise.resolve({
        wallet: walletAddress,
        network: await window.web3.eth.getChainId(),
      });
    } else {
      console.log("No wallet");
      return Promise.reject("Error");
    }
  }
};

export const disconnectWallet = async () => {};

export const update_network = async (chainId) => {
  console.log(networks_avaliables, String(chainId));
  const this_network_is_avaliable = networks_avaliables.includes(
    String(chainId)
  );
  if (this_network_is_avaliable) {
    return await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: Web3.utils.toHex(chainId) }],
    });
  } else {
    return await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: Web3.utils.toHex(main_network) }],
    });
  }
};
