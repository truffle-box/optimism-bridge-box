#!/user/bin/env zx

// Compile contracts
await $`truffle compile`;
await $`truffle compile --config=truffle-config.ovm`;

// 1. Deploy to L1
await $`truffle migrate --network=kovan --f 1 --to 1 --skip-dry-run`;

// 2. Deploy to L2
await $`truffle migrate --network=optimistic_kovan --config=truffle-config.ovm --f 2 --to 2 --skip-dry-run`;

// 3. Send message from ethereum to optimism
await $`truffle migrate --network=kovan --f 3 --to 3 --skip-dry-run`;

// 4. Send message from optimism to ethereum
await $`truffle migrate --network=optimistic_kovan --config=truffle-config.ovm --f 4 --to 4 --skip-dry-run`;
