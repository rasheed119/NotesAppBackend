import redis from "redis";

const redisClient = () => {
  return redis.createClient();
};

const client = redisClient();

client.on("error", (error) => {
  console.log("Error connecting to Redis", error.message);
});

client.on("connect", () => {
  console.log("Connectd to Redis");
});

client.on("end", () => {
  console.log("Redis Connection Ended");
});

client.on("SIGQUIT", () => {
  client.quit();
});

export default client;
