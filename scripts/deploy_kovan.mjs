#!/user/bin/env zx

// Compile contracts
await $`truffle compile`;
await $`truffle compile --config=truffle-config.ovm`;

// Deploy to L1
await $`truffle migrate --network=kovan --f 1 --to 1 --skip-dry-run`;

// Deploy to L2
await $`truffle migrate --network=optimistic_kovan --config=truffle-config.ovm --f 2 --to 2 --skip-dry-run`;

// Send message from ethereum to optimism
await $`truffle migrate --network=kovan --f 3 --to 3 --skip-dry-run`;

// Send message from optimism to ethereum
const txHash =
  await $`truffle migrate --network=optimistic_kovan --config=truffle-config.ovm --f 4 --to 4 --skip-dry-run`;
console.log(txHash);
