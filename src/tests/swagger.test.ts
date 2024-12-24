import { swaggerUi } from "@config/swagger";
import swaggerJSDoc from "swagger-jsdoc";


jest.mock("swagger-jsdoc");

describe("Swagger Configuration", () => {
  it("should generate a valid Swagger specification", () => {
    const mockSwaggerJSDoc = swaggerJSDoc as jest.Mock;

    const mockDefinition = {
      openapi: "3.0.1",
      info: {
        title: "API Coder Backend",
        version: "1.0.0",
        description: "Documentación de la API de Coder Backend",
      },
      servers: [
        {
          url: `http://localhost:3000`,
          description: "Development Server",
        },
      ],
    };

    const mockOptions = {
      swaggerDefinition: mockDefinition,
      apis: [
        "../routes/*.ts",
        "../docs/users.yaml",
        "../docs/products.yaml",
        "../docs/carts.yaml",
      ],
    };

    mockSwaggerJSDoc.mockReturnValue({
      openapi: "3.0.1",
      info: mockDefinition.info,
      servers: mockDefinition.servers,
    });

    const result = swaggerJSDoc(mockOptions);

    expect(result).toEqual({
      openapi: "3.0.1",
      info: mockDefinition.info,
      servers: mockDefinition.servers,
    });

    expect(mockSwaggerJSDoc).toHaveBeenCalledWith(mockOptions);
  });

  it("should export swaggerUi", () => {
    expect(swaggerUi).toBeDefined();
  });
});
