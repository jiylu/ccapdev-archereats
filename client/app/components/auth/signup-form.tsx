import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { registerUser } from "../../api/user.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as z from "zod";
import { useAuth } from "../../hooks/useAuth";
import { loginUser } from "../../api/auth.api";

const registerSchema = z.object({
    email: z.string().email("Invalid email"),
    username: z.string()
        .min(3, "Username too short")
        .max(20, "Username too long")
        .regex(/^[a-zA-Z0-9_]{3,20}$/, "Only letters, numbers, underscores allowed"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmpassword: z.string().min(8, "Confirm your password"),
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    isStudent: z.boolean()
}).refine((data) => data.password === data.confirmpassword, {
    message: "Passwords do not match",
    path: ["confirmpassword"]
});

type FormData = z.infer<typeof registerSchema>;

export default function SignupForm () {
    const navigate = useNavigate();
    const { setAuth } = useAuth();
    const { register, handleSubmit, formState: { errors, isSubmitting }, reset, control } = useForm<FormData>({
        resolver: zodResolver(registerSchema)
    })

    const onSubmit = async (data: FormData) => {
        const { confirmpassword, ...payload } = data; // remove password confirm
        try {
            const user = await registerUser(payload);
            const { token } = await loginUser({login: user.email, password: data.password})
            
            reset();
            setAuth(token, user)
            navigate("/directory");
        } catch (err:unknown) {
            console.error(err);
        }
    }

    return (
        <Card className="w-full max-w-150">
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-5">
                        <div className="flex gap-2">
                            <div className="flex flex-col gap-2 flex-1">
                                <Label htmlFor="firstname">First Name</Label>
                                <Input
                                    id="firstname"
                                    {...register("firstName")}
                                    type="text"
                                    placeholder="Juan"
                                    required
                                />
                            </div>

                            <div className="flex flex-col gap-2 w-55">
                                <Label htmlFor="firstname">Last Name</Label>
                                <Input
                                    id="lastname"
                                    {...register("lastName")}
                                    type="text"
                                    placeholder="Dela Cruz"
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2 flex-1">
                            <Label htmlFor="username">Username</Label>
                            <Input
                                id="username"
                                {...register("username")}
                                type="text"
                                placeholder="juandelacruz"
                                required
                            />
                        </div>

                        <div className="flex flex-col gap-2 flex-1">
                            <Label htmlFor="email">Email Address</Label>
                            <Input
                                id="email"
                                {...register("email")}
                                type="email"
                                placeholder="juandelacruz@sampleemail.com"
                                required
                            />
                        </div>

                        
                        <div className="flex flex-col gap-2 flex-1">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                {...register("password")}
                                type="password"
                                placeholder="Enter your password"
                                required
                            />
                        </div>

                        <div className="flex flex-col gap-2 flex-1">
                            <Label htmlFor="confirmpassword">Confirm Password</Label>
                            <Input
                                id="confirmpassword"
                                {...register("confirmpassword")}
                                type="password"
                                placeholder="Confirm your password"
                                required
                            />
                        </div>

                        <div className="flex gap-2 flex-1">
                            <Label htmlFor="student">Are you a student around Taft?</Label>
                            <Controller
                                name="isStudent"
                                control={control} 
                                defaultValue={false}
                                render={({ field }) => (
                                    <Checkbox
                                        id="student"
                                        checked={field.value}
                                        onCheckedChange={(checked) => field.onChange(checked === true)}
                                        className="border-2 border-[#1E4D36] data-[state=checked]:bg-[#1E4D36] data-[state=checked]:border-[#1E4D36]"
                                    />
                                )}
                            />
                        </div>

                        <Button 
                            type="submit" 
                            className="h-10 bg-[#1E4D36]  hover:bg-[#006937] transition-colors duration-200"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Signing Up..." : "Sign Up"}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}