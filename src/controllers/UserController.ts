import { Request, Response } from "express";
import { UserService } from "../services/UserService";

const userService = new UserService();

export class UserController {
  static async createUser(req: Request, res: Response) {
    try {
      const { name, email } = req.body;
      const user = await userService.createUser(name, email);
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ message: "Error creating user", error });
    }
  }

  static async getUsers(req: Request, res: Response) {
    try {
      const users = await userService.getUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: "Error fetching users", error });
    }
  }
}

