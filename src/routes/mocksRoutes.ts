import { Router } from "express";
import {
  getMockingPets,
  getMockingUsers,
  generateMockData,
} from "@controllers/mockController";
import { validateMockData } from "@middleware/validateMockData";

const router = Router();

router.get("/mockingpets", getMockingPets);
router.get("/mockingusers", getMockingUsers);

router.post("/generateData", validateMockData, generateMockData);

export default router;
