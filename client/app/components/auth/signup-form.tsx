
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { useState } from "react";
import { registerUser } from "../../api/user.api";
import ClipLoader from "react-spinners/ClipLoader";
import { useNavigate } from "react-router-dom";

export default function SignupForm () {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null)
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError(null);
        setLoading(true);

        const form = e.currentTarget as HTMLFormElement; 
        const formData = new FormData(e.currentTarget)

        const data = {
            firstName: formData.get("firstName")?.toString() || "",
            lastName: formData.get("lastName")?.toString() || "",
            username: formData.get("username")?.toString() || "",
            email: formData.get("email")?.toString() || "",
            password: formData.get("password")?.toString() || "",
            confirmpassword: formData.get("confirmpassword")?.toString() || "",
            isStudent: formData.get("isStudent") === "on"
        }

        if (data.password !== data.confirmpassword) {
            setError("Passwords do not match.");
            setLoading(false);
            return;
        }

        const payload = {
            firstName: data.firstName,
            lastName: data.lastName,
            username: data.username,
            email: data.email,
            password: data.password,
            isStudent: data.isStudent
        };
        
        console.log(payload)

        try {
            const user = await registerUser(payload);
            console.log(user);
            form.reset();
            navigate("/directory")
        } catch (err: unknown) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }


    return (
        <Card className="w-full max-w-150">
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-5">
                        <div className="flex gap-2">
                            <div className="flex flex-col gap-2 flex-1">
                                <Label htmlFor="firstname">First Name</Label>
                                <Input
                                    id="firstname"
                                    name="firstName"
                                    type="text"
                                    placeholder="Juan"
                                    required
                                />
                            </div>

                            <div className="flex flex-col gap-2 w-55">
                                <Label htmlFor="firstname">Last Name</Label>
                                <Input
                                    id="lastname"
                                    name="lastName"
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
                                    name="username"
                                    type="text"
                                    placeholder="juandelacruz"
                                    required
                            />
                        </div>

                        <div className="flex flex-col gap-2 flex-1">
                            <Label htmlFor="email">Email Address</Label>
                            <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="juandelacruz@sampleemail.com"
                                    required
                            />
                        </div>

                        
                        <div className="flex flex-col gap-2 flex-1">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="Enter your password"
                                    required
                            />
                        </div>

                        <div className="flex flex-col gap-2 flex-1">
                            <Label htmlFor="confirmpassword">Confirm Password</Label>
                            <Input
                                    id="confirmpassword"
                                    name="confirmpassword"
                                    type="password"
                                    placeholder="Confirm your password"
                                    required
                            />
                        </div>

                        <div className="flex gap-2 flex-1">
                            <Label htmlFor="student">Are you a student around Taft?</Label>
                            <input type="hidden" name="isStudent" value="off" />
                            <Checkbox 
                                id="student" 
                                name="isStudent"
                                className="border-2 border-[#1E4D36] data-[state=checked]:bg-[#1E4D36] data-[state=checked]:border-[#1E4D36]" 
                                />
                        </div>

                        <Button 
                            type="submit" 
                            className="h-10 bg-[#1E4D36]  hover:bg-[#006937] transition-colors duration-200"
                            disabled={loading}
                        >
                            {loading && <ClipLoader color="#fff" size={20} />}
                            Sign Up
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}