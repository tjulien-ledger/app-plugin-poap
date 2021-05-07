import "core-js/stable";
import "regenerator-runtime/runtime";
import Eth from "@ledgerhq/hw-app-eth";
import { byContractAddress } from "@ledgerhq/hw-app-eth/erc20";
import Zemu from "@zondax/zemu";
import { TransportStatusError } from "@ledgerhq/errors";

const sim_options = {
  model: "nanos",
  logging: true,
  start_delay: 2000,
  custom: '-k 2.0',
  X11: true,
};
const Resolve = require("path").resolve;
const APP_PATH = Resolve("elfs/ethereum.elf");

const PARASWAP_LIB = { Paraswap: Resolve("elfs/paraswap.elf") };

test("Test SimpleSwap", async () => {
  jest.setTimeout(100000);
  const sim = new Zemu(APP_PATH, PARASWAP_LIB);
  try {
    await sim.start(sim_options);

    let transport = await sim.getTransport();
    const eth = new Eth(transport);

    // These lines  are guessed and applied automatically by custom ledger.js (uncomment when using regular ledger.js)
    // await eth.setExternalPlugin("Paraswap", "0xf650c3d88d12db855b8bf7d11be6c55a4e07dcc9", "0xa0712d68");
    // const erc20Info = byContractAddress("0xf650c3d88d12db855b8bf7d11be6c55a4e07dcc9");
    // await eth.provideERC20TokenInformation(erc20Info);

    // https://etherscan.io/tx/0xf87e29ee49230352f56f099ef2ae9c7144b3ecb2d0085212e2478b267479b4df
    await expect(
      eth.signTransaction(
        "44'/60'/0'/0/0",
        "f90b95820a13850c92a69c008309fb5e941bd435f3c054b6e901b7b108a0ab7617c808677b888ac7230489e80000b90b24ec1d21dd0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee0000000000000000000000000000000000000000000000008ac7230489e8000000000000000000000000000000000000000000000000000000000000059012bb00000000000000000000000000000000000000000000000000000000059e752f0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000140000000000000000000000000000000000000000000000000000000000000000b70617261737761702e696f00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000048000000000000000000000000000000000000000000000000000000000000020d0000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000020000000000000000000000000467bccd9d29f223bce8043b84e8c8b282827790f000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000001a0000000000000000000000000695725627e04898ef4a126ae71fc30aa935c5fb600000000000000000000000086d3579b043585a97532514016dcf0c2d6c4b6a100000000000000000000000000000000000000000000000000000000000011ac00000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000002000000000000000000000000eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee000000000000000000000000467bccd9d29f223bce8043b84e8c8b282827790f00000000000000000000000017312cbd32df845a3941f1bc80f33ad8f59c84260000000000000000000000006317c5e82a06e1d8bf200d21f4510ac2c038ac81000000000000000000000000000000000000000000000000000000000000156400000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000e00000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000010000000000000000000000006cb5c5cb789fae62ce5ce280e1fbc5dd3bbdad810000000000000000000000000000000000000000000000003fd67ba0cecc00000000000000000000000000000000000000000000000000000000000000000000ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00000000000000000000000000000000000000000000000000000000000006400000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000280000000000000000000000000ba100000625a3754423978a60c9317c58a424e3d000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000002000000000000000000000000017312cbd32df845a3941f1bc80f33ad8f59c84260000000000000000000000006317c5e82a06e1d8bf200d21f4510ac2c038ac81000000000000000000000000000000000000000000000000000000000000271000000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000e000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000100000000000000000000000059a19d8c652fa0284f44113d0ff9aba70bd46fb400000000000000000000000000000000000000000000000016345785d8a000000000000000000000000000000000000000000000000000000000000000000000ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff000000000000000000000000467bccd9d29f223bce8043b84e8c8b282827790f000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000002000000000000000000000000017312cbd32df845a3941f1bc80f33ad8f59c84260000000000000000000000006317c5e82a06e1d8bf200d21f4510ac2c038ac81000000000000000000000000000000000000000000000000000000000000271000000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000e00000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000010000000000000000000000003b63a353c996a2c0a7beadd8a9052a04ca8d7a5c000000000000000000000000000000000000000000000004972411230cd2fd700000000000000000000000000000000000000000000000000000000000000000ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff25a0ffb4409987569488be7e9e6b94b4b3eab41477c6abec965d73f547f0eb1fe421a00c180ecb60187f13d49b37f290b533671062d8aa1f01a34c34b6ebedfbc89558"
      )
    ).resolves.toEqual({
      r: "e8c2b5b956b34386e68c5cc5bfc76aac158706430fcf1c71c9f6eb7d9dd690c8",
      s: "064005410a778b047fdd4afcb1e712217c297e5b0a2190f88b9e56ac745fae69",
      v: "26",
    });
  } finally {
    await sim.close();
  }
});
