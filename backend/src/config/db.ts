import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL as string, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        } as any);
        console.log("MongoDB Connected...!!");
    } catch (error) {
        console.error('MongoDB connection failed:', error);
        process.exit(1);
    }
}