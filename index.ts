import Ajv from "ajv";
import fastify from "fastify";
import fastifyJwt from "@fastify/jwt";
import fastifyCors from "@fastify/cors";
import fastifyCookie from "@fastify/cookie";
import fastifyAutoload from "@fastify/autoload";
import path from "path";

const server = fastify();

const schemaCompilers: Record<string, Ajv> = {
  body: new Ajv({
    removeAdditional: "all",
    coerceTypes: false,
    useDefaults: true,
    allErrors: true,
  }),
  params: new Ajv({
    removeAdditional: false,
    coerceTypes: true,
    allErrors: true,
  }),
  querystring: new Ajv({
    removeAdditional: false,
    coerceTypes: true,
    allErrors: true,
    useDefaults: true,
  }),
  headers: new Ajv({
    removeAdditional: false,
    coerceTypes: true,
    allErrors: true,
  }),
};

server.setValidatorCompiler((req) => {
  if (!req.httpPart) throw new Error("Missing httpPart");
  const compiler = schemaCompilers[req.httpPart];
  if (!compiler) throw new Error(`Missing compiler for ${req.httpPart}`);

  return compiler.compile(req.schema);
});

server.register(fastifyCors, {
  origin: "http://localhost:8080",
  credentials: true,
});
server.register(fastifyCookie);
server.register(fastifyJwt, { secret: "equipment-rental-system" });
server.register(fastifyAutoload, { dir: path.join(__dirname, "routes") });

const start = async () => {
  await server.listen({ host: "0.0.0.0", port: 5000 }).then(() => {
    console.log("App started.");
  }).catch((e) => {
    console.log(e);
    process.exit(1);
  });
};

start();
