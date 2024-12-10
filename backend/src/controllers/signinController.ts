import { Request, Response } from "express";
import prisma from "../prismaClient";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const signInController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const User = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!User) {
    res.status(403).send({ message: "Email Invalid" });
      return 
    }

    const isPasswordValid = await bcrypt.compare(password, User!.password);
    if (!isPasswordValid) {
        res.status(403).send({ message: "Invalid Password" });
      return 
    }
    
    //jwt to cookie shit  here

    res.status(201).send({ message: "User signed up successfuly" });
    return 
  } catch (e) {
      res.status(400).send(e);
    return 
  }
};

export default signInController;
