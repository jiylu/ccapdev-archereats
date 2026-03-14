import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose, DialogFooter } from "../ui/dialog";
import { Field, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginUser } from "../../api/auth.api";
import { useAuth } from "../../hooks/useAuth";

interface LoginModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onLoginSuccess?: () => void
}

const loginSchema = z.object({
    login: z.string().min(1, "Enter your email or username"),
    password: z.string().min(1, "Enter your password")
})

type FormData = z.infer<typeof loginSchema>

export function LoginModal ({ open, onOpenChange, onLoginSuccess }: LoginModalProps) {
    const { setAuth } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const { handleSubmit, formState: { errors, isSubmitting }, reset, control } = useForm<FormData>({
        resolver: zodResolver(loginSchema)
    })

    const onSubmit = async (data: FormData) => {
        console.log(data);
        
        try {
            const { user, token } = await loginUser(data);
            
            setAuth(token, user)
            reset()
            navigate(location.pathname === "/signup" ? "/directory": location.pathname)
            onOpenChange(false)
            onLoginSuccess?.()
        } catch (err:unknown) {
            console.error(err);
        }
    }
    
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="flex items-center flex-col">
                    <DialogHeader>
                        <DialogTitle className="flex">
                            <span className="text-2xl font-bold text-black">Welcome Back!</span>
                        </DialogTitle>
                    </DialogHeader>
                    
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <FieldGroup className="justify-self-start">
                            <Field>
                                <FieldLabel>Username or Email</FieldLabel>
                                <Controller
                                    name="login"
                                    control={control}
                                    render={({ field }) => 
                                        <Input {...field} placeholder="Enter username or email" />
                                    }
                                />
                            </Field>

                            <Field>
                                <FieldLabel>Password</FieldLabel>
                                <Controller
                                    name="password"
                                    control={control}
                                    render={({ field }) => 
                                        <Input 
                                            {...field} 
                                            placeholder="Enter password" 
                                            required 
                                            type="password"
                                        />
                                    }
                                />
                            </Field>
                        </FieldGroup>
                        
                        <DialogFooter className="flex flex-col! mt-2">
                            <span className="text-[0.75em]">Forgot Password?</span>
                            <Button 
                                type="submit"
                                variant="outline" 
                                disabled={isSubmitting}
                                className="w-115 bg-[#1E4D36] text-white  hover:bg-[#006937] hover:text-white  transition-colors duration-200"
                            >
                                {isSubmitting ? "Logging in..." : "Continue"}
                            </Button>

                            <span className="flex items-center justify-center text-xs">
                                Don't have an account?
                                <DialogClose asChild>
                                    <Link to="/signup" className="ml-1 underline font-semibold">Sign Up</Link>
                                </DialogClose>
                            </span>
                        </DialogFooter>
                    </form>             
            </DialogContent>   
        </Dialog>
    );
} 