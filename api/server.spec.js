const request = require("supertest");
const server = require("./server.js");
const authRoute = require("../auth/auth-router");
const Users = require("../auth/auth-model");
const db = require("../database/dbConfig.js");
const jokes = require("../jokes/jokes-router.js");

// describe("router /api/register", () => {
//     const expectedStatusCode = 200;
//     const response = request(server).post("/api/register");
//     expect(response.status).toBe(expectedStatusCode);
// })

describe("auth model", () => {
  beforeEach(async () => {
    await db("users").truncate();
  });

  describe("register user", () => {
    it("should register a user", async () => {
      await Users.add({ username: "b", password: "ya" });
      const users = await db("users");
      let i = users.length;
      expect(users).toHaveLength(1);
      // expect(users).toBe([{"id": 1, "password": "ya", "username": "b"}]);
      // expect(users).toContain("b");
      expect(users).not.toContain("Norm");
      // expect(users.equals(users)).toBe(true);
      expect(users).not.toBeUndefined();
    });
  });

  describe("login user", () => {
    //     it("should login a user", async () => {
    //         const username = { username: "b"}
    //         await Users.findBy()
    //         const users = await db("users").where(username)
    //         expect(users).toHaveLength(1);
    //         expect(Promise.resolve("users")).resolves.toBe("users");
    //     })
    it("resolves promises", () => {
      expect(Promise.resolve("dogmadoos")).resolves.toBe("dogmadoos");
      expect(Promise.resolve("dogmadoos")).resolves.not.toBe("doggos");
    });
  });
});

describe("jokes router", () => {
  it("you get a 400 error when you try to get in without header", async () => {
    return await request(server)
      .get("/api/jokes")
      .expect(400);
  });

  it(" returns a json object", () => {
    const response = request(server).get("/api/jokes");
    expect(response.type);
  });
});

describe("whether it contains an item", () => {
  it("returns things that are there and you get errors where there aren't", () => {
    const doodles = [
      "whoodle",
      "aussiedoodle",
      "labradoodle",
      "goldendoodle",
      "sheepdoodle"
    ];
    expect(doodles).toContain("whoodle");
    expect(doodles).not.toContain("bears");
    expect(doodles[1]).not.toBe(doodles[2]);
  });
});

describe("match objects", () => {
  const goodBook = {
    vocabulary: "advanced",
    plot: "riveting"
  };

  const boysInTheBoat = {
    vocabulary: "advanced",
    plot: "riveting"
  };

  it("matches item to item", () => {
    expect(boysInTheBoat).toMatchObject(goodBook);
    expect(goodBook).toEqual(boysInTheBoat);
  });
});
