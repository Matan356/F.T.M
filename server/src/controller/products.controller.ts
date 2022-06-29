import { Request, Response } from "express";
import {
  CreateProductInput,
  UpdateProductInput,
} from "../schema/products.schema";
import {
  createProduct,
  deleteProduct,
  findAndUpdateProduct,
  findProduct,
  getProducts,
} from "../service/products.service";
import logger from "../utils/logger";

export async function createProductHandler(
  req: Request<{}, {}, CreateProductInput["body"]>,
  res: Response
) {
  const body = req.body;

  const product = await createProduct({ ...body });

  return res.send(product);
}
export async function updateProductHandler(
  req: Request<UpdateProductInput["params"]>,
  res: Response
) {
  const productId = req.params.productId;
  const update = req.body;

  const product = await findProduct({ productId });

  if (!product) {
    return res.sendStatus(404);
  }

  const updatedProduct = await findAndUpdateProduct({ productId }, update, {
    new: true,
  });

  return res.send(updatedProduct);
}

export async function getProductHandler(
  req: Request<UpdateProductInput["params"]>,
  res: Response
) {
  const productId = req.params.productId;
  const product = await findProduct({ _id: productId });

  if (!product) {
    return res.sendStatus(404);
  }

  return res.send(product);
}
export async function deleteProductHandler(
  req: Request<UpdateProductInput["params"]>,
  res: Response
) {
  const productId = req.params.productId;

  const product = await findProduct({ productId });

  if (!product) {
    return res.sendStatus(404);
  }

  await deleteProduct({ _id: productId });

  return res.sendStatus(200);
}

export async function getProductsHandler(req: Request, res: Response) {
  try {
    const products = await getProducts();
    return res.send(products);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
}
