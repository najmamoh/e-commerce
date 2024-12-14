import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'

const prisma = new PrismaClient()

//Create New products

export const createproducts = async (req: Request, res: Response | any) => {
  try {
    const { name, doc, price ,image} = req.body

    const newproduct = await prisma.products.create({
      data: {
        name,
        doc,
        price,
        image
      },
    })

    res.json({
      result: { ...newproduct },
      isSuccess: true,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Server error',
      isSuccess: false,
    })
  }
}


// get

export const getproducts = async (req: Request, res: Response | any) => {
    try {
  
      const newproduct = await prisma.products.findMany()
      
  
      res.json({
        result: { ...newproduct },
        isSuccess: true,
      })
    } catch (error) {
      console.log(error)
      res.status(500).json({
        message: 'Server error',
        isSuccess: false,
      })
    }
  }

// Find one by id

export const findproducts = async (req: Request, res: Response | any) => {
    try {
        const { id } = req.params

      const newproduct = await prisma.products.findFirst({
        where:{
           id: +id 
        } ,
      })
      
  
      res.json({
        result: { ...newproduct },
        isSuccess: true,
      })
    } catch (error) {
      console.log(error)
      res.status(500).json({
        message: 'Server error',
        isSuccess: false,
      })
    }
  }



  
//   DELETE

// Delete a product by its ID
export const Deleteproducts = async (req: Request, res: Response | any) => {
    const { id } = req.params; // Get the product ID from the URL

  try {
    const deletedProduct = await prisma.products.delete({
      where: { id: Number(id) }, // Delete the product with this ID
    });

    res.status(200).json({ message: 'Product deleted successfully', deletedProduct });
  } catch (error) {
    // Handle errors if the product doesn’t exist or something goes wrong
  
  }
}



// Update


export const Udateproducts = async (req: Request, res: Response | any) => {
    const { id } = req.params; // Get the product ID from the URL
    const { name, doc, price, image } = req.body;

    try {
        // Find the product by ID first to check if it exists
        const productExists = await prisma.products.findUnique({
            where: { id: +id },
        });

        if (!productExists) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // If the product exists, update it
        const updatedProduct = await prisma.products.update({
            where: {
                id: +id,  // Ensure the id is properly cast to number
            },
            data: {
                name,
                doc,
                price,
                image
            },
        });

        res.status(200).json({ message: 'Product updated successfully', updatedProduct });
    } catch (error: unknown) { // Typing the error as unknown
        if (error instanceof Error) { // Type narrowing
            console.error('Error updating product:', error.message);
            res.status(500).json({ message: 'Error updating product', error: error.message });
        } else {
            console.error('Unknown error:', error);
            res.status(500).json({ message: 'An unknown error occurred', error: String(error) });
        }
    }
}
