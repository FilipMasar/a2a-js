import { defineConfig } from 'tsup';

// Downstream fork note (FilipMasar/a2a-js): the `server/express` entry fails
// `dts: true` under pnpm install — `src/server/express/rest_handler.ts` calls
// helpers with `req.query.*` (typed `string | string[]` by the version of
// `@types/express-serve-static-core` pnpm resolves) where the helpers expect
// `string`, so tsc reports TS2345. Enhance Market is a pure CLIENT of A2A —
// we never run the server side — so we drop the server/express entry to
// unblock the `prepare` script's dts build. If upstream tightens the
// rest_handler types (or pins @types/express to a build-clean range), restore
// the entry.
export default defineConfig({
  entry: [
    'src/index.ts',
    'src/server/index.ts',
    'src/server/grpc/index.ts',
    'src/client/index.ts',
    'src/client/transports/grpc/index.ts',
  ],
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
});
