import { Request, Response } from "express";
import prisma from "../prismaClient";
import bcrypt from 'bcrypt'

const signUpController = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const isEmailUsed = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (isEmailUsed) {
      res.status(403).send({message:"Email already in use"})
      return
    }

    const hashedPassword=await bcrypt.hash(password,10);

    const user=await prisma.user.create({
        data:{
            name,
            email,
            password:hashedPassword
        }
    })

    res.status(201).send({message:"User signed up successfuly"})
    return 
  } catch (e) {
    res.status(400).send(e);
    return 
  }
};

export default signUpController;
