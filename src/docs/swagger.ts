import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.3",

    info: {
      title: "Remindr API",
      version: "1.0.0",
      description: "REST API for Remindr Backend",
    },

    servers: [
      {
        url: "http://localhost:4000/api/v1",
      },
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        User: {
          type: "object",
          properties: {
            id: { type: "string" },
            name: { type: "string" },
            email: { type: "string", format: "email" },
            avatar_url: { type: "string", nullable: true },
            created_at: { type: "string", format: "date-time" },
            updated_at: { type: "string", format: "date-time" },
          },
        },
        Task: {
          type: "object",
          properties: {
            id: { type: "string" },
            user_id: { type: "string" },
            title: { type: "string" },
            category: { type: "string" },
            completed: { type: "boolean" },
            created_at: { type: "string", format: "date-time" },
            updated_at: { type: "string", format: "date-time" },
          },
        },
        SavingsGoal: {
          type: "object",
          properties: {
            id: { type: "string" },
            user_id: { type: "string" },
            title: { type: "string" },
            target_amount: { type: "string" },
            current_amount: { type: "string" },
            created_at: { type: "string", format: "date-time" },
            updated_at: { type: "string", format: "date-time" },
          },
        },
        Bill: {
          type: "object",
          properties: {
            id: { type: "string" },
            user_id: { type: "string" },
            name: { type: "string" },
            amount: { type: "string" },
            due_date: { type: "string", format: "date" },
            due_time: { type: "string", nullable: true },
            category: { type: "string", enum: ["Utility", "Housing", "Transport", "Food", "Health", "Insurance", "Subscription", "Other"] },
            status: { type: "string", enum: ["paid", "unpaid"] },
            created_at: { type: "string", format: "date-time" },
            updated_at: { type: "string", format: "date-time" },
          },
        },
        ShoppingList: {
          type: "object",
          properties: {
            id: { type: "string" },
            user_id: { type: "string" },
            title: { type: "string" },
            created_at: { type: "string", format: "date-time" },
            updated_at: { type: "string", format: "date-time" },
          },
        },
        ShoppingItem: {
          type: "object",
          properties: {
            id: { type: "string" },
            shopping_list_id: { type: "string" },
            name: { type: "string" },
            created_at: { type: "string", format: "date-time" },
            updated_at: { type: "string", format: "date-time" },
          },
        },
      },
    },
  },

  apis: ["src/modules/**/*.routes.ts"],
};

export const swaggerSpec = swaggerJsdoc(options);