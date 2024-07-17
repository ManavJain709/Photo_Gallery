import { z } from 'zod';


export const validateSchema = async (schema: z.AnyZodObject, data: any) => {
    try {
        await schema.parseAsync(data);
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}
